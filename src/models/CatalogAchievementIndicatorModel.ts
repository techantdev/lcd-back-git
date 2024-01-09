import { DatabaseEntity } from '../classes/classesIndex';
import catalogAchievementIndicatorSchema, { CATALOGACHIEVEMENTINDICATOR, CATALOGSUBJECT, CATALOGGRADE  } from '../schemas/CatalogAchievementIndicatorSchema';


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
    return `${CATALOGACHIEVEMENTINDICATOR}_${catalogAchievementIndicatorId}`;
  }

  getSK(catalogAchievementIndicatorId: String) {
    return `${CATALOGACHIEVEMENTINDICATOR}_${catalogAchievementIndicatorId}`;
  }

  getGSI1PK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}_${CATALOGACHIEVEMENTINDICATOR}`;
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
      catalogAchievementIndicatorId: this.catalogAchievementIndicatorId,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      catalogAchievementIndicatorName: this.catalogAchievementIndicatorName
    };
  }
}

export { CatalogAchievementIndicator };
