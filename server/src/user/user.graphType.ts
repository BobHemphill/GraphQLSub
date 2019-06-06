import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";
import { nodeInterface } from "../relay/node";
import { threadDataByUserId } from "../thread/thread.data";
import ThreadType from "../thread/thread.graphType";

export default new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: globalIdField(),
        displayName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        threads: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ThreadType))),
            resolve: (user) => threadDataByUserId[user.id] || [],
        },
    }),
    interfaces: [nodeInterface],
});
