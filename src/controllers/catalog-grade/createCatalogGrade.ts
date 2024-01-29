import { CatalogGrade } from '../../models/CatalogGradeModel';

const createCatalogGrade = async (schoolId: string, catalogGradeLabel: string) => {
  return await CatalogGrade.insertOne({ schoolId, catalogGradeLabel });
};

export default createCatalogGrade;
