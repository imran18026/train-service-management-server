/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { StationSearchableFields } from './station.constant';
import { TStation } from './station.interface';
import { Station } from './station.model';

const createStationIntoDB = async (payload: TStation) => {
  const existingStation = await Station.findOne({ name: payload.name });
  if (existingStation) {
    throw new AppError(httpStatus.CONFLICT, 'Station already exists');
  }
  const newStation = await Station.create(payload);
  return newStation;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const StationQuery = new QueryBuilder(Station.find(), query)
    .search(StationSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await StationQuery.modelQuery;
  const meta = await StationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleFromDB = async (id: string) => {
  const result = await Station.findById(id);
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<TStation>) => {
  const result = await Station.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await Station.findByIdAndDelete(id);
  return result;
};

export const StationServices = {
  createStationIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
