# mys

Express + TypeScript user API backed by MongoDB Atlas, with a small HTML front end.

## Run locally

```bash
cp .env.example .env   # put your MongoDB Atlas connection string in MONGO_URI
npm ci
npm run dev            # http://localhost:3000
```

- `GET /` – hello world
- `GET /host` – hostname of the server that answered
- `/api/users` – CRUD (`GET`, `POST`, `GET /:id`, `PUT /:id`, `DELETE /:id`)
- `/test.html` – front end for adding, listing and deleting users

## Unit test

```bash
npm test
```

## Multi web server

Three copies of the app (`web1`–`web3`) run behind an nginx load balancer.

```bash
docker compose up --build   # http://localhost:8080
```

Refresh `http://localhost:8080/host` a few times to see requests rotate across the web servers.

## Docker Hub

`publish_docker_image.yml` builds the image and pushes it to Docker Hub as `<DOCKER_USERNAME>/mys` whenever a GitHub release is published.
It needs the repository secrets `DOCKER_USERNAME` and `DOCKER_PASSWORD` (a Docker Hub access token).

## CI/CD

`cicd.yml` runs on every push to `main`:

1. **Unit test** – `npm test`
2. **Push image to Docker Hub** – tags `<DOCKER_USERNAME>/mys:latest` and `:<commit sha>`
3. **Deploy to Azure Container App** – points the container app at the new image

The deploy job is skipped until these are set in the repository settings:

- Secret `AZURE_CREDENTIALS` – output of `az ad sp create-for-rbac --name mys-deploy --role contributor --scopes /subscriptions/<id>/resourceGroups/<rg> --json-auth`
- Variables `AZURE_RESOURCE_GROUP` and `AZURE_CONTAINER_APP`

The container app itself needs ingress on port 3000 and the `MONGO_URI` environment variable.
