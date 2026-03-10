import { Prisma } from "../generated/prisma/client";

function getErrorMessageForDb(error: unknown): string {
  // Prisma hatası
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const code: string = (error as Prisma.PrismaClientKnownRequestError).code;
    const messages: Record<string, string> = {
      // Create/Update
      P2002: "Bu kayıt zaten mevcut.",
      P2000: "Değer çok uzun.",
      P2001: "Kayıt bulunamadı.",

      // Foreign Key
      P2003: "İlişkili kayıt bulunamadı.",
      P2014: "Gerekli ilişki eksik.",

      // Update/Delete
      P2025: "Kayıt bulunamadı.",

      // Constraint
      P2004: "Veri kısıtlaması ihlali.",

      // Transaction
      P2034: "İşlem çakışması. Tekrar deneyin.",
    };
    return messages[code] || "Veritabanı hatası.";
  }
  // Validation hatası
  if (error instanceof Prisma.PrismaClientValidationError) {
    return "Geçersiz veri formatı.";
  }

  // Normal hata
  if (error instanceof Error) {
    return error.message;
  }

  return "Bilinmeyen bir hata oluştu.";
}

export function handleDbActionError(
  error: unknown,
  label: string,
): { success: false; error: string } {
  console.error(`${label} error:`, error);

  return { success: false, error: getErrorMessageForDb(error) };
}
