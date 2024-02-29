import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';

const getYearSubjectCourse = async (yearSubjectId: String, courseId: String) => {
  return await YearSubjectCourse.getYearSubjectCoursesDos(yearSubjectId, courseId);
};

export default getYearSubjectCourse;
