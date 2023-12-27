import { DatabaseEntity } from '../classes/classesIndex';

class CatalogTopic extends DatabaseEntity {
  catalogTopicId: String;
  catalogUnitId: String;
  catalogTopicName: String;

  constructor(catalogUnitId: String, catalogTopicName: String) {
    super();
    this.catalogTopicId = this.generateId();
    this.catalogUnitId = catalogUnitId;
    this.catalogTopicName = catalogTopicName;
    this.initializeKeys(this.getPK(this.catalogTopicId), this.getSK(this.catalogTopicId));
  }

  getPK(catalogTopicId: String) {
    return `CATALOGTOPIC_${catalogTopicId}`;
  }

  getSK(catalogTopicId: String) {
    return `CATALOGTOPIC_${catalogTopicId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogTopicId: this.catalogTopicId,
      catalogUnitId: this.catalogUnitId,
      catalogTopicName: this.catalogTopicName
    };
  }
}

export { CatalogTopic };
