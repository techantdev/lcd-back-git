import { DatabaseEntity } from '../classes/classesIndex';
import  yearSubjectSchema, { YEARSUBJECT, YEARAREA }  from '../schemas/YearSubjectSchema';

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

     // Schema
     this.schema = yearSubjectSchema;

     // Partition keys
    this.initializeKeys(this.getPK(this.yearSubjectId), this.getSK(this.yearSubjectId));
  }

  getPK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  getSK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  
  getGSI1PK() {
    return `${YEARAREA}_${this.yearAreaId}`;
  }

  getGSI1SK() {
    return `${YEARSUBJECT}_${this.yearSubjectId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      yearSubjectId: this.yearSubjectId,
      catalogSubjectId: this.catalogSubjectId,
      yearAreaId: this.yearAreaId
    };
  }
}

export { YearSubject };
