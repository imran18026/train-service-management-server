import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StationServices } from './station.service';

const createStationIntoDB = catchAsync(async (req, res) => {
  const result = await StationServices.createStationIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station is created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await StationServices.getAllFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stations are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StationServices.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station is retrieved successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const result = await StationServices.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station is updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StationServices.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Station is deleted successfully',
    data: result,
  });
});

export const StationControllers = {
  createStationIntoDB,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
