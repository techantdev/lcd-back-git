import { AcademicYear } from '../../models/AcademicYearModel';
import { YearArea /*YearAreaInterface*/ } from '../../models/YearAreaModel';
import { YearGrade /*YearGradeInterface*/ } from '../../models/YearGradeModel';
// import { YearSubject, YearSubjectInterface } from '../../models/YearSubjectModel';
import { Course /*CourseInterface */ } from '../../models/CourseModel';
// import { Tracker, TrackerInterface } from '../../models/TrackerModel';

const createAcademicYear = async (schoolId: String, year: Number) => {
  const isCreationBasedOnPreviousYear = false; // Viene de front
  const previousAcademicYearId = 'ABC123'; // Viene de front

  const createdAcademicYear = await AcademicYear.insertOne({ schoolId, year });

  if (isCreationBasedOnPreviousYear) {
    // 1. Hacerle fetch a todos los YearArea del año académico anterior usando previousAcademicYearId
    const previousYearAreas = await YearArea.getYearAreas(previousAcademicYearId);
    //
    // 2. Por cada YearArea crear uno nuevo pero especificando un nuevo academicYearId
    // const createdYearAreas = await YearArea.insertMultiple(
    //   previousYearAreas.map(area => ({ ...area, academicYearId: createdAcademicYear.academicYearId }))
    // );

    // 3. Se debe hacer fetch a todos los YearGrade  del año académico anterior usando previousAcademicYearId
    const previousYearGrades = await YearGrade.getYearGrades(previousAcademicYearId);
    //
    // 4. Por cada YearGrade crear uno nuevo pero especificando un nuevo academicYearId.
    // const createdYearGrades = await YearGrade.insertMultiple(
    //   previousYearGrades.map(grade => ({ ...grade, academicYearId: createdAcademicYear.academicYearId }))
    // );

    for (let index = 0; index < previousYearAreas.length; index++) {
      // const previousYearArea = previousYearAreas[index];
      // 5. Se debe hacer fetch a todos los YearSubject utilizando los YearAreaIds previos.
      // const previousYearSubjects = await YearSubject.getYearSubjects(previousYearArea.yearAreaId);
      // 6. Por cada YearSubject crear uno nuevo pero especificando un nuevo yearAreaId.
      // const createdYearSubjects = await YearSubject.insertMultiple(
      //   previousYearSubjects.map((subject: YearSubjectInterface) => ({ ...subject, yearAreaId: createdYearAreas[index].yearAreaId }))
      // );
    }

    for (let index = 0; index < previousYearGrades.length; index++) {
      const previousYearGrade = previousYearGrades[index];
      // 7. Se debe hacer fetch a todos los Course utilizando los YearGradeIds previos.
      const previousGradeCourses = await Course.getYearGradeCourses(previousYearGrade.yearGradeId);
      // 8. Por cada CourseYearGrade crear uno nuevo pero especificando un nuevo yearGradeId.
      // const createdCoursesGrade = await Course.insertMultiple(
      //   previousGradeCourses.map(gradeCourse => ({
      //     ...gradeCourse,
      //     yearGradeId: createdYearGrades[index].yearGradeId
      //   }))
      // );
      for (let index = 0; index < previousGradeCourses.length; index++) {
        // const previousGradeCourse = previousGradeCourses[index];
        // 7. Se debe hacer fetch a todos los Course utilizando los YearGradeIds previos.
        // const previousTracker = await Tracker.getTracker(previousGradeCourse.trackerId);
        // const createdTracker = await Tracker.insertOne({ courseId: createdCoursesGrade[index].courseId });
      }
    }

    // ... Seguir esta lógica con las siguientes entidades.

    /* TODO:
      AcademicYear
        YearArea
          YearSubject
        YearGrade
          Course
            Tracker
    */
  } else {
  }

  return { createdAcademicYear };
};

export default createAcademicYear;

// TODO: A cada entidad que requiera el insertMultiple crearselo.
