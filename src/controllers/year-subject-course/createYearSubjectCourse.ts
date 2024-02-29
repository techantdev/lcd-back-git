import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';

const createYearSubjectCourse = async (teacherId: string, academicYearId: string, yearSubjectId: string, courseId: string) => {
  let recordExistsInTheDatabase = false;

  let yearSubjectCourse = null;

  const fetchedYearSubjectCourseDos = await YearSubjectCourse.getYearSubjectCoursesDos(yearSubjectId, courseId);

  if (fetchedYearSubjectCourseDos.length > 0) {
    recordExistsInTheDatabase = true;
    yearSubjectCourse = await YearSubjectCourse.updateOne(fetchedYearSubjectCourseDos[0].yearSubjectCourseId, { teacherId });
  } else {
    yearSubjectCourse = await YearSubjectCourse.insertOne({ teacherId, academicYearId, yearSubjectId, courseId });
  }
  return { recordExistsInTheDatabase, yearSubjectCourse };
};

export default createYearSubjectCourse;
