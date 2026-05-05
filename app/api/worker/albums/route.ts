import { NextResponse } from "next/server";
import { parseErrorMessage } from "@/lib/errorHandler/api-error-handler";
import { WorkerBulkDeleteResponse } from "@/lib/types/workerTypes";
import { getSession } from "@/lib/session";

const workerURL = process.env.WORKER_URL;
const secretKey = process.env.WORKER_SECRET;

const ALLOWED_X_TYPE = ["cover", "services", "projects"];

export type BulkDeleteApiResponse =
  | {
      success: true;
      prefix: string;
      action: "delete";
      deleted: number;
      //   results: WorkerDeleteResult[];
    }
  | {
      success: false;
      error: string;
    };

// WorkerBulkDeleteResponse

export async function DELETE(
  request: Request,
): Promise<NextResponse<BulkDeleteApiResponse>> {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Yetkisiz Erişim" },
        { status: 401 },
      );
    }
    if (!workerURL || !secretKey) {
      return NextResponse.json(
        { success: false, error: "Sunucu yapılandırma hatası" },
        { status: 500 },
      );
    }

    const { prefix } = await request.json();

    if (!prefix || typeof prefix !== "string") {
      return NextResponse.json(
        { success: false, error: "Dosya yolu gereklidir" },
        { status: 400 },
      );
    }

    const types = ALLOWED_X_TYPE.join("|");
    const segment = "[a-zA-Z0-9_-]+";
    const isValidPath = new RegExp(`^(${types})\\/${segment}(\\/${segment})?$`).test(
      prefix,
    );
    if (!isValidPath) {
      return NextResponse.json(
        { success: false, error: `Geçersiz dosya yolu` },
        { status: 400 },
      );
    }

    const response = await fetch(workerURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Worker-Secret": secretKey,
      },
      body: JSON.stringify({ prefix }),
    });

    if (!response.ok) {
      const errorText = await parseErrorMessage(response);
      return NextResponse.json({
        success: false,
        error: `Worker error (${response.status}): ${errorText}`,
      });
    }

    const data: WorkerBulkDeleteResponse = await response.json();
    if (!data.ok) {
      return NextResponse.json({ success: false, error: data.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      prefix: prefix,
      action: "delete",
      deleted: data.deleted,
      //   results: data.results,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "İşlem sırasında bir hata oluştu",
      },
      { status: 500 },
    );
  }
}
