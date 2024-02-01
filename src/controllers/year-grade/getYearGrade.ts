import { YearGrade } from '../../models/YearGradeModel';
import { Course } from '../../models/CourseModel';

const getYearGrade = async (academicYearId: String) => {
  const yearGrades = [];
  // TODO: David

  //1. Se consultan todos los YearGrades de un año acadéimco (ya está)

  const auxiliaryYearGrades = await YearGrade.getYearGrades(academicYearId);

  //2. Por cada year grade consultar los courses de cada year grade en 1 for utilizando la entidad Course filtrando por el yeaGRade.yearGRadeId
  for (let index = 0; index < auxiliaryYearGrades.length; index++) {
    const auxiliaryYearGradeId = auxiliaryYearGrades[index].yearGradeId;
    const auxiliaryCourses = await Course.getYearGradeCourses(auxiliaryYearGradeId);
    //3. retornas todos los year grade incluyendo en cada uno su respectivo listado de course.
    const auxiliaryYearGrade = { ...auxiliaryYearGrades[index], courses: auxiliaryCourses };
    yearGrades.push(auxiliaryYearGrade);
  }
  return yearGrades;
};

export default getYearGrade;
