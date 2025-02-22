export const Student = {
  subjects: async (parent) => {
    return await subjectRepository.getSubjects(parent.matriculation);
  },
  
  course: async (parent) => {
    return await courseRepository.getCourseByStudent(parent.matriculation);
  }
};