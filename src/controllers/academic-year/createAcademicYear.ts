import { AcademicYear } from '../../models/AcademicYearModel';

const createAcademicYear = async (schoolId: String, year: Number) => {
  return await AcademicYear.insertOne({ schoolId, year });
};

export default createAcademicYear;
