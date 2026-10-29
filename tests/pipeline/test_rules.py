"""Tests for pipeline/rules.py — run with: python3 -m unittest discover -s tests/pipeline -t ."""

from __future__ import annotations

import unittest
from datetime import date, datetime, timezone

from pipeline import rules

TODAY = date(2026, 10, 30)


def job(**kw) -> dict:
    base = {
        "id": "acme-dev-1",
        "company": "Acme",
        "roles": ["Developer"],
        "location": "Infopark, Kochi",
        "postedDate": "2026-10-29",
        "applyDeadline": "2026-11-10",
        "applyLink": "https://acme.example.com/jobs/1",
    }
    base.update(kw)
    return base


def codes(j: dict) -> set[str]:
    return {i["code"] for i in rules.validate_job(j, TODAY)}


class DateRules(unittest.TestCase):
    def test_ist_today_crosses_midnight_before_utc(self):
        # 20:00 UTC on 29 Oct is 01:30 IST on 30 Oct.
        self.assertEqual(rules.ist_today(datetime(2026, 10, 29, 20, 0, tzinfo=timezone.utc)), date(2026, 10, 30))

    def test_parse_iso_is_strict(self):
        self.assertEqual(rules.parse_iso("2026-11-10"), date(2026, 11, 10))
        for bad in ("10/11/2026", "2026-02-30", "Rolling", "", None, "31 Oct 2026"):
            self.assertIsNone(rules.parse_iso(bad), bad)

    def test_malformed_deadline_is_an_error(self):
        self.assertIn("bad_deadline", codes(job(applyDeadline="31/10/2026")))

    def test_deadline_before_posted(self):
        self.assertIn("deadline_before_posted", codes(job(postedDate="2026-10-29", applyDeadline="2026-10-01")))

    def test_future_posted_date(self):
        self.assertIn("posted_in_future", codes(job(postedDate="2026-12-01", applyDeadline="2026-12-10")))


class StatusRules(unittest.TestCase):
    def test_deadline_today_is_still_active(self):
        self.assertEqual(rules.job_status(job(applyDeadline="2026-10-30"), TODAY), "active")

    def test_passed_deadline_is_expired_not_closed(self):
        self.assertEqual(rules.job_status(job(applyDeadline="2026-10-29"), TODAY), "expired")

    def test_rolling_and_blank(self):
        self.assertEqual(rules.job_status(job(applyDeadline="Rolling"), TODAY), "rolling")
        self.assertEqual(rules.job_status(job(applyDeadline=""), TODAY), "undated")


class UrlAndContactRules(unittest.TestCase):
    def test_valid_urls(self):
        self.assertTrue(rules.valid_url("https://kochimetro.org/careers/"))
        self.assertTrue(rules.valid_url("mailto:hr@example.com?subject=Dev"))
        self.assertTrue(rules.valid_url("tel:+918089003186"))

    def test_invalid_urls(self):
        for bad in ("kochimetro.org/careers", "https://", "ftp://x.com/a", "https://exa mple.com", "mailto:nope"):
            self.assertFalse(rules.valid_url(bad), bad)

    def test_job_needs_an_apply_route(self):
        self.assertIn("no_apply_route", codes(job(applyLink="", email="", phone="")))
        self.assertNotIn("no_apply_route", codes(job(applyLink="", phone="80755 46819")))


class EligibilityClaims(unittest.TestCase):
    def test_unsupported_vacancy_count(self):
        j = job(companyBlurb="Acme · 100 vacancies", workDetails="Developers needed.")
        self.assertIn("unsupported_claim", codes(j))

    def test_supported_vacancy_count(self):
        j = job(companyBlurb="KMRL · 70 openings", workDetails="KMRL has notified 70 apprenticeship vacancies.")
        self.assertNotIn("unsupported_claim", codes(j))

    def test_unsupported_fresher_claim(self):
        j = job(companyBlurb="Freshers can apply", experienceRange="3–5 years", workDetails="3-5 years required")
        self.assertIn("unsupported_claim", codes(j))

    def test_placeholder_text_is_flagged(self):
        self.assertIn("placeholder_text", codes(job(experienceRange="As per official posting")))


class Duplicates(unittest.TestCase):
    def test_same_url_and_title_is_duplicate(self):
        a = job(id="a", applyLink="https://x.com/job/1?utm_source=linkedin")
        b = job(id="b", applyLink="https://x.com/job/1/")
        self.assertEqual(len(rules.find_duplicates([a, b])["duplicate_vacancies"]), 1)

    def test_job_id_in_query_keeps_posts_apart(self):
        a = job(id="a", applyLink="https://www.accenture.com/in-en/careers/jobdetails?id=R1_en")
        b = job(id="b", applyLink="https://www.accenture.com/in-en/careers/jobdetails?id=R2_en")
        self.assertEqual(rules.find_duplicates([a, b])["duplicate_vacancies"], {})

    def test_shared_careers_page_different_titles_is_not_duplicate(self):
        a = job(id="a", applyLink="https://hospital.org/careers", roles=["Accountant"])
        b = job(id="b", applyLink="https://hospital.org/careers", roles=["Staff Nurse"])
        self.assertEqual(rules.find_duplicates([a, b])["duplicate_vacancies"], {})

    def test_duplicate_ids(self):
        self.assertEqual(rules.find_duplicates([job(), job()])["duplicate_ids"], ["acme-dev-1"])

    def test_same_reference_id(self):
        a = job(id="a", referenceId="210142", applyLink="https://w.com/a")
        b = job(id="b", referenceId="210142", applyLink="https://w.com/b")
        self.assertIn("ref:acme:210142", rules.find_duplicates([a, b])["duplicate_vacancies"])


if __name__ == "__main__":
    unittest.main()
