import { CatalogUnit } from '../../models/CatalogUnitModel';

const getCatalogUnit = async (catalogSubjectId: String, catalogGradeId: String) => {
  return await CatalogUnit.getCatalogUnits(catalogSubjectId, catalogGradeId);
};

export default getCatalogUnit;
