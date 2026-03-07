import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { WorkerResult } from "@/lib/types/worker";

const workerURL = process.env.WORKER_URL;
const secretKey = process.env.WORKER_SECRET;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_X_TYPES = ["cover", "services", "projects"];
const MAX_FILES = 20;
const MAX_DELETE_FILES = 50;

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
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

    const formData = await request.formData();
    const files = formData.getAll("file") as File[];
    const xType = formData.get("x-type") as string;
    const albumId = formData.get("album-id") as string;

    if (!files.length) {
      return NextResponse.json(
        { success: false, error: "Dosya sağlanmadı" },
        { status: 400 },
      );
    }
    if (!xType || !ALLOWED_X_TYPES.includes(xType)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz albüm türü" },
        { status: 400 },
      );
    }
    if (!albumId) {
      return NextResponse.json(
        { success: false, error: "Geçersiz albüm ID" },
        { status: 400 },
      );
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { success: false, error: `En fazla ${MAX_FILES} dosya yüklenebilir` },
        { status: 400 },
      );
    }
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `"${file.name}" dosyası 10 MB sınırını aşıyor` },
          { status: 413 },
        );
      }
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: `"${file.type}" dosya türüne izin verilmiyor` },
          { status: 415 },
        );
      }
    }
    const results = await Promise.allSettled(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const res = await fetch(workerURL, {
          method: "POST",
          headers: {
            "Content-Type": file.type,
            "Content-Length": buffer.byteLength.toString(),
            "X-Type": xType,
            "Album-ID": albumId,
            "X-Worker-Secret": secretKey,
          },
          body: buffer,
        });

        if (!res.ok) {
          let errorText = null;
          try {
            const data = await res.json();
            errorText = data.error;
          } catch {
            errorText = await res.text();
          }
          throw new Error(`Worker error (${res.status}): ${errorText}`);
        }
        return res.json();
      }),
    );

    const filesOut: WorkerResult[] = results.map((result) => {
      return result.status === "fulfilled"
        ? { ok: true, data: result.value }
        : { ok: false, error: result.reason?.message ?? "Bilinmeyen Hata" };
    });

    const successPaths = filesOut.flatMap((f) => (f.ok ? [f.data.file] : []));
    const hasSuccess = successPaths.length > 0;
    const hasFailures = successPaths.length < filesOut.length;

    // Başarılı işlem varsa {success: true} gönder ve kaydetme işlemi ile devam et.
    return NextResponse.json(
      { success: hasSuccess, files: filesOut, successPaths },
      { status: !hasSuccess ? 400 : hasFailures ? 207 : 200 },
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "İşlem sırasında bir hata oluştu",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
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

    const { files } = await request.json();

    if (!Array.isArray(files) || !files.every((f) => typeof f === "string")) {
      return NextResponse.json({ error: "Geçersiz dosya listesi" }, { status: 400 });
    }
    if (files.length > MAX_DELETE_FILES) {
      return NextResponse.json(
        { success: false, error: `En fazla ${MAX_DELETE_FILES} dosya silinebilir` },
        { status: 400 },
      );
    }

    const results = await Promise.allSettled(
      files.map(async (file) => {
        const res = await fetch(`${workerURL}?file=${encodeURIComponent(file)}`, {
          method: "DELETE",
          headers: {
            "X-Worker-Secret": secretKey,
          },
        });
        if (!res.ok) {
          let errorText = null;
          try {
            const data = await res.json();
            errorText = data.error;
          } catch {
            errorText = await res.text();
          }
          throw new Error(`Worker error (${res.status}): ${errorText}`);
        }
        return res.json();
      }),
    );

    const filesOut: WorkerResult[] = results.map((result) => {
      return result.status === "fulfilled"
        ? { ok: true, data: result.value }
        : { ok: false, error: result.reason?.message ?? "Bilinmeyen Hata" };
    });

    const successPaths = filesOut.flatMap((f) => (f.ok ? [f.data.file] : []));
    const hasSuccess = successPaths.length > 0;
    const hasFailures = successPaths.length < filesOut.length;

    // Başarılı işlem varsa {success: true} gönder ve silme işlemine devam et.
    return NextResponse.json(
      { success: hasSuccess, files: filesOut, successPaths },
      { status: !hasSuccess ? 400 : hasFailures ? 207 : 200 },
    );
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "İşlem sırasında bir hata oluştu",
      },
      { status: 500 },
    );
  }
}
