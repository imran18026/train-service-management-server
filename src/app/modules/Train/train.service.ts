/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import cron from 'node-cron';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TStation } from '../Station/station.interface';
import { Station } from '../Station/station.model';
import { TrainSearchableFields } from './train.constant';
import { TrainStatus, TTrain } from './train.interface';
import { Train } from './train.model';

const updateTrainSchedules = async () => {
  cron.schedule('5 * * * * ', async () => {
    const trains = await Train.find({});
    const currentTime = new Date();
    for (const train of trains) {
      const { schedule } = train;
      for (const i of schedule) {
        if (currentTime > i.departureTime && currentTime < i.arrivalTime) {
          train.status = TrainStatus.RUNNING;
        } else {
          train.status = TrainStatus.STAND;
        }
      }
      train.lastUpdated = new Date();
      await train.save();
    }
  });
};
updateTrainSchedules();
const createTrainIntoDB = async (payload: Partial<TTrain>) => {
  const { name, schedule } = payload;
  const existingTrain = await Train.findOne({ name });
  if (existingTrain) {
    throw new AppError(httpStatus.CONFLICT, 'Train is already exists');
  }
  if (schedule) {
    for (const i of schedule) {
      const stationExists = await Station.findById(i.station);
      if (!stationExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `${i.station} Station ID is not found`,
        );
      }
    }
  }
  payload.lastUpdated = new Date();

  const newTrain = await Train.create(payload);

  return newTrain;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const TrainQuery = new QueryBuilder(Train.find(), query)
    .search(TrainSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TrainQuery.modelQuery;
  const meta = await TrainQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleFromDB = async (id: string) => {
  const result = await Train.findById(id).populate('schedule.station');
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<TStation>) => {
  const result = await Train.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await Train.findByIdAndDelete(id);
  return result;
};

export const TrainServices = {
  createTrainIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
