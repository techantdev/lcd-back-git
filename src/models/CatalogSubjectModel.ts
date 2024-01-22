import catalogSubjectSchema, { CATALOGSUBJECT, CATALOGAREA, CatalogSubjectInterface } from '../schemas/CatalogSubjectSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogSubject extends DatabaseEntity {
  private catalogSubjectId: String;
  private catalogAreaId: String;
  private catalogSubjectName: String;
  // PONER EL CATALOG SUBGRADES QUE FALTA ARREGLO

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
      catalogSubjectName: this.catalogSubjectName
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
    // FALTA PONER CATALOGSUBJECTGRADES

    // Partition keys
    newCatalogSubject.initializePartitionKeys(newCatalogSubject.getPK(), newCatalogSubject.getSK());

    return newCatalogSubject.toItem();
  }

  public static async insertOne({ catalogAreaId, catalogSubjectName }: { catalogAreaId: String; catalogSubjectName: String }) {
    const newCatalogSubject = new CatalogSubject();

    newCatalogSubject.catalogSubjectId = newCatalogSubject.generateId();

    // Attributes from params
    newCatalogSubject.catalogAreaId = catalogAreaId;
    newCatalogSubject.catalogSubjectName = catalogSubjectName;
    // FALTA PONER CATALOGSUBJECTGRADES

    // Partition keys
    newCatalogSubject.initializePartitionKeys(newCatalogSubject.getPK(), newCatalogSubject.getSK());

    await newCatalogSubject.save();

    return newCatalogSubject.toItem();
  }

  public static async getCatalogSubjects(catalogAreaId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogSubject.getGSI1PK(catalogAreaId) }
    });

    return items.map(CatalogSubject.fromDB);
  }
}

export { CatalogSubject };
