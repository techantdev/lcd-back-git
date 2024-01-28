import catalogGradeSchema, { CATALOGGRADE, SCHOOL, CatalogGradeInterface } from '../schemas/CatalogGradeSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

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
    newCatalogGrade.initializePartitionKeys(newCatalogGrade.getPK(), newCatalogGrade.getSK());

    return newCatalogGrade.toItem();
  }

  public static async insertOne({ schoolId, catalogGradeLabel }: { schoolId: String; catalogGradeLabel: String }) {
    const newCatalogGrade = new CatalogGrade();

    newCatalogGrade.catalogGradeId = newCatalogGrade.generateId();

    // Attributes from params
    newCatalogGrade.schoolId = schoolId;
    newCatalogGrade.catalogGradeLabel = catalogGradeLabel;

    // Partition keys
    newCatalogGrade.initializePartitionKeys(newCatalogGrade.getPK(), newCatalogGrade.getSK());

    await newCatalogGrade.save();

    return newCatalogGrade.toItem();
  }

  public static async getCatalogGrades(schoolId: String) {
    const items = await getItemsGSI<CatalogGradeInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogGrade.getGSI1PK(schoolId), ':GSI1SK': CatalogGrade.getGSI1SK('') }
    });

    return items.map(CatalogGrade.fromDB);
  }

  public static async updateOne(catalogGradeId: String, catalogGradeData: { catalogGradeLabel: String }) {
    const updatedItem = await updateItem<CatalogGradeInterface>(
      CatalogGrade.getPK(catalogGradeId),
      CatalogGrade.getSK(catalogGradeId),
      `SET #catalogGradeLabel=:catalogGradeLabel`,
      { '#catalogGradeLabel': 'catalogGradeLabel' },
      { ':catalogGradeLabel': catalogGradeData.catalogGradeLabel }
    );

    return CatalogGrade.fromDB(updatedItem);
  }
}

export { CatalogGrade };
