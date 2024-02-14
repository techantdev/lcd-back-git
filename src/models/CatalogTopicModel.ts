import { CATALOGTOPIC, CATALOGUNIT, CatalogTopicDB, CatalogTopicRaw, catalogTopicSchemaDB } from '../schemas/CatalogTopicSchema';
import { DatabaseEntity } from '../classes/classesIndex';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, updateItem } from '../services/dynamoService';

class CatalogTopic extends DatabaseEntity {
  private catalogTopicId: string;
  private catalogUnitId: string;
  private catalogTopicName: string;

  constructor() {
    super();
    this.schema = catalogTopicSchemaDB;
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

  initializeFields(fields: CatalogTopicRaw) {
    this.catalogTopicId = fields.catalogTopicId;
    this.catalogUnitId = fields.catalogUnitId;
    this.catalogTopicName = fields.catalogTopicName;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: CatalogTopicDB) => {
    const instance = new CatalogTopic();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ catalogUnitId, catalogTopicName }: { catalogUnitId: string; catalogTopicName: string }) {
    const instance = new CatalogTopic();
    instance.initializeFields({
      catalogTopicId: CatalogTopic.generateId(),
      catalogUnitId: catalogUnitId,
      catalogTopicName: catalogTopicName
    });
    return await instance.save<CatalogTopicRaw>();
  }

  public static async getCatalogTopics(catalogUnitId: String) {
    const items = await getItemsGSI<CatalogTopicDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK' },
      ExpressionAttributeValues: { ':GSI1PK': CatalogTopic.getGSI1PK(catalogUnitId) }
    });

    return items.map(CatalogTopic.fromRawFields);
  }

  public static async updateOne(catalogTopicId: String, catalogGradeData: { catalogTopicName: String }) {
    const updatedItem = await updateItem<CatalogTopicDB>(
      CatalogTopic.getPK(catalogTopicId),
      CatalogTopic.getSK(catalogTopicId),
      `SET #catalogTopicName=:catalogTopicName`,
      { '#catalogTopicName': 'catalogTopicName' },
      { ':catalogTopicName': catalogGradeData.catalogTopicName }
    );

    return CatalogTopic.fromRawFields(updatedItem);
  }

  public static async deleteMany(catalogTopicsIds: string[]) {
    const PKsSKSList = catalogTopicsIds.map(catalogTopicId => {
      const instance = new CatalogTopic();
      instance.catalogTopicId = catalogTopicId;
      return instance.getPartitionKeysObject();
    });

    return await CatalogTopic.deleteManyByPartitionKeys(PKsSKSList);
  }
}

export { CatalogTopic };
