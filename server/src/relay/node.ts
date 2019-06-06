
import { nodeDefinitions, fromGlobalId } from "graphql-relay";
import { GraphQLObjectType } from "graphql";
import userGraphType from "../user/user.graphType";
import threadGraphType from "../thread/thread.graphType";
import messageGraphType from "../message/message.graphType";
import { IGetById } from "../repository";
import { userDataById } from "../user/user.data";
import { threadDataById } from "../thread/thread.data";
import { messageById } from "../message/message.data";

interface IObjectReposiotyIndex {
    [key: string]: IGetById;
}
const objectRepositoryIndex: IObjectReposiotyIndex = {
    "User": userDataById,
    "Thread": threadDataById,
    "Message": messageById,
}

const getObjectFromGlobalId = async (globalId: string) => {
	const { id, type } = fromGlobalId(globalId);
	
	return objectRepositoryIndex[type][id];
};

interface ITypeIndex {
    [key: string]: GraphQLObjectType;
}
const typeIndex: ITypeIndex = {
    "User": userGraphType,
    "Thread": threadGraphType,
    "Message": messageGraphType,
}
const getTypeFromObject = (obj: any): GraphQLObjectType => {
	const { name } = obj.constructor;
	return typeIndex[name];
};

export const { nodeInterface, nodeField } = nodeDefinitions(getObjectFromGlobalId, getTypeFromObject);