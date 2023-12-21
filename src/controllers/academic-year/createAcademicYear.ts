import { AcademicYear } from '../../models/AcademicYearModel';

const createAcademicYear = async (schoolId: String, year: Number) => {
  const newAcademicYear = new AcademicYear(schoolId, year);
  await newAcademicYear.save();
  return newAcademicYear.toItem();
};

export default createAcademicYear;
