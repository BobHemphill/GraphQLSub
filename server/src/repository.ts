export interface IEntity {
    id: number;
    __type: string;
}

export interface IGetById {
    [key: number]: IEntity;
}
