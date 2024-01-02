import { DatabaseEntity } from '../classes/classesIndex';
import catalogAchievementIndicatorSchema from '../schemas/CatalogAchievementIndicatorSchema';

class CatalogAchievementIndicator extends DatabaseEntity {
  catalogAchievementIndicatorId: String;
  catalogSubjectId: String;
  catalogGradeId: String;
  catalogAchievementIndicatorName: String;

  constructor( catalogSubjectId: String, catalogGradeId: String, catalogAchievementIndicatorName: String) {
    super();

    // Attributes from params
    this.catalogAchievementIndicatorId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.catalogGradeId = catalogGradeId;
    this.catalogAchievementIndicatorName = catalogAchievementIndicatorName;

    // Schema
    this.schema = catalogAchievementIndicatorSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogAchievementIndicatorId), this.getSK(this.catalogAchievementIndicatorId));
  }

  getPK(catalogAchievementIndicatorId: String) {
    return `CATALOGACHIEVEMENTINDICATOR_${catalogAchievementIndicatorId}`;
  }

  getSK(catalogAchievementIndicatorId: String) {
    return `CATALOGACHIEVEMENTINDICATOR_${catalogAchievementIndicatorId}`;
  }

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
