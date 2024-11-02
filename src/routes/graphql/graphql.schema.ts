import { GraphQLSchema } from "graphql/type/index.js";
import { RootQueryType } from "./query.schema.js";
import {Mutations} from "./mutation.schema.js";

export const gqlSchema = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutations,
})