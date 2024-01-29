import { CatalogUnit } from '../../models/CatalogUnitModel';

const createCatalogUnit = async (catalogSubjectId: string, catalogGradeId: string, catalogUnitName: string) => {
  return await CatalogUnit.insertOne({ catalogSubjectId, catalogGradeId, catalogUnitName });
};

export default createCatalogUnit;
