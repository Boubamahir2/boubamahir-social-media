import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cron from 'node-cron';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimiter from 'express-rate-limit';
import path from 'path';
import fileUpload from 'express-fileupload';
import { fileURLToPath } from 'url';
import compression from "compression";
import utility from './utils/utility.js';
import models from './models/index.js';

// Routers
import authRouter from './modules/auth/routes/index.js';
import userRouter  from './modules/user/routes/index.js'
import adminRouter  from './modules/admin/routes/index.js'
import postRouter from './modules/post/routes/index.js';
import notificationRouter from './modules/notification/routes/index.js';
import locationInfoRouter from './modules/location_info/routes/index.js'; 
import tagRouter from './modules/hastag/routes/index.js'; 
import chatRouter from './modules/chat/routes/index.js'; 
import updateRouter from './modules/app_upadate/routes/index.js'; 


// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authMiddleware from './middleware/authentication.js';

// 
export const runApp = () => {
  const app = express();
  

  app.use(
    cors({
      origin: '*',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token'],
    })
  );

  app.use(express.json({ limit: '100mb' }));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(compression());
  app.use(morgan('common'));
  app.use(bodyParser.json({ limit: '30mb', extended: true }));
  app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
  app.use(mongoSanitize());
  app.set('trust proxy', true);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
    })
  );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );


  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'public')));

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  //documentation
  app.get('/api/v1', (req, res) => {
    res.send(
      "<h1>Welcome to Social media API</h1><br><a href='/api-docs'>Documetation</a>"
    );
  });

  // ROUTING
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/post', postRouter);
  app.use('/api/v1/dashboard', adminRouter);
  app.use('/api/v1/notification', notificationRouter);
  app.use('/api/v1/location-info', locationInfoRouter);
  app.use('/api/v1/tags', tagRouter);
  app.use('/api/v1/chat', chatRouter);
  app.use('/api/v1/update', updateRouter);

  // Schedule a task
  cron.schedule('59 23 * * *', () => {
    console.log('[cron]: task running every day at 11:59 PM');
    utility.deleteExpiredOTPs();
  });
  return app;
}



export const closeApp = (app) => {
  // Middleware for Errors
  app.use(errorHandlerMiddleware);
  app.use('*', (req, res, next) => {
    res.status(404).json({
      success: false,
      server: 'online',
      message: 'api endpoint not found',
    });
  });
}