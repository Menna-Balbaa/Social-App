import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const decodedToken = await decode({
    token: sessionToken,
    secret: process.env.AUTH_SECRET ?? process.env.AUTH_SECRET ?? "",
  });

  return (decodedToken?.token as string | undefined) ?? null;
}