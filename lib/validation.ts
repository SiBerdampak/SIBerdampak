import { z } from "zod";

export const detailDonasi = z.object({
  name: z.string().optional(),
  email: z.email("Alamat email tidak valid"),
  message: z.string().min(6, "Pesan minimal 6 karakter").optional(),
  donation_amount: z.coerce
    .number()
    .min(1000, "Jumlah donasi minimal adalah 1000"),
});

export type DetailDonasiSchema = z.infer<typeof detailDonasi>;
