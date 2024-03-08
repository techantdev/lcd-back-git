import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';
import { Tracker } from '../../models/TrackerModel';
import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';

const createYearSubjectCourse = async (
  teacherId: string,
  academicYearId: string,
  yearSubjectId: string,
  courseId: string,
  yearGradeId: string
) => {
  let recordExistsInTheDatabase = false;

  let yearSubjectCourse = null;

  console.log({ teacherId, academicYearId, yearSubjectId, courseId });

  const fetchedYearSubjectCourse = await YearSubjectCourse.getYearSubjectCoursesByUniqueIds(yearSubjectId, courseId, yearGradeId);

  if (fetchedYearSubjectCourse.length > 0) {
    recordExistsInTheDatabase = true;
    yearSubjectCourse = await YearSubjectCourse.updateOne(fetchedYearSubjectCourse[0].yearSubjectCourseId, { teacherId });
  } else {
    const { catalogGradeId } = await YearGrade.getYearGrade(yearGradeId);
    const { catalogSubjectId } = await YearSubject.getYearSubject(yearSubjectId);
    const tracker = await Tracker.insertOne({
      trackerCompletenessPercentage: 0,
      trackerRows: [],
      courseId,
      catalogGradeId,
      catalogSubjectId,
      trackerId: '',
      academicYearId,
      yearGradeId
    });
    yearSubjectCourse = await YearSubjectCourse.insertOne({
      teacherId,
      academicYearId,
      yearSubjectId,
      courseId,
      yearGradeId,
      trackerId: tracker.trackerId
    });
  }
  return { recordExistsInTheDatabase, yearSubjectCourse };
};

export default createYearSubjectCourse;
