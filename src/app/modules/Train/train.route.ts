import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { TrainControllers } from './train.controller';
import { TrainValidation } from './train.validation';

const router = express.Router();

router.post(
  '/create-train',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(TrainValidation.createTrain),
  TrainControllers.createTrainIntoDB,
);
router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TrainControllers.getAllFromDB,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  TrainControllers.getSingleFromDB,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  validateRequest(TrainValidation.updateTrain),
  TrainControllers.updateIntoDB,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  TrainControllers.deleteFromDB,
);

export const TrainRoutes = router;
