//import emailService from '/opt/js/services/emailService';
import { parseError } from '../services/utils';

// Ahora puedes usar Utils con tipado estático en el resto de tu código TypeScript

const errorSufixMessage =
  'Intenta más tarde y si el error persiste, por favor comunícate con nuestro equipo de soporte técnico soporte@appmelo.com';

const sendErrorDev = (err: any, res: any) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    stack: err.stack,
    data: err.data
  });
};

const sendErrorProd = (err: any, res: any) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
      data: err.data
    });
  } else {
    res.status(500).json({
      statusCode: 500,
      status: 'error',
      message: 'Algo ha salido mal!',
      data: err.data
    });
  }
};

const logError = (error: any, parsedError: any) => {
  console.log('ERROR API', error);
  console.log('ERROR API parsed', parsedError);
};

/*
const sendErrorEmail = async (parsedError: any, inputData: any) => {
  return await emailService.sendErrorEmail({
    type: emailService.errorEmailTypes.API,
    description: `Lambda API - ${inputData.method} - ${inputData.path}`,
    data: { input: inputData, error: parsedError }
  });
};
*/

const getFilledError = (error: any) => {
  error.message = `${error.message || 'Esta acción no puede ser realizada por el momento'}. ${errorSufixMessage}`;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  error.stack = error.stackTrace ? error.stackTrace : error.stack;
  error.data = error.data ? error.data : {};
  return error;
};

export default async (err: any, _: any, res: any, __: any) => {
  err = getFilledError(err);
  const parsedError = parseError(err);
  logError(err, parsedError);
  //await sendErrorEmail(parsedError, { params: req.params, query: req.query, body: req.body, path: req.path, method: req.method });
  if (process.env.ENV === 'prod') {
    sendErrorProd(parsedError, res);
  } else {
    sendErrorDev(err, res);
  }
};
