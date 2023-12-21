import { Request } from 'express';

import createCatalogTopicMethod from './createCatalogTopic';
import deleteCatalogTopicMethod from './deleteCatalogTopic';
import getCatalogTopicMethod from './getCatalogTopic';
import updateCatalogTopicMethod from './updateCatalogTopic';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogTopic = catchAsync((req: Request) => createCatalogTopicMethod());
export const deleteCatalogTopic = catchAsync((req: Request) => deleteCatalogTopicMethod());
export const getCatalogTopic = catchAsync((req: Request) => getCatalogTopicMethod());
export const updateCatalogTopic = catchAsync((req: Request) => updateCatalogTopicMethod());
