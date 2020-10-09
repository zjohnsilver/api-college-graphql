const { gql } = require('apollo-server')

export default gql`
  type Book {
    title: String
    author: String
  }
`
