import { Request, Response } from "express";
import * as graphqlHTTP from "express-graphql";
import schema from "./graphql.schema";
import { UserEntity } from "../user/user.data";

export interface IGraphQLContext {
    user: UserEntity;
}

export default function middleware(req: Request, res: Response) {
    graphqlHTTP({
        schema,
        graphiql: true,
        context: { user: res.locals.user },
    })(req, res);
}
