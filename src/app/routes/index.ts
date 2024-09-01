import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';

import { PassengerRoutes } from '../modules/Passenger/passenger.route';
import { UserRoutes } from '../modules/User/user.route';
import { StationRoutes } from '../modules/Station/station.route';
import { TrainRoutes } from '../modules/Train/train.route';
import { WalletRoutes } from '../modules/Wallet/wallet.route';
import { TicketRoutes } from '../modules/Ticket/ticket.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/passengers',
    route: PassengerRoutes,
  },
  {
    path: '/stations',
    route: StationRoutes,
  },
  {
    path: '/trains',
    route: TrainRoutes,
  },
  {
    path: '/wallets',
    route: WalletRoutes,
  },
  {
    path: '/tickets',
    route: TicketRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
