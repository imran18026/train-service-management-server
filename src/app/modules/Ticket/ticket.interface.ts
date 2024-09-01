import { Model, Types } from 'mongoose';

export type TTicket = {
  fromStationId: Types.ObjectId;
  toStationId: Types.ObjectId;
  user: Types.ObjectId;
  train: Types.ObjectId;
  distance: number;
  price: number;
};

export interface TicketModel extends Model<TTicket> {
  // eslint-disable-next-line no-unused-vars
  isTicketExists(id: string): Promise<TTicket | null>;
}
