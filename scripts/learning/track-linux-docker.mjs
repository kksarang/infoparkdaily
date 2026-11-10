/* Linux & Docker basics — original InfoparkDaily lessons. Examples are terminal sessions to read and try on your own computer or a free cloud shell. */

const DOCKER = "https://docs.docker.com/";

export const LINUX_DOCKER_TRACK = {
  key: "linux-docker",
  name: "Linux & Docker",
  long: "Linux & Docker — shell commands, servers and containers for developers",
  color: "#2496ed",
  tagline: "Shell commands, containers and deployment basics.",
  level: "Beginner",
  lang: "shell",
  feature: "Terminal walkthroughs",
  shellNote: "Lines starting with <code>$</code> are commands you type; the rest is what the terminal prints. Use Linux, macOS, WSL on Windows or a free cloud shell. Names and paths are examples.",
  lessons: [
    {
      slug: "linux-basics",
      title: "Linux & the terminal",
      summary: "Why developers use Linux, the file system layout and moving around with pwd, ls and cd.",
      body: `<p>Most servers, cloud machines and containers run <strong>Linux</strong>, so developers, testers and support engineers are expected to be comfortable in its terminal (the <em>shell</em>, usually Bash).</p>
<h3>The file system</h3>
<ul>
<li>Everything starts at <code>/</code> (root). Your home folder is <code>/home/yourname</code>, written <code>~</code>.</li>
<li><code>/etc</code> holds configuration, <code>/var/log</code> holds logs, <code>/tmp</code> is temporary space.</li>
<li>Paths are case-sensitive: <code>Report.txt</code> and <code>report.txt</code> are different files.</li>
</ul>
<p>On Windows, install <strong>WSL</strong> (Windows Subsystem for Linux) to get a real Linux terminal.</p>`,
      example: `$ pwd
/home/anu

$ ls
Documents  projects  resume.pdf

$ ls -la projects
drwxr-xr-x  4 anu anu 4096 Nov 10 09:12 .
drwxr-xr-x 18 anu anu 4096 Nov 10 09:10 ..
drwxr-xr-x  6 anu anu 4096 Nov  8 18:40 job-portal
-rw-r--r--  1 anu anu  812 Nov  9 11:02 notes.md

$ cd projects/job-portal
$ cd ..          # up one level
$ cd ~           # back to home`,
      points: ["Servers and containers mostly run Linux.", "/ is root, ~ is your home folder.", "pwd = where am I, ls = list, cd = change directory.", "ls -la shows hidden files, sizes and permissions."],
      practice: "Open a terminal (or WSL), print your current folder, list all files including hidden ones in your home folder, and move into and out of a sub-folder.",
      quiz: { q: "What does ~ mean in a path?", options: ["The root folder", "Your home folder", "The previous folder", "A temporary folder"], answer: 1, why: "~ is shorthand for the current user's home directory, such as /home/anu." },
      interview: [
        ["Why do developers need Linux skills?", "Production servers, cloud VMs and Docker containers mostly run Linux. Deploying, reading logs, checking processes and fixing issues on servers all happen in the Linux shell."],
        ["What is the difference between an absolute and a relative path?", "An absolute path starts from root (/var/log/app.log) and works from anywhere. A relative path starts from the current folder (logs/app.log)."]
      ],
      further: [["Ubuntu: the Linux command line for beginners", "https://ubuntu.com/tutorials/command-line-for-beginners"]]
    },
    {
      slug: "files-permissions",
      title: "Files, search & permissions",
      summary: "Creating, copying and viewing files, searching with grep and find, and chmod/chown.",
      body: `<p>Everyday file commands:</p>
<ul>
<li><code>mkdir</code>, <code>touch</code>, <code>cp</code>, <code>mv</code>, <code>rm</code> (careful: <code>rm -r</code> deletes folders with no recycle bin).</li>
<li><code>cat</code>, <code>less</code>, <code>head</code>, <code>tail</code> to read files; <code>tail -f</code> follows a log live.</li>
<li><code>grep</code> searches inside files; <code>find</code> searches for files by name or age.</li>
<li>The pipe <code>|</code> sends one command's output into another.</li>
</ul>
<h3>Permissions</h3>
<p>Each file has read (r=4), write (w=2) and execute (x=1) permissions for the owner, the group and everyone else. <code>chmod 755 deploy.sh</code> gives the owner rwx and others r-x. Use <code>sudo</code> only when you need administrator rights.</p>`,
      example: `$ mkdir -p logs && cp app.log logs/
$ tail -n 3 logs/app.log
2026-11-10 10:01:12 INFO  Server started on port 8080
2026-11-10 10:05:40 ERROR Database connection timed out
2026-11-10 10:05:41 INFO  Retrying connection

$ grep -n "ERROR" logs/app.log
2:2026-11-10 10:05:40 ERROR Database connection timed out

$ grep -c "ERROR" logs/app.log | xargs echo "Errors today:"
Errors today: 1

$ find . -name "*.log" -mtime -1
./logs/app.log

$ ls -l deploy.sh
-rw-r--r-- 1 anu anu 220 Nov 10 10:20 deploy.sh
$ chmod +x deploy.sh && ./deploy.sh
Deploying build 42...`,
      points: ["cp, mv, rm, mkdir manage files — rm has no undo.", "tail -f follows logs live; grep finds text in files.", "Pipes (|) chain commands together.", "chmod sets permissions; +x makes a script executable."],
      practice: "Create a folder with three .txt files, write a word into one of them, use grep to find which file contains it, and make a small script executable with chmod +x.",
      quiz: { q: "What does chmod 644 file.txt give?", options: ["Everyone can do everything", "Owner read/write; group and others read only", "Owner execute only", "Nobody can read it"], answer: 1, why: "6 = read+write for the owner, 4 = read for the group and 4 = read for others." },
      interview: [
        ["How do you find which files contain a word?", "grep -rn \"word\" folder/ searches recursively and shows file names and line numbers. Add -i to ignore case."],
        ["What does chmod 755 mean?", "Owner gets read, write and execute (7); group and others get read and execute (5). It's typical for scripts and folders that others may run or open but not change."]
      ],
      further: [["GNU grep manual", "https://www.gnu.org/software/grep/manual/grep.html"]]
    },
    {
      slug: "processes-networking",
      title: "Processes, services & networking",
      summary: "Checking CPU, memory and disk, managing processes and services, and basic network troubleshooting.",
      body: `<p>When an app is slow or down, these are the first commands to run:</p>
<ul>
<li><code>top</code> / <code>htop</code> — live CPU and memory by process.</li>
<li><code>ps aux | grep java</code> — find a process and its PID; <code>kill PID</code> stops it.</li>
<li><code>df -h</code> — disk space; <code>free -h</code> — memory.</li>
<li><code>systemctl status|start|restart nginx</code> — manage services; <code>journalctl -u nginx</code> shows their logs.</li>
<li><code>ss -tulpn</code> — which ports are open and by whom.</li>
<li><code>curl</code>, <code>ping</code>, <code>dig</code> — test URLs, reachability and DNS.</li>
</ul>
<p>Connect to remote servers with <code>ssh user@server</code>, using SSH keys rather than passwords.</p>`,
      example: `$ df -h /
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        40G   38G  2.0G  95% /

$ free -h
               total   used   free
Mem:           7.8Gi  6.9Gi  0.9Gi

$ ps aux --sort=-%mem | head -3
USER   PID  %CPU %MEM COMMAND
app   1842  12.0 61.5 java -jar jobs-api.jar
root   901   0.3  2.1 nginx: master process

$ sudo systemctl restart jobs-api
$ systemctl is-active jobs-api
active

$ curl -s -o /dev/null -w "%{http_code}\\n" http://localhost:8080/actuator/health
200`,
      points: ["top, free -h and df -h show CPU, memory and disk.", "ps finds processes; kill stops them.", "systemctl manages services; journalctl shows their logs.", "curl and ss check that an app is listening and responding."],
      practice: "Check your machine's disk usage, memory and the top 3 processes by memory, and write down which one uses the most.",
      quiz: { q: "Disk shows 95% used and the app can't write logs. Which command confirmed the disk problem?", options: ["free -h", "df -h", "ping", "chmod"], answer: 1, why: "df -h reports disk space per file system; free -h is for memory." },
      interview: [
        ["A Linux server is slow. How do you troubleshoot?", "Check load and the busiest processes with top, memory with free -h, disk space with df -h and disk I/O with iostat, read application and system logs, check network and dependencies with curl or ping, and compare against when the problem started (a deployment or traffic spike)."],
        ["How do you see which process is using a port?", "ss -tulpn (or netstat -tulpn, or lsof -i :8080) lists listening ports with the process name and PID."]
      ],
      further: [["systemd documentation", "https://systemd.io/"]]
    },
    {
      slug: "shell-scripting",
      title: "Shell scripting basics",
      summary: "Variables, conditions, loops and exit codes to automate repetitive tasks.",
      body: `<p>A <strong>shell script</strong> saves a sequence of commands in a file so you can run them again — backups, log clean-up, deployment steps, health checks.</p>
<ul>
<li>Start with <code>#!/usr/bin/env bash</code> and add <code>set -euo pipefail</code> so the script stops on errors.</li>
<li>Variables: <code>NAME="value"</code> (no spaces around <code>=</code>), used as <code>"$NAME"</code> — always quote them.</li>
<li><code>if</code>, <code>for</code> and <code>while</code> work like other languages, with slightly different syntax.</li>
<li>Every command returns an <strong>exit code</strong>: 0 means success, anything else means failure. <code>$?</code> holds the last one.</li>
</ul>`,
      example: `$ cat check_disk.sh
#!/usr/bin/env bash
set -euo pipefail

LIMIT=80
for mount in / /var; do
  used=$(df --output=pcent "$mount" | tail -1 | tr -dc '0-9')
  if [ "$used" -ge "$LIMIT" ]; then
    echo "WARNING: $mount is at $used% (limit $LIMIT%)"
  else
    echo "OK: $mount is at $used%"
  fi
done

$ chmod +x check_disk.sh
$ ./check_disk.sh
WARNING: / is at 95% (limit 80%)
OK: /var is at 41%`,
      points: ["Scripts automate repeated command sequences.", "Use set -euo pipefail to stop on errors.", "Quote variables: \"$NAME\".", "Exit code 0 = success; anything else = failure."],
      practice: "Write a script that takes a folder name as $1, counts the .log files in it and prints the total, exiting with code 1 if the folder doesn't exist.",
      quiz: { q: "What does an exit code of 0 mean?", options: ["The command failed", "The command succeeded", "The script is still running", "Permission denied"], answer: 1, why: "By convention 0 means success; non-zero values signal different kinds of failure." },
      interview: [
        ["What does set -e do in a shell script?", "It makes the script exit as soon as any command fails, instead of continuing with bad state. Combined with -u (error on unset variables) and -o pipefail (fail if any part of a pipe fails), it makes scripts much safer."],
        ["How do you schedule a script to run daily?", "Add a cron entry with crontab -e, for example 0 2 * * * /opt/scripts/backup.sh to run at 2 AM every day, or use a systemd timer."]
      ],
      further: [["GNU Bash manual", "https://www.gnu.org/software/bash/manual/bash.html"]]
    },
    {
      slug: "docker-basics",
      title: "Docker: images & containers",
      summary: "What containers solve, images vs containers, and running, inspecting and stopping containers.",
      body: `<p>“It works on my machine” happens when environments differ. <strong>Docker</strong> packages an app with its runtime and dependencies into an <strong>image</strong>, and runs it as an isolated <strong>container</strong> that behaves the same on every computer and server.</p>
<ul>
<li>An <strong>image</strong> is a read-only template (like a class). A <strong>container</strong> is a running instance of it (like an object).</li>
<li>Images come from registries such as Docker Hub: <code>docker pull nginx</code>.</li>
<li>Containers share the host's kernel, so they start in seconds and are much lighter than virtual machines.</li>
<li><code>-p 8080:80</code> maps a port on your machine to a port in the container.</li>
</ul>`,
      example: `$ docker run -d --name web -p 8080:80 nginx:alpine
Unable to find image 'nginx:alpine' locally
alpine: Pulling from library/nginx
Status: Downloaded newer image for nginx:alpine
3f1c2a9e7b61...

$ docker ps
CONTAINER ID  IMAGE         STATUS         PORTS                  NAMES
3f1c2a9e7b61  nginx:alpine  Up 8 seconds   0.0.0.0:8080->80/tcp   web

$ curl -s localhost:8080 | head -4
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>

$ docker logs web --tail 2
172.17.0.1 - - [10/Nov/2026:10:31:02 +0000] "GET / HTTP/1.1" 200 615

$ docker stop web && docker rm web
web
web`,
      points: ["Containers package an app with everything it needs.", "Image = template; container = running instance.", "-p host:container publishes ports.", "docker ps, logs, stop and rm manage containers."],
      practice: "Run a container from the official httpd (Apache) image on port 8081, open it in your browser, read its logs, then stop and remove it.",
      quiz: { q: "What does -p 8080:80 do?", options: ["Limits memory to 8080 MB", "Maps port 8080 on your machine to port 80 in the container", "Runs 80 containers", "Sets the process ID"], answer: 1, why: "The format is hostPort:containerPort, so requests to localhost:8080 reach the container's port 80." },
      interview: [
        ["What is the difference between a container and a virtual machine?", "A VM runs a full guest operating system on a hypervisor, so it's heavy and slow to start. A container shares the host OS kernel and packages only the app and its dependencies, so it's lightweight and starts in seconds."],
        ["What is the difference between docker stop and docker rm?", "docker stop shuts down a running container but keeps it (you can start it again). docker rm deletes a stopped container. docker rm -f does both."]
      ],
      further: [["Docker: get started", DOCKER + "get-started/"]]
    },
    {
      slug: "dockerfile",
      title: "Writing a Dockerfile",
      summary: "Building your own image: FROM, WORKDIR, COPY, RUN, EXPOSE and CMD, layer caching and .dockerignore.",
      body: `<p>A <strong>Dockerfile</strong> is a recipe for building an image. Each instruction adds a layer:</p>
<ul>
<li><code>FROM</code> — the base image (for example <code>node:20-alpine</code>).</li>
<li><code>WORKDIR</code> — the folder inside the image where the next commands run.</li>
<li><code>COPY</code> — copy files from your project into the image.</li>
<li><code>RUN</code> — run a command while building, such as installing dependencies.</li>
<li><code>EXPOSE</code> — document the port the app listens on.</li>
<li><code>CMD</code> — the command that runs when a container starts.</li>
</ul>
<p>Docker caches layers. Copy the dependency file and install <em>before</em> copying the rest of the code, so code changes don't reinstall everything. Add a <code>.dockerignore</code> (with <code>node_modules</code>, <code>.git</code>, <code>.env</code>) to keep images small and secrets out.</p>`,
      example: `$ cat Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]

$ cat .dockerignore
node_modules
.git
.env

$ docker build -t job-api:1.0 .
[+] Building 18.4s (10/10) FINISHED
 => [3/5] COPY package*.json ./
 => [4/5] RUN npm ci --omit=dev
 => naming to docker.io/library/job-api:1.0

$ docker run -d -p 3000:3000 --name api job-api:1.0
$ curl localhost:3000/health
{"status":"ok"}

$ docker images job-api
REPOSITORY  TAG  SIZE
job-api     1.0  142MB`,
      points: ["A Dockerfile builds an image step by step.", "Install dependencies before copying code to reuse cached layers.", "Use .dockerignore to exclude node_modules, .git and .env.", "Run as a non-root user (USER) and use small base images."],
      practice: "Write a Dockerfile for a small Python or Node app, build it with a version tag, run it and check the image size with docker images.",
      quiz: { q: "Why copy package.json and run npm ci before COPY . . ?", options: ["It's required syntax", "So dependency installation is cached when only code changes", "To make the image larger", "To skip tests"], answer: 1, why: "Docker reuses unchanged layers. If package.json didn't change, the npm ci layer comes from cache and builds are much faster." },
      interview: [
        ["What is the difference between CMD and ENTRYPOINT?", "Both define what runs when the container starts. CMD provides defaults that are easily overridden by arguments to docker run; ENTRYPOINT fixes the executable, and CMD then supplies its default arguments."],
        ["How do you reduce Docker image size?", "Use slim or alpine base images, multi-stage builds so build tools aren't in the final image, a .dockerignore file, combined RUN steps that clean caches, and only production dependencies."]
      ],
      further: [["Dockerfile reference", DOCKER + "reference/dockerfile/"], ["Build best practices", DOCKER + "build/building/best-practices/"]]
    },
    {
      slug: "compose-volumes",
      title: "Docker Compose, volumes & deployment",
      summary: "Running an app with a database using Compose, persisting data with volumes and environment variables.",
      body: `<p>Real apps need several containers — an API, a database, maybe a cache. <strong>Docker Compose</strong> describes them in one <code>compose.yaml</code> file and starts them together with <code>docker compose up</code>.</p>
<ul>
<li>Services on the same Compose network reach each other by <strong>service name</strong> (the API connects to host <code>db</code>).</li>
<li>Container files disappear when the container is removed, so databases need a <strong>volume</strong> to keep data.</li>
<li>Pass configuration as <strong>environment variables</strong>, reading secrets from a <code>.env</code> file that is never committed.</li>
</ul>
<p>For production, images are pushed to a registry (Docker Hub, Amazon ECR, GitHub Container Registry) and run on a server, a cloud container service or Kubernetes.</p>`,
      example: `$ cat compose.yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:\${DB_PASSWORD}@db:5432/jobs
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: \${DB_PASSWORD}
      POSTGRES_DB: jobs
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:

$ docker compose up -d --build
 ✔ Network job-api_default  Created
 ✔ Volume "job-api_pgdata"  Created
 ✔ Container job-api-db-1   Started
 ✔ Container job-api-api-1  Started

$ docker compose ps
NAME            SERVICE  STATUS   PORTS
job-api-api-1   api      running  0.0.0.0:3000->3000/tcp
job-api-db-1    db       running  5432/tcp

$ docker compose down        # data stays in the pgdata volume
$ docker compose down -v     # also deletes the volume (data lost)`,
      points: ["Compose runs multi-container apps from one YAML file.", "Services reach each other by service name.", "Volumes keep database data when containers are recreated.", "Keep secrets in a .env file that is not committed."],
      practice: "Write a compose.yaml that runs your app with Redis or PostgreSQL, start it, stop it with docker compose down and confirm the data is still there when you start it again.",
      quiz: { q: "Your API container needs to connect to the db service in the same Compose file. Which host name does it use?", options: ["localhost", "db", "127.0.0.1", "docker"], answer: 1, why: "Compose puts services on a shared network where each service name is a DNS name. localhost would mean the API container itself." },
      interview: [
        ["What is Docker Compose used for?", "Defining and running multi-container applications (app, database, cache) from one YAML file with their networks, volumes and environment variables. It's mainly used for local development, testing and simple single-server deployments."],
        ["How do you persist data in Docker?", "Use named volumes (managed by Docker) or bind mounts (a host folder) mounted into the container's data path, so data survives when containers are removed or recreated."]
      ],
      further: [["Docker Compose", DOCKER + "compose/"], ["Volumes", DOCKER + "engine/storage/volumes/"]]
    }
  ]
};
