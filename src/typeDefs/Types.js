const { gql } = require('apollo-server')

export default gql`
  scalar Date
  type Book {
    title: String
    author: String
  }

  type Course {
    id: Int,
    name: String
    tag: String
    teachers: [Teacher]
    subjects: [Subject]
  }

  type Student {
    id: Int,
    matriculation: String,
    name: String,
    email: String,
    birth_day: Date,
    started_in: Date,
    subjects: [Subject]
  }

  type Subject {
    id: Int
    name: String
    semester: String
    teachers: [Teacher]
  }

  type Teacher {
    matriculation: String,
    name: String,
    email: String,
    birth_day: Date
    subjects: [Subject]
  }
`
