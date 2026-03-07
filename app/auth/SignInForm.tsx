"use client";
import Input from "@/components/ui/form/Input";
import SubmitButton from "@/components/ui/form/SubmitButton";
import {
  SignInUpFormSchema,
  SignInUpFormValues,
} from "@/lib/validations/signInUpFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction, signUpAction } from "@/lib/actions/auth-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm({
  isRegistrationOpen = false,
}: {
  isRegistrationOpen?: boolean;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInUpFormValues>({
    defaultValues: {
      mail: "",
      password: "",
      name: undefined,
    },
    resolver: zodResolver(SignInUpFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInUpFormValues) => {
    if (mode === "signin") {
      const result = await signInAction(data.mail, data.password);
      if (result.success === true) {
        router.push("/admin");
        toast.success(`${result.data?.user.name} hesabına giriş başarılı`);
        reset();
      } else {
        toast.error(`${result.message}`);
      }
    } else if (mode === "signup" && isRegistrationOpen) {
      const result = await signUpAction(
        data.mail,
        data.password,
        data.name as string,
      );
      console.log(result);
      if (result.success === true) {
        router.push("/admin");
        toast.success(`${result.data?.user.name} hesabı oluşturma başarılı`);
        reset();
      } else {
        toast.error(`${result.message}`);
      }
    }
  };

  return (
    <div className="w-full max-w-sm	flex flex-col gap-6 px-6">
      <div className="text-2xl">
        {mode === "signin" ? "Hesabınıza giriş yapın" : "Yeni hesap oluşturun"}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col w-full gap-8">
          {mode === "signup" && (
            <Input
              {...register("name")}
              name={"name"}
              label={"İsim"}
              error={errors.name?.message}
            />
          )}
          <Input
            {...register("mail")}
            name={"mail"}
            label={"E-Posta"}
            type={"email"}
            error={errors.mail?.message}
          />
          <Input
            {...register("password")}
            name={"password"}
            label={"Parola"}
            rows={10}
            error={errors.password?.message}
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} />
        {isRegistrationOpen && (
          <div className="text-sm">
            <button
              type="button"
              className="text-emerald-600 underline cursor-pointer"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
              }}
            >
              {mode === "signin" ? "Kayıt olun" : "Giriş yapın"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
