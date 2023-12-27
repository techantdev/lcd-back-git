import { DatabaseEntity } from '../classes/classesIndex';

class YearSubject extends DatabaseEntity {
  yearSubjectId: String;
  catalogSubjectId: String;
  yearAreaId: String;
  catalogAchievementIndicatorName: String;
  // FALTA  yearSubjectGrades

  constructor( catalogSubjectId: String, yearAreaId: String) {
    super();
    this.yearSubjectId = this.generateId();
    this.catalogSubjectId = catalogSubjectId;
    this.yearAreaId = yearAreaId;
    this.initializeKeys(this.getPK(this.yearSubjectId), this.getSK(this.yearSubjectId));
  }

  getPK(yearSubjectId: String) {
    return `YEARSUBJECT_${yearSubjectId}`;
  }

  getSK(yearSubjectId: String) {
    return `YEARSUBJECT_${yearSubjectId}`;
  }

  async save() {}

  toItem() {
    return {
      yearSubjectId: this.yearSubjectId,
      catalogSubjectId: this.catalogSubjectId,
      yearAreaId: this.yearAreaId
    };
  }
}

export { YearSubject };
