import { DatabaseEntity } from '../classes/classesIndex';

class YearArea extends DatabaseEntity {
  yearAreaId: String;
  catalogAreaId: String;
  academicYearId: String;

  constructor(catalogAreaId: String, academicYearId: String) {
    super();
    this.yearAreaId = this.generateId();
    this.catalogAreaId = catalogAreaId;
    this.academicYearId = academicYearId;
    this.initializeKeys(this.getPK(this.yearAreaId), this.getSK(this.yearAreaId));
  }

  getPK(yearAreaId: String) {
    return `YEARAREA_${yearAreaId}`;
  }

  getSK(yearAreaId: String) {
    return `YEARAREA_${yearAreaId}`;
  }

  async save() {}

  toItem() {
    return {
      yearAreaId: this.yearAreaId,
      catalogAreaId: this.catalogAreaId,
      academicYearId: this.academicYearId
    };
  }
}

export { YearArea };
