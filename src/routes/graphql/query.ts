import {GraphQLList, GraphQLObjectType} from "graphql";
import {MemberType} from "./member-type.shema.js";
import { PrismaClient } from '@prisma/client';

export const Query = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: async(_: unknown, args: unknown, { memberType }:  PrismaClient )=> {
                return  (await memberType.findMany());
            }
        },
        memberType: {
            type: new GraphQLList(MemberType),
            resolve: async(_: unknown, { id }: { id: string }, { memberType }:  PrismaClient )=> {
                return  (await memberType.findUnique({ where: {
                    id,
                    } }));
            }
        }
    }
})