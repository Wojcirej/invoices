# Invoices

## Development environment setup
`npm install`

## Run server
### Development
Serves application based on typescript code based on `config.json` configuration file for `dev` environment.

`npm run server:dev`

### Production
Compiles typescript to javascript and serves application based on javascript code based on `config.json` configuration file for `prod` environment.

`npm run server:prod`

## Run tests
`npm test` runs whole test of tests

`npm run test:unit` runs only unit tests

`npm run test:api` runs only API tests

## Environment variables & application config
Stored in `config.json` file. File contains separate configuration for `dev`, `prod` and `test` environments.