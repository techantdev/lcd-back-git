import { DatabaseEntity } from '../classes/classesIndex';

class CatalogUnit extends DatabaseEntity {
  catalogUnitId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogUnitName: String;

  constructor( catalogSubjectId: String, catalogGradeId: String, catalogUnitName: String) {
    super();
    this.catalogUnitId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogUnitName = catalogUnitName;
    this.initializeKeys(this.getPK(this.catalogUnitId), this.getSK(this.catalogUnitId));
  }

  getPK(catalogUnitId: String) {
    return `CATALOGUNIT_${catalogUnitId}`;
  }

  getSK(catalogUnitId: String) {
    return `CATALOGUNIT_${catalogUnitId}`;
  }

  async save() {}

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
