import {
  getOne, getMultiple
} from '@services'

export class StudentRepository {
  constructor (pool) {
    this.pool = pool
  }

  async get (matriculation) {
    return getOne(this.pool, queryGetStudentByID, [matriculation])
  }

  async getAll () {
    return getMultiple(this.pool, queryGetAllStudents)
  }

  async getSubjects (matriculation) {
    return getMultiple(this.pool, queryGetStudentSubjects, [matriculation])
  }

  async getHistoricData (matriculation) {
    return getMultiple(this.pool, queryGetHistoricData, [matriculation])
  }

  async createStudent (params) {
    const { matriculation, name, email, birth_day, started_in } = params
    return getOne(this.pool, queryCreateStudent, [matriculation, name, email, birth_day, started_in])
  }

  async updateStudent (matriculation, params) {
    const paramsKeys = Object.keys(params)

    const queryUpdateStudent = `
      UPDATE manage."student"
        SET ${paramsKeys.filter(param => params[param]).map(param => `${param} = '${params[param]}'`).join(',\n')}
      WHERE matriculation = '${matriculation}'
      RETURNING *
    `

    return getOne(this.pool, queryUpdateStudent)
  }

  async deleteStudent (matriculation) {
    return getOne(this.pool, queryDeleteStudent, [matriculation])
  }

  async getStudentsBySubjectAndTeacher (subjectId, teacherMatriculation) {
    return getMultiple(this.pool, queryGetStudentsBySubjectAndTeacher, [subjectId, teacherMatriculation])
  }
}

const queryGetStudentByID = `
  SELECT 
    id, 
    matriculation,
    name,
    email,
    birth_day,
    started_in 
  FROM manage.student WHERE matriculation=$1
`

const queryGetAllStudents = `
  SELECT 
    id, 
    matriculation,
    name,
    email,
    birth_day,
    started_in 
  FROM manage.student
`

const queryGetStudentSubjects = `
  SELECT 
    subject.id, 
    subject.name 
  FROM manage."class"
  LEFT JOIN manage.subject ON "class".subject_id = subject.id 
  LEFT JOIN manage.student ON "student".id = "class".student_id
  WHERE student.matriculation = $1
`

const queryGetHistoricData = `
  SELECT 
    "subject".name AS name,
    "teacher".name AS teacher_name,
    "historic".note,
    "historic".approved,
    "historic".frequency,
    "historic".start_time,
    "historic".end_time
  FROM manage."historic"
  LEFT JOIN manage."subject" ON "subject".id = "historic".subject_id
  LEFT JOIN manage."teacher" ON "teacher".id = "historic".teacher_id
  LEFT JOIN manage."student" ON "student".id = "historic".student_id
  WHERE "student".matriculation = $1
`

const queryCreateStudent = `
  INSERT INTO manage."student"
    (matriculation, name, email, birth_day, started_in)
  VALUES
    ($1, $2, $3, $4, $5)
  RETURNING *
`
const queryDeleteStudent = `
  DELETE FROM manage."student"
  WHERE matriculation = $1
  RETURNING *
`

const queryGetStudentsBySubjectAndTeacher = `
  SELECT
    "student".matriculation,
    "student".name,
    "student".email,
    "student".birth_day
  FROM manage."class"
  LEFT JOIN manage."student" ON "student".id = "class".student_id
  LEFT JOIN manage."teacher_subject" ON "teacher_subject".teacher_matriculation = "class".teacher_matriculation
  WHERE "teacher_subject".subject_id = $1
    AND "teacher_subject".teacher_matriculation = $2
`
