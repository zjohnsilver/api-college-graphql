import { SubjectRepository } from '@repositories'
import { pool } from '@db'

const subjectRepository = new SubjectRepository(pool)

export default {
  subjects: async ({ courseId, matriculation: teacherMatriculation }) => {
    const subjects = await subjectRepository.getSubjectsByCourseAndTeacher(courseId, teacherMatriculation)

    return subjects.map(subject => ({
      ...subject,
      teacherMatriculation
    }))
  }
}
