## Hyperdrive GRAPHQL Api

A graphql server project for serving data for hypercars/sportscars using:

- TypeGraphQL
- Apollo-server-express
- ExpressJs
- TypeORM
- SQLite (can be switched to other db providers)
- Typescipt

There are currently 2 entities, `Manufacturers` and `Cars`. Mutations and queries are available for adding/fetching data. Data will be stored in a `test.db` sqlite database file in the `server` directory. Database will be automatically created on the first run of the application.

## NOTE

If you are using this project for your own data, ensure `synchronize` option is set to false for production use in typeorm connection settings.

## Install

```bash
$ cd server

$ yarn install
#OR
$ npm install
```

## Running the project

```bash
# To start compiling and watching typescript files, RUN
$ yarn watch
# OR
$ npm run watch

# in a separate terminal tab/window, RUN
$ yarn dev
#OR
$ npm run dev
```

Open http://localhost:4000/graphql to view graphql playground. First run of the project will create a `test.db` database file in the `server` directory.

A `schema.graphql` file will also be automatically generated and updated as mutations/queries/subscriptions/types etc are added/removed from the project.

`public` directory is setup to serve static assets for a frontend (images etc) if required. There is also a very rudimentary index.html files for testing queries to local server.

### TODO

- Add authentication for mutations.
- Add validation
