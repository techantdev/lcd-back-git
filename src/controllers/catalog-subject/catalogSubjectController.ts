import { Request } from 'express';

import createCatalogSubjectMethod from './createCatalogSubject';
import deleteCatalogSubjectMethod from './deleteCatalogSubject';
import getCatalogSubjectMethod from './getCatalogSubject';
import updateCatalogSubjectMethod from './updateCatalogSubject';
import assignGradeCatalogSubjectMethod from './assignGradeCatalogSubject';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubject = catchAsync((req: Request) =>
  createCatalogSubjectMethod(req.body.catalogAreaId, req.body.catalogSubjectName)
);
export const deleteCatalogSubject = catchAsync((req: Request<{}, {}, {}, { catalogSubjectsIds: String }>) =>
  deleteCatalogSubjectMethod(req.query.catalogSubjectsIds)
);
export const getCatalogSubject = catchAsync((req: Request<{}, {}, {}, { catalogAreaId: String }>) =>
  getCatalogSubjectMethod(req.query.catalogAreaId)
);
export const updateCatalogSubject = catchAsync((req: Request) =>
  updateCatalogSubjectMethod(req.params.catalogSubjectId, req.body.catalogSubjectName)
);
export const assignGradeCatalogSubject = catchAsync((req: Request) =>
  assignGradeCatalogSubjectMethod(req.params.catalogSubjectId, req.body.catalogGradeIds)
);
