import { Request } from 'express';

import createCatalogUnitMethod from './createCatalogUnit';
import deleteCatalogUnitMethod from './deleteCatalogUnit';
import getCatalogUnitsMethod from './getCatalogUnits';
import updateCatalogUnitMethod from './updateCatalogUnit';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogUnit = catchAsync((req: Request) =>
  createCatalogUnitMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.catalogUnitName)
);
export const deleteCatalogUnit = catchAsync((/*req: Request*/) => deleteCatalogUnitMethod());
export const getCatalogUnits = catchAsync((req: Request<{}, {}, {}, { catalogSubjectId: String; catalogGradeId: String }>) =>
  getCatalogUnitsMethod(req.query.catalogSubjectId, req.query.catalogGradeId)
);
export const updateCatalogUnit = catchAsync((req: Request<{}, {}, { catalogUnitName: String }, { catalogUnitId: String }>) =>
  updateCatalogUnitMethod(req.query.catalogUnitId, req.body.catalogUnitName)
);
