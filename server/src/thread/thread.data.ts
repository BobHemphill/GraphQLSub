import { userData } from "../user/user.data";

const thread1 = {
    id: 1,
    displayName: "Chat with Chatty McChatterson",
};

export const threadData = [thread1];
export const threadDataById = {
    [thread1.id]: thread1,
};
export const threadDataByUserId = {
    [userData[0].id]: [thread1],
    [userData[1].id]: [thread1],
};
