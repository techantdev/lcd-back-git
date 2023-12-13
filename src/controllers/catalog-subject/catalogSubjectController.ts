const createCatalogSubject = require('./createCatalogSubject');
const deleteCatalogSubject = require('./deleteCatalogSubject');
const getCatalogSubject = require('./getCatalogSubject');
const updateCatalogSubject = require('./updateCatalogSubject');
const assignGradeCatalogSubject = require('./assignGradeCatalogSubject');

const { catchAsync } = require('../../middleware/middleware');

export const createCatalogSubject = catchAsync(req => createCatalogSubject());
export const deleteCatalogSubject = catchAsync(req => deleteCatalogSubject());
export const getCatalogSubject = catchAsync(req => getCatalogSubject());
export const updateCatalogSubject = catchAsync(req => updateCatalogSubject());
export const assignGradeCatalogSubject = catchAsync(REQ => assignGradeCatalogSubject());
