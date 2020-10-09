import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

const myPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log (requestContext.request.query.name)

    return {

      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      validationDidStart(requestContext) {
        console.log('Validation started!');
      }

    }
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  plugins:[
    myPlugin
  ] 
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});