import express from 'express';
import { WalletControllers } from './wallet.controller';

const router = express.Router();

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  WalletControllers.getAllFromDB,
);

router.get(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  WalletControllers.getSingleFromDB,
);
router.get(
  '/transactions/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  WalletControllers.getTransactionHistory,
);

router.patch(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  WalletControllers.addBalanceIntoWallet,
);

export const WalletRoutes = router;
