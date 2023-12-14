import createCatalogAreaMethod from './createCatalogArea';
import deleteCatalogAreaMethod from './deleteCatalogArea';
import getCatalogAreaMethod from './getCatalogArea';
import updateCatalogAreaMethod from './updateCatalogArea';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogArea = catchAsync(req => createCatalogAreaMethod());
export const deleteCatalogArea = catchAsync(req => deleteCatalogAreaMethod());
export const getCatalogArea = catchAsync(req => getCatalogAreaMethod());
export const updateCatalogArea = catchAsync(req => updateCatalogAreaMethod());
