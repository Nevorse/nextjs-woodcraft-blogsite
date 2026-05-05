import Navbar from ".";
import { getSession } from "@/lib/session";

export default async function NavbarWrapper() {

  const session = await getSession();

  return <Navbar user={session?.user ?? null} />;
}
