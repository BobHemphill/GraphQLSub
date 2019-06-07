import { GraphQLObjectType } from "graphql";
import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { messageById } from "../message/message.data";
import { IGetById } from "../repository";
import { threadDataById } from "../thread/thread.data";
import { userDataById } from "../user/user.data";
import { IGraphQLContext } from "../graphql/graphql.express";

interface IObjectReposiotyIndex {
    [key: string]: IGetById;
}
const objectRepositoryIndex: IObjectReposiotyIndex = {
    User: userDataById,
    Thread: threadDataById,
    Message: messageById,
};

const getObjectFromGlobalId = async (globalId: string) => {
    const { id, type } = fromGlobalId(globalId);
    return { ...objectRepositoryIndex[type][id], __type: type };
};

export const { nodeInterface, nodeField } = nodeDefinitions(getObjectFromGlobalId);
