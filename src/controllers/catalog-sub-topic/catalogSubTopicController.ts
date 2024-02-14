import { Request } from 'express';

import createCatalogSubTopicMethod from './createCatalogSubTopic';
import deleteCatalogSubTopicMethod from './deleteCatalogSubTopic';
import getCatalogSubTopicMethod from './getCatalogSubTopic';
import updateCatalogSubTopicMethod from './updateCatalogSubTopic';

import { catchAsync } from '../../middleware/middleware';

export const createCatalogSubTopic = catchAsync((req: Request) =>
  createCatalogSubTopicMethod(req.body.catalogTopicId, req.body.catalogSubTopicName)
);
export const deleteCatalogSubTopic = catchAsync((req: Request<{}, {}, {}, { catalogSubTopicsIds: String }>) =>
  deleteCatalogSubTopicMethod(req.query.catalogSubTopicsIds)
);
export const getCatalogSubTopic = catchAsync((req: Request<{}, {}, {}, { catalogTopicId: String }>) =>
  getCatalogSubTopicMethod(req.query.catalogTopicId)
);
export const updateCatalogSubTopic = catchAsync((/*req: Request*/) => updateCatalogSubTopicMethod());
