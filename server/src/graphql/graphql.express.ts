import * as graphqlHTTP from "express-graphql";
import schema from "./graphql.schema";

export default graphqlHTTP({
    schema,
    graphiql: true,
})