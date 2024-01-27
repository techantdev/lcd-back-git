import { Request } from 'express';

import getUserMethod from './getUser';

import { catchAsync } from '../../middleware/middleware';

export const getUser = catchAsync((req: Request<{}, {}, {}, { email: String }>) => getUserMethod(req.query.email));
