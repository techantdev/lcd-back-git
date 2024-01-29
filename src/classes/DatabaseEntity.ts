import { ulid } from 'ulid';
import { ObjectSchema } from 'yup';

import { putItem, putItems, getItem } from '../services/dynamoService';

abstract class DatabaseEntity {
  private PK: String;
  private SK: String;
  private GSI1PK?: String;
  private GSI1SK?: String;
  private GSI2PK?: String;
  private GSI2SK?: String;

  schema: ObjectSchema<{}>;

  // ABSTRACT METHODS

  abstract getPK(): String;

  abstract getSK(): String;

  abstract getRawItem(): Object;

  abstract initializeFields(fields: any): void;

  // DEFAULTS
  getGSI1PK() {
    return '';
  }

  getGSI1SK() {
    return '';
  }

  getGSI2PK() {
    return '';
  }

  getGSI2SK() {
    return '';
  }

  // METHODS

  initializePartitionKeys() {
    this.PK = this.getPK();
    this.SK = this.getSK();
  }

  getPartitionKeysObject() {
    return { PK: this.PK, SK: this.SK };
  }

  initializeGSIsKeys() {
    this.GSI1PK = this.getGSI1PK?.();
    this.GSI1SK = this.getGSI1SK?.();
    this.GSI2PK = this.getGSI2PK?.();
    this.GSI2SK = this.getGSI2SK?.();
  }

  getGSIKeysObject() {
    return {
      GSI1PK: this.GSI1PK,
      GSI1SK: this.GSI1SK,
      GSI2PK: this.GSI2PK,
      GSI2SK: this.GSI2SK
    };
  }

  async saveToDB(itemToSave: Object) {
    return await putItem(itemToSave);
  }

  async save<T>() {
    this.initializePartitionKeys();
    this.initializeGSIsKeys();
    const itemToSave = this.toDBItem();
    await this.schema.validate(itemToSave);
    await this.saveToDB(itemToSave);
    return this.getRawItem() as T;
  }

  async get() {
    this.initializePartitionKeys();
    const gettedItem = await getItem(this.PK, this.SK);
    this.initializeFields(gettedItem);
    return this.getRawItem();
  }

  toDBItem() {
    return { ...this.getPartitionKeysObject(), ...this.getGSIKeysObject(), ...this.getRawItem() };
  }

  // STATIC

  public static generateId() {
    return ulid();
  }

  public static async saveMultiple<T>(instances: DatabaseEntity[]) {
    const itemsToSave = await Promise.all(
      instances.map(async instance => {
        instance.initializePartitionKeys();
        instance.initializeGSIsKeys();
        const itemToSave = instance.toDBItem();
        await instance.schema.validate(itemToSave);
        const itemRaw = instance.getRawItem();
        return { itemRaw, itemToSave };
      })
    );
    await putItems(itemsToSave.map(({ itemToSave }) => itemToSave));
    return itemsToSave.map(({ itemRaw }) => itemRaw) as T[];
  }
}

export default DatabaseEntity;
