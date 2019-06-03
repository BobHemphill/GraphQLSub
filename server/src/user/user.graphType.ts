import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField } from "graphql-relay";

export default new GraphQLObjectType({
    name: "User",
    fields: {
        id: globalIdField(),
        displayName: {
            type: GraphQLString,
        },
    },
});
