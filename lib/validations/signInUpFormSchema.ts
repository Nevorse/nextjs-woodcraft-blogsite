import { z } from "zod";

export const SignInUpFormSchema = z.object({
  mail: z
    .string()
    .email("Geçerli bir mail adresi giriniz.")
    .min(1, "E-posta alanı boş bırakılamaz."),
  password: z.string().min(6, "Geçerli bir parola giriniz."),
  name: z.string().optional(),
});

export type SignInUpFormValues = z.infer<typeof SignInUpFormSchema>;
