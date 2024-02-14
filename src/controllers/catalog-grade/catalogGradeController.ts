import { Request } from 'express';

import createCatalogGradeMethod from './createCatalogGrade';
import deleteCatalogGradeMethod from './deleteCatalogGrade';
import getCatalogGradeMethod from './getCatalogGrade';
import updateCatalogGradeMethod from './updateCatalogGrade';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogGrade = catchAsync((req: Request) =>
  createCatalogGradeMethod(req.body.schoolId, req.body.catalogGradeLabel)
);
export const deleteCatalogGrade = catchAsync((req: Request<{}, {}, {}, { catalogGradesIds: String }>) =>
  deleteCatalogGradeMethod(req.query.catalogGradesIds)
);
export const getCatalogGrade = catchAsync((req: Request<{}, {}, {}, { schoolId: String }>) =>
  getCatalogGradeMethod(req.query.schoolId)
);
export const updateCatalogGrade = catchAsync((req: Request) =>
  updateCatalogGradeMethod(req.params.catalogGradeId, req.body.catalogGradeLabel)
);
