// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//     const token = await getToken({ req });

//     if (!token) {
//         return new Response("Unauthorized", { status: 401 });
//     }

//     // Continue to the requested page if authenticated
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/member', '/admin', '/ebook'],
// };

// middleware.js
import { getServerSession } from 'next-auth/react';

export async function middleware(req) {
    const session = await getServerSession({ req });
    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/api/ebook', '/register'], // Specify routes to protect
};
