import { YearGrade } from '../../models/YearGradeModel';
import { YearSubject } from '../../models/YearSubjectModel';
import { Course } from '../../models/CourseModel';
import { CatalogGrade } from '../../models/CatalogGradeModel';

const getSubjectYearGrade = async (yearSubjectId: string) => {
  const yearGrades = [];
  const auxiliaryYearSubject = await YearSubject.getYearSubject(yearSubjectId);
  for (let index = 0; index < auxiliaryYearSubject.yearSubjectGrades.length; index++) {
    const auxiliaryYearGradeId = auxiliaryYearSubject.yearSubjectGrades[index].yearGradeId;
    const auxiliaryYearGrade = await YearGrade.getYearGrade(auxiliaryYearGradeId);
    const catalogGrade = await CatalogGrade.getCatalogGrade(auxiliaryYearGrade.catalogGradeId);
    const yearGradeCourses = await Course.getYearGradeCourses(auxiliaryYearGrade.yearGradeId);
    yearGrades.push({ ...auxiliaryYearGrade, catalogGradeLabel: catalogGrade.catalogGradeLabel, courses: yearGradeCourses });
  }
  return yearGrades;
};

export default getSubjectYearGrade;
