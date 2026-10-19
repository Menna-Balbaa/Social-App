import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = await getToken({ req })
    const { pathname } = req.nextUrl;

    const isAuthPages = pathname == "/login" || pathname == "/register"

    if (token && isAuthPages) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);
    }

    if (!token && !isAuthPages) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/cart", "/checkout", "/login", "/register"],
}
