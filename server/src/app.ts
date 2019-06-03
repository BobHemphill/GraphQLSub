import * as express from "express";
import graphqlMiddleware from "./graphql/graphql.express";

export default async function init (env: any) {
    const app = express();

    app.use("/graphql", graphqlMiddleware);

    app.listen(env.PORT);
}
