"use server";

import { auth } from "../auth";
import { headers } from "next/headers";
import { getSiteSettings } from "../database/siteSettings";
import { handleAuthError } from "../errorHandler/auth-error-handler";

export const signInAction = async (
  email: string,
  password: string,
): Promise<
  { success: true; data: { userName: string } } | { success: false; error: string }
> => {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
    return {
      success: true,
      data: { userName: result.user.name },
    };
  } catch (error) {
    return handleAuthError(error, "SignInAction");
    // if (error instanceof APIError) {
    //   const message = errorMessages[error.statusCode] || error.message;
    //   return {
    //     success: false,
    //     error: message,
    //   };
    // } else {
    //   console.error("Beklenmedik Hata:", error);
    //   return {
    //     success: false,
    //     error: "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.",
    //   };
    // }
  }
};

export const signOutAction = async (): Promise<
  { success: true } | { success: false; error: string }
> => {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleAuthError(error, "SignOutAction");
    // if (error instanceof APIError) {
    //   const message = errorMessages[error.statusCode] || error.message;
    //   return {
    //     success: false,
    //     error: message,
    //   };
    // } else {
    //   console.error("Beklenmedik Hata:", error);
    //   return {
    //     success: false,
    //     error: "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.",
    //   };
    // }
  }
};

export const signUpAction = async (
  email: string,
  password: string,
  name: string,
): Promise<
  { success: true; data: { userName: string } } | { success: false; error: string }
> => {
  try {
    const siteSettings = await getSiteSettings({ isRegistrationOpen: true });
      if (!siteSettings?.isRegistrationOpen) {
      return {
        success: false,
        error: "Kayıt işlemi şu anda kapalıdır.",
      };
    }
    if (name.trim() == "" || password.trim() == "" || email.trim() == "") {
      return {
        success: false,
        error: "Lütfen tüm alanları doldurun.",
      };
    }
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      headers: await headers(),
    });
    return {
      success: true,
      data: { userName: result.user.name },
    };
  } catch (error) {
    return handleAuthError(error, "SignUpAction");
    // if (error instanceof APIError) {
    //   return {
    //     success: false,
    //     error: error.message,
    //   };
    // } else {
    //   console.error("Beklenmedik Hata:", error);
    //   return {
    //     success: false,
    //     error: "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.",
    //   };
    // }
  }
};
