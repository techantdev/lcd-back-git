import { DatabaseEntity } from '../classes/classesIndex';
import catalogSubTopicSchema, { CATALOGSUBTOPIC, CATALOGTOPIC } from '../schemas/CatalogSubTopicSchema';

class CatalogSubTopic extends DatabaseEntity {
  catalogSubTopicId: String;
  catalogTopicId: String;
  catalogSubTopicName: String;

  constructor(catalogTopicId: String, catalogSubTopicName: String) {
    super();
    
    // Attributes from params
    this.catalogSubTopicId = this.generateId();
    this.catalogTopicId = catalogTopicId;
    this.catalogSubTopicName = catalogSubTopicName;
    
     // Schema
     this.schema = catalogSubTopicSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogSubTopicId), this.getSK(this.catalogSubTopicId));
  }

  getPK(catalogSubTopicId: String) {
    return `${CATALOGSUBTOPIC}_${catalogSubTopicId}`;
  }

  getSK(catalogSubTopicId: String) {
    return `${CATALOGSUBTOPIC}_${catalogSubTopicId}`;
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
}

export { CatalogSubTopic };
