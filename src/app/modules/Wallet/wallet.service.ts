/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TrainSearchableFields } from './wallet.constant';
import { TransactionType } from './wallet.interface';
import { Transaction, Wallet } from './wallet.model';

const addBalanceIntoWallet = async (id: string, balance: number) => {
  const wallet = await Wallet.findOne({ user: id });
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  const newBalance = wallet.balance + balance;
  wallet.balance = newBalance;
  await wallet.save();

  const transaction = new Transaction({
    user: id,
    type: TransactionType.DEPOSIT,
    amount: balance,
  });
  await transaction.save();
  return wallet;
};

export const getTransactionHistory = async (id: string) => {
  return await Transaction.find({ user: id }).sort({ date: -1 });
};

const getAllFromDB = async (query: Record<string, unknown>) => {
  const TransactionQuery = new QueryBuilder(Wallet.find(), query)
    .search(TrainSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TransactionQuery.modelQuery;
  const meta = await TransactionQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleFromDB = async (id: string) => {
  const result = await Wallet.findOne({ user: id });
  return result;
};

export const WalletServices = {
  addBalanceIntoWallet,
  getAllFromDB,
  getSingleFromDB,
  getTransactionHistory,
};
