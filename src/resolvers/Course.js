import { TeacherRepository, SubjectRepository } from '@repositories'
import { pool } from '@db'

const teacherRepository = new TeacherRepository(pool)
const subjectRepository = new SubjectRepository(pool)

export default {
  teachers: async ({ id: courseId }) => {
    const teachers = await teacherRepository.getTeachersByCourse(courseId)

    return teachers.map(teacher => ({ ...teacher, courseId }))
  },

  subjects: async ({ id: courseId }) => {
    return await subjectRepository.getSubjectsByCourse(courseId)
  }
}
