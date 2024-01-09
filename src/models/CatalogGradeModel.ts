import { DatabaseEntity } from '../classes/classesIndex';
import catalogGradeSchema, { CATALOGGRADE, SCHOOL } from '../schemas/CatalogGradeSchema';

class CatalogGrade extends DatabaseEntity {
  catalogGradeId: String;
  schoolId: String;
  catalogGradeLabel: String;

  constructor(schoolId: String, catalogGradeLabel: String) {
    super();

    // Attributes from params
    this.catalogGradeId = this.generateId();
    this.schoolId = schoolId;
    this.catalogGradeLabel = catalogGradeLabel;

    // Schema
    this.schema = catalogGradeSchema;
    
    // Partition keys
    this.initializeKeys(this.getPK(this.catalogGradeId), this.getSK(this.catalogGradeId));
  }

  getPK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  getSK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  
  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      catalogGradeId: this.catalogGradeId,
      schoolId: this.schoolId,
      catalogGradeLabel: this.catalogGradeLabel
    };
  }
}

export { CatalogGrade };
