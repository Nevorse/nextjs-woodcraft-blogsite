export async function parseErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    return JSON.parse(text)?.error ?? text;
  } catch {
    return text;
  }
}