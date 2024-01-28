import { CatalogArea } from '../../models/CatalogAreaModel';
import { CatalogSubject } from '../../models/CatalogSubjectModel';

const getCatalogArea = async (schoolId: String) => {
  const catalogAreas = await CatalogArea.getCatalogAreas(schoolId);
  return Promise.all(
    catalogAreas.map(async catalogArea => {
      const fetchedSubjects = await CatalogSubject.getCatalogSubjects(catalogArea.catalogAreaId);
      return { ...catalogArea, subjects: fetchedSubjects };
    })
  );
};

export default getCatalogArea;
