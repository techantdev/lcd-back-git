import { AcademicYear } from '../../models/AcademicYearModel';
import { YearArea, YearAreaInterface } from '../../models/YearAreaModel';

const createAcademicYear = async (schoolId: String, year: Number) => {
  const isCreationBasedOnPreviousYear = false; // Viene de front
  const previousAcademicYearId = 'ABC123'; // Viene de front

  const createdAcademicYear = await AcademicYear.insertOne({ schoolId, year });
  // createdAcademicYear.AcademicYearId = 'DEF456'

  if (isCreationBasedOnPreviousYear) {
    // 1. Hacerle fetch a todos los YearArea del año académico anterior usando previousAcademicYearId
    const previousYearAreas = await YearArea.getYearAreas(previousAcademicYearId);
    //
    // 2. Por cada YearArea crear uno nuevo pero especificando un nuevo academicYearId
    const createdYearAreas = await YearArea.insertMultiple(
      previousYearAreas.map((area: YearAreaInterface) => ({ ...area, academicYearId: createdAcademicYear.academicYearId }))
    );

    // 3. Se debe hacer fetch a todos los YearSubject utilizando los YearAreaIds previos.

    // 4. por cada year subject crear uno nuevo utilizando el yearAreaId nuevo.

    // ... Seguir esta lógica con las siguientes entidades.

    /* TODO:
      AcademicYear
        YearArea
          YearSubject
        YearGrade
          Course
            Tracker
    */
  } else {
  }

  return { createdAcademicYear };
};

export default createAcademicYear;

// TODO: A cada entidad que requiera el insertMultiple crearselo.
