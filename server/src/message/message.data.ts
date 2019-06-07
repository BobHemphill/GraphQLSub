import { IEntity, IGetById } from "../repository";
import { threadData } from "../thread/thread.data";
import { userData } from "../user/user.data";

export interface IMessageEntity extends IEntity {
    id: number;
    text: string;
    owner: number;
    thread: number;
}
export interface IMessageIndex extends IGetById {
    [key: number]: IMessageEntity;
}
export interface IMessageMultiIndex {
    [key: number]: IMessageEntity[];
}

const message1: IMessageEntity = {
    id: 1,
    text: "First chat bro",
    owner: userData[0].id,
    thread: threadData[0].id,
    __type: "Message",
};
const message2: IMessageEntity = {
    id: 2,
    text: "Right back at you",
    owner: userData[1].id,
    thread: threadData[0].id,
    __type: "Message",
};
const message3: IMessageEntity = {
    id: 3,
    text: "You there?",
    owner: userData[1].id,
    thread: threadData[0].id,
    __type: "Message",
};
const message4: IMessageEntity = {
    id: 4,
    text: "Group message?",
    owner: userData[0].id,
    thread: threadData[1].id,
    __type: "Message",
};
const message5: IMessageEntity = {
    id: 5,
    text: "We all got it?",
    owner: userData[1].id,
    thread: threadData[1].id,
    __type: "Message",
};
export const messageData: IMessageEntity[] = [message1, message2, message3, message4, message5];
export const messageById: IMessageIndex = {
    [message1.id]: message1,
    [message2.id]: message2,
    [message3.id]: message3,
    [message4.id]: message4,
    [message5.id]: message5,
};
export const messageDataByThreadId: IMessageMultiIndex = {
    [threadData[0].id]: [message1, message2, message3],
    [threadData[1].id]: [message4, message5],
};
