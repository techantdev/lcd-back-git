import { CatalogGrade } from '../../models/CatalogGradeModel';

const createCatalogGrade = async (schoolId: String, catalogGradeLabel: String) => {
  return await CatalogGrade.insertOne({ schoolId, catalogGradeLabel});
};

export default createCatalogGrade;
