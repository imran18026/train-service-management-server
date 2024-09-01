import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PassengerServices } from './passenger.service';

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await PassengerServices.getAllFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Passengers are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PassengerServices.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Passenger is retrieved successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await PassengerServices.updateIntoDB(id, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Passenger is updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PassengerServices.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Passenger is deleted successfully',
    data: result,
  });
});

export const PassengerControllers = {
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
