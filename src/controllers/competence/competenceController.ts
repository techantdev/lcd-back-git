import { Request } from 'express';

import createCompetenceMethod from './createCompetence';
import deleteCompetenceMethod from './deleteCompetence';
import getCompetenceMethod from './getCompetence';
import updateCompetenceMethod from './updateCompetence';

import { catchAsync } from '../../middleware/middleware';

export const createCompetence = catchAsync((req: Request) =>
  createCompetenceMethod(req.body.catalogSubjectId, req.body.catalogGradeId, req.body.competenceName)
);
export const deleteCompetence = catchAsync((req: Request<{}, {}, {}, { competencesIds: String }>) =>
  deleteCompetenceMethod(req.query.competencesIds)
);
export const getCompetence = catchAsync((req: Request<{}, {}, {}, { catalogSubjectId: String; catalogGradeId: String }>) =>
  getCompetenceMethod(req.query.catalogSubjectId, req.query.catalogGradeId)
);
export const updateCompetence = catchAsync((req: Request) => updateCompetenceMethod(req.params.competenceId, req.body.competenceName));
