import { GraphQLID, GraphQLNonNull, GraphQLString } from "graphql";
import { fromGlobalId, mutationWithClientMutationId } from "graphql-relay";
import { IGraphQLContext } from "../graphql/graphql.express";
import { messageById, messageData, messageDataByThreadId } from "./message.data";
import messageGraphType from "./message.graphType";
import { messageAddedTopicFactory } from "./message.subscriptions";

interface ICreateMessage {
    text: string;
    threadId: string;
}

export const addMessage = mutationWithClientMutationId({
    name: "addMessage",
    description: "create a new message in a thread",
    inputFields: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        threadId: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
        message: { type: new GraphQLNonNull(messageGraphType) },
    },
    mutateAndGetPayload: (input: ICreateMessage, context: IGraphQLContext) => {
        const messageId = messageData.length + 1;
        const threadId = parseInt(fromGlobalId(input.threadId).id, 10);
        const ownerId = context.user.id;

        const newMessage = {
            id: messageId,
            owner: ownerId,
            thread: threadId,
            text: input.text,
        };

        messageData.push(newMessage);
        messageById[newMessage.id] = newMessage;
        if (!messageDataByThreadId[threadId]) {
            messageDataByThreadId[threadId] = [];
        }
        messageDataByThreadId[threadId].push(newMessage);

        context.deps.emitter.publish(messageAddedTopicFactory(input.threadId), { messageId });
        return { message: newMessage };
    },
});
