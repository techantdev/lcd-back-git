import { RequestHandler } from 'express';

const sendQueryResponse = (res: any, status: any, response: any) => {
  res.status(status).json({
    statusCode: status,
    body: response
  });
};

const catchAsync = (fn: any): RequestHandler => {
  return async (req, res, next) => {
    try {
      const response = await fn(req);
      sendQueryResponse(res, 200, response);
    } catch (error) {
      next(error);
    }
  };
};

const unhandledRoutes: RequestHandler = (req, res) => {
  sendQueryResponse(res, 404, 'Can not find ' + req.originalUrl);
};

const decodeURL: RequestHandler = (req, _, next) => {
  // req.query = Object.keys(req.query).reduce((prev, key) => ({ ...prev, [key]: req.query[key].replace(/\$/g, '#') }), {});
  console.log(req);

  next();
};

// const globalMiddelwares = app => {
//   app.use(decodeURL);
// };

const logMiddlerware: RequestHandler = ({ method, path, params, query, body }, _, next) => {
  console.log({ method, path, params, query, body });
  next();
};

export { sendQueryResponse, catchAsync, unhandledRoutes, decodeURL, /*globalMiddelwares,*/ logMiddlerware };
