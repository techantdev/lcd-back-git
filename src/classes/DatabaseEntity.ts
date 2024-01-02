import { ulid } from 'ulid';
import { ObjectSchema } from 'yup';

import { putItem, getItem } from '../services/dynamoService';

abstract class DatabaseEntity {
  private PK: String;
  private SK: String;
  schema: ObjectSchema<{}>;

  // ABSTRACT METHODS

  abstract getPK(param: String): String;

  abstract getSK(param: String): String;

  abstract toItem(): Object;

  abstract getGSIKeysObject(): Object;

  // METHODS

  initializeKeys(PK: String, SK: String) {
    this.PK = PK;
    this.SK = SK;
  }

  generateId() {
    return ulid();
  }

  getPartitionKeysObject() {
    return { PK: this.PK, SK: this.SK };
  }

  async saveToDB(itemToSave: Object) {
    return await putItem(itemToSave);
  }

  async save() {
    const itemToSave = this.toDBItem();
    await this.schema.validate(itemToSave);
    return await this.saveToDB(itemToSave);
  }

  async get() {
    const gettedItem = await getItem(this.PK, this.SK);
    return gettedItem;
  }

  toDBItem() {
    const dbItem = { ...this.getPartitionKeysObject(), ...this.getGSIKeysObject(), ...this.toItem() };
    return dbItem;
  }
}

export default DatabaseEntity;
