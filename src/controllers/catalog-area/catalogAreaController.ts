import { Request } from 'express';

import createCatalogAreaMethod from './createCatalogArea';
import deleteCatalogAreaMethod from './deleteCatalogArea';
import getCatalogAreaMethod from './getCatalogArea';
import updateCatalogAreaMethod from './updateCatalogArea';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogArea = catchAsync((req: Request) => createCatalogAreaMethod(req.body.schoolId, req.body.catalogAreaName));
export const deleteCatalogArea = catchAsync((req: Request) => deleteCatalogAreaMethod());
export const getCatalogArea = catchAsync((req: Request<{}, {}, {}, { schoolId: String }>) => 
    getCatalogAreaMethod(req.query.schoolId)
    );
export const updateCatalogArea = catchAsync((req: Request) => updateCatalogAreaMethod());
