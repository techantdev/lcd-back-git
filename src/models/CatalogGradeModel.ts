import { CATALOGGRADE, CatalogGradeDB, CatalogGradeRaw, SCHOOL, catalogGradeSchemaDB } from '../schemas/CatalogGradeSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogGrade extends DatabaseEntity {
  private catalogGradeId: string;
  private schoolId: string;
  private catalogGradeLabel: string;

  constructor() {
    super();
    this.schema = catalogGradeSchemaDB;
  }

  getPK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  getSK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  getGSI1PK() {
    return `${SCHOOL}_${this.schoolId}`;
  }

  getGSI1SK() {
    return `${CATALOGGRADE}_${this.catalogGradeId}`;
  }

  initializeFields(fields: CatalogGradeRaw) {
    this.catalogGradeId = fields.catalogGradeId;
    this.schoolId = fields.schoolId;
    this.catalogGradeLabel = fields.catalogGradeLabel;
  }

  getRawItem() {
    return {
      catalogGradeId: this.catalogGradeId,
      schoolId: this.schoolId,
      catalogGradeLabel: this.catalogGradeLabel
    };
  }

  // STATIC
  public static getPK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static getSK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static getGSI1PK(schoolId: String) {
    return `${SCHOOL}_${schoolId}`;
  }

  public static getGSI1SK(catalogGradeId: String) {
    return `${CATALOGGRADE}_${catalogGradeId}`;
  }

  public static fromRawFields = (fields: CatalogGradeDB) => {
    const instance = new CatalogGrade();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ schoolId, catalogGradeLabel }: { schoolId: string; catalogGradeLabel: string }) {
    const instance = new CatalogGrade();
    instance.initializeFields({
      catalogGradeId: CatalogGrade.generateId(),
      schoolId: schoolId,
      catalogGradeLabel: catalogGradeLabel
    });
    return await instance.save<CatalogGradeRaw>();
  }

  public static async getCatalogGrades(schoolId: String) {
    const items = await getItemsGSI<CatalogGradeDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogGrade.getGSI1PK(schoolId), ':GSI1SK': CatalogGrade.getGSI1SK('') }
    });

    return items.map(CatalogGrade.fromRawFields);
  }

  public static async updateOne(catalogGradeId: String, catalogGradeData: { catalogGradeLabel: String }) {
    const updatedItem = await updateItem<CatalogGradeDB>(
      CatalogGrade.getPK(catalogGradeId),
      CatalogGrade.getSK(catalogGradeId),
      `SET #catalogGradeLabel=:catalogGradeLabel`,
      { '#catalogGradeLabel': 'catalogGradeLabel' },
      { ':catalogGradeLabel': catalogGradeData.catalogGradeLabel }
    );

    return CatalogGrade.fromRawFields(updatedItem);
  }

  public static async getCatalogGrade(catalogGradeId: string) {
    const instance = new CatalogGrade();
    instance.catalogGradeId = catalogGradeId;
    return await instance.get<CatalogGradeDB>();
  }
}

export { CatalogGrade };
