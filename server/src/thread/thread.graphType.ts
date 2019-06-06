import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { messageDataByThreadId } from "../message/message.data";
import MessageType from "../message/message.graphType";
import { ThreadEntity } from "./thread.data";
import { nodeInterface } from "../relay/node";

export default new GraphQLObjectType({
    name: "Thread",
    fields: () => ({
        id: globalIdField(),
        displayName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        messages: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MessageType))),
            resolve: (thread: ThreadEntity) => messageDataByThreadId[thread.id] || [],
        },
    }),
    interfaces: [nodeInterface],
});
