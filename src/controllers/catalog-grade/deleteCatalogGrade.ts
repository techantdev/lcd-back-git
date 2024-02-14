import { CatalogGrade } from '../../models/CatalogGradeModel';

const deleteCatalogGrade = async (catalogGradesIds: String) => {
  const idsArray = catalogGradesIds.split(',');
  return await CatalogGrade.deleteMany(idsArray);
};

export default deleteCatalogGrade;
