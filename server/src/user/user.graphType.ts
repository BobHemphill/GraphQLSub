import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
    name: "User",
    fields: {
        displayName: {
            type: GraphQLString,
        },
    },
});
