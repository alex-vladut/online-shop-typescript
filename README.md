## Description

A very simple application making use of NestJS framework in order to apply some security techniques.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Development

```bash
# add a new module
$ nest g module users

# add a new service to a module
$ nest g service users

# more options
$ nest -h
```

## TODOs

Adding a default passport authentication strategy doesn't work and it ends up exposing all the endpoints as public.
