import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  formatError: (err) => {
    console.log('GRAPHQL_ERROR: ', { message: err.message, locations: err.locations, path: err.path, extensions: { code: err.extensions.code }, stacktrace: err.extensions.exception.stacktrace })

    return { message: err.message, locations: err.locations, path: err.path, extensions: { code: err.extensions.code } }
  },
  context: ({req}) => {
    const afterSplit = req.body.query.split(' ')

    if (!afterSplit.includes('query')){
      console.log ("##  REQUEST  ##\nquery: ", req.body.query)
    }

  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});