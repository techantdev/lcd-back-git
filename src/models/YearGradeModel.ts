import { DatabaseEntity } from '../classes/classesIndex';
import yearGradeSchema, { YEARGRADE, ACADEMICYEAR } from '../schemas/YearGradeSchema';

class YearGrade extends DatabaseEntity {
  yearGradeId: String;
  catalogGradeId: String;
  academicYearId: String;

  constructor(catalogGradeId: String, academicYearId: String) {
    super();
    this.yearGradeId = this.generateId();
    this.catalogGradeId = catalogGradeId;
    this.academicYearId = academicYearId;

    // Schema
    this.schema = yearGradeSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.yearGradeId), this.getSK(this.yearGradeId));
  }

  getPK(yearGradeId: String) {
    return `${YEARGRADE}_${yearGradeId}`;
  }

  getSK(yearGradeId: String) {
    return `${YEARGRADE}_${yearGradeId}`;
  }

  getGSI1PK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI1SK() {
    return `${YEARGRADE}_${this.yearGradeId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      yearGradeId: this.yearGradeId,
      catalogGradeId: this.catalogGradeId,
      academicYearId: this.academicYearId
    };
  }
}

export { YearGrade };
