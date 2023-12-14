import createCatalogSubTopicMethod from './createCatalogSubTopic';
import deleteCatalogSubTopicMethod from './deleteCatalogSubTopic';
import getCatalogSubTopicMethod from './getCatalogSubTopic';
import updateCatalogSubTopicMethod from './updateCatalogSubTopic';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubTopic = catchAsync(req => createCatalogSubTopicMethod());
export const deleteCatalogSubTopic = catchAsync(req => deleteCatalogSubTopicMethod());
export const getCatalogSubTopic = catchAsync(req => getCatalogSubTopicMethod());
export const updateCatalogSubTopic = catchAsync(req => updateCatalogSubTopicMethod());
