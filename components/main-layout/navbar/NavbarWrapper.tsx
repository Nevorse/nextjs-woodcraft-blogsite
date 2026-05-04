import { auth } from "@/lib/auth";
import Navbar from ".";
import { headers } from "next/headers";

export default async function NavbarWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <Navbar user={session?.user ?? null} />;
}
