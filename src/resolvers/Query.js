import { StudentRepository } from '@repositories'
import { pool } from '@db'

const studentRepository = new StudentRepository(pool)

export default {
  students: async () => {
    return await studentRepository.getAll()
  }
}
