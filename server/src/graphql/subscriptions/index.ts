import { GraphQLObjectType } from "graphql";
import { messageAddedSubscription } from "../../message/message.subscriptions";

export default new GraphQLObjectType({
    name: "RootSubscription",
    fields: {
        messageAddedSubscription,
    },
});
