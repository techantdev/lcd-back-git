// const path = require('path');
const express = require("express");
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const compression = require('compression');
const cors = require("cors");

// Se hace el import de las rutas, una por cada entidad.

// const AppError = require('./utils/appError');
// const globalErrorHandler = require('./controllers/errorController');
const academicYearRouter = require("./routes/academicYearRoutes");
const catalogAchievementIndicatorRouter = require("./routes/catalogAchievementIndicatorRoutes");
const catalogAchievementRouter = require("./routes/catalogAchievementRoutes");
const catalogAreaRouter = require("./routes/catalogAreaRoutes");
const catalogGradeRouter = require("./routes/catalogGradeRoutes");
const catalogRolesRouter = require("./routes/catalogRolesRoutes");
const catalogSubjectRouter = require("./routes/catalogSubjectRoutes");
const catalogSubTopicRouter = require("./routes/catalogSubTopicRoutes");
const catalogTopicRouter = require("./routes/catalogTopicRoutes");
const catalogUnitRouter = require("./routes/catalogUnitRoutes");
const courseRouter = require("./routes/courseRoutes");
const schoolRouter = require("./routes/schoolRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const trackerRouter = require("./routes/trackerRoutes");
const userRouter = require("./routes/userRoutes");
const yearAreaRouter = require("./routes/yearAreaRoutes");
const yearGradeRouter = require("./routes/yearGradeRoutes");
const YearSubjectRouter = require("./routes/YearSubjectRoutes");
// const userRouter = require('./routes/userRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const bookingRouter = require('./routes/bookingRoutes');
// const bookingController = require('./controllers/bookingController');
// const viewRouter = require('./routes/viewRoutes');

// Start express app
const app = express();

// app.enable('trust proxy');

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options("*", cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
// app.use(helmet());

// Development logging
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// // Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
// app.post('/webhook-checkout', bodyParser.raw({ type: 'application/json' }), bookingController.webhookCheckout);

// // Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(cookieParser());

// // Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// // Data sanitization against XSS
// app.use(xss());

// // Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
//   })
// );

// app.use(compression());

// // Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.cookies);
//   next();
// });

// 3) ROUTES
// Crear una ruta por cada entidad
app.use("/api/v1/academic-year", academicYearRouter);
app.use(
  "/api/v1/catalog-achievement-indicator",
  catalogAchievementIndicatorRouter
);
app.use("/api/v1/catalog-achievement", catalogAchievementRouter);
app.use("/api/v1/catalog-area", catalogAreaRouter);
app.use("/api/v1/catalog-grade", catalogGradeRouter);
app.use("/api/v1/catalog-roles", catalogRolesRouter);
app.use("/api/v1/catalog-subject", catalogSubjectRouter);
app.use("/api/v1/catalog-sub-topic", catalogSubTopicRouter);
app.use("/api/v1/catalog-topic", catalogTopicRouter);
app.use("/api/v1/catalog-unit", catalogUnitRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/tracker", trackerRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/year-area", yearAreaRouter);
app.use("/api/v1/year-grade", yearGradeRouter);
app.use("/api/v1/year-subject", YearSubjectRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
