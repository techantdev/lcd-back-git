import { DatabaseEntity } from '../classes/classesIndex';
import catalogSubTopicSchema from '../schemas/CatalogSubTopicSchema';

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
    return `CATALOGSUBTOPIC_${catalogSubTopicId}`;
  }

  getSK(catalogSubTopicId: String) {
    return `CATALOGSUBTOPIC_${catalogSubTopicId}`;
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
