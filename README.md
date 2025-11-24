This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### links

- [radix-ui/icons](https://www.radix-ui.com/icons)
- [shadcn/ui](https://ui.shadcn.com/)
- [resend](https://resend.com)

## run project

1. Install dependencies: `yarn`
2. Run the development server: `yarn dev`
3. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## docker compose
`docker stop convex-frontend || true` - stop convex-frontend containers
`docker rm convex-frontend || true` - remove convex-frontend image
`docker image prune -a --force` - clean up
`docker compose pull` - pull containers
`docker compose up --build -d` - up containers
`docker image prune -a` - remove all images without at least one container associated to them.

## docker build
1. Build your container: `docker build -t next-convex .`
2. Run your container: `docker run -p 80:3000 next-convex`

## docker
`docker exec -it <container_id> sh` - run docker shell 
`docker logs <container_id>` - logs

## commands
`docker ps -a` - list of dockers
`sudo su -` - root user
`lsblk` - show partitions
`df -h` - disk space in human format
`sudo growpart /dev/nvme0n1 1` - resize partition to max
`sudo resize2fs /dev/nvme0n1p1` - resize file system to max

## update packages
`yarn upgrade-interactive --latest`

## misc
`env` - list of system environment variables

## shadcn/ui
`npx shadcn-ui@latest add dialog` - add dialog to library

## count lines of code
`brew install cloc`
`cloc $(git ls-files)`

## convex
https://github.com/get-convex/convex-backend/blob/main/self-hosted/README.md
https://docs.convex.dev/quickstart/nextjs

```
docker compose exec backend ./generate_admin_key.sh
psql postgres -c "CREATE DATABASE convex_self_hosted"
export POSTGRES_URL='postgresql://<your-username>@host.docker.internal:5434'
export DO_NOT_REQUIRE_SSL=1
docker compose up --build -d
```

`npx convex data tasks` - show table data
`npx convex deploy` - deploy changes to db
`npx convex dev` - run dev env
`npx convex import --table <tablename> convex/tablename.jsonl` - push data
`npx convex import --replace --table <tablename> convex/tablename.jsonl` - replace data
`npx convex import --append --table <tablename> convex/tablename.jsonl` - append data
`npx convex env list` - list of env variables


---

start frontend locally
1. `yarn`
2. `yarn dev`

start convex backend locally
1. `yarn add convex`
2. `npx convex dev`

start convex dashboard locally
1. `docker compose up --build -d`

convex auth
1. `yarn add @convex-dev/auth @auth/core@0.37.0`
