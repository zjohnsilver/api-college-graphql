import {
  getOne, getMultiple
} from '@services'

export class CourseRepository {
  constructor (pool) {
    this.pool = pool
  }

  async addStudentToCourse (studentID, courseID) {
    return getOne(this.pool, queryAddStudentToCourse, [studentID, courseID])
  }

  async getCourseSubjects (courseID) {
    return getMultiple(this.pool, queryGetCourseSubjects, [courseID])
  }

  async getCourseTeacher (courseID, matriculation) {
    return getOne(this.pool, queryGetCourseTeacher, [courseID, matriculation])
  }

  async getStudentsOfCourseTeacher (courseID, teacherMatriculation) {
    return getMultiple(this.pool, queryGetStudentsOfCourseTeacher, [courseID, teacherMatriculation])
  }

  async getCourseSubject (courseID, subjectID) {
    return getOne(this.pool, queryGetCourseSubject, [courseID, subjectID])
  }

  async getCourses () {
    return getMultiple(this.pool, queryGetCourses)
  }
}

const queryAddStudentToCourse = `
  INSERT INTO manage."student_course"
    (student_id, course_id)
  VALUES
    ($1, $2)
  RETURNING *
`
const queryGetCourseSubjects = `
  SELECT 
    "subject".id,
    "subject".name,
    "course_subject".semester
  FROM manage.course_subject
  LEFT JOIN manage."subject" ON "subject".id = course_subject.subject_id
  WHERE course_id = $1
`

const queryGetCourseTeacher = `
  SELECT
    "teacher".matriculation,
    "teacher".name,
    "teacher".email,
    "teacher".birth_day
  FROM manage.course_teacher
  LEFT JOIN manage."teacher" ON "teacher".id = course_teacher.teacher_id
  WHERE "course_teacher".course_id = $1
    AND "teacher".matriculation = $2
`

const queryGetStudentsOfCourseTeacher = `
  SELECT
    "student".matriculation,
    "student".name,
    "student".email,
    "student".birth_day
  FROM manage."class"
  LEFT JOIN manage."student_course" ON "student_course".student_id = "class".student_id
  LEFT JOIN manage."student" ON "student".id = "class".student_id
  LEFT JOIN manage."teacher" ON "teacher".id = "class".teacher_id
  WHERE "student_course".course_id = $1
    AND "teacher".matriculation = $2
`
const queryGetCourseSubject = `
  SELECT 
    "subject".id,
    "subject".name,
    "course_subject".semester
  FROM manage.course_subject
  LEFT JOIN manage."subject" ON "subject".id = course_subject.subject_id
    WHERE course_id = $1
      and course_subject.subject_id = $2
`

const queryGetCourses = `
  SELECT  
    id,
    name,
    tag
  FROM manage."course"
  ORDER BY id
`
