/* Shared Career Tools chrome for the Interview Journey pages. */

export const LEARNING_URL = "https://sarangrajan.in/enitexa.ai/learning/";

export const storeNav = () => `
        <nav id="store-nav" aria-label="Career tools">
          <a href="/resume-builder/">Resume builder</a>
          <a href="/ats-checker/">ATS checker</a>
          <a href="/interview-journey/">Interview journey</a>
          <a href="/interview-journey/questions/">Interview questions</a>
          <a href="${LEARNING_URL}" target="_blank" rel="noopener">Learning</a>
          <a href="/resume-builder/email-examples/">Email examples</a>
          <a href="/resume-builder/templates/">Resume templates</a>
          <a href="/portfolio/">Portfolio</a>
          <a href="/jobs/">Jobs</a>
        </nav>`;

export const header = () => `
    <header class="store-header career-store-header">
      <div class="width">
        <a class="store-brand" href="/" aria-label="Infopark Daily home">
          <img src="/assets/icons/favicon-192.png" alt="" width="36" height="36" />
          <span>InfoparkDaily<small>CAREER TOOLS</small></span>
        </a>
        <button id="store-menu" type="button" aria-expanded="false" aria-controls="store-nav" aria-label="Open menu">
          <span class="store-menu-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        </button>${storeNav()}
      </div>
    </header>`;

export const footer = () => `
    <footer class="footer rb-width">
      <span>© InfoparkDaily · Career tools for job seekers. Examples are for learning; company names in samples are fictional.</span>
      <div>
        <a href="/jobs/">Jobs</a>
        <a href="/resume-builder/">Resume builder</a>
        <a href="/ats-checker/">ATS checker</a>
        <a href="/interview-journey/">Interview journey</a>
        <a href="/interview-journey/questions/">Interview questions</a>
        <a href="${LEARNING_URL}" target="_blank" rel="noopener">Learning</a>
        <a href="/resume-builder/email-examples/">Email examples</a>
        <a href="/terms/#career-tools">Terms</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </div>
    </footer>`;

/** Two feature cards: Learning (Enitexa.ai) + Interview questions. */
export const featureDuo = (current) => `
      <section class="ij-section ij-duo-section" id="more" aria-labelledby="duo-title">
        <div class="ij-wrap">
          <div class="ij-head">
            <p class="ij-eyebrow">Keep going</p>
            <h2 id="duo-title">Learn the skills. Practise the questions.</h2>
          </div>
          <div class="ij-duo">
            <a class="ij-duo-card ij-duo-card--learn" href="${LEARNING_URL}" target="_blank" rel="noopener">
              <span class="ij-duo-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3Zm-6 9.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.8l-6 3.3-6-3.3Z"/></svg></span>
              <span class="ij-duo-kicker">Learning · by Enitexa.ai</span>
              <strong>Learning</strong>
              <span class="ij-duo-text">Build the skills interviews test — guided learning for developers and job seekers.</span>
              <span class="ij-duo-cta">Start learning <span aria-hidden="true">↗</span><span class="ij-sr"> (opens in a new tab)</span></span>
            </a>
            <a class="ij-duo-card ij-duo-card--qs${current === "questions" ? " is-current" : ""}" href="/interview-journey/questions/"${current === "questions" ? ' aria-current="page"' : ""}>
              <span class="ij-duo-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v11H8l-4 4V4Zm7.1 3.2c-1.2 0-2 .6-2.3 1.7l1.3.5c.2-.6.5-.8 1-.8s.9.3.9.7c0 .3-.2.6-.7.9-.7.4-1 .9-1 1.6v.4h1.4v-.3c0-.4.2-.6.6-.9.8-.5 1.2-1 1.2-1.8 0-1.2-1-2-2.4-2Zm-.7 6.1v1.4h1.5v-1.4h-1.5Z"/></svg></span>
              <span class="ij-duo-kicker">Free question bank</span>
              <strong>Interview questions</strong>
              <span class="ij-duo-text">HR, managerial and technical rounds for 30 subjects — fresher and experienced, with sample answers.</span>
              <span class="ij-duo-cta">${current === "questions" ? "You are here" : "Practise questions"} <span aria-hidden="true">→</span></span>
            </a>
          </div>
        </div>
      </section>`;
