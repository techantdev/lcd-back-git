import { DatabaseEntity } from '../classes/classesIndex';
import catalogTopicSchema from '../schemas/CatalogTopicSchema';

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
    return `CATALOGTOPIC_${catalogTopicId}`;
  }

  getSK(catalogTopicId: String) {
    return `CATALOGTOPIC_${catalogTopicId}`;
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
