import { IEntity, IGetById } from "../repository";

export type UserEntity = {
    id: number
    displayName: string
}

export interface IUserEntity extends IEntity, UserEntity { }
export interface IUserIndex extends IGetById {
    [key: number]: IUserEntity;
}
const user1: IUserEntity = {
    id: 1,
    displayName: "Bobby DT",
};
const user2: IUserEntity = {
    id: 2,
    displayName: "Chatty McChatterson",
};
const user3: IUserEntity = {
    id: 3,
    displayName: "Dont Talk",
};

export const userData: IUserEntity[] = [user1, user2, user3];
export const userDataById: IUserIndex = {
    [user1.id]: user1,
    [user2.id]: user2,
    [user3.id]: user3,
};
