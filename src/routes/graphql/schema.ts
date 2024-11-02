import { GraphQLSchema } from "graphql/type/index.js";
import { RootQueryType } from "./query.js";
import {Mutations} from "./mutation.js";

export const gqlSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutations,
})