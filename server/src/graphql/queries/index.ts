import { GraphQLList, GraphQLObjectType } from "graphql";
import { nodeField } from "../../relay/node";
import { userData, userDataById } from "../../user/user.data";
import userType from "../../user/user.graphType";
import { IGraphQLContext } from "../graphql.express";

export default new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        me: {
            type: userType,
            resolve(_obj, _args, context: IGraphQLContext) {
                return context.user;
            },
        },
        users: {
            type: new GraphQLList(userType),
            resolve: () => userData,
        },
        node: nodeField,
    },
});
