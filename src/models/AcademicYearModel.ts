import { DatabaseEntity } from '../classes/classesIndex';
import academicYearSchema, { ACADEMICYEAR, SCHOOL } from '../schemas/AcademicYearSchema';

class AcademicYear extends DatabaseEntity {
  academicYearId: String;
  schoolId: String;
  year: Number;

  constructor(schoolId: String, year: Number) {
    super();

    // Attributes from params
    this.academicYearId = this.generateId();
    this.schoolId = schoolId;
    this.year = year;

    // Schema
    this.schema = academicYearSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.academicYearId), this.getSK(this.academicYearId));
  }

  getPK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  getSK(academicYearId: String) {
    return `${ACADEMICYEAR}_${academicYearId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      academicYearId: this.academicYearId,
      schoolId: this.schoolId,
      year: this.year
    };
  }
}

export { AcademicYear };
