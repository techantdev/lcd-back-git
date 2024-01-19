import { YearGrade } from '../../models/YearGradeModel';

const getSubjectYearGrade = async (yearSubjectId: String) => {
    return await YearGrade.getSubjectYearGrades(yearSubjectId); 
};

export default getSubjectYearGrade;
