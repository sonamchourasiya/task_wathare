

import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    ts: { type: Date, required: true },
    machine_status: { type: Number, required: true },
    vibration: { type: Number, required: true }
  }
);


export const Time = mongoose.model('Timebar', dataSchema);
