import createCatalogSubTopicMethod from './createCatalogSubTopic';
import deleteCatalogSubTopicMethod from './deleteCatalogSubTopic';
import getCatalogSubTopicMethod from './getCatalogSubTopic';
import updateCatalogSubTopicMethod from './updateCatalogSubTopic';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubTopic = catchAsync((req: Request) => createCatalogSubTopicMethod());
export const deleteCatalogSubTopic = catchAsync((req: Request) => deleteCatalogSubTopicMethod());
export const getCatalogSubTopic = catchAsync((req: Request) => getCatalogSubTopicMethod());
export const updateCatalogSubTopic = catchAsync((req: Request) => updateCatalogSubTopicMethod());
