import { Request } from 'express';

import createCatalogAchievementMethod from './createCatalogAchievement';
import deleteCatalogAchievementMethod from './deleteCatalogAchievement';
import getCatalogAchievementMethod from './getCatalogAchievement';
import updateCatalogAchievementMethod from './updateCatalogAchievement';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogAchievement = catchAsync((req: Request) => createCatalogAchievementMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.catalogAchievementName));
export const deleteCatalogAchievement = catchAsync((req: Request) => deleteCatalogAchievementMethod());
export const getCatalogAchievement = catchAsync((req: Request) => getCatalogAchievementMethod());
export const updateCatalogAchievement = catchAsync((req: Request) => updateCatalogAchievementMethod());
