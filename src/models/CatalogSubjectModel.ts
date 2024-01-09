import { DatabaseEntity } from '../classes/classesIndex';
import catalogSubjectSchema, { CATALOGSUBJECT, CATALOGAREA } from '../schemas/CatalogSubjectSchema';

class CatalogSubject extends DatabaseEntity {
  catalogSubjectId: String;
  catalogAreaId: String;
  catalogSubjectName: String;
  // PONER EL CATALOG SUBGRADES QUE FALTA ARREGLO

  constructor(catalogAreaId: String, catalogSubjectName: String) {
    super();

    // Attributes from params
    this.catalogSubjectId = this.generateId();
    this.catalogAreaId = catalogAreaId;
    this.catalogSubjectName = catalogSubjectName;
    
    // Schema
    this.schema = catalogSubjectSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogSubjectId), this.getSK(this.catalogSubjectId));
  }

  getPK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}`;
  }

  getSK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}`;
  }

  getGSI1PK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  getGSI1SK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }


  toItem() {
    return {
      catalogSubjectId: this.catalogSubjectId,
      catalogAreaId: this.catalogAreaId,
      catalogSubjectName: this.catalogSubjectName
    };
  }
}

export { CatalogSubject };
