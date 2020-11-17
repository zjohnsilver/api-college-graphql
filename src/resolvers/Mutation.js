import { StudentRepository } from '@repositories'
import { pool } from '@db'

const studentRepository = new StudentRepository(pool)

export default {
  create_student: async (_, { student = {} }) => {
    return await studentRepository.createStudent(student)
  }
}
