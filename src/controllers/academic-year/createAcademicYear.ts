import { AcademicYear } from '../../models/AcademicYearModel';
import { YearArea } from '../../models/YearAreaModel';
import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';
import { Course } from '../../models/CourseModel';
// import { Tracker } from '../../models/TrackerModel';
import { CatalogArea } from '../../models/CatalogAreaModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';
import { CatalogSubject } from '../../models/CatalogSubjectModel';
import { YearSubjectCourse } from '../../models/YearSubjectCourseModel';
import { YearSubjectCourseRaw } from '../../schemas/YearSubjectCourseSchema';

const createYearBasedOnPreviousYear = async (previousAcademicYearId: string, newAcademicYearId: string) => {
  const previousYearGrades = await YearGrade.getYearGrades(previousAcademicYearId);
  const createdYearGrades = await YearGrade.insertMultiple(
    previousYearGrades.map(grade => ({ ...grade, academicYearId: newAcademicYearId }))
  );

  const createdYearGradesToReturn = await Promise.all(
    previousYearGrades.map(async (previousYearGrade, index) => {
      const previousGradeCourses = await Course.getYearGradeCourses(previousYearGrade.yearGradeId);
      const courses = await Course.insertMultiple(
        previousGradeCourses.map(gradeCourse => ({
          ...gradeCourse,
          yearGradeId: createdYearGrades[index].yearGradeId
        }))
      );
      return { ...createdYearGrades[index], courses };
    })
  );

  const previousYearAreas = await YearArea.getYearAreas(previousAcademicYearId);
  const createdYearAreas = await YearArea.insertMultiple(
    previousYearAreas.map(area => ({ ...area, academicYearId: newAcademicYearId }))
  );

  const createdYearAreasToReturn = await Promise.all(
    previousYearAreas.map(async (previousYearArea, index) => {
      const previousYearSubjects = await YearSubject.getYearSubjects(previousYearArea.yearAreaId);

      const yearSubjects = await YearSubject.insertMultiple(
        previousYearSubjects.map(previousYearSubject => {
          const yearSubjectGrades = previousYearSubject.yearSubjectGrades.map(yearSubjectGrade => {
            const index = previousYearGrades.findIndex(prev => prev.yearGradeId === yearSubjectGrade.yearGradeId);
            return { yearGradeId: createdYearGrades[index].yearGradeId };
          });
          return { ...previousYearSubject, yearAreaId: createdYearAreas[index].yearAreaId, yearSubjectGrades };
        })
      );

      return { ...createdYearAreas[index], yearSubjects };
    })
  );

  const yearSubjectCourseItems: YearSubjectCourseRaw[] = [];

  createdYearAreasToReturn.forEach(createdYearArea => {
    createdYearArea.yearSubjects.forEach(createdYearSubject => {
      createdYearSubject.yearSubjectGrades.forEach(createdYearSubjectGrade => {
        const { yearGradeId } = createdYearSubjectGrade;
        const createdYearGrade = createdYearGradesToReturn.find(createdYearGrade => createdYearGrade.yearGradeId === yearGradeId)!;
        createdYearGrade.courses.forEach(createdCourse => {
          yearSubjectCourseItems.push({
            academicYearId: newAcademicYearId,
            courseId: createdCourse.courseId,
            teacherId: '',
            yearSubjectId: createdYearSubject.yearSubjectId,
            yearSubjectCourseId: '',
            yearGradeId,
            trackerId: ''
          });
        });
      });
    });
  });

  // TODO: Añadir la duplicación de los trackers

  await YearSubjectCourse.insertMultiple(yearSubjectCourseItems);

  return { createdYearGrades: createdYearGradesToReturn, createdYearAreas: createdYearAreasToReturn };
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

  const createdYearAreasToReturn = await Promise.all(
    catalogAreas.map(async (_, index) => {
      const catalogArea = catalogAreas[index];
      const catalogSubjects = await CatalogSubject.getCatalogSubjects(catalogArea.catalogAreaId);

      const yearSubjects = await YearSubject.insertMultiple(
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

      return { ...createdYearAreas[index], yearSubjects };
    })
  );

  return { createdYearGrades, createdYearAreas: createdYearAreasToReturn };
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

  return { ...createdAcademicYear, yearGrades: createdYearGrades, yearAreas: createdYearAreas };
};

export default createAcademicYear;
