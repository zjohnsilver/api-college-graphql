import { StudentRepository, SubjectRepository } from '@repositories'

// import { pool } from '../db/index.js';

// const studentRepository = new StudentRepository(pool);
// const subjectRepository = new SubjectRepository(pool);

export const studentQueries = {
  students: async () => {
    // const students = await studentRepository.getAll();
    // return students.map(async (student) => ({
    //   ...student,
    //   subjects: await subjectRepository.getSubjects(student.matriculation)
    // }));
    return "Hello"
  },
  
  student: async (_, { matriculation }) => {
    // const student = await studentRepository.get(matriculation);
    // const subjects = await studentRepository.getSubjects(matriculation);
    // return {
    //   ...student,
    //   subjects
    // };

    return {}
  },
  
  studentsByCourse: async (_, { courseId }) => {
    return await studentRepository.getByCourse(courseId);
  }
};
