import { CatalogSubject } from '../../models/CatalogSubjectModel';

const createCatalogSubject = async (catalogAreaId: String, catalogSubjectName: String) => {
  const newCatalogSubject = new CatalogSubject(catalogAreaId, catalogSubjectName);
  await newCatalogSubject.save();
  return newCatalogSubject.toItem();
};

export default createCatalogSubject;
