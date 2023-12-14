import getUserMethod from './getUser';

import { catchAsync } from '../../middleware/middleware';

export const getUser = catchAsync(req => getUserMethod());
