import createCatalogUnitMethod from './createCatalogUnit';
import deleteCatalogUnitMethod from './deleteCatalogUnit';
import getCatalogUnitMethod from './getCatalogUnit';
import updateCatalogUnitMethod from './updateCatalogUnit';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogUnit = catchAsync((req: Request) => createCatalogUnitMethod());
export const deleteCatalogUnit = catchAsync((req: Request) => deleteCatalogUnitMethod());
export const getCatalogUnit = catchAsync((req: Request) => getCatalogUnitMethod());
export const updateCatalogUnit = catchAsync((req: Request) => updateCatalogUnitMethod());
