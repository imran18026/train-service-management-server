/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-passenger',
  validateRequest(UserValidation.createPassenger),
  UserControllers.createPassengerIntoDB,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.getAllFromDB,
);

export const UserRoutes = router;
