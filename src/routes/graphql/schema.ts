import { GraphQLSchema } from "graphql/type/index.js";
import { Query } from "./query.js";

export const gqlSchema = new GraphQLSchema({
    query: Query,
})