import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";

import { PORT, DB_NAME, IS_PROD } from "./config";
import { Car, Manufacturer } from "./entities";
import { CarResolver, HelloResolver, ManufacturerResolver } from "./resolvers";

const main = async () => {
  const conn = await createConnection({
    database: DB_NAME,
    type: "sqlite",
    logging: !IS_PROD,
    synchronize: !IS_PROD,
    entities: [Manufacturer, Car],
  });

  console.log(`Db connected: ${conn.isConnected}`);

  const app = express();

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: "http://localhost:*",
    })
  );
  app.use(
    express.static("public", {
      maxAge: -1,
    })
  );
  app.use((req, res, next) => {
    // a very basic statusCode and processing time logger
    console.time(req.originalUrl);
    next();
    console.log(res.statusCode);
    console.timeEnd(req.originalUrl);
  });

  const schema = await buildSchema({
    resolvers: [HelloResolver, ManufacturerResolver, CarResolver],
    emitSchemaFile: {
      // sortedSchema: true,
      commentDescriptions: true,
    },
    validate: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res /*db: conn */ }),
  });

  // Following has been replaced with express.static middleware above.
  // app.get("/", (_, res) => {
  //   const indexFile = __dirname + "/../public/index.html";
  //   // console.log(indexFile);
  //   res.sendFile(indexFile);
  //   res.end();
  // });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `server listening on http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

main();
