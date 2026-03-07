import { z } from "zod";

export const ContactFormSchema = z
  .object({
    message: z
      .string()
      .min(1, "Mesajınızı yazınız.")
      .min(15, "Daha uzun bir mesaj yazın."),

    name: z.string().min(3, "İsminizi giriniz."),

    phoneNum: z
      .string()
      .min(10, "Geçerli bir numara giriniz.")
      .optional()
      .or(z.literal("")),

    mail: z
      .string()
      .email({
        message: "Geçerli bir mail adresi giriniz.",
      })
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const hasPhone = !!(data.phoneNum && data.phoneNum?.length > 9);
    const hasMail = !!data.mail;

    if (!hasPhone && !hasMail) {
      ctx.addIssue({
        path: ["phoneNum"],
        message: "Lütfen en az bir iletişim adresi giriniz.",
        code: "custom",
      });

      ctx.addIssue({
        path: ["mail"],
        message: "Lütfen en az bir iletişim adresi giriniz.",
        code: "custom",
      });
    }
  });

export type ContactFormValues = z.infer<typeof ContactFormSchema>;