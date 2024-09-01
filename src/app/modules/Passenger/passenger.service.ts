/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { PassengerSearchableFields } from './passenger.constant';
import { TPassenger } from './passenger.interface';
import { Passenger } from './passenger.model';

const getAllFromDB = async (query: Record<string, unknown>) => {
  const PassengerQuery = new QueryBuilder(Passenger.find(), query)
    .search(PassengerSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await PassengerQuery.modelQuery;
  const meta = await PassengerQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleFromDB = async (id: string) => {
  const result = await Passenger.findById(id);
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<TPassenger>) => {
  const { name, ...remainingData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Passenger.findByIdAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteFromDB = async (email: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedPassenger = await Passenger.findByIdAndDelete(email, {
      new: true,
      session,
    });

    if (!deletedPassenger) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete passenger');
    }

    const _id = deletedPassenger.user;

    const deletedUser = await User.findByIdAndDelete(_id, {
      new: true,
      session,
    });

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedPassenger;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const PassengerServices = {
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
