import { Request } from 'express';

import createCatalogRoleMethod from './createCatalogRole';
import deleteCatalogRoleMethod from './deleteCatalogRole';
import getCatalogRoleMethod from './getCatalogRole';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogRole = catchAsync((req: Request) => createCatalogRoleMethod(req.body.schoolId, req.body.catalogRoleName));
export const deleteCatalogRole = catchAsync((req: Request<{}, {}, {}, { catalogRolesIds: String }>) =>
  deleteCatalogRoleMethod(req.query.catalogRolesIds)
);
export const getCatalogRole = catchAsync((req: Request<{}, {}, {}, { schoolId: String }>) => getCatalogRoleMethod(req.query.schoolId));
