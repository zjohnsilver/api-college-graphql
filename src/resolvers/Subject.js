import { TeacherRepository, StudentRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)
const studentRepository = new StudentRepository(pool)

export default {
  teachers: async ({ id: subjectID }) => {
    return await teacherRepository.getTeachers(subjectID)
  },

  students: async ({ id: subjectID, teacherMatriculation }) => {
    return await studentRepository.getStudentsBySubjectAndTeacher(subjectID, teacherMatriculation)
  }
}
