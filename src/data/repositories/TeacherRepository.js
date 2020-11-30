import {
  getMultiple, getOne
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

  async getTeacher (teacherID) {
    return await getOne(this.pool, queryGetTeacher, [teacherID])
  }

  async getTeachersByCourse (courseID) {
    return getMultiple(this.pool, queryGetTeachersByCourse, [courseID])
  }

  async getTeacherSubjects (courseID, teacherMatriculation) {
    return getMultiple(this.pool, queryGetTeacherSubjectsByCourse, [courseID, teacherMatriculation])
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

const queryGetTeacher = `
  SELECT
    matriculation,
    name,
    email,
    birth_day
  FROM manage."teacher"
  WHERE "teacher".matriculation = $1
`

const queryGetTeachersByCourse = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage.course_teacher
  LEFT JOIN manage."teacher" ON "teacher".id = course_teacher.teacher_id
  WHERE "course_teacher".course_id = $1
  ORDER BY "teacher".matriculation
`

const queryGetTeacherSubjectsByCourse = `
  SELECT 
    "subject".id,
      "subject".name,
      "course_subject".semester
  FROM manage."teacher_subject"
  LEFT JOIN manage."teacher" ON "teacher".id = "teacher_subject".teacher_id
  LEFT JOIN manage."subject" ON "subject".id = "teacher_subject".subject_id
  LEFT JOIN manage."course_subject" ON "course_subject".subject_id = "subject".id
    WHERE course_subject.course_id = $1
      AND "teacher".matriculation = $2
`
