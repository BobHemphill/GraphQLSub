import { GraphQLObjectType, GraphQLList } from "graphql";
import userType from "../../user/user.graphType";
import { userData } from "../../user/user.data";

export default new GraphQLObjectType({
    name: 'Root',
    fields: {
        me: {
            type: userType,
            resolve() {
                return userData[1];
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve: () => Object.values(userData)
        }
    }
});

