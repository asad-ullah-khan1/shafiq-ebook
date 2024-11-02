// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        if (path.startsWith("/ebook")) {
            if (!token) {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
);

export const config = {
    matcher: ['/api/ebook', '/register'],
};
// import { getServerSession } from 'next-auth/react';

// export async function middleware(req) {
//     const session = await getServerSession({ req });
//     if (!session) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
// }

// export const config = {
//     matcher: ['/api/ebook', '/register'], // Specify routes to protect
// };
