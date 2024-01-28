import { CatalogGrade } from '../../models/CatalogGradeModel';

const updateCatalogGrade = async (catalogGradeId: String, catalogGradeLabel: String) => {
  const updatedItem = await CatalogGrade.updateOne(catalogGradeId, { catalogGradeLabel });
  return updatedItem;
};

export default updateCatalogGrade;
