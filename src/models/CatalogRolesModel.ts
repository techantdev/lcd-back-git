import { DatabaseEntity } from '../classes/classesIndex';

class CatalogRoles extends DatabaseEntity {
  catalogRoleId: String;
  catalogRoleName: String;

  constructor(catalogRoleName: String) {
    super();
    this.catalogRoleId = this.generateId();
    this.catalogRoleName = catalogRoleName;
    this.initializeKeys(this.getPK(this.catalogRoleId), this.getSK(this.catalogRoleId));
  }

  getPK(catalogRoleId: String) {
    return `CATALOGROLES_${catalogRoleId}`;
  }

  getSK(catalogRoleId: String) {
    return `CATALOGROLES_${catalogRoleId}`;
  }

  async save() {}

  toItem() {
    return {
      catalogRoleId: this.catalogRoleId,
      catalogRoleName: this.catalogRoleName
    };
  }
}

export { CatalogRoles };
