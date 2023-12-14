import createCatalogAchievementMethod from './createCatalogAchievement';
import deleteCatalogAchievementMethod from './deleteCatalogAchievement';
import getCatalogAchievementMethod from'./getCatalogAchievement';
import updateCatalogAchievementMethod from'./updateCatalogAchievement';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogAchievement = catchAsync(req => createCatalogAchievementMethod());
export const deleteCatalogAchievement = catchAsync(req => deleteCatalogAchievementMethod());
export const getCatalogAchievement = catchAsync(req => getCatalogAchievementMethod());
export const updateCatalogAchievement = catchAsync(req => updateCatalogAchievementMethod());
