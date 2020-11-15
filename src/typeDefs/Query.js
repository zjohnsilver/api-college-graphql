import { gql } from 'apollo-server'

export default gql`
  type Query {
    students: [Student],
    student(matriculation: String): Student
  }
`
