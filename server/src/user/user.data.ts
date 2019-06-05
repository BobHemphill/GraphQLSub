const user1 = {
    id: 1,
    displayName: "Bobby DT",
};
const user2 = {
    id: 2,
    displayName: "Chatty McChatterson",
};
const user3 = {
    id: 3,
    displayName: "Dont Talk",
};

export const userData = [user1, user2, user3];
export const userDataById = {
    [user1.id]: user1,
    [user2.id]: user2,
    [user3.id]: user3,
};
