import { CatalogUnit } from '../../models/CatalogUnitModel';

const createCatalogUnit = async (catalogSubjectId: String, catalogGradeId: String, catalogUnitName: String) => {
  const newCatalogUnit = new CatalogUnit(catalogSubjectId, catalogGradeId, catalogUnitName);
  await newCatalogUnit.save();
  return newCatalogUnit.toItem();
};

export default createCatalogUnit;
