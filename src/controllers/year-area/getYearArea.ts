import { YearArea } from '../../models/YearAreaModel';
import { YearSubject } from '../../models/YearSubjectModel';
import { CatalogArea } from '../../models/CatalogAreaModel';
import { CatalogSubject } from '../../models/CatalogSubjectModel';

const getYearArea = async (academicYearId: String) => {
  const yearAreas = [];

  const auxiliaryYearAreas = await YearArea.getYearAreas(academicYearId);
  for (let index = 0; index < auxiliaryYearAreas.length; index++) {
    const auxiliaryYearAreaId = auxiliaryYearAreas[index].yearAreaId;
    const auxiliaryYearSubjects = await YearSubject.getYearSubjects(auxiliaryYearAreaId);
    const yearSubjects = await Promise.all(
      auxiliaryYearSubjects.map(async subject => {
        const catalogSubject = await CatalogSubject.getCatalogSubject(subject.catalogSubjectId);
        return { ...subject, catalogSubjectName: catalogSubject.catalogSubjectName };
      })
    );
    const catalogArea = await CatalogArea.getCatalogArea(auxiliaryYearAreas[index].catalogAreaId);
    const auxiliaryYearArea = {
      ...auxiliaryYearAreas[index],
      yearSubjects,
      catalogAreaName: catalogArea.catalogAreaName
    };
    yearAreas.push(auxiliaryYearArea);
  }

  return yearAreas;
};

export default getYearArea;
