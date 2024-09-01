import { z } from 'zod';

const createStation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    location: z.string({ required_error: 'Location is required' }),
  }),
});
const updateStation = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    location: z.string({ required_error: 'Location is required' }).optional(),
  }),
});

export const StationValidation = {
  createStation,
  updateStation,
};
