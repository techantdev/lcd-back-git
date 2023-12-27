import { DatabaseEntity } from '../classes/classesIndex';

class YearGrade extends DatabaseEntity {
  yearGradeId: String;
  catalogGradeId: String;
  academicYearId: String;

  constructor(catalogGradeId: String, academicYearId: String) {
    super();
    this.yearGradeId = this.generateId();
    this.catalogGradeId = catalogGradeId;
    this.academicYearId = academicYearId;
    this.initializeKeys(this.getPK(this.yearGradeId), this.getSK(this.yearGradeId));
  }

  getPK(yearGradeId: String) {
    return `YEARGRADE_${yearGradeId}`;
  }

  getSK(yearGradeId: String) {
    return `YEARGRADE_${yearGradeId}`;
  }

  async save() {}

  toItem() {
    return {
      yearGradeId: this.yearGradeId,
      catalogGradeId: this.catalogGradeId,
      academicYearId: this.academicYearId
    };
  }
}

export { YearGrade };
