/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TStation } from '../Station/station.interface';
import { Train } from '../Train/train.model';
import { User } from '../User/user.model';
import { TicketSearchableFields } from './ticket.constant';
import { Ticket } from './ticket.model';
import { Transaction, Wallet } from '../Wallet/wallet.model';
import { TransactionType } from '../Wallet/wallet.interface';
import { TTicket } from './ticket.interface';

const purchaseTicket = async (
  id: string,
  payload: { trainId: string; fromStationId: string; toStationId: string },
) => {
  // console.log(id, payload);
  const { trainId, fromStationId, toStationId } = payload;
  const user = await User.findById({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const train = await Train.findById({ _id: trainId }).populate(
    'schedule.station',
  );
  const stationIds = train?.schedule.map((item) => item.station.id.toString());
  if (!stationIds?.includes(fromStationId)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'From station not found on the train schedule',
    );
  }
  if (!stationIds?.includes(toStationId)) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'To station not found on the train schedule',
    );
  }
  const different = Math.abs(
    stationIds.indexOf(fromStationId) - stationIds.indexOf(toStationId),
  );

  const wallet = await Wallet.findOne({ user: id });
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  const newBalance = wallet.balance - different * 10;
  wallet.balance = newBalance;
  await wallet.save();

  const transaction = new Transaction({
    user: id,
    type: TransactionType.PURCHASE,
    amount: different * 10,
  });
  await transaction.save();
  const ticket = await Ticket.create({
    user: id,
    train: trainId,
    fromStationId: fromStationId,
    toStationId: toStationId,
    distance: different,
    price: different * 10,
  });
  return ticket;
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const TrainQuery = new QueryBuilder(Ticket.find(), query)
    .search(TicketSearchableFields)
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
  const result = await Ticket.findById(id);
  return result;
};

const updateIntoDB = async (id: string, payload: Partial<TTicket>) => {
  const result = await Ticket.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  const result = await Ticket.findByIdAndDelete(id);
  return result;
};

export const TicketServices = {
  purchaseTicket,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
