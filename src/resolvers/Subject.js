import { TeacherRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)

export default {
  teachers: async ({ id: subjectID }) => {
    return await teacherRepository.getTeachers(subjectID)
  }
}
