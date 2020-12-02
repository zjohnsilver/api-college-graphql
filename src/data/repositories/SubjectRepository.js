import {
  getMultiple
} from '@services'

export class SubjectRepository {
  constructor (pool) {
    this.pool = pool
  }

  async getSubjects (matriculation) {
    if (matriculation) {
      return await getMultiple(this.pool, queryGetStudentSubjects, [matriculation])
    } else {
      return await getMultiple(this.pool, queryGetSubjects)
    }
  }

  async addSubjects (subjects) {
    const queryAddSubjects = `
      INSERT INTO manage.subject
        (name, tag, optional)
      VALUES
        ${subjects.map(({ name, tag, optional }) => {
            return `(${name}, ${tag}, ${optional})`
          }).join(', ')
        }
      RETURNING *
    `

    return await getMultiple(this.pool, queryAddSubjects)
  }

  async getSubjectsByCourse (courseId) {
    return await getMultiple(this.pool, queryGetSubjectsByCourse, [courseId])
  }

  async getSubjectsByCourseAndTeacher (courseId, teacherMatriculation) {
    return await getMultiple(this.pool, queryGetSubjectsByCourseAndTeacher, [courseId, teacherMatriculation])
  }
}

const queryGetStudentSubjects = `
  SELECT 
    subject.id, 
    subject.name 
  FROM manage."class"
  LEFT JOIN manage.subject ON "class".subject_id = subject.id 
  LEFT JOIN manage.student ON "student".id = "class".student_id
  WHERE COALESCE(student.matriculation = $1, TRUE)
`

const queryGetSubjects = `
  SELECT 
    id, 
    name 
  FROM manage.subject
`
const queryGetSubjectsByCourse = `
  SELECT 
    "subject".id,
    "subject".name,
    "course_subject".semester
  FROM manage.course_subject
  LEFT JOIN manage."subject" ON "subject".id = course_subject.subject_id
  WHERE course_id = $1
`

const queryGetSubjectsByCourseAndTeacher = `
  SELECT 
    "subject".id,
    "subject".name,
    "course_subject".semester
  FROM manage."teacher_subject"
  LEFT JOIN manage."teacher" ON "teacher".matriculation = "teacher_subject".teacher_matriculation
  LEFT JOIN manage."subject" ON "subject".id = "teacher_subject".subject_id
  LEFT JOIN manage."course_subject" ON "course_subject".subject_id = "subject".id
  WHERE course_subject.course_id = $1
    AND "teacher".matriculation = $2
`
