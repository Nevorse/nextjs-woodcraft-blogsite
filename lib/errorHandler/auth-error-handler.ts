import { APIError } from "better-auth";

function getErrorMessageForAuth(error: unknown): string {
  if (error instanceof APIError) {
    const codeMessages: Record<string, string> = {
      INVALID_EMAIL_OR_PASSWORD: "E-posta veya şifre hatalı.",
      EMAIL_NOT_VERIFIED: "E-posta adresiniz henüz doğrulanmamış.",
      USER_ALREADY_EXISTS: "Bu e-posta adresiyle zaten bir hesap mevcut.",
      USER_NOT_FOUND: "Bu e-posta adresine ait hesap bulunamadı.",
      INVALID_PASSWORD: "Şifre geçersiz.",
      PASSWORD_TOO_SHORT: "Şifre çok kısa.",
      PASSWORD_TOO_LONG: "Şifre çok uzun.",

      SESSION_EXPIRED: "Oturumunuzun süresi dolmuş. Lütfen tekrar giriş yapın.",
      INVALID_TOKEN: "Geçersiz oturum. Lütfen tekrar giriş yapın.",

      TOO_MANY_REQUESTS: "Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.",
    };

    const bodyCode = (error.body as { code?: string })?.code;
    if (bodyCode && codeMessages[bodyCode]) {
      return codeMessages[bodyCode];
    }

    const statusMessages: Record<number, string> = {
      400: "Geçersiz istek. Lütfen bilgilerinizi kontrol edin.",
      401: "Bu işlem için kimlik doğrulaması gerekiyor.",
      403: "Bu işlem için yetkiniz bulunmuyor.",
      429: "Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.",
      500: "Sunucu şu an yanıt veremiyor, lütfen daha sonra tekrar deneyin.",
      503: "Servis şu anda kullanılamıyor.",
    };

    return statusMessages[error.statusCode] ?? error.message;

  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Sistemde teknik bir arıza oluştu. Lütfen daha sonra tekrar deneyin.";
  }
}

export function handleAuthError(
  error: unknown,
  label: string,
): { success: false; error: string } {
  const isExpectedError = error instanceof APIError && error.statusCode < 500;
  if (!isExpectedError) {
    console.error(`${label} error:`, error);
  }

  return { success: false, error: getErrorMessageForAuth(error) };
}
