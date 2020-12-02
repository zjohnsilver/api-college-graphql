import { SubjectRepository } from '@repositories'
import { pool } from '@db'

const subjectRepository = new SubjectRepository(pool)

export default {
  subjects: async ({ courseId, matriculation: teacherMatriculation }) => {
    return subjectRepository.getSubjectsByCourseAndTeacher(courseId, teacherMatriculation)
  }
}
