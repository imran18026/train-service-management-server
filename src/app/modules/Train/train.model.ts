import { model, Schema } from 'mongoose';
import { TrainModel, TrainStatus, TSchedule, TTrain } from './train.interface';

const scheduleSchema = new Schema<TSchedule>(
  {
    arrivalTime: { type: Date, required: [true, 'Arrival time is required'] },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required'],
    },
    station: {
      type: Schema.Types.ObjectId,
      required: [true, 'Station is required'],
      ref: 'Station',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const trainSchema = new Schema<TTrain, TrainModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    schedule: {
      type: [scheduleSchema],
      required: [true, 'Schedule is required'],
    },
    status: {
      type: String,
      enum: Object.values(TrainStatus),
      default: TrainStatus.STAND,
    },
    lastUpdated: { type: Date, default: Date.now },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Train = model<TTrain, TrainModel>('Train', trainSchema);
