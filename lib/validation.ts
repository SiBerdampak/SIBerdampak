import { email, z } from "zod";

export const detailDonasi = z.object({
  name: z.string().optional(),
  email: z.email("Invalid email address"),
  message: z
    .string()
    .min(6, "Message must be at least 6 characters long")
    .optional(),
  donation_amount: z.coerce
    .number()
    .min(1000, "Donation amount must be at least 1000"),
});

export type DetailDonasiSchema = z.infer<typeof detailDonasi>;
