/* DevOps & Cloud — 30 Important Interview Questions & Answers. Original InfoparkDaily content. Format: see guides/index.mjs. */
export const meta = {
  slug: "devops-cloud",
  field: "it",
  name: "DevOps & cloud",
  count: 30,
  topics: "DevOps practices, Linux, Git, CI/CD, Docker, Kubernetes, AWS and cloud basics, Terraform and monitoring",
  level: "Fresher to experienced"
};

export const text = `
## DevOps basics and Linux

### What is DevOps?
DevOps is a culture and set of practices that bring development and operations teams together to deliver software faster and more reliably. It relies on automation (CI/CD, infrastructure as code), shared responsibility, small frequent releases, and monitoring and feedback from production.

### What is the difference between continuous integration, continuous delivery and continuous deployment?
- **Continuous integration:** developers merge code often, and each change is automatically built and tested.
- **Continuous delivery:** every change that passes the pipeline is ready to release; going to production is a manual approval.
- **Continuous deployment:** every passing change goes to production automatically, with no manual step.

### Which Linux commands do you use most for troubleshooting?
- \`top\` / \`htop\`: CPU and memory usage by process
- \`df -h\` / \`du -sh\`: disk space
- \`free -m\`: memory
- \`ps aux | grep name\`: find a process
- \`tail -f\` and \`journalctl -u service\`: follow logs
- \`ss -tulpn\` / \`netstat\`: open ports
- \`curl\`, \`ping\`, \`dig\`: network checks
- \`systemctl status|restart name\`: manage services

### How do Linux file permissions work?
Each file has read (r=4), write (w=2) and execute (x=1) permissions for the owner, the group and others. \`chmod 754 deploy.sh\` gives the owner rwx (7), the group r-x (5) and others r-- (4). \`chown user:group file\` changes ownership. Give only the permissions that are needed.

### A server is running slowly. How do you investigate?
1. Check load and CPU with \`top\`; find the busiest process.
2. Check memory and swap with \`free -m\`.
3. Check disk space (\`df -h\`) and disk I/O (\`iostat\`).
4. Read application and system logs for errors.
5. Check network connections and latency to dependencies such as the database.
6. Compare with monitoring graphs to see when it started and what changed (a deployment, a traffic spike).

## Git and CI/CD

### What is the difference between git merge and git rebase?
- **Merge** combines two branches and creates a merge commit, keeping the full history as it happened.
- **Rebase** replays your commits on top of another branch, giving a straight, linear history.

Don't rebase commits that others have already pulled, because it rewrites history.

### What is a branching strategy?
A team agreement on how branches are used. Common ones:
- **Trunk-based:** short-lived feature branches merged into main often, with feature flags. Suits CI/CD.
- **GitFlow:** separate develop, feature, release and hotfix branches. Suits scheduled releases.

Pull requests with code review and automated checks protect the main branch.

### What does a typical CI/CD pipeline contain?
1. Checkout code
2. Install dependencies and build
3. Run unit tests and code-quality / security scans
4. Build an artefact or Docker image and push it to a registry
5. Deploy to staging and run integration tests
6. Approve and deploy to production
7. Monitor, and roll back if needed

### What is the difference between Jenkins, GitHub Actions and GitLab CI?
All three run automated pipelines. Jenkins is self-hosted and very flexible through plugins, but needs maintenance. GitHub Actions and GitLab CI are built into their code platforms and defined in YAML files in the repository, with hosted runners available. The concepts — stages, jobs, runners, secrets, artefacts — are the same.

### What are blue-green and canary deployments?
- **Blue-green:** run two identical environments. Deploy the new version to the idle one (green), test it, then switch traffic over. Rolling back means switching back.
- **Canary:** send a small percentage of traffic to the new version first, watch error rates and metrics, then increase gradually.

Both reduce the risk of a bad release.

## Docker and containers

### What is the difference between a container and a virtual machine?
A virtual machine includes a full guest operating system on top of a hypervisor, so it's heavy and slow to start. A container shares the host's OS kernel and packages only the app and its dependencies, so it's lightweight, starts in seconds and runs the same everywhere.

### What is the difference between a Docker image and a container?
An image is a read-only template built from a Dockerfile — the app, runtime and dependencies. A container is a running instance of an image. You can run many containers from one image.

### What does a simple Dockerfile look like?
\`\`\`
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`
Copying the package files before the rest of the code lets Docker reuse the cached dependency layer when only code changes.

### How do you make Docker images smaller and safer?
Use small base images (alpine or distroless), multi-stage builds so build tools don't end up in the final image, a \`.dockerignore\` file, fewer layers, and run as a non-root user. Scan images for vulnerabilities and pin versions.

