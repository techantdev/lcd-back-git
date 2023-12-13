import { RequestHandler } from 'express';

const sendQueryResponse = (res, status, response) => {
  res.status(status).json({
    statusCode: status,
    body: response
  });
};

const catchAsync = fn => (req, res, next) =>
  fn(req)
    .then(response => sendQueryResponse(res, 200, response))
    .catch(next);

const unhandledRoutes = (req, res) => {
  sendQueryResponse(res, 404, 'Can not find ' + req.originalUrl);
};

const decodeURL = (req, _, next) => {
  req.query = Object.keys(req.query).reduce((prev, key) => ({ ...prev, [key]: req.query[key].replace(/\$/g, '#') }), {});
  next();
};

const globalMiddelwares = app => {
  app.use(decodeURL);
};

const logMiddlerware = (req, _, next) => {
  const businessId = req.body?.businessId || req.params?.businessId;
  console.log(
    `LOG API ${businessId || ''}`,
    JSON.stringify({ path: req.path, params: req.params, query: req.query, body: req.body, method: req.method })
  );
  next();
};

export { sendQueryResponse, catchAsync, unhandledRoutes, decodeURL, globalMiddelwares, logMiddlerware };
