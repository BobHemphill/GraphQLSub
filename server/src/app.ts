import * as express from "express";
import * as cors from "cors";
import graphqlMiddleware from "./graphql/graphql.express";

export default async function init(env: any) {
    const app = express();

    app.use(cors());
    app.use("/graphql", graphqlMiddleware);

    app.listen(env.PORT);
}
