import { CatalogSubject } from '../../models/CatalogSubjectModel';

const updateCatalogSubject = async (catalogSubjectId: String, catalogSubjectName: String) => {
  const updatedItem = await CatalogSubject.updateOne(catalogSubjectId, { catalogSubjectName });
  return updatedItem;
};

export default updateCatalogSubject;
