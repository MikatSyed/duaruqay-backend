
import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler.js';
import routes from './app/routes/index.js';



const app = express();


const allowedOrigins =['http://localhost:3000','https://home-crafter.vercel.app']


const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
