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
