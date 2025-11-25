import { z } from "zod";

export const detailDonasi = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.email("Alamat email tidak valid"),
  message: z.string().optional(),
  donation_amount: z.coerce
    .number()
    .min(1000, "Jumlah donasi minimal adalah 1000"),
});

export type DetailDonasiSchema = z.infer<typeof detailDonasi>;
