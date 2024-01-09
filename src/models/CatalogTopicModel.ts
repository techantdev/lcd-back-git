import { DatabaseEntity } from '../classes/classesIndex';
import catalogTopicSchema, { CATALOGTOPIC, CATALOGUNIT } from '../schemas/CatalogTopicSchema';

class CatalogTopic extends DatabaseEntity {
  catalogTopicId: String;
  catalogUnitId: String;
  catalogTopicName: String;

  constructor(catalogUnitId: String, catalogTopicName: String) {
    super();

    // Attributes from params
    this.catalogTopicId = this.generateId();
    this.catalogUnitId = catalogUnitId;
    this.catalogTopicName = catalogTopicName;

    // Schema
    this.schema = catalogTopicSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogTopicId), this.getSK(this.catalogTopicId));
  }

  getPK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
  }

  getSK(catalogTopicId: String) {
    return `${CATALOGTOPIC}_${catalogTopicId}`;
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
}

export { CatalogTopic };
