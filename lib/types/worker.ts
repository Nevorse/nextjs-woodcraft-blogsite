export type WorkerResult =
  | {
      ok: true;
      data: { ok: boolean; action: string; file: string; used: number; limit: number };
    }
  | { ok: false; error: string };

export type WorkerResponse =
  | {
      success: true;
      files: WorkerResult[];
      successPaths: string[];
    }
  | {
      success: false;
      error: string;
    };
