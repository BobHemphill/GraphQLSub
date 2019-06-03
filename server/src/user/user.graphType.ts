import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
    name: 'User',
    fields: {
        displayName: {
            type: GraphQLString,
        }
    }
});
