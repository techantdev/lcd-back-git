import { AcademicYear } from '../../models/AcademicYearModel';
import { YearArea } from '../../models/YearAreaModel';
import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';
import { Course } from '../../models/CourseModel';
import { Tracker } from '../../models/TrackerModel';
import { CatalogArea } from '../../models/CatalogAreaModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';
import { CatalogSubject } from '../../models/CatalogSubjectModel';

const createYearBasedOnPreviousYear = async (previousAcademicYearId: string, newAcademicYearId: string) => {
  const previousYearGrades = await YearGrade.getYearGrades(previousAcademicYearId);
  const createdYearGrades = await YearGrade.insertMultiple(
    previousYearGrades.map(grade => ({ ...grade, academicYearId: newAcademicYearId }))
  );

  for (let index = 0; index < previousYearGrades.length; index++) {
    const previousYearGrade = previousYearGrades[index];
    const previousGradeCourses = await Course.getYearGradeCourses(previousYearGrade.yearGradeId);
    const createdCoursesGrade = await Course.insertMultiple(
      previousGradeCourses.map(gradeCourse => ({
        ...gradeCourse,
        yearGradeId: createdYearGrades[index].yearGradeId
      }))
    );
    for (let index = 0; index < previousGradeCourses.length; index++) {
      const previousGradeCourse = previousGradeCourses[index];
      const previousTracker = await Tracker.getTracker(previousGradeCourse.trackerId);
      await Tracker.insertOne({ ...previousTracker, courseId: createdCoursesGrade[index].courseId });
    }
  }

  const previousYearAreas = await YearArea.getYearAreas(previousAcademicYearId);
  const createdYearAreas = await YearArea.insertMultiple(
    previousYearAreas.map(area => ({ ...area, academicYearId: newAcademicYearId }))
  );

  for (let index = 0; index < previousYearAreas.length; index++) {
    const previousYearArea = previousYearAreas[index];
    const previousYearSubjects = await YearSubject.getYearSubjects(previousYearArea.yearAreaId);

    await YearSubject.insertMultiple(
      previousYearSubjects.map(subject => {
        const yearSubjectGrades = subject.yearSubjectGrades.map(yearSubjectGrade => {
          const index = previousYearGrades.findIndex(prev => prev.yearGradeId === yearSubjectGrade.yearGradeId);
          return { yearGradeId: createdYearGrades[index].yearGradeId };
        });
        return { ...subject, yearAreaId: createdYearAreas[index].yearAreaId, yearSubjectGrades };
      })
    );
  }

  return { createdYearGrades, createdYearAreas };
};

const createYearBasedOnCatalog = async (schoolId: string, newAcademicYearId: string) => {
  const catalogGrades = await CatalogGrade.getCatalogGrades(schoolId);
  const createdYearGrades = await YearGrade.insertMultiple(
    catalogGrades.map(grade => ({ ...grade, academicYearId: newAcademicYearId, yearGradeId: '' }))
  );

  const catalogAreas = await CatalogArea.getCatalogAreas(schoolId);
  const createdYearAreas = await YearArea.insertMultiple(
    catalogAreas.map(area => ({ ...area, academicYearId: newAcademicYearId, yearAreaId: '' }))
  );

  for (let index = 0; index < catalogAreas.length; index++) {
    const catalogArea = catalogAreas[index];
    const catalogSubjects = await CatalogSubject.getCatalogSubjects(catalogArea.catalogAreaId);

    await YearSubject.insertMultiple(
      catalogSubjects.map(catalogSubject => {
        const yearSubjectGrades = catalogSubject.catalogSubjectGrades.map(catalogSubjectGrade => {
          const createdYearGrade = createdYearGrades.find(
            currentCreatedYearGrade => currentCreatedYearGrade.catalogGradeId === catalogSubjectGrade.catalogGradeId
          );
          return { yearGradeId: createdYearGrade?.yearGradeId || '' };
        });
        return { ...catalogSubject, yearAreaId: createdYearAreas[index].yearAreaId, yearSubjectGrades, yearSubjectId: '' };
      })
    );
  }

  return { createdYearGrades, createdYearAreas };
};

const createAcademicYear = async (
  schoolId: string,
  year: string,
  isCreationBasedOnPreviousYear: boolean,
  previousAcademicYearId: string
) => {
  let createdYearGrades, createdYearAreas;

  const createdAcademicYear = await AcademicYear.insertOne({ schoolId, year: +year });

  if (isCreationBasedOnPreviousYear) {
    ({ createdYearGrades, createdYearAreas } = await createYearBasedOnPreviousYear(
      previousAcademicYearId,
      createdAcademicYear.academicYearId
    ));
  } else {
    ({ createdYearGrades, createdYearAreas } = await createYearBasedOnCatalog(schoolId, createdAcademicYear.academicYearId));
  }

  return { createdAcademicYear, createdYearGrades, createdYearAreas };
};

export default createAcademicYear;
