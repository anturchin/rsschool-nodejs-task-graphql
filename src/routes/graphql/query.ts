import { GraphQLList, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeId } from "./member-type.schema.js";
import { PrismaClient } from '@prisma/client';
import { User } from "./user.schema.js";
import { GraphQLNonNull } from "graphql/index.js";
import { Post } from "./post.schema.js";
import { UUIDType } from "./types/uuid.js";
import { Profile } from "./profile.schema.js";



export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
            resolve: async(_: unknown, args: unknown, { memberType }:  PrismaClient )=> {
                return  (await memberType.findMany());
            }
        },
        memberType: {
            type: MemberType,
            args: {
                id: {
                    type: new GraphQLNonNull(MemberTypeId),
                },
            },
            resolve: async(_: unknown, { id }: { id: string }, { memberType }:  PrismaClient )=> {
                return  (await memberType.findUnique({ where: { id }}));
            }
        },
        users: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
            resolve: async(_: unknown, args: unknown, { user }: PrismaClient )=> {
                return (await user.findMany());
            }
        },
        user: {
            type: User,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async(_: unknown, { id }: { id: string }, { user }: PrismaClient )=> {
                return (await user.findUnique({where: { id }}));
            }
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
            resolve: async(_: unknown, args: unknown, { post }: PrismaClient )=> {
                return (await post.findMany());
            }
        },
        post: {
            type: Post,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async(_: unknown, { id }: { id: string }, { post }: PrismaClient )=> {
                return (await post.findUnique({ where: { id } }));
            }
        },
        profiles: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
            resolve: async(_: unknown, args: unknown, { profile }: PrismaClient ) => {
                return (await profile.findMany());
            }
        },
        profile: {
            type: Profile,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async(_: unknown, { id }: { id: string }, { profile }: PrismaClient )=> {
                return (await profile.findUnique({ where: { id } }));
            }
        }
    }
})
