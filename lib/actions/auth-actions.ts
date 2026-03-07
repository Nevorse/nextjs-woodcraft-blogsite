"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { APIError } from "better-auth";
import { getSiteSettings } from "../database/siteSettings";

const errorMessages: Record<number, string> = {
  400: "Geçersiz giriş bilgileri. Lütfen bilgilerinizi kontrol edin.",
  401: "E-posta veya şifre hatalı.",
  403: "Bu işlem için yetkiniz bulunmuyor.",
  404: "İstenen kaynak bulunamadı.",
  409: "Bu bilgilerle zaten bir kayıt mevcut.",
  429: "Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.",
  500: "Sunucu şu an yanıt veremiyor, lütfen daha sonra tekrar deneyiniz.",
  503: "Servis şu anda kullanılamıyor, bakım yapılıyor olabilir.",
};
export const signInAction = async (email: string, password: string) => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof APIError) {
      const message = errorMessages[error.statusCode] || error.message;
      return {
        success: false,
        message: message,
        status: error.status,
      };
    } else {
      console.error("Beklenmedik Hata:", error);
      return {
        success: false,
        message:
          "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.",
        status: 500,
      };
    }
  }
};

export const signOutAction = async () => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
      message: "Başarıyla çıkış yapıldı.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      const message = errorMessages[error.statusCode] || error.message;
      return {
        success: false,
        message: message,
        status: error.status,
      };
    } else {
      console.error("Beklenmedik Hata:", error);
      return {
        success: false,
        message: "Çıkış yapılırken bir hata oluştu.",
        status: 500,
      };
    }
  }
};

export const signUpAction = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const siteSettings = await getSiteSettings({ isRegistrationOpen: true });
    if (!siteSettings?.isRegistrationOpen) {
      return {
        success: false,
        message: "Kayıt işlemi şu anda kapalıdır.",
        status: 403,
      };
    }
    if (name.trim() == "" || password.trim() == "" || email.trim() == "") {
      return {
        success: false,
        message: "Lütfen tüm alanları doldurun.",
        status: 400,
      };
    }
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
        status: error.status,
      };
    } else {
      console.error("Beklenmedik Hata:", error);
      return {
        success: false,
        message:
          "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.",
        status: 500,
      };
    }
  }
};
