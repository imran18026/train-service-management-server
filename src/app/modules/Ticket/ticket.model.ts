import { model, Schema } from 'mongoose';
import { TicketModel, TTicket } from './ticket.interface';

const ticketSchema = new Schema<TTicket>(
  {
    fromStationId: {
      type: Schema.Types.ObjectId,
      required: [true, 'From station is required'],
      ref: 'Station',
    },
    toStationId: {
      type: Schema.Types.ObjectId,
      required: [true, 'To station is required'],
      ref: 'Station',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
    train: {
      type: Schema.Types.ObjectId,
      required: [true, 'Train is required'],
      ref: 'Train',
    },
    distance: {
      type: Number,
      required: [true, 'Distance is required'],
      default: 1,
    },
    price: { type: Number, required: [true, 'Price is required'], default: 10 },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Ticket = model<TTicket, TicketModel>('Ticket', ticketSchema);
