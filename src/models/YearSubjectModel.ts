import {
  YEARSUBJECT,
  YEARAREA,
  yearSubjectSchemaDB,
  YearSubjectRaw,
  YearSubjectDB,
  YearSubjectGrades
} from '../schemas/YearSubjectSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class YearSubject extends DatabaseEntity {
  private yearSubjectId: string;
  private catalogSubjectId: string;
  private yearAreaId: string;
  private yearSubjectGrades: YearSubjectGrades;

  constructor() {
    super();
    this.schema = yearSubjectSchemaDB;
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

  initializeFields(fields: YearSubjectRaw) {
    this.yearSubjectId = fields.yearSubjectId;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.yearAreaId = fields.yearAreaId;
    this.yearSubjectGrades = fields.yearSubjectGrades;
  }

  getRawItem() {
    return {
      yearSubjectId: this.yearSubjectId,
      catalogSubjectId: this.catalogSubjectId,
      yearAreaId: this.yearAreaId,
      yearSubjectGrades: this.yearSubjectGrades
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

  public static fromRawFields = (fields: YearSubjectDB) => {
    const instance = new YearSubject();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    catalogSubjectId,
    yearAreaId,
    yearSubjectGrades
  }: {
    catalogSubjectId: string;
    yearAreaId: string;
    yearSubjectGrades: YearSubjectGrades;
  }) {
    const instance = new YearSubject();
    instance.initializeFields({
      yearSubjectId: YearSubject.generateId(),
      catalogSubjectId: catalogSubjectId,
      yearAreaId: yearAreaId,
      yearSubjectGrades: yearSubjectGrades
    });
    return await instance.save<YearSubjectRaw>();
  }

  public static async insertMultiple(items: YearSubjectRaw[]) {
    return await YearSubject.saveMultiple<YearSubjectRaw>(
      items.map(item => {
        const instance = new YearSubject();
        instance.initializeFields({ ...item, yearSubjectId: YearSubject.generateId() });
        return instance;
      })
    );
  }

  public static async getYearSubjects(yearAreaId: String) {
    const items = await getItemsGSI<YearSubjectDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': YearSubject.getGSI1PK(yearAreaId) }
    });

    return items.map(YearSubject.fromRawFields);
  }

  // SE CREA METODO PARA 1 elemento YearSubject a partir del yearSubjectId

  public static async getYearSubject(yearSubjectId: string) {
    const yearSubject = new YearSubject();
    yearSubject.yearSubjectId = yearSubjectId;
    return await yearSubject.get<YearSubjectDB>();
  }
}

export { YearSubject };
