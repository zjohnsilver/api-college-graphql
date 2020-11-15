const { gql } = require('apollo-server')

export default gql`
  scalar Date
  type Book {
    title: String
    author: String
  }

  type Student {
    id: Int,
    matriculation: String,
    name: String,
    email: String,
    birth_day: Date,
    started_in: Date
  }
`
