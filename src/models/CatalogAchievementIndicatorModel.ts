import { DatabaseEntity } from '../classes/classesIndex';

class CatalogAchievementIndicator extends DatabaseEntity {
  catalogAchievementIndicatorId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogAchievementIndicatorName: String;

  constructor( catalogSubjectId: String, catalogGradeId: String, catalogAchievementIndicatorName: String) {
    super();
    this.catalogAchievementIndicatorId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogAchievementIndicatorName = catalogAchievementIndicatorName;
    this.initializeKeys(this.getPK(this.catalogAchievementIndicatorId), this.getSK(this.catalogAchievementIndicatorId));
  }

  getPK(catalogAchievementIndicatorId: String) {
    return `CATALOGACHIEVEMENTINDICATOR_${catalogAchievementIndicatorId}`;
  }

  getSK(catalogAchievementIndicatorId: String) {
    return `CATALOGACHIEVEMENTINDICATOR_${catalogAchievementIndicatorId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogAchievementIndicatorId: this.catalogAchievementIndicatorId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogAchievementIndicatorName: this.catalogAchievementIndicatorName
    };
  }
}

export { CatalogAchievementIndicator };
