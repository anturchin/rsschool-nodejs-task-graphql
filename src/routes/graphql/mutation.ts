import {GraphQLObjectType, GraphQLString} from "graphql";
import { GraphQLNonNull } from "graphql/index.js";
import { ChangeUserInput, CreateUserInput, User } from "./user.schema.js";
import {
    PrismaClient,
    User as UserPrisma,
    Profile as ProfilePrisma,
    Post as PostPrisma,
} from "@prisma/client";
import { ChangeProfileInput, CreateProfileInput, Profile } from "./profile.schema.js";
import { ChangePostInput, CreatePostInput, Post } from "./post.schema.js";
import { UUIDType } from "./types/uuid.js";

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (
        _: unknown,
        { dto }: { dto: Omit<UserPrisma, 'id'> },
        { user }: PrismaClient,
      ) => {
        return (await user.create({ data: { ...dto } }));
      },
    },
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
          dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (
        _: unknown,
        { dto }: { dto: Omit<ProfilePrisma, 'id'> },
        { profile }: PrismaClient,)=> {
         return (await profile.create({ data: { ...dto } }));
        }
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
         dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (
        _: unknown,
        { dto }: { dto: Omit<PostPrisma, 'id'> },
        { post }: PrismaClient  ) => {
         return (await post.create({ data: { ...dto } }))
      }
    },
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async(
        _: unknown,
        { id, dto }: { id: string, dto: Omit<PostPrisma, 'id'> },
        { post }: PrismaClient) => {
         return (await post.update({ where: { id }, data: { ...dto } }));
        }
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _: unknown,
        { id, dto }: { id: string, dto: Omit<ProfilePrisma, 'id'> },
        { profile }: PrismaClient ) => {
         return (await profile.update({ where: { id }, data: { ...dto } }));
      }
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _: unknown,
        { id, dto }: { id: string, dto: Omit<UserPrisma, 'id'> },
        { user }: PrismaClient ) => {
         return (await user.update({ where: { id }, data: { ...dto } }));
      }
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(
        _: unknown,
        { id }: { id: string },
        { user }: PrismaClient,
      )=> {
         await user.delete({ where: { id } });
         return `Deleted user with id: ${id}`
      }
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(
        _: unknown,
        { id }: { id: string },
        { post }: PrismaClient
      ) => {
         await post.delete({ where: { id } });
         return `Deleted post with id: ${id}`
      }
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(
        _: unknown,
        { id }: { id: string },
        { profile }: PrismaClient,
      ) => {
         await profile.delete({ where: { id } });
         return `Deleted profile with id: ${id}`
      }
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async(
        _: unknown,
        { userId, authorId }: { userId: string, authorId: string },
        { subscribersOnAuthors }: PrismaClient,
      ) => {
         await subscribersOnAuthors
             .create({
                 data: { subscriberId: userId, authorId }
             });
         return `User ${userId} subscribed to author ${authorId}`;
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
        },
      resolve: async(
        _: unknown,
        { userId, authorId }: { userId: string, authorId: string },
        { subscribersOnAuthors }: PrismaClient,
      ) => {
          await subscribersOnAuthors
              .delete({
                  where: {
                      subscriberId_authorId: {
                          subscriberId: userId,
                          authorId
                      }
                  }
              });
          return `User ${userId} unsubscribed from author ${authorId}`;
      }
    }
  },
});
