import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';

const getYearSubjectCourse = async (yearSubjectId: String, courseId: String, yearGradeId: string) => {
  return await YearSubjectCourse.getYearSubjectCoursesByUniqueIds(yearSubjectId, courseId, yearGradeId);
};

export default getYearSubjectCourse;
