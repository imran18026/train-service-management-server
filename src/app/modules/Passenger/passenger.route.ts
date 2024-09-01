import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { PassengerControllers } from './passenger.controller';

const router = express.Router();

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  PassengerControllers.getAllFromDB,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  PassengerControllers.getSingleFromDB,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  // validateRequest(PassengerValidations.updatePassengerValidationSchema),
  PassengerControllers.updateIntoDB,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  PassengerControllers.deleteFromDB,
);

export const PassengerRoutes = router;
