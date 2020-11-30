import { TeacherRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)

export default {
  subjects: async ({ courseId, matriculation }) => {
    return teacherRepository.getTeacherSubjects(courseId, matriculation)
  }
}
