import createCatalogUnitMethod from './createCatalogUnit';
import deleteCatalogUnitMethod from './deleteCatalogUnit';
import getCatalogUnitMethod from './getCatalogUnit';
import updateCatalogUnitMethod from './updateCatalogUnit';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogUnit = catchAsync(req => createCatalogUnitMethod());
export const deleteCatalogUnit = catchAsync(req => deleteCatalogUnitMethod());
export const getCatalogUnit = catchAsync(req => getCatalogUnitMethod());
export const updateCatalogUnit = catchAsync(req => updateCatalogUnitMethod());
