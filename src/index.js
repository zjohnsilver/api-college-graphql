import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';

import resolvers from './resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadedSchema = loadSchemaSync(join(__dirname, './typeDefs/**/*.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer({
  typeDefs: loadedSchema,
  resolvers,
  context: ({ req }) => {
    return {
      // user: getUser(req.headers.authorization)
    };
  },
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      locations: error.locations,
      path: error.path,
    };
  },
  debug: process.env.NODE_ENV === 'development',
});

const port = process.env.PORT || 4000;

server.listen(port).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});