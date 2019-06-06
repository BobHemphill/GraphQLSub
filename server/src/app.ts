import * as cors from "cors";
import * as express from "express";
import graphqlMiddleware from "./graphql/graphql.express";
import xUserMiddleWare from "./auth/xUserMiddleware";

export default async function init(env: any) {
    const app = express();

    app.use(cors());
    app.use("/graphql", xUserMiddleWare, graphqlMiddleware);

    app.listen(env.PORT);
}
