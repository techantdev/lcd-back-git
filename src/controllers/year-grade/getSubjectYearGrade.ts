import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';
import { Course } from '../../models/CourseModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';
import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';

const getSubjectYearGrade = async (yearSubjectId: string) => {
  const auxiliaryYearSubject = await YearSubject.getYearSubject(yearSubjectId);
  const yearGrades = await Promise.all(
    auxiliaryYearSubject.yearSubjectGrades.map(async ({ yearGradeId }) => {
      const auxiliaryYearGrade = await YearGrade.getYearGrade(yearGradeId);
      const catalogGrade = await CatalogGrade.getCatalogGrade(auxiliaryYearGrade.catalogGradeId);
      const yearSubjectCourses = await YearSubjectCourse.getYearSubjectCoursesByUniqueIds(yearSubjectId, '', yearGradeId);
      const yearGradeCourses = await Course.getYearGradeCourses(auxiliaryYearGrade.yearGradeId);
      const courses = yearGradeCourses.map(course => {
        const { teacherId: assignedTeacherId, trackerId } =
          yearSubjectCourses.find(yearSubjectCourse => yearSubjectCourse.courseId === course.courseId) || {};
        return { ...course, assignedTeacherId, trackerId };
      });
      return { ...auxiliaryYearGrade, catalogGradeLabel: catalogGrade.catalogGradeLabel, courses };
    })
  );
  return yearGrades;
};

export default getSubjectYearGrade;
