import { IEntity, IGetById } from "../repository";

export interface IUserEntity extends IEntity {
    id: number;
    displayName: string;
 }
export interface IUserIndex extends IGetById {
    [key: number]: IUserEntity;
}
const user1: IUserEntity = {
    id: 1,
    displayName: "Bobby DT",
    __type: "User",
};
const user2: IUserEntity = {
    id: 2,
    displayName: "Chatty McChatterson",
    __type: "User",
};
const user3: IUserEntity = {
    id: 3,
    displayName: "Dont Talk",
    __type: "User",
};
const user4: IUserEntity = {
    id: 4,
    displayName: "Chattys Friend",
    __type: "User",
};
export const userData: IUserEntity[] = [user1, user2, user3, user4];
export const userDataById: IUserIndex = {
    [user1.id]: user1,
    [user2.id]: user2,
    [user3.id]: user3,
    [user4.id]: user4,
};
