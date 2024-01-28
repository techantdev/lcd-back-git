import catalogSubjectSchema, { CATALOGSUBJECT, CATALOGAREA, CatalogSubjectInterface } from '../schemas/CatalogSubjectSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

type CatalogSubjectGrades = { catalogGradeId: String }[];

class CatalogSubject extends DatabaseEntity {
  private catalogSubjectId: String;
  private catalogAreaId: String;
  private catalogSubjectName: String;
  private catalogSubjectGrades: CatalogSubjectGrades;

  constructor() {
    super();
    this.schema = catalogSubjectSchema;
  }

  getPK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}`;
  }

  getSK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}`;
  }

  getGSI1PK() {
    return `${CATALOGAREA}_${this.catalogAreaId}`;
  }

  getGSI1SK() {
    return `${CATALOGSUBJECT}_${this.catalogSubjectId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      catalogSubjectId: this.catalogSubjectId,
      catalogAreaId: this.catalogAreaId,
      catalogSubjectName: this.catalogSubjectName,
      catalogSubjectGrades: this.catalogSubjectGrades
    };
  }

  // STATIC
  public static getPK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}`;
  }

  public static getSK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}`;
  }

  public static getGSI1PK(catalogAreaId: String) {
    return `${CATALOGAREA}_${catalogAreaId}`;
  }

  public static getGSI1SK(catalogSubjectId: String) {
    return `${CATALOGSUBJECT}_${catalogSubjectId}`;
  }

  public static fromDB(item: CatalogSubjectInterface) {
    const newCatalogSubject = new CatalogSubject();

    newCatalogSubject.catalogSubjectId = item.catalogSubjectId;

    // Attributes from params
    newCatalogSubject.catalogAreaId = item.catalogAreaId;
    newCatalogSubject.catalogSubjectName = item.catalogSubjectName;
    newCatalogSubject.catalogSubjectGrades = item.catalogSubjectGrades;

    // Partition keys
    newCatalogSubject.initializePartitionKeys(newCatalogSubject.getPK(), newCatalogSubject.getSK());

    return newCatalogSubject.toItem();
  }

  // TODO: Ajustar todos los insertOnes de todas las entidades para que compartan lógica con fromDB.
  public static async insertOne({
    catalogAreaId,
    catalogSubjectName,
    catalogSubjectGrades
  }: {
    catalogAreaId: String;
    catalogSubjectName: String;
    catalogSubjectGrades: CatalogSubjectGrades;
  }) {
    const newCatalogSubject = new CatalogSubject();

    newCatalogSubject.catalogSubjectId = newCatalogSubject.generateId();

    // Attributes from params
    newCatalogSubject.catalogAreaId = catalogAreaId;
    newCatalogSubject.catalogSubjectName = catalogSubjectName;
    newCatalogSubject.catalogSubjectGrades = catalogSubjectGrades;

    // Partition keys
    newCatalogSubject.initializePartitionKeys(newCatalogSubject.getPK(), newCatalogSubject.getSK());

    await newCatalogSubject.save();

    return newCatalogSubject.toItem();
  }

  public static async getCatalogSubjects(catalogAreaId: String) {
    const items = await getItemsGSI<CatalogSubjectInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogSubject.getGSI1PK(catalogAreaId), ':GSI1SK': CatalogSubject.getGSI1SK('') }
    });

    return items.map(CatalogSubject.fromDB);
  }

  // TODO: Añadir a todos los update la validación esquema.
  public static async updateOne(
    catalogSubjectId: String,
    catalogGradeData: { catalogSubjectName?: String; catalogSubjectGrades?: CatalogSubjectGrades }
  ) {
    const updatedItem = await updateItem<CatalogSubjectInterface>(
      CatalogSubject.getPK(catalogSubjectId),
      CatalogSubject.getSK(catalogSubjectId),
      `SET ${Object.keys(catalogGradeData)
        .map(key => `#${key}=:${key}`)
        .join(',')}`,
      Object.keys(catalogGradeData).reduce((prev, key) => ({ ...prev, [`#${key}`]: key }), {}),
      Object.entries(catalogGradeData).reduce((prev, [key, value]) => ({ ...prev, [`:${key}`]: value }), {})
    );

    return CatalogSubject.fromDB(updatedItem);
  }
}

export { CatalogSubject };
