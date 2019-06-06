import { PubSub } from "graphql-subscriptions";
import app from "./app";
import * as env from "./env";

app(env, {
    emitter: new PubSub(),
});
