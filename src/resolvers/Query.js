import { StudentRepository, SubjectRepository, CourseRepository } from '@repositories'
import { pool } from '@db'

const studentRepository = new StudentRepository(pool)
const subjectRepository = new SubjectRepository(pool)
const courseRepository = new CourseRepository(pool)

export default {
  students: async () => {
    const students = await studentRepository.getAll()
    return students.map(async (student) => {
      return {
        ...student,
        subjects: await subjectRepository.getSubjects(student.matriculation)
      }
    })
  },
  student: async (_, { matriculation }) => {
    const student = await studentRepository.get(matriculation)
    const subjects = await studentRepository.getSubjects(matriculation)

    return {
      ...student,
      subjects
    }
  },
  subjects: async (_, { matriculation }) => {
    return await subjectRepository.getSubjects(matriculation)
  },

  courses: async () => {
    return await courseRepository.getCourses()
  }
}
