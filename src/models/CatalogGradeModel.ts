import { DatabaseEntity } from '../classes/classesIndex';

class CatalogGrade extends DatabaseEntity {
  catalogGradeId: String;
  schoolId: String;
  catalogGradeLabel: String;

  constructor(schoolId: String, catalogGradeLabel: String) {
    super();
    this.catalogGradeId = this.generateId();
    this.schoolId = schoolId;
    this.catalogGradeLabel = catalogGradeLabel;
    this.initializeKeys(this.getPK(this.catalogGradeId), this.getSK(this.catalogGradeId));
  }

  getPK(catalogGradeId: String) {
    return `CATALOGGRADE_${catalogGradeId}`;
  }

  getSK(catalogGradeId: String) {
    return `CATALOGGRADE_${catalogGradeId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogGradeId: this.catalogGradeId,
      schoolId: this.schoolId,
      catalogGradeLabel: this.catalogGradeLabel
    };
  }
}

export { CatalogGrade };
