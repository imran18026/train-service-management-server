import { Types, Model } from 'mongoose';

export type TSchedule = {
  arrivalTime: Date;
  departureTime: Date;
  station: Types.ObjectId;
};

//status enum:
export enum TrainStatus {
  STAND = 'stand',
  RUNNING = 'running',
}
export type TTrain = {
  name: string;
  schedule: TSchedule[];
  status: TrainStatus;
  lastUpdated: Date;
};

export interface TrainModel extends Model<TTrain> {
  // eslint-disable-next-line no-unused-vars
  isTrainExists(id: string): Promise<TTrain | null>;
}
