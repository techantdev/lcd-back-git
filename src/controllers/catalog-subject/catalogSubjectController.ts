import createCatalogSubjectMethod from './createCatalogSubject';
import deleteCatalogSubjectMethod from './deleteCatalogSubject';
import getCatalogSubjectMethod from './getCatalogSubject';
import updateCatalogSubjectMethod from './updateCatalogSubject';
import assignGradeCatalogSubjectMethod from './assignGradeCatalogSubject';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubject = catchAsync((req: Request) => createCatalogSubjectMethod());
export const deleteCatalogSubject = catchAsync((req: Request) => deleteCatalogSubjectMethod());
export const getCatalogSubject = catchAsync((req: Request) => getCatalogSubjectMethod());
export const updateCatalogSubject = catchAsync((req: Request) => updateCatalogSubjectMethod());
export const assignGradeCatalogSubject = catchAsync((req: Request) => assignGradeCatalogSubjectMethod());
