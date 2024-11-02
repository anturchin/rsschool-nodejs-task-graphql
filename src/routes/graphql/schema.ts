import { GraphQLSchema } from "graphql/type/index.js";
import { RootQueryType } from "./query.js";

export const gqlSchema = new GraphQLSchema({
    query: RootQueryType,
})