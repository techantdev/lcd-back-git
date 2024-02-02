import { YearGrade } from '../../models/YearGradeModel';
import { Course } from '../../models/CourseModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';

const getYearGrade = async (academicYearId: String) => {
  const yearGrades = [];

  const auxiliaryYearGrades = await YearGrade.getYearGrades(academicYearId);

  for (let index = 0; index < auxiliaryYearGrades.length; index++) {
    const auxiliaryYearGradeId = auxiliaryYearGrades[index].yearGradeId;
    const auxiliaryCourses = await Course.getYearGradeCourses(auxiliaryYearGradeId);
    const catalogGrade = await CatalogGrade.getCatalogGrade(auxiliaryYearGrades[index].catalogGradeId);
    const auxiliaryYearGrade = {
      ...auxiliaryYearGrades[index],
      courses: auxiliaryCourses,
      catalogGradeLabel: catalogGrade.catalogGradeLabel
    };
    yearGrades.push(auxiliaryYearGrade);
  }
  return yearGrades;
};

export default getYearGrade;
