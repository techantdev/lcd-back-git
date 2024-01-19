import catalogGradeSchema, { CATALOGGRADE, SCHOOL, CatalogGradeInterface } from '../schemas/CatalogGradeSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogGrade extends DatabaseEntity {
private catalogGradeId: String;
private schoolId: String;
private catalogGradeLabel: String;

  constructor() {
    super();
    this.schema = catalogGradeSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: CatalogGradeInterface) {
    const newCatalogGrade = new CatalogGrade();

    newCatalogGrade.catalogGradeId = item.catalogGradeId;

    // Attributes from params
    newCatalogGrade.schoolId = item.schoolId;
    newCatalogGrade.catalogGradeLabel = item.catalogGradeLabel;

    // Partition keys
    newCatalogGrade.initializeKeys(newCatalogGrade.getPK(), newCatalogGrade.getSK());

    return newCatalogGrade.toItem();
  }

  public static async insertOne({ schoolId, catalogGradeLabel }: { schoolId: String; catalogGradeLabel: String }) {
    const newCatalogGrade = new CatalogGrade();

    newCatalogGrade.catalogGradeId = newCatalogGrade.generateId();

    // Attributes from params
    newCatalogGrade.schoolId = schoolId;
    newCatalogGrade.catalogGradeLabel = catalogGradeLabel;

    // Partition keys
    newCatalogGrade.initializeKeys(newCatalogGrade.getPK(), newCatalogGrade.getSK());

    await newCatalogGrade.save();

    return newCatalogGrade.toItem();
  }

  public static async getCatalogGrades(schoolId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogGrade.getGSI1PK(schoolId) }
    });

    return items.map(CatalogGrade.fromDB);
  }
}

export { CatalogGrade };
