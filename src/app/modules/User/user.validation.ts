import { z } from 'zod';

const createPassenger = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    contactNo: z.string({ required_error: 'Phone number is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

export const UserValidation = {
  createPassenger,
};
