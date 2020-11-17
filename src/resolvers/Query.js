import { StudentRepository } from '@repositories'
import { pool } from '@db'

const studentRepository = new StudentRepository(pool)

export default {
  students: async () => {
    const students = await studentRepository.getAll()
    return students.map(async (student) => {
      return {
        ...student,
        subjects: await studentRepository.getSubjects(student.matriculation)
      }
    })
  },
  student: async (parent, { matriculation }) => {
    const student = await studentRepository.get(matriculation)
    const subjects = await studentRepository.getSubjects(matriculation)

    return {
      ...student,
      subjects
    }
  },
  subjects: async (parent, { matriculation }) => {
    return await studentRepository.getSubjects(matriculation)
  }
}
