// "use server";
// import { storeFiles, UploadcareSimpleAuthSchema } from "@uploadcare/rest-client";
// import { getErrorMessageForDb } from "../errorHandler/prisma-error-handler";

// const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
// const secretKey = process.env.UPLOADCARE_SECRET_KEY;

// if (!publicKey || !secretKey) {
//   throw new Error("Uploadcare API keys are missing in environment variables!");
// }

// const authSchema = new UploadcareSimpleAuthSchema({
//   publicKey,
//   secretKey,
// });

// type StoreFilesResult =
//   | {
//       success: true;
//       message: string;
//       count?: number;
//       failed?: number;
//       problems?: Record<string, string>;
//     }
//   | {
//       success: false;
//       error: string;
//       failed?: number;
//       problems?: Record<string, string>;
//     };

// export async function storeUploadcareFiles(uuids: string[]): Promise<StoreFilesResult> {
//   if (!Array.isArray(uuids) || uuids.length === 0) {
//     return { success: false, error: "UUID listesi gerekli." };
//   }

//   // Clean UUIDs
//   const cleanUuids = uuids.filter(
//     (uuid) => typeof uuid === "string" && uuid.trim() !== "",
//   );

//   if (cleanUuids.length === 0) {
//     return { success: false, error: "Geçerli UUID bulunamadı." };
//   }

//   try {
//     const result = await storeFiles({ uuids: cleanUuids }, { authSchema });
//     const problemCount = result.problems ? Object.keys(result.problems).length : 0;
//     const successCount = cleanUuids.length - problemCount;

//     // No success
//     if (successCount === 0) {
//       console.error("Uploadcare Store Problems:", result.problems);
//       return {
//         success: false,
//         error: "Hiçbir dosya kaydedilemedi.",
//         failed: problemCount,
//         problems: result.problems,
//       };
//     }
//     // If some fail
//     if (problemCount > 0) {
//       console.error("Uploadcare Store Problems:", result.problems);
//       return {
//         success: true,
//         message: `${successCount} dosya kaydedildi, ${problemCount} dosya başarısız.`,
//         count: successCount,
//         failed: problemCount,
//         problems: result.problems,
//       };
//     }
//     // All Success
//     return {
//       success: true,
//       message: `${successCount} adet dosya başarıyla kaydedildi.`,
//       count: successCount,
//     };
//   } catch (error) {
//     console.error("Uploadcare Store Error:", error);
//     return {
//       success: false,
//       error: getErrorMessageForDb(error),
//     };
//   }
// }
