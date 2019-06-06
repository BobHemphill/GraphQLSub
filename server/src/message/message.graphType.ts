import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { threadDataById } from "../thread/thread.data";
import ThreadType from "../thread/thread.graphType";
import { userDataById } from "../user/user.data";
import UserType from "../user/user.graphType";
import { MessageEntity } from "./message.data";
import { nodeInterface } from "../relay/node";

export default new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        id: globalIdField(),
        text: {
            type: new GraphQLNonNull(GraphQLString),
        },
        owner: {
            type: new GraphQLNonNull(UserType),
            resolve: (message: MessageEntity) => userDataById[message.owner],
        },
        thread: {
            type: new GraphQLNonNull(ThreadType),
            resolve: (message: MessageEntity) => threadDataById[message.thread],
        },
    }),
    interfaces: [nodeInterface],
});
