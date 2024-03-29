import { Request } from 'express';

import createTeacherMethod from './createTeacher';
import deleteTeacherMethod from './deleteTeacher';
import getTeacherMethod from './getTeacher';
import updateTeacherMethod from './updateTeacher';

import { catchAsync } from '../../middleware/middleware';

export const createTeacher = catchAsync((req: Request) =>
  createTeacherMethod(
    req.body.schoolId,
    req.body.userId,
    req.body.teacherName,
    req.body.teacherLastName,
    req.body.teacherAssignedCatalogAreasIds
  )
);
export const deleteTeacher = catchAsync((req: Request<{}, {}, {}, { teachersIds: String }>) =>
  deleteTeacherMethod(req.query.teachersIds)
);
export const getTeacher = catchAsync((req: Request<{}, {}, {}, { schoolId: String }>) => getTeacherMethod(req.query.schoolId));
export const updateTeacher = catchAsync((req: Request) => updateTeacherMethod(req.params.teacherId, req.body));
