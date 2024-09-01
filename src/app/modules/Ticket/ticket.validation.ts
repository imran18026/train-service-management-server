import { z } from 'zod';

const ticketCreate = z.object({
  body: z.object({
    trainId: z.string({ required_error: 'Train ID is required' }),
    fromStationId: z.string({ required_error: 'Station ID is required' }),
    toStationId: z.string({ required_error: 'Station ID is required' }),
  }),
});
const updateTicket = z.object({
  body: z.object({
    trainId: z.string({ required_error: 'Train ID is required' }).optional(),
    fromStationId: z
      .string({ required_error: 'Station ID is required' })
      .optional(),
    toStationId: z
      .string({ required_error: 'Station ID is required' })
      .optional(),
  }),
});

export const TicketValidation = {
  ticketCreate,
  updateTicket,
};
