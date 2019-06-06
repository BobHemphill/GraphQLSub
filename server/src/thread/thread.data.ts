import { userData } from "../user/user.data";
import { IEntity, IGetById } from "../repository";

export type ThreadEntity = {
    id: number
    displayName: string
};
export interface IThreadEntity extends IEntity, ThreadEntity {}
export interface IThreadIndex extends IGetById {
    [key: number]: IThreadEntity;
}
export interface IThreadMultiIndex {
    [key: number]: IThreadEntity[];
}

const thread1: IThreadEntity = {
    id: 1,
    displayName: "Chat with Chatty McChatterson",
};

export const threadData: IThreadEntity[] = [thread1];
export const threadDataById: IThreadIndex = {
    [thread1.id]: thread1,
};
export const threadDataByUserId: IThreadMultiIndex = {
    [userData[0].id]: [thread1],
    [userData[1].id]: [thread1],
};
