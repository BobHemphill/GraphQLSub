import { Request, Response, NextFunction } from "express";
import { userDataById } from "../user/user.data";
import { fromGlobalId } from "graphql-relay";

export default function xUserMiddleWare (req: Request, res: Response, next: NextFunction) {
    const xUser: string | string[] = req.headers['x-user-key'];
    if (xUser && !Array.isArray(xUser)) {
        res.locals.user = userDataById[fromGlobalId(xUser).id];
    }
    next();
}