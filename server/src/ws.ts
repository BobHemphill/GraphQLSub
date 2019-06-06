import { execute, subscribe } from "graphql";
import { Server } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { IAppDeps } from "./appDeps";
import schema from "./graphql/graphql.schema";

export default function wsSockerServerFactory(server: Server, deps: IAppDeps) {
    return SubscriptionServer.create(
        {
          schema,
          execute,
          subscribe,
          onConnect: () => ({
            deps,
          }),
        },
        {
          server,
        },
      );
}
