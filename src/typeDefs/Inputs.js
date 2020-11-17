import { gql } from 'apollo-server-express'

export default gql`
  input createStudentInput {
    matriculation: String,
    name: String,
    email: String,
    birth_day: Date,
    started_in: Date,
    subjects: [subjectInput]
  }

  input subjectInput {
    name: String
  }
`
