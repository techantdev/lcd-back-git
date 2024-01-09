import { DatabaseEntity } from '../classes/classesIndex';
import catalogAreaSchema, { CATALOGAREA, SCHOOL } from '../schemas/CatalogAreaSchema';

class CatalogArea extends DatabaseEntity {
  catalogAreaId: String;
  schoolId: String;
  catalogAreaName: String;

  constructor(schoolId: String, catalogAreaName: String) {
    super();

    // Attributes from params
    this.catalogAreaId = this.generateId();
    this.schoolId = schoolId;
    this.catalogAreaName = catalogAreaName;

    // Schema
    this.schema = catalogAreaSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogAreaId), this.getSK(this.catalogAreaId));
  }

  getPK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  getSK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }


  toItem() {
    return {
      catalogAreaId: this.catalogAreaId,
      schoolId: this.schoolId,
      catalogAreaName: this.catalogAreaName
    };
  }
}

export { CatalogArea };
