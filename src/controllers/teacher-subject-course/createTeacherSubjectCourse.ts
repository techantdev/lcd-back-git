import { TeacherSubjectCourse } from '../../models/TeacherSubjectCourseModel';

const createTeacherSubjectCourse = async (teacherId: string, academicYearId: string, yearSubjectId: string, courseId: string) => {
  return await TeacherSubjectCourse.insertOne({ teacherId, academicYearId, yearSubjectId, courseId });
};

export default createTeacherSubjectCourse;
