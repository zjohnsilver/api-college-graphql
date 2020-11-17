import { gql } from 'apollo-server'

export default gql`
  type Mutation {
    create_student(student: createStudentInput): Student
  }
`
