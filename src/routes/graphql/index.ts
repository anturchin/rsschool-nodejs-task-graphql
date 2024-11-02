import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { execute, parse, validate } from 'graphql';
import { gqlSchema as schema } from "./graphql.schema.js";
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler({ body: { query, variables } }) {
      const parsedQuery = parse(query);

      const validationErrors = validate(schema, parsedQuery, [ depthLimit(5) ]);
      if (validationErrors.length > 0) {
        return { errors: validationErrors };
      }

      return (await execute({
        schema,
        document: parsedQuery,
        variableValues: variables,
        contextValue: prisma,
      }));
    },
  });
};

export default plugin;
