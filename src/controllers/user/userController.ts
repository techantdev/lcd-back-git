import { Request } from 'express';

import getUserMethod from './getUser';
import getUsersMethod from './getUsers';
import updateUserMethod from './updateUser';

import { catchAsync } from '../../middleware/middleware';

export const getUser = catchAsync((req: Request<{}, {}, {}, { email: string }>) => getUserMethod(req.query.email));

export const getUsers = catchAsync((req: Request<{}, {}, {}, { schoolId: string }>) => getUsersMethod(req.query.schoolId));

export const updateUser = catchAsync((req: Request) => updateUserMethod(req.params.userId, req.body));
