import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TicketServices } from './ticket.service';

const purchaseTicket = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await TicketServices.purchaseTicket(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is booked successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await TicketServices.getAllFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tickets are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TicketServices.getSingleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is retrieved successfully',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;

  const result = await TicketServices.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is updated successfully',
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TicketServices.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket is deleted successfully',
    data: result,
  });
});

export const TicketControllers = {
  purchaseTicket,
  getAllFromDB,
  getSingleFromDB,
  updateIntoDB,
  deleteFromDB,
};
