import createCatalogGradeMethod from './createCatalogGrade';
import deleteCatalogGradeMethod from './deleteCatalogGrade';
import getCatalogGradeMethod from './getCatalogGrade';
import updateCatalogGradeMethod from './updateCatalogGrade';

import { catchAsync } from'../../middleware/middleware';

export const createCatalogGrade = catchAsync(req => createCatalogGradeMethod());
export const deleteCatalogGrade = catchAsync(req => deleteCatalogGradeMethod());
export const getCatalogGrade = catchAsync(req => getCatalogGradeMethod());
export const updateCatalogGrade = catchAsync(req => updateCatalogGradeMethod());
