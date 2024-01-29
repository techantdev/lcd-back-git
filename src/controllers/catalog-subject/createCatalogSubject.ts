import { CatalogSubject } from '../../models/CatalogSubjectModel';

const createCatalogSubject = async (catalogAreaId: string, catalogSubjectName: string) => {
  return await CatalogSubject.insertOne({ catalogAreaId, catalogSubjectName, catalogSubjectGrades: [] });
};

export default createCatalogSubject;