### What is Docker Compose?
A tool for running multi-container apps from one YAML file — for example the app, a database and a cache together, with their networks, volumes and environment variables. \`docker compose up\` starts everything. It's mainly used for local development and testing.

### How do containers keep data, since they are temporary?
Data written inside a container is lost when it's removed. Use **volumes** (managed by Docker) or **bind mounts** (a host folder) for data that must persist, such as database files. In Kubernetes the equivalent is persistent volumes.

## Kubernetes

### What is Kubernetes and why is it used?
Kubernetes orchestrates containers across a cluster of machines. It schedules containers, restarts failed ones, scales them up and down, balances traffic, and rolls out updates with no downtime. You describe the desired state in YAML and Kubernetes keeps the cluster matching it.

### What are pods, deployments and services?
- **Pod:** the smallest unit — one or more containers sharing a network and storage.
- **Deployment:** manages a set of identical pods, keeps the right number running and handles rolling updates and rollbacks.
- **Service:** a stable network address and load balancer in front of pods, whose IPs change. Types include ClusterIP, NodePort and LoadBalancer.

### What are ConfigMaps and Secrets?
They keep configuration out of container images. A ConfigMap holds non-sensitive settings; a Secret holds sensitive values such as passwords and API keys. Both can be injected as environment variables or mounted files. Secrets are only base64-encoded by default, so enable encryption at rest and restrict access.

### What are liveness and readiness probes?
- **Liveness probe:** is the container still healthy? If it fails, Kubernetes restarts the container.
- **Readiness probe:** is it ready to receive traffic? If it fails, the pod is removed from the service until it's ready.

They prevent traffic from reaching pods that are starting up or stuck.

### How does Kubernetes scale applications?
The Horizontal Pod Autoscaler adds or removes pods based on CPU, memory or custom metrics. The Cluster Autoscaler adds or removes nodes when pods can't be scheduled or nodes sit idle. Set resource requests and limits so scheduling and autoscaling work correctly.

### How do you troubleshoot a pod that is not running?
1. \`kubectl get pods\` to see the status (Pending, CrashLoopBackOff, ImagePullBackOff).
2. \`kubectl describe pod name\` for events: scheduling problems, image pull errors, failed probes.
3. \`kubectl logs name\` (add \`--previous\` after a crash) for application errors.
4. Check resource limits, ConfigMaps and Secrets, and the image name and tag.

## Cloud, infrastructure as code and monitoring

### What is the difference between IaaS, PaaS and SaaS?
- **IaaS:** you rent servers, storage and networks and manage the OS and above (AWS EC2).
- **PaaS:** the platform runs your code and you manage only the app (Elastic Beanstalk, Google App Engine).
- **SaaS:** ready-to-use software over the internet (Gmail, Salesforce).

### What is the difference between vertical and horizontal scaling?
- **Vertical scaling (scale up):** give one server more CPU or memory. Simple, but there's an upper limit and often downtime.
- **Horizontal scaling (scale out):** add more servers behind a load balancer. It has no hard limit and survives single-server failures, but the app should be stateless.

### What is a reverse proxy, and how is it different from a load balancer?
A reverse proxy (such as Nginx) sits in front of servers and receives client requests on their behalf. It can terminate HTTPS, cache content, compress responses and route paths to different services. A load balancer spreads traffic across several servers and removes unhealthy ones. Many tools, including Nginx and cloud load balancers, do both.

### Which core AWS services should you know?
- **EC2:** virtual servers
- **S3:** object storage
- **RDS:** managed relational databases
- **VPC:** private networking — subnets, route tables, security groups
- **IAM:** users, roles and permissions
- **ELB and Auto Scaling:** load balancing and scaling
- **Lambda:** serverless functions
- **CloudWatch:** logs, metrics and alarms

Azure and Google Cloud offer equivalent services under different names.

### What is the difference between a security group and a network ACL in AWS?
- A **security group** is a stateful firewall attached to instances: if inbound traffic is allowed, the reply is allowed automatically. It has only allow rules.
- A **network ACL** is a stateless firewall at the subnet level: inbound and outbound rules are checked separately, and it can have both allow and deny rules.

### What is infrastructure as code? Why use Terraform?
Infrastructure as code defines servers, networks and databases in code files instead of clicking in a console. The code is version-controlled, reviewed and repeatable, so environments are consistent. Terraform works across many cloud providers: you write the desired state, \`terraform plan\` shows the changes and \`terraform apply\` makes them. Its state file must be stored securely and shared, for example in remote storage with locking.

### What is the difference between monitoring and observability?
Monitoring tracks known metrics and alerts when they cross thresholds (CPU above 90%, error rate up). Observability is being able to understand why a system behaves the way it does from its outputs — metrics, logs and traces. Common tools are Prometheus and Grafana, the ELK stack, CloudWatch and Datadog.

### How do you manage secrets safely in DevOps?
Never commit secrets to Git. Store them in a secrets manager (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault) or the CI tool's encrypted secrets, inject them at runtime, give each service only the access it needs, rotate them regularly and scan repositories for leaked keys.
`;

export const practice = [
  ["Linux", "Write a shell script that checks disk usage and alerts above 80%"],
  ["Git", "Resolve a merge conflict and explain rebase vs merge"],
  ["Docker", "Containerise a small web app with a multi-stage Dockerfile"],
  ["Compose", "Run an app with a database using Docker Compose"],
  ["CI/CD", "Build a pipeline that tests, builds an image and deploys"],
  ["Kubernetes", "Deploy an app with a Deployment, Service and readiness probe"],
  ["AWS", "Launch an EC2 instance in a VPC and host a static site on S3"],
  ["Terraform", "Create an S3 bucket and an EC2 instance with Terraform"],
  ["Monitoring", "Set up a dashboard and an alert for high error rate"],
  ["Projects", "Explain your project's pipeline and deployment end to end"]
];
