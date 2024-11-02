import {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLList, GraphQLInputObjectType,
} from "graphql";
import { Profile } from "./profile.schema.js";
import { Post } from "./post.schema.js";
import { UUIDType } from "./types/uuid.js";
import { PrismaClient } from '@prisma/client';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: {
            type: Profile,
            resolve: async ({ id }: { id: string }, _, { profile }: PrismaClient ) => {
                return (await profile.findUnique({
                    where: { userId: id },
                }));
            },
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
            resolve: async ( { id }: { id: string }, _, { post }: PrismaClient ) => {
                return (await post.findMany({
                    where: { authorId: id },
                }));
            },
        },
        userSubscribedTo: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
            resolve: async ( { id }: { id: string }, _, { user }: PrismaClient ) => {
                return (await user.findMany({
                    where: {
                        subscribedToUser: {
                            some: {
                                subscriberId: id,
                            }
                        }
                    }
                }));
            },
        },
        subscribedToUser: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
            resolve: async ( { id }: { id: string }, _, { user }: PrismaClient ) => {
                return  (await user.findMany({
                    where: {
                        userSubscribedTo: {
                            some: {
                                authorId: id,
                            },
                        },
                    },
                }));
            },
        },
    }),
}) as GraphQLObjectType;


export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    },
});

export const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    }
})