import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StationControllers } from './station.controller';
import { StationValidation } from './station.validation';

const router = express.Router();

router.post(
  '/create-station',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(StationValidation.createStation),
  StationControllers.createStationIntoDB,
);
router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StationControllers.getAllFromDB,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  StationControllers.getSingleFromDB,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  validateRequest(StationValidation.updateStation),
  StationControllers.updateIntoDB,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  StationControllers.deleteFromDB,
);

export const StationRoutes = router;
