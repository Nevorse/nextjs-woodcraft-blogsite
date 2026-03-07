import { NextResponse } from "next/server";
import { storeFiles, UploadcareSimpleAuthSchema } from "@uploadcare/rest-client";

const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
const secretKey = process.env.UPLOADCARE_SECRET_KEY;
if (!publicKey || !secretKey) {
  console.error("Uploadcare API keys are missing in environment variables!");
}
const authSchema = new UploadcareSimpleAuthSchema({
  publicKey: publicKey!,
  secretKey: secretKey!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const uuids = body.uuids;

    if (!Array.isArray(uuids) || uuids.length === 0) {
      return NextResponse.json({ error: "UUID list is required" }, { status: 400 });
    }
    const cleanUuids = uuids.filter(
      (uuid) => typeof uuid === "string" && uuid.trim() !== "",
    );

    const result = await storeFiles({ uuids: cleanUuids }, { authSchema });

    if (result.problems) {
      console.error("Uploadcare Store Problems:", result.problems);
    }
    return NextResponse.json({
      success: true,
      message: `${cleanUuids.length} adet dosya başarıyla kaydedildi.`,
      // result: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
    console.error("Uploadcare Store Error:", errorMessage);
    return NextResponse.json(
      {
        success: false,
        error: "Uploadcare store işlemi başarısız oldu.",
        // details: errorMessage,
      },
      { status: 500 },
    );
  }
}
