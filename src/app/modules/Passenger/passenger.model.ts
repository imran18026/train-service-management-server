import { Schema, model } from 'mongoose';
import { PassengerModel, TPassenger } from './passenger.interface';

const passengerSchema = new Schema<TPassenger, PassengerModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User email is required'],
      unique: true,
      ref: 'User',
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Passenger = model<TPassenger, PassengerModel>(
  'Passenger',
  passengerSchema,
);
