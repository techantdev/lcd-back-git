import { YearGrade } from '../../models/YearGradeModel';

const getYearGrade = async (academicYearId: String) => {
  return await YearGrade.getYearGrades(academicYearId);
};

export default getYearGrade;
