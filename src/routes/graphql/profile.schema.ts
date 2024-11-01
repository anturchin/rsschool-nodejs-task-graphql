import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLInt,
} from "graphql";
import { MemberType } from "./member-type.schema.js";
import { UUIDType } from "./types/uuid.js";
import { PrismaClient } from "@prisma/client";

export const Profile = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberType: {
            type: new GraphQLNonNull(MemberType),
            resolve: async ({ memberTypeId }: { memberTypeId: string }, args: unknown, { memberType }: PrismaClient) => {
                return (await memberType.findUnique({
                    where: {
                        id: memberTypeId,
                    },
                }));
            },
        },
    }),
});
