/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TPassenger } from '../Passenger/passenger.interface';
import { Passenger } from '../Passenger/passenger.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Wallet } from '../Wallet/wallet.model';

const createPassengerIntoDB = async (
  payload: TPassenger & { password: string },
) => {
  if (!payload.email)
    throw new AppError(httpStatus.BAD_REQUEST, 'Email is required');
  if (!payload.password)
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is required');

  // create a user object
  const userData: Partial<TUser> = {};
  userData.email = payload.email;
  userData.password = payload.password;
  userData.role = 'passenger';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create([userData], { session }); // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.email = newUser[0].email;
    payload.user = newUser[0]._id; //reference _id

    // create a student (transaction-2)
    const newPassenger = await Passenger.create([payload], { session });

    if (!newPassenger.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create passenger');
    }

    const walletData: {
      user: mongoose.Types.ObjectId;
      balance: number;
    } = {
      user: newUser[0]._id,
      balance: 0,
    };

    const newWallet = await Wallet.create([walletData], { session });

    await session.commitTransaction();
    await session.endSession();

    return newPassenger;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const PassengerQuery = new QueryBuilder(User.find(), query)
    .search([''])
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

export const UserServices = {
  createPassengerIntoDB,
  getAllFromDB,
};
