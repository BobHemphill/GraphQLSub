import { threadData } from "../thread/thread.data";
import { userData } from "../user/user.data";

const message1 = {
    id: 1,
    text: "First chat bro",
    owner: userData[0].id,
    thread: threadData[0].id,
};
const message2 = {
    id: 2,
    text: "Right back at you",
    owner: userData[1].id,
    thread: threadData[0].id,
};
const message3 = {
    id: 3,
    text: "You there?",
    owner: userData[1].id,
    thread: threadData[0].id,
};
export const messageData = [message1, message2, message3];
export const messageById = {
    [message1.id]: message1,
    [message2.id]: message2,
    [message3.id]: message3,
};
export const messageDataByThreadId = {
    [threadData[0].id]: [message1, message2, message3],
};
