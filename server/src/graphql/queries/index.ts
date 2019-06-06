import { GraphQLList, GraphQLObjectType } from "graphql";
import { nodeField } from "../../relay/node";
import { userData, userDataById } from "../../user/user.data";
import userType from "../../user/user.graphType";

export default new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        me: {
            type: userType,
            resolve() {
                return userDataById[1];
            },
        },
        users: {
            type: new GraphQLList(userType),
            resolve: () => userData,
        },
        node: nodeField,
    },
});
