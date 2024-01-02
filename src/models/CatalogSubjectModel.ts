import { DatabaseEntity } from '../classes/classesIndex';
import catalogSubjectSchema from '../schemas/CatalogSubjectSchema';

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
    return `CATALOGSUBJECT_${catalogSubjectId}`;
  }

  getSK(catalogSubjectId: String) {
    return `CATALOGSUBJECT_${catalogSubjectId}`;
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
