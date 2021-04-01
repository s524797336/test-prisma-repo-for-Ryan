# Setup db if you don't have one

Install Docker
```shell
cd tools/postgres
sh docker.sh
```

# Init

```shell
# Install deps
yarn install
# Init database
npx prisma migrate dev --name init
```

# Run

```shell
npx ts-node index.ts
```
