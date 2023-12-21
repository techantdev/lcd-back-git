import { Request } from 'express';

import getYearAreaMethod from './getYearArea';

import { catchAsync } from '../../middleware/middleware';

export const getYearArea = catchAsync((req: Request) => getYearAreaMethod());
