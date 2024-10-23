import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req });

    if (!token) {
        return new Response("Unauthorized", { status: 401 });
    }

    // Continue to the requested page if authenticated
    return NextResponse.next();
}

export const config = {
    matcher: ['/member', '/admin', '/ebook'],
};
