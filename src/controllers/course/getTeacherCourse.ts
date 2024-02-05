import { Course } from '../../models/CourseModel';

const getTeacherCourse = async (teacherId: String) => {
  return await Course.getTeacherCourses(teacherId);
};

export default getTeacherCourse;
