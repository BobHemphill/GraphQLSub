import * as cors from "cors";
import * as express from "express";
import { createServer } from "http";
import { IAppDeps } from "./appDeps";
import xUserMiddleWare from "./auth/xUserMiddleware";
import graphqlMiddleware from "./graphql/graphql.express";
import wsSockerServerFactory from "./ws";

export default async function init(env: any, deps: IAppDeps) {
    const app = express();

    app.use(cors());
    app.use("/graphql", xUserMiddleWare, graphqlMiddleware(deps));

    const serverWrapper = createServer(app);
    serverWrapper.listen(env.PORT, () => {
        wsSockerServerFactory(serverWrapper, deps);
    });
}
