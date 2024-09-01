/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TStation } from '../Station/station.interface';
import { Station } from '../Station/station.model';
import { TrainSearchableFields } from './train.constant';
import { TTrain } from './train.interface';
import { Train } from './train.model';

const createTrainIntoDB = async (payload: TTrain) => {
  const existingTrain = await Train.findOne({ name: payload.name });
  if (existingTrain) {
    throw new AppError(httpStatus.CONFLICT, 'Train is already exists');
  }
  //check all station is exist or not
  const stations = await Station.find({
    _id: { $in: payload.schedule.map((item) => item.station) },
  });

  if (stations.length !== payload.schedule.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'Station not found in schedule');
  }
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
