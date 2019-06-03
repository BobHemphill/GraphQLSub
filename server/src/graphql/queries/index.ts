import { GraphQLList, GraphQLObjectType } from "graphql";
import { userData } from "../../user/user.data";
import userType from "../../user/user.graphType";

export default new GraphQLObjectType({
    name: "Root",
    fields: {
        me: {
            type: userType,
            resolve() {
                return userData[1];
            },
        },
        users: {
            type: new GraphQLList(userType),
            resolve: () => Object.values(userData),
        },
    },
});
