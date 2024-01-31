import { YearGrade } from '../../models/YearGradeModel';

const getYearGrade = async (academicYearId: String) => {
  // TODO: David

  //1. Se consultan todos los YearGrades de un año acadéimco (ya está)
  return await YearGrade.getYearGrades(academicYearId);

  //2. Por cada year grade consultar los courses de cada year grade en 1 for utilizando la entidad Course filtrando por el yeaGRade.yearGRadeId

  //3. retornas todos los year grade incluyendo en cada uno su respectivo listado de course.
};

export default getYearGrade;
