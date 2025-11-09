This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Links

- [radix-ui/icons](https://www.radix-ui.com/icons)
- [vercel.com](https://vercel.com/account)
- [shadcn/ui](https://ui.shadcn.com/)
- [resend](https://resend.com)
- [next-auth](https://authjs.dev/getting-started/installation?framework=next.js)

## Run project

1. Install dependencies: `yarn`
2. Run the development server: `yarn dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docs

### docker compose
1. `docker stop convex-frontend || true` - stop convex-frontend containers
2. `docker rm convex-frontend || true` - remove convex-frontend image
3. `docker image prune -a --force` - clean up
4. `docker compose pull` - pull containers
5. `docker compose up --build -d` - up containers
---
6. `docker image prune -a` - remove all images without at least one container associated to them.

### Docker build

1. Build your container: `docker build -t next-auth-v5 .`
2. Run your container: `docker run -p 80:3000 next-auth-v5`

### docker
1. `docker exec -it <container_id> sh` - run docker shell 
2. `docker logs <container_id>` - logs

### psql
1. `psql -h <REMOTE HOST> -p <REMOTE PORT> -U <DB_USER> <DB_NAME>` - connect to db example
2. `psql -h localhost -p 5434 -d convex -U sa -W` - connect to db
3. `SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';` - select table names

### shadcn/ui
1. `npx shadcn-ui@latest add dialog` - add dialog to library

### aws ubuntu
1. `sudo su -` - switch to root user
2. install 
   - `apt-get update -y`
   - `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
   - `apt install -y nodejs` ?
   - `apt install npm -y` ?
   - `apt install nginx -y`
3. install docker
```
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
sudo groupadd docker
sudo usermod -aG docker $USER
docker -v
sudo docker run hello-world
```

### count lines of code
`brew install cloc`
`cloc $(git ls-files)`

## commands
`docker ps -a` - list of dockers
`sudo su -` - root user
`lsblk` - show partitions
`df -h` - disk space in human format
`sudo growpart /dev/nvme0n1 1` - resize partition to max
`sudo resize2fs /dev/nvme0n1p1` - resize file system to max

## update packages
```
yarn upgrade-interactive --latest
```

## convex
https://github.com/get-convex/convex-backend/blob/main/self-hosted/README.md
https://docs.convex.dev/quickstart/nextjs
```
docker compose exec backend ./generate_admin_key.sh
psql postgres -c "CREATE DATABASE convex_self_hosted"
export POSTGRES_URL='postgresql://<your-username>@host.docker.internal:5434'
export DO_NOT_REQUIRE_SSL=1
docker compose up --biild -d
```

## misc
`env` - list of system environment variables

## convex
`npx convex data tasks` - show table data
`npx convex deploy` - deploy changes to db
`npx convex dev` - run dev env
`npx convex import --table <tablename> convex/tablename.jsonl` - push data
`npx convex import --replace --table <tablename> convex/tablename.jsonl` - replace data
`npx convex import --append --table <tablename> convex/tablename.jsonl` - append data
