import { DatabaseEntity } from '../classes/classesIndex';
import catalogRolesSchema, { CATALOGROLES } from '../schemas/CatalogRolesSchema';

class CatalogRoles extends DatabaseEntity {
  catalogRoleId: String;
  catalogRoleName: String;

  constructor(catalogRoleName: String) {
    super();
    this.catalogRoleId = this.generateId();
    this.catalogRoleName = catalogRoleName;

    // Schema
    this.schema = catalogRolesSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.catalogRoleId), this.getSK(this.catalogRoleId));
  }

  getPK(catalogRoleId: String) {
    return `${CATALOGROLES}_${catalogRoleId}`;
  }

  getSK(catalogRoleId: String) {
    return `${CATALOGROLES}_${catalogRoleId}`;
  }

  toItem() {
    return {
      catalogRoleId: this.catalogRoleId,
      catalogRoleName: this.catalogRoleName
    };
  }
}

export { CatalogRoles };
