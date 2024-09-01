import { Model } from 'mongoose';

export type TStation = {
  name: string;
  location: string;
};

export interface StationModel extends Model<TStation> {
  // eslint-disable-next-line no-unused-vars
  isStationExists(id: string): Promise<TStation | null>;
}
