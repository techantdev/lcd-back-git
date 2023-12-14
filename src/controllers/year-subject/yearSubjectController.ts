import getYearSubjectMethod from './getYearSubject';

import { catchAsync } from '../../middleware/middleware';

export const getYearSubject = catchAsync(req => getYearSubjectMethod());
