import { CatalogSubject } from '../../models/CatalogSubjectModel';
import { Course } from '../../models/CourseModel';
import { TeacherSubjectCourse } from '../../models/TeacherSubjectCourseModel';
import { YearSubject } from '../../models/YearSubjectModel';

const getTeacherSubjectCourse = async (teacherId: String, academicYearId: String) => {
  const teacherSubjectCourses = await TeacherSubjectCourse.getTeacherSubjectCourses(teacherId, academicYearId);

  return Promise.all(
    teacherSubjectCourses.map(async teacherSubjectCourse => {
      const fetchedYearSubject = await YearSubject.getYearSubject(teacherSubjectCourse.yearSubjectId);
      const fetchedCatalogSubject = await CatalogSubject.getCatalogSubject(fetchedYearSubject.catalogSubjectId);
      const fetchedCourse = await Course.getCourse(teacherSubjectCourse.courseId);
      const teacherSubjectCourseComplete = {
        ...teacherSubjectCourse,
        catalogSubjectName: fetchedCatalogSubject.catalogSubjectName,
        courseLabel: fetchedCourse.courseLabel
      };
      return teacherSubjectCourseComplete;
    })
  );
};

export default getTeacherSubjectCourse;
