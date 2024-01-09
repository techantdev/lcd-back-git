import { DatabaseEntity } from '../classes/classesIndex';
import yearAreaSchema, { YEARAREA, ACADEMICYEAR } from '../schemas/YearAreaSchema';

class YearArea extends DatabaseEntity {
  yearAreaId: String;
  catalogAreaId: String;
  academicYearId: String;

  constructor(catalogAreaId: String, academicYearId: String) {
    super();
    this.yearAreaId = this.generateId();
    this.catalogAreaId = catalogAreaId;
    this.academicYearId = academicYearId;

     // Schema
     this.schema = yearAreaSchema;

     // Partition keys
    this.initializeKeys(this.getPK(this.yearAreaId), this.getSK(this.yearAreaId));
  }

  getPK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  getSK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  getGSI1PK() {
    return `${ACADEMICYEAR}_${this.academicYearId}`;
  }

  getGSI1SK() {
    return `${YEARAREA}_${this.yearAreaId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      yearAreaId: this.yearAreaId,
      catalogAreaId: this.catalogAreaId,
      academicYearId: this.academicYearId
    };
  }
}

export { YearArea };
