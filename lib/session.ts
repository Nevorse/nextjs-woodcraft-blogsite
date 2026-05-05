import { cacheLife, cacheTag } from "next/cache";
import { auth } from "./auth";
import { cookies } from "next/headers";

async function fetchSession(token: string) {
  "use cache";
  cacheTag(`session-${token}`);
  cacheLife("hours");

  const headers = new Headers();
  const isSecure = process.env.NODE_ENV === "production";

  const cookieName = isSecure
    ? "__Secure-better-auth.session_token"
    : "better-auth.session_token";

  headers.set("cookie", `${cookieName}=${token}`);
  return auth.api.getSession({ headers });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("__Secure-better-auth.session_token")?.value ??
    cookieStore.get("better-auth.session_token")?.value;

  if (!token) return null;

  return fetchSession(token);
}
