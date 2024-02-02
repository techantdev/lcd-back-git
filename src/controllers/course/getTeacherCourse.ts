import { Course } from '../../models/CourseModel';

const getTeacherCourse = async (teacherId: String) => {
  // TODO: Arquitecturar bien la relación entre profesor los cursos con los que se relaciona en términos de las materias que les dicta.
  return await Course.getTeacherCourses(teacherId);
};

export default getTeacherCourse;
