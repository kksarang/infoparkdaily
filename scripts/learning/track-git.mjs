/* Git & GitHub tutorial — original InfoparkDaily lessons. Examples are terminal sessions to read and try locally. */

const GITDOCS = "https://git-scm.com/docs/";

export const GIT_TRACK = {
  key: "git",
  name: "Git",
  long: "Git & GitHub — version control for every developer",
  color: "#f05032",
  tagline: "Track changes and work in teams.",
  level: "Beginner",
  lang: "shell",
  lessons: [
    {
      slug: "introduction",
      title: "Git introduction",
      summary: "What version control solves, Git vs GitHub, installing and configuring Git.",
      body: `<p>Without version control, projects end up as <code>final.zip</code>, <code>final-v2.zip</code>, <code>final-really-final.zip</code>. <strong>Git</strong> records snapshots of your project, so you can see what changed, who changed it, go back in time and work on features in parallel.</p>
<p><strong>Git</strong> is the tool that runs on your computer. <strong>GitHub</strong> (like GitLab or Bitbucket) is a website that hosts Git repositories online for sharing, backup and team collaboration. Almost every software job in Kerala's IT parks expects you to know both.</p>
<h3>Set up once</h3>
<p>Install Git, then tell it who you are — this name and email appear on every commit you make.</p>`,
      example: `$ git --version
git version 2.47.0

$ git config --global user.name "Anu Kumar"
$ git config --global user.email "anu@example.com"
$ git config --global init.defaultBranch main

$ git config --list
user.name=Anu Kumar
user.email=anu@example.com
init.defaultbranch=main`,
      points: ["Git = local tool; GitHub = online hosting.", "Configure name and email once per computer.", "Version control lets you undo and collaborate safely."],
      practice: "Install Git on your computer, run the three config commands with your own details and check them with git config --list.",
      quiz: { q: "Which statement is true?", options: ["Git and GitHub are the same thing", "Git runs locally; GitHub hosts repositories online", "GitHub is required to use Git", "Git only works with Python"], answer: 1, why: "Git works fully offline; GitHub is one service for hosting Git repositories." },
      interview: [
        ["What is a distributed version control system?", "Every developer has the full repository history locally, not just the latest files. You can commit, branch and view history offline and sync with others later."],
        ["Git vs GitHub?", "Git is the version-control software. GitHub is a hosting platform built around Git that adds pull requests, issues, code review and CI."]
      ],
      further: [["git config", GITDOCS + "git-config"], ["Pro Git book (free online)", "https://git-scm.com/book/en/v2"]]
    },
    {
      slug: "commits",
      title: "Repositories & commits",
      summary: "git init, status, add, commit and log — the everyday cycle.",
      body: `<p>A <strong>repository</strong> (repo) is a project folder that Git tracks. <code>git init</code> turns the current folder into one.</p>
<p>Files move through three areas:</p>
<ol>
<li><strong>Working directory</strong> — your files as you edit them.</li>
<li><strong>Staging area</strong> — changes you've chosen for the next snapshot (<code>git add</code>).</li>
<li><strong>Repository</strong> — saved snapshots called <strong>commits</strong> (<code>git commit</code>).</li>
</ol>
<p><code>git status</code> shows where everything is — run it often. Write commit messages in the imperative, describing <em>why</em>: “Add salary filter to job search”.</p>`,
      example: `$ mkdir job-tracker && cd job-tracker
$ git init
Initialized empty Git repository in /home/anu/job-tracker/.git/

$ echo "# Job tracker" > README.md
$ git status
Untracked files:
  README.md

$ git add README.md
$ git commit -m "Add project README"
[main (root-commit) 3f2c1aa] Add project README
 1 file changed, 1 insertion(+)

$ git log --oneline
3f2c1aa Add project README`,
      points: ["init → add → commit is the core loop.", "git status is your dashboard.", "Small commits with clear messages are easier to review and undo."],
      practice: "Create a folder, init a repo, add two files in two separate commits, then view them with git log --oneline.",
      quiz: { q: "Which command moves changes into the staging area?", options: ["git commit", "git add", "git push", "git stage-all"], answer: 1, why: "git add stages changes; git commit saves the staged snapshot." },
      interview: [
        ["What is the staging area for?", "It lets you choose exactly which changes go into the next commit, so one commit can contain one logical change even if you edited many files."],
        ["What makes a good commit message?", "A short imperative summary line (≈50 characters), optionally a blank line and a body explaining why the change was needed."]
      ],
      further: [["git add", GITDOCS + "git-add"], ["git commit", GITDOCS + "git-commit"], ["git log", GITDOCS + "git-log"]]
    },
    {
      slug: "branches",
      title: "Branches & merging",
      summary: "Creating branches, switching, merging and resolving conflicts.",
      body: `<p>A <strong>branch</strong> is an independent line of work. Build a feature on its own branch, keep <code>main</code> stable, and merge when it's ready.</p>
<ul>
<li><code>git switch -c feature/login</code> — create and move to a new branch.</li>
<li><code>git branch</code> — list branches (the * marks the current one).</li>
<li><code>git merge feature/login</code> — bring that branch's commits into the current branch.</li>
</ul>
<h3>Merge conflicts</h3>
<p>If both branches changed the same lines, Git stops and marks the file with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Edit the file to the correct final version, remove the markers, then <code>git add</code> and <code>git commit</code>.</p>`,
      example: `$ git switch -c feature/salary-filter
Switched to a new branch 'feature/salary-filter'

$ git add filter.js
$ git commit -m "Add salary range filter"

$ git switch main
$ git merge feature/salary-filter
Updating 3f2c1aa..8b41d07
Fast-forward
 filter.js | 24 ++++++++++++++++++++++++

$ git branch -d feature/salary-filter
Deleted branch feature/salary-filter`,
      points: ["One branch per feature or fix.", "Merge back into main when done.", "Conflicts = same lines changed; edit, add, commit."],
      practice: "Make a branch, change one line of README.md there, change the same line differently on main, merge, and resolve the conflict.",
      quiz: { q: "Which command creates and switches to a new branch?", options: ["git branch -m", "git switch -c name", "git merge name", "git checkout --orphan"], answer: 1, why: "git switch -c creates the branch and moves you onto it (older equivalent: git checkout -b)." },
      interview: [
        ["Merge vs rebase?", "Merge joins histories with a merge commit and keeps the true timeline. Rebase replays your commits on top of another branch for a straight history — but don't rebase commits others already pulled."],
        ["What is a fast-forward merge?", "When main has no new commits since the branch started, Git just moves main's pointer forward — no merge commit is needed."]
      ],
      further: [["git switch", GITDOCS + "git-switch"], ["git merge", GITDOCS + "git-merge"]]
    },
    {
      slug: "github",
      title: "Remotes & GitHub",
      summary: "Connecting to GitHub, push, pull, clone and fetch.",
      body: `<p>A <strong>remote</strong> is a copy of the repository somewhere else — usually GitHub. By convention the main one is called <code>origin</code>.</p>
<ul>
<li><code>git clone URL</code> — download a repository with its full history.</li>
<li><code>git remote add origin URL</code> — link an existing local repo to GitHub.</li>
<li><code>git push -u origin main</code> — upload your commits (<code>-u</code> remembers the link for next time).</li>
<li><code>git pull</code> — download others' commits and merge them into your branch.</li>
<li><code>git fetch</code> — download without merging, so you can inspect first.</li>
</ul>
<p>GitHub asks you to sign in with a personal access token or SSH key rather than your password.</p>`,
      example: `$ git remote add origin https://github.com/anu-kumar/job-tracker.git
$ git push -u origin main
Enumerating objects: 6, done.
To https://github.com/anu-kumar/job-tracker.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.

# On another laptop
$ git clone https://github.com/anu-kumar/job-tracker.git
$ cd job-tracker
$ git pull
Already up to date.`,
      points: ["origin = the default remote name.", "push uploads, pull downloads + merges.", "clone copies a repo with its history."],
      practice: "Create an empty repository on GitHub, push your local job-tracker repo to it and confirm the files appear on the website.",
      quiz: { q: "Which command downloads changes without merging them?", options: ["git pull", "git fetch", "git push", "git clone"], answer: 1, why: "git fetch only downloads; git pull = fetch + merge." },
      interview: [
        ["git pull vs git fetch?", "fetch updates your remote-tracking branches but leaves your work untouched. pull does a fetch and then merges (or rebases) into your current branch."],
        ["What is a fork?", "Your own copy of someone else's repository on GitHub. You push to your fork and open a pull request back to the original."]
      ],
      further: [["git remote", GITDOCS + "git-remote"], ["git push", GITDOCS + "git-push"], ["git pull", GITDOCS + "git-pull"]]
    },
    {
      slug: "pull-requests",
      title: "Pull requests & teamwork",
      summary: "The feature-branch workflow, pull requests and code review.",
      body: `<p>Most teams follow a <strong>feature-branch workflow</strong>:</p>
<ol>
<li>Pull the latest <code>main</code>.</li>
<li>Create a branch for one task (often named after the ticket: <code>feature/JOB-142-filter</code>).</li>
<li>Commit in small steps and push the branch.</li>
<li>Open a <strong>pull request</strong> (PR) on GitHub describing what changed and how to test it.</li>
<li>Teammates review, comment and approve; automated checks (CI) run tests.</li>
<li>Merge into <code>main</code> and delete the branch.</li>
</ol>
<p>Good PRs are small, focused and explain the <em>why</em>. When reviewing, be specific and kind: suggest, don't command.</p>`,
      example: `$ git switch main
$ git pull
$ git switch -c feature/JOB-142-salary-filter

# ...edit, test...
$ git add .
$ git commit -m "Filter jobs by salary range (JOB-142)"
$ git push -u origin feature/JOB-142-salary-filter
remote: Create a pull request for 'feature/JOB-142-salary-filter' on GitHub by visiting:
remote:   https://github.com/anu-kumar/job-tracker/pull/new/feature/JOB-142-salary-filter`,
      points: ["Start from an up-to-date main.", "One task per branch and PR.", "Describe what and why; keep PRs small."],
      practice: "Open a pull request on your own repo from a feature branch, add a description with test steps, then merge it on GitHub.",
      quiz: { q: "What is a pull request?", options: ["A command that downloads code", "A request to review and merge a branch", "A way to delete a repository", "A Git configuration file"], answer: 1, why: "A PR proposes merging one branch into another and is where code review happens." },
      interview: [
        ["How do you keep a long-running branch up to date with main?", "Regularly merge main into it (or rebase onto main if the branch is private), resolving conflicts early while they're small."],
        ["What do you look for when reviewing a PR?", "Correctness, readable naming, tests for the change, edge cases, security issues, and whether the change does only what the description says."]
      ],
      further: [["GitHub: about pull requests", "https://docs.github.com/en/pull-requests"]]
    },
    {
      slug: "undo",
      title: "Undoing changes & .gitignore",
      summary: "restore, revert, reset, amend and keeping files out of Git.",
      body: `<p>Different mistakes need different tools:</p>
<ul>
<li><code>git restore file</code> — throw away uncommitted edits to a file.</li>
<li><code>git restore --staged file</code> — unstage, keeping your edits.</li>
<li><code>git commit --amend</code> — fix the last commit's message or add a forgotten file (only before pushing).</li>
<li><code>git revert &lt;commit&gt;</code> — make a new commit that undoes an old one. Safe for shared branches.</li>
<li><code>git reset --soft HEAD~1</code> — undo the last commit but keep its changes staged (local only).</li>
</ul>
<p>Avoid <code>git reset --hard</code> and force-pushing on shared branches — they rewrite history others depend on.</p>
<h3>.gitignore</h3>
<p>A <code>.gitignore</code> file lists things Git should never track: <code>node_modules/</code>, <code>.venv/</code>, build output, logs and especially secrets such as <code>.env</code> files.</p>`,
      example: `$ git status
modified:   app.js

$ git restore app.js          # discard the edit

$ git log --oneline
a91e0c2 Remove salary filter by mistake
8b41d07 Add salary range filter

$ git revert a91e0c2
[main 5d7f310] Revert "Remove salary filter by mistake"

$ cat .gitignore
node_modules/
.venv/
.env
*.log`,
      points: ["restore = discard local edits.", "revert = safe undo on shared history.", ".gitignore keeps secrets and junk out of the repo."],
      practice: "Add a .gitignore that ignores *.log and .env, create both files and confirm git status doesn't list them.",
      quiz: { q: "Which command safely undoes a commit that's already pushed to a shared branch?", options: ["git reset --hard", "git revert", "git commit --amend", "git push --force"], answer: 1, why: "revert adds a new commit that reverses the old one, without rewriting shared history." },
      interview: [
        ["git reset vs git revert?", "reset moves the branch pointer back (rewriting history) — fine for local work. revert creates a new commit that undoes changes — safe for shared branches."],
        ["You committed a password. What do you do?", "Rotate the secret immediately (assume it's leaked), remove it from the code, add the file to .gitignore, and if needed purge it from history with a history-rewriting tool — then coordinate with the team."]
      ],
      further: [["git restore", GITDOCS + "git-restore"], ["git revert", GITDOCS + "git-revert"], ["gitignore", GITDOCS + "gitignore"]]
    }
  ]
};
