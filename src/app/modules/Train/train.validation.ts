import { z } from 'zod';

const scheduleCreate = z.object({
  station: z.string({ required_error: 'Station ID is required' }),
  arrivalTime: z
    .string({
      required_error: 'Arrival time is required',
    })
    .transform((val) => new Date(val)),
  departureTime: z
    .string({
      required_error: 'Departure time is required',
    })
    .transform((val) => new Date(val)),
});
const scheduleUpdate = z.object({
  station: z.string({ required_error: 'Station ID is required' }).optional(),
  arrivalTime: z
    .string({
      required_error: 'Arrival time is required',
    })
    .transform((val) => new Date(val))
    .optional(),
  departureTime: z
    .string({
      required_error: 'Departure time is required',
    })
    .transform((val) => new Date(val))
    .optional(),
});

const createTrain = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    schedule: z
      .array(scheduleCreate)
      .nonempty({ message: 'At least one schedule is required' }),
  }),
});
const updateTrain = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    schedule: z
      .array(scheduleUpdate, { required_error: 'Schedule is required' })
      .optional(),
  }),
});

export const TrainValidation = {
  createTrain,
  updateTrain,
};
