import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLInt, GraphQLInputObjectType,
} from "graphql";
import {MemberType, MemberTypeId} from "./member-type.schema.js";
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

export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(UUIDType) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    }
})

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeId },
    }
})
