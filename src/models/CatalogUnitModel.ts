import { DatabaseEntity } from '../classes/classesIndex';
import catalogUnitSchema from '../schemas/CatalogUnitSchema';

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
    return `CATALOGUNIT_${catalogUnitId}`;
  }

  getSK(catalogUnitId: String) {
    return `CATALOGUNIT_${catalogUnitId}`;
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
