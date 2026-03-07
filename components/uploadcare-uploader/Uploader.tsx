// "use client";
// import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
// import type {
//   OutputCollectionState,
//   UploadCtxProvider,
// } from "@uploadcare/react-uploader";
// import "@uploadcare/react-uploader/core.css";
// import { useRef } from "react";
// import { localeDefinitionOverride } from "./localeDefinition";
// import toast from "react-hot-toast";
// import { saveImagesToAlbum } from "@/lib/actions/db/image-actions";
// import { storeUploadcareFiles } from "@/lib/actions/uploadcare";

// type UploadMetadata =
//   | { album: "cover" }
//   | { album: "services"; albumId: string }
//   | {
//       album: "projects";
//       albumId: string;
//       folderId: string;
//     };
// type UploaderProps = {
//   metadata: UploadMetadata;
// };
// export default function Uploader({ metadata }: UploaderProps) {
//   const uploaderRef = useRef<UploadCtxProvider | null>(null);
//   const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;

//   const splitUploadcareUrls = (cdnUrls: string[]) => {
//     const uuids: string[] = [];
//     const opsArray: (string | null)[] = [];
//     const regex = /\/([a-f0-9-]{36})(\/-(.*))?/;
//     // Regex açıklaması:
//     // 1. ([a-f0-9-]{36}) -> 36 karakterlik UUID'yi yakalar.
//     // 2. (\/-(.*))? -> /-/ ile başlayan ve sonuna kadar giden her şeyi (varsa) yakalar.
//     cdnUrls.forEach((cdnUrl) => {
//       const match = cdnUrl.match(regex);
//       if (match) {
//         uuids.push(match[1]);
//         opsArray.push(match[2] || null);
//       }
//     });
//     return { uuids, opsArray };
//   };
//   const processUpload = async (uuids: string[]) => {
//     //  Store on Uploadcare
//     const storeResponse = await storeUploadcareFiles(uuids)
//     if (storeResponse.success === false) {
//       throw new Error(storeResponse.error)
//     }

//     // Save to the DB
//     const dbResponse = await saveImagesToAlbum(
//       uuids,
//       "COVER_ALBUM_ID",
//       "/admin/cover",
//     );
//     if (dbResponse.error) {
//       throw new Error(dbResponse.error || "Dosyalar veritabanına kaydedilemedi.");
//     }
//     return dbResponse;
//   };
//   const clearAll = () => {
//     // Dosyaları panelden temizle.
//     const api = uploaderRef.current?.getAPI?.();
//     (
//       api as unknown as { uploadCollection?: { clearAll?: () => void } }
//     )?.uploadCollection?.clearAll?.();
//     (
//       api as unknown as { _uploadCollection?: { clearAll?: () => void } }
//     )?._uploadCollection?.clearAll?.();
//   };

//   const handleDoneClick = async (e: OutputCollectionState) => {
//     const cdnUrls = e.successEntries.map((entry) => entry.cdnUrl);
//     const { uuids } = splitUploadcareUrls(cdnUrls);

//     if (uuids.length === 0) {
//       toast.error("Kaydedilecek dosya bulunamadı.");
//       return;
//     }
//     toast.promise(processUpload(uuids), {
//       loading: "Dosyalar işleniyor ve kaydediliyor...",
//       success: (data) => {
//         clearAll();
//         return data.message || "Dosyalar başarıyla kaydedildi!";
//       },
//       error: (err) => err.message || "Dosya kaydetme işlemi başarısız oldu.",
//     });
//   };

//   return (
//     <div>
//       <FileUploaderRegular
//         localeDefinitionOverride={localeDefinitionOverride}
//         apiRef={uploaderRef}
//         multiple={true}
//         imgOnly={true}
//         sourceList="local, url, gdrive"
//         filesViewMode="grid"
//         gridShowFileNames={true}
//         classNameUploader="uc-light uc-turquoise"
//         pubkey={publicKey || ""}
//         store={false}
//         onDoneClick={handleDoneClick}
//         metadata={metadata}
//       />
//     </div>
//   );
// }
