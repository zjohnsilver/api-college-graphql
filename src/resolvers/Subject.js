import { TeacherRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)

export default {
  teacher: async ({ id: subjectID }) => {
    return await teacherRepository.getTeachers(subjectID)
  }
}
