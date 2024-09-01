import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WalletServices } from './wallet.service';

const addBalanceIntoWallet = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  const result = await WalletServices.addBalanceIntoWallet(id, balance);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Balance is added successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await WalletServices.getAllFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Wallet are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WalletServices.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wallet Balance is retrieved successfully',
    data: result,
  });
});
const getTransactionHistory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WalletServices.getTransactionHistory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction is retrieved successfully',
    data: result,
  });
});

export const WalletControllers = {
  addBalanceIntoWallet,
  getAllFromDB,
  getSingleFromDB,
  getTransactionHistory,
};
