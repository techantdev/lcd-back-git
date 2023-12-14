import createCatalogSubjectMethod from './createCatalogSubject';
import deleteCatalogSubjectMethod from './deleteCatalogSubject';
import getCatalogSubjectMethod from './getCatalogSubject';
import updateCatalogSubjectMethod from './updateCatalogSubject';
import assignGradeCatalogSubjectMethod from './assignGradeCatalogSubject';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubject = catchAsync(req => createCatalogSubjectMethod());
export const deleteCatalogSubject = catchAsync(req => deleteCatalogSubjectMethod());
export const getCatalogSubject = catchAsync(req => getCatalogSubjectMethod());
export const updateCatalogSubject = catchAsync(req => updateCatalogSubjectMethod());
export const assignGradeCatalogSubject = catchAsync(req => assignGradeCatalogSubjectMethod());
