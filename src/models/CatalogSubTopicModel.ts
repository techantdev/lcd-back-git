import { DatabaseEntity } from '../classes/classesIndex';

class CatalogSubTopic extends DatabaseEntity {
  catalogSubTopicId: String;
  catalogTopicId: String;
  catalogSubTopicName: String;

  constructor(catalogTopicId: String, catalogSubTopicName: String) {
    super();
    this.catalogSubTopicId = this.generateId();
    this.catalogTopicId = catalogTopicId;
    this.catalogSubTopicName = catalogSubTopicName;
    this.initializeKeys(this.getPK(this.catalogSubTopicId), this.getSK(this.catalogSubTopicId));
  }

  getPK(catalogSubTopicId: String) {
    return `CATALOGSUBTOPIC_${catalogSubTopicId}`;
  }

  getSK(catalogSubTopicId: String) {
    return `CATALOGSUBTOPIC_${catalogSubTopicId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogSubTopicId: this.catalogSubTopicId,
      catalogTopicId: this.catalogTopicId,
      catalogSubTopicName: this.catalogSubTopicName
    };
  }
}

export { CatalogSubTopic };
