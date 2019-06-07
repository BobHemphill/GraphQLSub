import { NextFunction, Request, Response } from "express";
import * as graphqlHTTP from "express-graphql";
import { IAppDeps } from "../appDeps";
import { IUserEntity } from "../user/user.data";
import schema from "./graphql.schema";

export interface IGraphQLContext {
    user: IUserEntity;
    deps: IAppDeps;
}

const middlewareFactory = (deps: IAppDeps) => {
    return (req: Request, res: Response, next: NextFunction) => {
        graphqlHTTP({
            schema,
            graphiql: true,
            context: { user: res.locals.user, deps },
        })(req, res);
    };
};
export default middlewareFactory;
