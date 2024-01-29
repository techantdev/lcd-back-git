import {
  CATALOGSUBTOPIC,
  CATALOGTOPIC,
  CatalogSubTopicDB,
  CatalogSubTopicRaw,
  catalogSubTopicSchemaDB
} from '../schemas/CatalogSubTopicSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogSubTopic extends DatabaseEntity {
  private catalogSubTopicId: string;
  private catalogTopicId: string;
  private catalogSubTopicName: string;

  constructor() {
    super();
    this.schema = catalogSubTopicSchemaDB;
  }

  getPK() {
    return `${CATALOGSUBTOPIC}_${this.catalogSubTopicId}`;
  }

  getSK() {
    return `${CATALOGSUBTOPIC}_${this.catalogSubTopicId}`;
  }

  getGSI1PK() {
    return `${CATALOGTOPIC}_${this.catalogTopicId}`;
  }

  getGSI1SK() {
    return `${CATALOGSUBTOPIC}_${this.catalogSubTopicId}`;
  }

  initializeFields(fields: CatalogSubTopicRaw) {
    this.catalogSubTopicId = fields.catalogSubTopicId;
    this.catalogTopicId = fields.catalogTopicId;
    this.catalogSubTopicName = fields.catalogSubTopicName;
  }

  getRawItem() {
    return {
      catalogSubTopicId: this.catalogSubTopicId,
      catalogTopicId: this.catalogTopicId,
      catalogSubTopicName: this.catalogSubTopicName
    };
  }

  // STATIC
  public static getPK(catalogSubTopicId: String) {
    return `${CATALOGSUBTOPIC}_${catalogSubTopicId}`;
  }

  public static getSK(catalogSubTopicId: String) {
    return `${CATALOGSUBTOPIC}_${catalogSubTopicId}`;
  }

  public static getGSI1PK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
  }

  public static getGSI1SK(catalogSubTopicId: String) {
    return `${CATALOGSUBTOPIC}_${catalogSubTopicId}`;
  }

  public static fromRawFields = (fields: CatalogSubTopicDB) => {
    const instance = new CatalogSubTopic();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ catalogTopicId, catalogSubTopicName }: { catalogTopicId: string; catalogSubTopicName: string }) {
    const instance = new CatalogSubTopic();
    instance.initializeFields({
      catalogSubTopicId: CatalogSubTopic.generateId(),
      catalogTopicId: catalogTopicId,
      catalogSubTopicName: catalogSubTopicName
    });
    return await instance.save<CatalogSubTopicRaw>();
  }

  public static async getCatalogSubTopics(catalogTopicId: String) {
    const items = await getItemsGSI<CatalogSubTopicDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogSubTopic.getGSI1PK(catalogTopicId) }
    });

    return items.map(CatalogSubTopic.fromRawFields);
  }
}

export { CatalogSubTopic };
