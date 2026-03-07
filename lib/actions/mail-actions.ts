"use server";
import { send } from "@emailjs/nodejs";
import { ContactFormValues } from "../../app/validations/contactFormSchema";

const serviceId = process.env.MJS_SERVICE_ID;
const templateId = process.env.MJS_TEMPLATE_ID;
const publicKey = process.env.MJS_PUBLIC_KEY;
const privateKey = process.env.MJS_PRIVATE_KEY;

// type FormValues = {
//   name: string;
//   message: string;
// } & ({ phoneNum: string; mail?: string } | { mail: string; phoneNum?: string });

export const sendEmailAction = async (formParams: ContactFormValues) => {
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error("Error: The environment variable is not defined!");
    throw new Error("Bir hata oluştu. Env Error");
  }
  try {
    const result = await send(serviceId, templateId, formParams, {
      publicKey: publicKey,
      privateKey: privateKey,
    });
    return {
      status: result.status,
      text: result.text,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Mesaj gönderilirken bir hata oluştu.");
  }
};
