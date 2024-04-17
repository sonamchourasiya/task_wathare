import express from 'express';
import { Time } from '../models/dataModel.js';

const router = express.Router();

router.get('/', async (request, response) => {
  try {
    const times = await Time.find({});

    return response.status(200).json({
      count: times.length,
      data: times,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;
