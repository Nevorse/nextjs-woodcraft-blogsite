"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  ContactFormValues,
} from "@/lib/validations/contactFormSchema";
import SubmitButton from "@/components/ui/form/SubmitButton";
import { sendEmailAction } from "@/lib/actions/mail-actions";
import Input from "@/components/ui/form/Input";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    handleSubmit,
    register,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      message: "",
      phoneNum: "",
      mail: "",
    },
    resolver: zodResolver(ContactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await sendEmailAction(data);
      if (response.status === 200) {
        toast.success("Mesaj Gönderildi.", { duration: 6000 });
        reset();
      } else {
        toast.error("Mesaj iletilemedi.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Bir hata oluştu.");
    }
  };

  const phoneNumRegister = register("phoneNum", {
    onBlur: () => {
      if (errors.mail) trigger("mail");
    },
  });
  const mailRegister = register("mail", {
    onBlur: () => {
      if (errors.phoneNum) trigger("phoneNum");
    },
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center flex-col gap-4 w-[80%]"
    >
      <div className="flex justify-center flex-wrap w-[92%] gap-5">
        <Input
          {...register("name")}
          name={"name"}
          label={"İsim"}
          error={errors.name?.message}
        />
        <Input
          {...phoneNumRegister}
          name={"phoneNum"}
          label={"Telefon Numarası"}
          error={errors.phoneNum?.message}
        />
        <Input
          {...mailRegister}
          name={"mail"}
          label={"E-Posta"}
          type={"email"}
          error={errors.mail?.message}
        />
      </div>
      <div className="w-[92%]">
        <Input
          {...register("message")}
          name={"message"}
          label={"Mesaj"}
          as={"textarea"}
          rows={10}
          error={errors.message?.message}
        />
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
