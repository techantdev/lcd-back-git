import createCatalogTopicMethod from './createCatalogTopic';
import deleteCatalogTopicMethod from './deleteCatalogTopic';
import getCatalogTopicMethod from './getCatalogTopic';
import updateCatalogTopicMethod from './updateCatalogTopic';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogTopic = catchAsync(req => createCatalogTopicMethod());
export const deleteCatalogTopic = catchAsync(req => deleteCatalogTopicMethod());
export const getCatalogTopic = catchAsync(req => getCatalogTopicMethod());
export const updateCatalogTopic = catchAsync(req => updateCatalogTopicMethod());
