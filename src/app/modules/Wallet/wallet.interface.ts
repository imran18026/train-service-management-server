import { Types, Model } from 'mongoose';

export type TWallet = {
  user: Types.ObjectId;
  balance: number;
};

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  PURCHASE = 'purchase',
}
export type TTransaction = {
  user: Types.ObjectId;
  type: TransactionType;
  amount: number;
  date: Date;
};

export interface WalletModel extends Model<TWallet> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TWallet | null>;
}

export interface TransactionModel extends Model<TTransaction> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TTransaction[]>;
}
