# Invoices

## Development environment setup
```
npm install
```

## Run server
### Development
Serves application based on typescript code based on `config.json` configuration file for `dev` environment.

```
npm run server:dev
```

### Production
Compiles typescript to javascript and serves application based on javascript code based on `config.json` configuration file for `prod` environment.

```
npm run server:prod
```

#### Serve production app via Docker
- build image: `docker build -t invoices .`
- run: `docker run -p 4201:4201 invoices`

App is now served at `localhost:4201` with `prod` configuration.

See list of running containers (flag `-a` lists all containers):

`docker ps`

Terminate container (if you're running it in detached mode, otherwise simple `Ctrl+C` will suffice):

`docker stop <CONTAINER ID>`

Remove container:

`docker container rm <CONTAINER ID>`

Clean up docker system (all stopped containers, all dangling images, and all unused networks)

`docker system prune`

## Run tests
`npm test` runs whole test of tests

`npm run test:unit` runs only unit tests

`npm run test:api` runs only API tests

## Environment variables & application config
Stored in `config.json` file. File contains separate configuration for `dev`, `prod` and `test` environments.