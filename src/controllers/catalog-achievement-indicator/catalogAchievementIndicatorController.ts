import { Request } from 'express';

import createCatalogAchievementIndicatorMethod from './createCatalogAchievementIndicator';
import deleteCatalogAchievementIndicatorMethod from './deleteCatalogAchievementIndicator';
import getCatalogAchievementIndicatorMethod from './getCatalogAchievementIndicator';
import updateCatalogAchievementIndicatorMethod from './updateCatalogAchievementIndicator';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogAchievementIndicator = catchAsync((req: Request) => createCatalogAchievementIndicatorMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.catalogAchievementIndicatorName));
export const deleteCatalogAchievementIndicator = catchAsync((req: Request) => deleteCatalogAchievementIndicatorMethod());
export const getCatalogAchievementIndicator = catchAsync((req: Request) => getCatalogAchievementIndicatorMethod());
export const updateCatalogAchievementIndicator = catchAsync((req: Request) => updateCatalogAchievementIndicatorMethod());
