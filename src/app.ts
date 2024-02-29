// const path = require('path');
import express from 'express';
// const morgan from 'morgan'
// const rateLimit from 'express-rate-limit'
// const helmet from 'helmet'
// const mongoSanitize from 'express-mongo-sanitize'
// const xss from 'xss-clean'
// const hpp from 'hpp'
// const cookieParser from 'cookie-parser'
// const bodyParser from 'body-parser'
// const compression from 'compression'
import globalErrorHandler from './middleware/errorController';
import { unhandledRoutes, logMiddlerware } from './middleware/middleware';
import cors from 'cors';

// Se hace el import de las rutas, una por cada entidad.

// const AppError from './utils/appError'
// const globalErrorHandler from './controllers/errorController'
import academicYearRouter from './routes/academicYearRoutes';
import catalogAchievementIndicatorRouter from './routes/catalogAchievementIndicatorRoutes';
import catalogAchievementRouter from './routes/catalogAchievementRoutes';
import catalogAreaRouter from './routes/catalogAreaRoutes';
import catalogGradeRouter from './routes/catalogGradeRoutes';
import catalogRolesRouter from './routes/catalogRolesRoutes';
import catalogSubjectRouter from './routes/catalogSubjectRoutes';
import catalogSubTopicRouter from './routes/catalogSubTopicRoutes';
import catalogTopicRouter from './routes/catalogTopicRoutes';
import catalogUnitRouter from './routes/catalogUnitRoutes';
import courseRouter from './routes/courseRoutes';
import schoolRouter from './routes/schoolRoutes';
import teacherRouter from './routes/teacherRoutes';
import trackerRouter from './routes/trackerRoutes';
import userRouter from './routes/userRoutes';
import yearAreaRouter from './routes/yearAreaRoutes';
import yearGradeRouter from './routes/yearGradeRoutes';
import YearSubjectRouter from './routes/YearSubjectRoutes';
import YearSubjectCourse from './routes/YearSubjectCourseRoutes';
import competence from './routes/competenceRoutes';
import task from './routes/taskRoutes';
// const userRouter from './routes/userRoutes'
// const reviewRouter from './routes/reviewRoutes'
// const bookingRouter from './routes/bookingRoutes'
// const bookingController from './controllers/bookingController'
// const viewRouter from './routes/viewRoutes'

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

app.options('*', cors());
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
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
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
//
//   next();
// });

// Log middleware
app.use(logMiddlerware);

// 3) ROUTES
// Crear una ruta por cada entidad
app.use('/api/v1/academic-year', academicYearRouter);
app.use('/api/v1/catalog-achievement-indicator', catalogAchievementIndicatorRouter);
app.use('/api/v1/catalog-achievement', catalogAchievementRouter);
app.use('/api/v1/catalog-area', catalogAreaRouter);
app.use('/api/v1/catalog-grade', catalogGradeRouter);
app.use('/api/v1/catalog-roles', catalogRolesRouter);
app.use('/api/v1/catalog-subject', catalogSubjectRouter);
app.use('/api/v1/catalog-sub-topic', catalogSubTopicRouter);
app.use('/api/v1/catalog-topic', catalogTopicRouter);
app.use('/api/v1/catalog-unit', catalogUnitRouter);
app.use('/api/v1/course', courseRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/tracker', trackerRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/year-area', yearAreaRouter);
app.use('/api/v1/year-grade', yearGradeRouter);
app.use('/api/v1/year-subject', YearSubjectRouter);
app.use('/api/v1/year-subject-course', YearSubjectCourse);
app.use('/api/v1/competence', competence);
app.use('/api/v1/task', task);
// Unhandled routes
app.all('*', unhandledRoutes);

// Error handling
app.use(globalErrorHandler);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

export default app;
