import { Request } from 'express';

import createCatalogAchievementMethod from './createCatalogAchievement';
import deleteCatalogAchievementMethod from './deleteCatalogAchievement';
import getCatalogAchievementMethod from './getCatalogAchievement';
import updateCatalogAchievementMethod from './updateCatalogAchievement';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogAchievement = catchAsync((req: Request) =>
  createCatalogAchievementMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.catalogAchievementName)
);
export const deleteCatalogAchievement = catchAsync((req: Request<{}, {}, {}, { catalogAchievementsIds: String }>) =>
  deleteCatalogAchievementMethod(req.query.catalogAchievementsIds)
);
export const getCatalogAchievement = catchAsync((req: Request<{}, {}, {}, { catalogSubjectId: String; catalogGradeId: String }>) =>
  getCatalogAchievementMethod(req.query.catalogSubjectId, req.query.catalogGradeId)
);
export const updateCatalogAchievement = catchAsync((req: Request) =>
  updateCatalogAchievementMethod(req.params.catalogAchievementId, req.body.catalogAchievementName)
);
