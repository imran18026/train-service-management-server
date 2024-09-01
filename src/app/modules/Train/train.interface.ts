import { Types, Model } from 'mongoose';

export type TSchedule = {
  arrivalTime: Date;
  departureTime: Date;
  station: Types.ObjectId;
};
export type TTrain = {
  name: string;
  schedule: TSchedule[];
};

export interface TrainModel extends Model<TTrain> {
  // eslint-disable-next-line no-unused-vars
  isTrainExists(id: string): Promise<TTrain | null>;
}
