import { DatabaseEntity } from '../classes/classesIndex';

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
    this.initializeKeys(this.getPK(this.catalogAchievementId), this.getSK(this.catalogAchievementId));
  }

  getPK(catalogAchievementId: String) {
    return `CATALOGACHIEVEMENT_${catalogAchievementId}`;
  }

  getSK(catalogAchievementId: String) {
    return `CATALOGACHIEVEMENT_${catalogAchievementId}`;
  }

  async save() {}

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
