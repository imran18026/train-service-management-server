import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TicketControllers } from './ticket.controller';
import { TicketValidation } from './ticket.validation';

const router = express.Router();

router.post(
  '/booking/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(TicketValidation.ticketCreate),
  TicketControllers.purchaseTicket,
);
router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TicketControllers.getAllFromDB,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TicketControllers.getSingleFromDB,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  validateRequest(TicketValidation.updateTicket),
  TicketControllers.updateIntoDB,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  TicketControllers.deleteFromDB,
);

export const TicketRoutes = router;
