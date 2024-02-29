import { CatalogSubject } from '../../models/CatalogSubjectModel';
import { Course } from '../../models/CourseModel';
import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';
import { YearSubject } from '../../models/YearSubjectModel';

const getYearSubjectCourse = async (teacherId: String, academicYearId: String) => {
  const yearSubjectCourses = await YearSubjectCourse.getYearSubjectCourses(teacherId, academicYearId);

  return Promise.all(
    yearSubjectCourses.map(async yearSubjectCourse => {
      const fetchedYearSubject = await YearSubject.getYearSubject(yearSubjectCourse.yearSubjectId);
      const fetchedCatalogSubject = await CatalogSubject.getCatalogSubject(fetchedYearSubject.catalogSubjectId);
      const fetchedCourse = await Course.getCourse(yearSubjectCourse.courseId);
      const yearSubjectCourseComplete = {
        ...yearSubjectCourse,
        catalogSubjectName: fetchedCatalogSubject.catalogSubjectName,
        courseLabel: fetchedCourse.courseLabel
      };
      return yearSubjectCourseComplete;
    })
  );
};

export default getYearSubjectCourse;
