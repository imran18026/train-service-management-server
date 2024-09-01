import { z } from 'zod';

const updatePassengerValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    contactNo: z
      .string({ required_error: 'Phone number is required' })
      .optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password can not be more than 20 characters' })
      .optional(),
  }),
});
export const PassengerValidations = {
  updatePassengerValidationSchema,
};
