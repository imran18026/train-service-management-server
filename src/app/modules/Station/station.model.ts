import { Schema, model } from 'mongoose';
import { StationModel, TStation } from './station.interface';

const stationSchema = new Schema<TStation, StationModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Station = model<TStation, StationModel>('Station', stationSchema);
