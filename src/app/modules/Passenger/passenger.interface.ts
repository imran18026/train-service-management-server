import { Model, Types } from 'mongoose';

export type TPassenger = {
  name: string;
  email: string;
  contactNo: string;
  user: Types.ObjectId;
};

export interface PassengerModel extends Model<TPassenger> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TPassenger | null>;
}
