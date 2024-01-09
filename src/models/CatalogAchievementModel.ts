import { DatabaseEntity } from '../classes/classesIndex';
import catalogAchievementSchema, { CATALOGACHIEVEMENT, CATALOGSUBJECT, CATALOGGRADE  } from '../schemas/CatalogAchievementSchema';

class CatalogAchievement extends DatabaseEntity {
  catalogAchievementId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogAchievementName: String;

  constructor( catalogSubjectId: String, catalogGradeId: String, catalogAchievementName: String) {
    super();
    this.catalogAchievementId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogAchievementName = catalogAchievementName;

    // Schema
    this.schema = catalogAchievementSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogAchievementId), this.getSK(this.catalogAchievementId));
  }

  getPK(catalogAchievementId: String) {
    return `${CATALOGACHIEVEMENT}_${catalogAchievementId}`;
  }

  getSK(catalogAchievementId: String) {
    return `${CATALOGACHIEVEMENT}_${catalogAchievementId}`;
  }

  
  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGACHIEVEMENT}`;
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
      catalogAchievementId: this.catalogAchievementId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogAchievementName: this.catalogAchievementName
    };
  }
}

export { CatalogAchievement };
