import { TeacherRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)

export default {
  teachers: async ({ id: courseId }) => {
    const teachers = await teacherRepository.getTeachersByCourse(courseId)

    return teachers.map(teacher => ({ ...teacher, courseId }))
  }
}
