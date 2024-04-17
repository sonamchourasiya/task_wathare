import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import timesRoute from './routes/timesRoute.js';
import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors());


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Wathare Infotech');
});

app.use('/times', timesRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
