import { DatabaseEntity } from '../classes/classesIndex';
import catalogUnitSchema, { CATALOGUNIT, CATALOGSUBJECT, CATALOGGRADE } from '../schemas/CatalogUnitSchema';

class CatalogUnit extends DatabaseEntity {
  catalogUnitId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogUnitName: String;

  constructor( catalogSubjectId: String, catalogGradeId: String, catalogUnitName: String) {
    super();

    // Attributes from params
    this.catalogUnitId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogUnitName = catalogUnitName;

    // Schema
    this.schema = catalogUnitSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogUnitId), this.getSK(this.catalogUnitId));
  }

  getPK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  getSK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGUNIT}`;
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
      catalogUnitId: this.catalogUnitId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogUnitName: this.catalogUnitName
    };
  }
}

export { CatalogUnit };
