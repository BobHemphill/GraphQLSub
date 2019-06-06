import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../relay/node";
import { threadDataById } from "../thread/thread.data";
import ThreadType from "../thread/thread.graphType";
import { userDataById } from "../user/user.data";
import UserType from "../user/user.graphType";
import { IMessageEntity } from "./message.data";

export default new GraphQLObjectType({
    name: "Message",
    fields: () => ({
        id: globalIdField(),
        text: {
            type: new GraphQLNonNull(GraphQLString),
        },
        owner: {
            type: new GraphQLNonNull(UserType),
            resolve: (message: IMessageEntity) => userDataById[message.owner],
        },
        thread: {
            type: new GraphQLNonNull(ThreadType),
            resolve: (message: IMessageEntity) => threadDataById[message.thread],
        },
    }),
    // interfaces: [nodeInterface],
});
