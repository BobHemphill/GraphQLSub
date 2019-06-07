import { IEntity, IGetById } from "../repository";
import { userData } from "../user/user.data";

export interface IThreadEntity extends IEntity {
    id: number;
    displayName: string;
}
export interface IThreadIndex extends IGetById {
    [key: number]: IThreadEntity;
}
export interface IThreadMultiIndex {
    [key: number]: IThreadEntity[];
}

const thread1: IThreadEntity = {
    id: 1,
    displayName: "Chat with Chatty McChatterson",
    __type: "Thread",
};
const thread2: IThreadEntity = {
    id: 2,
    displayName: "Group Chatty",
    __type: "Thread",
};
export const threadData: IThreadEntity[] = [thread1, thread2];
export const threadDataById: IThreadIndex = {
    [thread1.id]: thread1,
    [thread2.id]: thread2,
};
export const threadDataByUserId: IThreadMultiIndex = {
    [userData[0].id]: [thread1, thread2],
    [userData[1].id]: [thread1, thread2],
    [userData[3].id]: [thread2],
};
