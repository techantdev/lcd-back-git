import catalogTopicSchema, { CATALOGTOPIC, CATALOGUNIT, CatalogTopicInterface } from '../schemas/CatalogTopicSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI } from '../services/dynamoService';

class CatalogTopic extends DatabaseEntity {
  private catalogTopicId: String;
  private catalogUnitId: String;
  private catalogTopicName: String;

  constructor() {
    super();
    this.schema = catalogTopicSchema;
  }

  getPK() {
    return `${CATALOGTOPIC}_${this.catalogTopicId}`;
  }

  getSK() {
    return `${CATALOGTOPIC}_${this.catalogTopicId}`;
  }

  getGSI1PK() {
    return `${CATALOGUNIT}_${this.catalogUnitId}`;
  }

  getGSI1SK() {
    return `${CATALOGTOPIC}_${this.catalogTopicId}`;
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.getGSI1PK(),
      GSI1SK: this.getGSI1SK()
    };
  }

  toItem() {
    return {
      catalogTopicId: this.catalogTopicId,
      catalogUnitId: this.catalogUnitId,
      catalogTopicName: this.catalogTopicName
    };
  }

  // STATIC
  public static getPK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
  }

  public static getSK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
  }

  public static getGSI1PK(catalogUnitId: String) {
    return `${CATALOGUNIT}_${catalogUnitId}`;
  }

  public static getGSI1SK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
  }

  public static fromDB(item: CatalogTopicInterface) {
    const newCatalogTopic = new CatalogTopic();

    newCatalogTopic.catalogTopicId = item.catalogTopicId;

    // Attributes from params
    newCatalogTopic.catalogUnitId = item.catalogUnitId;
    newCatalogTopic.catalogTopicName = item.catalogTopicName;

    // Partition keys
    newCatalogTopic.initializePartitionKeys(newCatalogTopic.getPK(), newCatalogTopic.getSK());

    return newCatalogTopic.toItem();
  }

  public static async insertOne({ catalogUnitId, catalogTopicName }: { catalogUnitId: String; catalogTopicName: String }) {
    const newCatalogTopic = new CatalogTopic();

    newCatalogTopic.catalogTopicId = newCatalogTopic.generateId();

    // Attributes from params
    newCatalogTopic.catalogUnitId = catalogUnitId;
    newCatalogTopic.catalogTopicName = catalogTopicName;

    // Partition keys
    newCatalogTopic.initializePartitionKeys(newCatalogTopic.getPK(), newCatalogTopic.getSK());

    await newCatalogTopic.save();

    return newCatalogTopic.toItem();
  }

  public static async getCatalogTopics(catalogUnitId: String) {
    const items = await getItemsGSI<CatalogTopicInterface>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogTopic.getGSI1PK(catalogUnitId) }
    });

    return items.map(CatalogTopic.fromDB);
  }
}

export { CatalogTopic };
