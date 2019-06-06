import { GraphQLObjectType } from "graphql";
import * as messageMutations from "../../message/message.mutations";

export default new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        ...messageMutations,
    },
});
