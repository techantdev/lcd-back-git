import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';

const deleteYearSubjectCourse = async (yearSubjectCourseIds: String) => {
  const idsArray = yearSubjectCourseIds.split(',');
  return await YearSubjectCourse.deleteMany(idsArray);
};

export default deleteYearSubjectCourse;
