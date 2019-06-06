import { GraphQLID, GraphQLNonNull } from "graphql";
import { fromGlobalId } from "graphql-relay";
import { subscriptionWithClientId } from "graphql-relay-subscription";
import { IAppDeps } from "../appDeps";
import { IGraphQLContext } from "../graphql/graphql.express";
import { messageById } from "./message.data";
import MESSAGE_EVENTS from "./message.events";
import messageGraphType from "./message.graphType";

interface IMessageAddedSubscriptionInput {
    threadId: string;
}
interface IMessageAddedEventPayload {
    messageId: number;
}
export const messageAddedTopicFactory = (threadId: string) => `${MESSAGE_EVENTS.MESSAGE_ADDED}.${threadId}`;
export const messageAddedSubscription = subscriptionWithClientId({
    name: "messageAddedSubscription",
    inputFields: {
        threadId: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        message: {
            type: new GraphQLNonNull(messageGraphType),
            resolve: (payload: IMessageAddedEventPayload) => {
                return messageById[payload.messageId];
            },
        },
    },
    subscribe: ({ threadId }: IMessageAddedSubscriptionInput, context: IGraphQLContext) => {
        return context.deps.emitter.asyncIterator(messageAddedTopicFactory(threadId));
    },
});
