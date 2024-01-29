import { DatabaseEntity } from '../classes/classesIndex';
import { CATALOGROLES, catalogRolesSchemaDB } from '../schemas/CatalogRolesSchema';

class CatalogRoles extends DatabaseEntity {
  catalogRoleId: string;
  catalogRoleName: string;

  constructor() {
    super();
    this.schema = catalogRolesSchemaDB;
  }

  getPK() {
    return `${CATALOGROLES}_${this.catalogRoleId}`;
  }

  getSK() {
    return `${CATALOGROLES}_${this.catalogRoleId}`;
  }

  initializeFields() {}

  getRawItem() {
    return {
      catalogRoleId: this.catalogRoleId,
      catalogRoleName: this.catalogRoleName
    };
  }
}

export { CatalogRoles };
