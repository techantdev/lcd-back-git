import yearSubjectSchema, { YEARSUBJECT, YEARAREA, YearSubjectInterface } from '../schemas/YearSubjectSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearSubject extends DatabaseEntity {
  private yearSubjectId: String;
  private catalogSubjectId: String;
  private yearAreaId: String;
  // FALTA  yearSubjectGrades

  constructor() {
    super();
    this.schema = yearSubjectSchema;
  }

  getPK() {
    return `${YEARSUBJECT}_${this.yearSubjectId}`;
  }

  getSK() {
    return `${YEARSUBJECT}_${this.yearSubjectId}`;
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

  // STATIC
  public static getPK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  public static getSK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  public static getGSI1PK(yearAreaId: String) {
    return `${YEARAREA}_${yearAreaId}`;
  }

  public static getGSI1SK(yearSubjectId: String) {
    return `${YEARSUBJECT}_${yearSubjectId}`;
  }

  public static fromDB(item: YearSubjectInterface) {
    const newYearSubject = new YearSubject();

    newYearSubject.yearSubjectId = item.yearSubjectId;

    // Attributes from params
    newYearSubject.catalogSubjectId = item.catalogSubjectId;
    newYearSubject.yearAreaId = item.yearAreaId;

    // Partition keys
    newYearSubject.initializePartitionKeys(newYearSubject.getPK(), newYearSubject.getSK());

    return newYearSubject.toItem();
  }

  public static async insertOne({ catalogSubjectId, yearAreaId }: { catalogSubjectId: String; yearAreaId: String }) {
    const newYearSubject = new YearSubject();

    newYearSubject.yearSubjectId = newYearSubject.generateId();

    // Attributes from params
    newYearSubject.catalogSubjectId = catalogSubjectId;
    newYearSubject.yearAreaId = yearAreaId;

    // Partition keys
    newYearSubject.initializePartitionKeys(newYearSubject.getPK(), newYearSubject.getSK());

    await newYearSubject.save();

    return newYearSubject.toItem();
  }

  public static async insertMultiple(items: [{}]) {
    return [{}];
  }

  public static async getYearSubjects(yearAreaId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearSubject.getGSI1PK(yearAreaId) }
    });

    return items.map(YearSubject.fromDB);
  }
}

export { YearSubject, YearSubjectInterface };
