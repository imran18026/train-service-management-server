import { model, Schema } from 'mongoose';
import {
  TransactionModel,
  TransactionType,
  TTransaction,
  TWallet,
  WalletModel,
} from './wallet.interface';

const walletSchema = new Schema<TWallet>(
  {
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

const transactionSchema = new Schema<TTransaction, TransactionModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: [true, 'Type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
  },
);

export const Wallet = model<TWallet, WalletModel>('Wallet', walletSchema);

export const Transaction = model<TTransaction, TransactionModel>(
  'Transaction',
  transactionSchema,
);
