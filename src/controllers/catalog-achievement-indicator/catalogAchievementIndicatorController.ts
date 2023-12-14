import createCatalogAchievementIndicatorMethod from './createCatalogAchievementIndicator';
import deleteCatalogAchievementIndicatorMethod from './deleteCatalogAchievementIndicator';
import getCatalogAchievementIndicatorMethod from './getCatalogAchievementIndicator';
import updateCatalogAchievementIndicatorMethod from './updateCatalogAchievementIndicator';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogAchievementIndicator = catchAsync(req => createCatalogAchievementIndicatorMethod());
export const deleteCatalogAchievementIndicator = catchAsync(req => deleteCatalogAchievementIndicatorMethod());
export const getCatalogAchievementIndicator = catchAsync(req => getCatalogAchievementIndicatorMethod());
export const updateCatalogAchievementIndicator = catchAsync(req => updateCatalogAchievementIndicatorMethod());
