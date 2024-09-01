import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TrainServices } from './train.service';

const createTrainIntoDB = catchAsync(async (req, res) => {
  const result = await TrainServices.createTrainIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train is created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await TrainServices.getAllFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trains are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainServices.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train is retrieved successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const result = await TrainServices.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train is updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TrainServices.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Train is deleted successfully',
    data: result,
  });
});

export const TrainControllers = {
  createTrainIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
