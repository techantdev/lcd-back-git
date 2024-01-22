import catalogSubTopicSchema, { CATALOGSUBTOPIC, CATALOGTOPIC, CatalogSubTopicInterface } from '../schemas/CatalogSubTopicSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogSubTopic extends DatabaseEntity {
  private catalogSubTopicId: String;
  private catalogTopicId: String;
  private catalogSubTopicName: String;

  constructor() {
    super();
    this.schema = catalogSubTopicSchema;
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

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
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

  public static fromDB(item: CatalogSubTopicInterface) {
    const newCatalogSubTopic = new CatalogSubTopic();

    newCatalogSubTopic.catalogSubTopicId = item.catalogSubTopicId;

    // Attributes from params
    newCatalogSubTopic.catalogTopicId = item.catalogTopicId;
    newCatalogSubTopic.catalogSubTopicName = item.catalogSubTopicName;

    // Partition keys
    newCatalogSubTopic.initializePartitionKeys(newCatalogSubTopic.getPK(), newCatalogSubTopic.getSK());

    return newCatalogSubTopic.toItem();
  }

  public static async insertOne({ catalogTopicId, catalogSubTopicName }: { catalogTopicId: String; catalogSubTopicName: String }) {
    const newCatalogSubTopic = new CatalogSubTopic();

    newCatalogSubTopic.catalogSubTopicId = newCatalogSubTopic.generateId();

    // Attributes from params
    newCatalogSubTopic.catalogTopicId = catalogTopicId;
    newCatalogSubTopic.catalogSubTopicName = catalogSubTopicName;

    // Partition keys
    newCatalogSubTopic.initializePartitionKeys(newCatalogSubTopic.getPK(), newCatalogSubTopic.getSK());

    await newCatalogSubTopic.save();

    return newCatalogSubTopic.toItem();
  }

  public static async getCatalogSubTopics(catalogTopicId: String) {
    const items = await getItemsGSI(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogSubTopic.getGSI1PK(catalogTopicId) }
    });

    return items.map(CatalogSubTopic.fromDB);
  }
}

export { CatalogSubTopic };
