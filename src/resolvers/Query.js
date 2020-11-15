import { StudentRepository } from '@repositories'
import { pool } from '@db'

const studentRepository = new StudentRepository(pool)

export default {
  students: async () => {
    return await studentRepository.getAll()
  },
  student: async (parent, { matriculation }) => {
    const student = await studentRepository.get(matriculation)
    const subjects = await studentRepository.getSubjects(matriculation)

    return {
      ...student,
      subjects
    }
  }
}
