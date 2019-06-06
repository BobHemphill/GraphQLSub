import { PubSub } from "graphql-subscriptions";

export interface IAppDeps {
    emitter: PubSub;
}
