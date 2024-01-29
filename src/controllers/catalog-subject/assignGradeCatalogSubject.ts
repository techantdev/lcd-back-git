import { CatalogSubject } from '../../models/CatalogSubjectModel';

const assignGradeCatalogSubject = async (catalogSubjectId: string, catalogGradeIds: string[]) => {
  const updatedItem = await CatalogSubject.updateOne(catalogSubjectId, {
    catalogSubjectGrades: catalogGradeIds.map(catalogGradeId => ({ catalogGradeId }))
  });
  return updatedItem;
};

export default assignGradeCatalogSubject;
