import { DatabaseEntity } from '../classes/classesIndex';

class CatalogArea extends DatabaseEntity {
  catalogAreaId: String;
  schoolId: String;
  catalogAreaName: String;

  constructor(schoolId: String, catalogAreaName: String) {
    super();
    this.catalogAreaId = this.generateId();
    this.schoolId = schoolId;
    this.catalogAreaName = catalogAreaName;
    this.initializeKeys(this.getPK(this.catalogAreaId), this.getSK(this.catalogAreaId));
  }

  getPK(catalogAreaId: String) {
    return `CATALOGAREA_${catalogAreaId}`;
  }

  getSK(catalogAreaId: String) {
    return `CATALOGAREA_${catalogAreaId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogAreaId: this.catalogAreaId,
      schoolId: this.schoolId,
      catalogAreaName: this.catalogAreaName
    };
  }
}

export { CatalogArea };
