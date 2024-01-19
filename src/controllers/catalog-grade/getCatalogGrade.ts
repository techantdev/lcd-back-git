import { CatalogGrade } from '../../models/CatalogGradeModel';

const getCatalogGrade = async (schoolId: String) => {
    return await CatalogGrade.getCatalogGrades(schoolId);
};

export default getCatalogGrade;
