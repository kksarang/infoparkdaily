# Source coverage

Sources configured in `pipeline/registry.json`. 'Last probe' is a reachability check only; it does not
mean every vacancy at that source is on InfoparkDaily. Blocked sources are never bypassed.

| Source | Category | Type | Integration | Last probe | Last success |
|---|---|---|---|---|---|
| [Infopark Kochi jobs portal](https://infopark.in/companies-job) | it-park | official | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Technopark job search](https://technopark.in/job-search) | it-park | official | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Cyberpark Kozhikode careers](https://cyberparks.in/careers/) | it-park | official | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [UL CyberPark jobs](https://www.ulcyberpark.com/jobs) | it-park | official | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Kochi Metro Rail Limited careers](https://kochimetro.org/careers/) | psu | official | manual | reachable 200 | 2026-10-31T07:19:31Z |
| [Accenture India careers (Kerala)](https://www.accenture.com/in-en/careers/jobsearch?ct=Kochi) | private-it | employer | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Wipro careers (Kochi)](https://careers.wipro.com/search/?q=&locationsearch=kochi) | private-it | employer | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Conduent careers (Kochi)](https://careers.conduent.com/us/en/search-results?qcity=Kochi) | private-bpm | employer | manual | reachable 200 | 2026-10-31T07:19:31Z |
| [EXL careers (Kochi, Oracle Recruiting)](https://fa-ewjt-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_2/jobs) | private-bpm | employer | manual | reachable 200 | 2026-10-31T07:19:31Z |
| [EY careers (Kochi / Trivandrum)](https://careers.ey.com/ey/search/?optionsFacetsDD_country=IN&optionsFacetsDD_city=Kochi) | private-consulting | employer | manual | reachable 200 | 2026-10-31T07:19:31Z |
| [HPE careers (India)](https://careers.hpe.com/us/en) | private-it | employer | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [Advenxa careers (Zoho Recruit)](https://advenxa.zohorecruit.in/jobs/Careers) | recruiter | employer | automated | reachable 200 | 2026-10-31T07:19:31Z |
| [TCS careers (India)](https://www.tcs.com/careers/india) | private-it | employer | blocked | blocked 403 | — |
| [Cognizant careers (Kerala)](https://careers.cognizant.com/india-en/jobs/?location=Kerala%2C+India) | private-it | employer | blocked | reachable 200 | 2026-10-31T07:19:31Z |
| Employer posters / LinkedIn posts shared with InfoparkDaily | mixed | secondary | manual | not-probed | — |
| [Kerala PSC](https://www.keralapsc.gov.in/) | kerala-government | official | planned | blocked 403 | — |
| [Kerala Employment Department](https://employment.kerala.gov.in/) | kerala-government | official | planned | blocked 403 | — |
| [Cochin Shipyard careers](https://cochinshipyard.in/) | psu | official | planned | reachable 200 | 2026-10-31T07:19:31Z |
| [NATS (graduate / diploma apprenticeships)](https://nats.education.gov.in/) | apprenticeship | official | planned | unreachable | 2026-10-29T18:59:14Z |
| [Apprenticeship India / NAPS](https://www.apprenticeshipindia.gov.in/) | apprenticeship | official | planned | blocked 403 | 2026-10-29T18:59:14Z |
| [UPSC](https://upsc.gov.in/) | central-government | official | planned | unreachable | — |
| [SSC](https://ssc.gov.in/) | central-government | official | planned | reachable 200 | 2026-10-31T07:19:31Z |
| [India Post](https://indiapost.gov.in/) | central-government | official | planned | reachable 200 | 2026-10-31T07:19:31Z |
| [SBI Careers](https://sbi.co.in/web/careers) | banking | official | planned | reachable 200 | 2026-10-31T07:19:31Z |
| [IBPS](https://www.ibps.in/) | banking | official | planned | unreachable | 2026-10-29T18:59:14Z |

Integration summary: automated 8, blocked 2, manual 5, planned 10.

## Known limitations

- **TCS careers (India)**: Returned Akamai 'Access Denied' on 29 Oct 2026. Add manually from shared links.
- **Cognizant careers (Kerala)**: Cloudflare bot challenge on 27 Oct 2026. Not bypassed; add manually.
- **Employer posters / LinkedIn posts shared with InfoparkDaily**: Only details printed on the poster are used.
