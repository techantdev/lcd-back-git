import { TeacherSubjectCourse } from '../../models/TeacherSubjectCourseModel';

const deleteTeacherSubjectCourse = async (teacherSubjectCourseIds: String) => {
  const idsArray = teacherSubjectCourseIds.split(',');
  return await TeacherSubjectCourse.deleteMany(idsArray);
};

export default deleteTeacherSubjectCourse;
