import { CatalogGrade } from '../../models/CatalogGradeModel';

const createCatalogGrade = async (schoolId: String, catalogGradeLabel: String) => {
  const newCatalogGrade = new CatalogGrade(schoolId, catalogGradeLabel);
  await newCatalogGrade.save();
  return newCatalogGrade.toItem();
};

export default createCatalogGrade;
