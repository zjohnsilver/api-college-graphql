import {
  getMultiple
} from '@services'

export class TeacherRepository {
  constructor (pool) {
    this.pool = pool
  }

  async getTeachers (subjectID) {
    if (subjectID) {
      return await getMultiple(this.pool, queryGetTeachersBySubjects, [subjectID])
    } else {
      return await getMultiple(this.pool, queryGetTeachers)
    }
  }
}

const queryGetTeachersBySubjects = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage."class"
  LEFT JOIN manage."teacher" ON "teacher".id = "class".teacher_id
  WHERE "class".subject_id = $1
`

const queryGetTeachers = `
  SELECT
    matriculation,
    name,
    email,
    birth_day
  FROM manage."teacher"
`
