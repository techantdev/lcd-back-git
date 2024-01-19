import { CatalogUnit } from '../../models/CatalogUnitModel';

const createCatalogUnit = async (catalogSubjectId: String, catalogGradeId: String, catalogUnitName: String) => {
  return await CatalogUnit.insertOne({ catalogSubjectId, catalogGradeId, catalogUnitName});
};

export default createCatalogUnit;
