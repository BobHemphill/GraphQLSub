import { NextFunction, Request, Response } from "express";
import { fromGlobalId } from "graphql-relay";
import { userDataById } from "../user/user.data";

export default function xUserMiddleWare(req: Request, res: Response, next: NextFunction) {
    const xUser: string | string[] = req.headers["x-user-id"];
    if (xUser && !Array.isArray(xUser)) {
        res.locals.user = userDataById[fromGlobalId(xUser).id];
    }
    next();
}
