import {
  CATALOGSUBJECT,
  CATALOGAREA,
  catalogSubjectSchemaDB,
  CatalogSubjectRaw,
  CatalogSubjectDB,
  CatalogSubjectGrades
} from '../schemas/CatalogSubjectSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogSubject extends DatabaseEntity {
  private catalogSubjectId: string;
  private catalogAreaId: string;
  private catalogSubjectName: string;
  private catalogSubjectGrades: CatalogSubjectGrades;

  constructor() {
    super();
    this.schema = catalogSubjectSchemaDB;
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

  initializeFields(fields: CatalogSubjectRaw) {
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogAreaId = fields.catalogAreaId;
    this.catalogSubjectName = fields.catalogSubjectName;
    this.catalogSubjectGrades = fields.catalogSubjectGrades;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: CatalogSubjectDB) => {
    const instance = new CatalogSubject();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  // TODO: Ajustar todos los insertOnes de todas las entidades para que compartan lógica con fromDB.
  public static async insertOne({
    catalogAreaId,
    catalogSubjectName,
    catalogSubjectGrades
  }: {
    catalogAreaId: string;
    catalogSubjectName: string;
    catalogSubjectGrades: CatalogSubjectGrades;
  }) {
    const instance = new CatalogSubject();
    instance.initializeFields({
      catalogSubjectId: CatalogSubject.generateId(),
      catalogAreaId,
      catalogSubjectName,
      catalogSubjectGrades
    });
    return await instance.save<CatalogSubjectRaw>();
  }

  public static async getCatalogSubjects(catalogAreaId: String) {
    const items = await getItemsGSI<CatalogSubjectDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogSubject.getGSI1PK(catalogAreaId), ':GSI1SK': CatalogSubject.getGSI1SK('') }
    });

    return items.map(CatalogSubject.fromRawFields);
  }

  // TODO: Añadir a todos los update la validación esquema.
  public static async updateOne(
    catalogSubjectId: String,
    catalogGradeData: { catalogSubjectName?: String; catalogSubjectGrades?: CatalogSubjectGrades }
  ) {
    const updatedItem = await updateItem<CatalogSubjectDB>(
      CatalogSubject.getPK(catalogSubjectId),
      CatalogSubject.getSK(catalogSubjectId),
      `SET ${Object.keys(catalogGradeData)
        .map(key => `#${key}=:${key}`)
        .join(',')}`,
      Object.keys(catalogGradeData).reduce((prev, key) => ({ ...prev, [`#${key}`]: key }), {}),
      Object.entries(catalogGradeData).reduce((prev, [key, value]) => ({ ...prev, [`:${key}`]: value }), {})
    );

    return CatalogSubject.fromRawFields(updatedItem);
  }
}

export { CatalogSubject };
