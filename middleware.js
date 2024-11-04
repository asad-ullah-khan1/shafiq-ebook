// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // Add cache control headers to prevent caching
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '-1');

    if (request.nextUrl.pathname.startsWith('/api/books')) {
        try {
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET
            });

            if (!token) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            if (token.paymentStatus !== 'approved') {
                return NextResponse.json(
                    { error: 'Payment required' },
                    { status: 403 }
                );
            }

            return response;
        } catch (error) {
            console.error('Middleware error:', error);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    }

    // For /ebook route, check auth status
    if (request.nextUrl.pathname.startsWith('/ebook')) {
        try {
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET
            });

            if (!token) {
                return NextResponse.redirect(new URL('/login', request.url));
            }

            if (token.paymentStatus !== 'approved') {
                return NextResponse.redirect(new URL('/subscription', request.url));
            }

            return response;
        } catch (error) {
            console.error('Ebook route middleware error:', error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: ['/api/books/', '/ebook/']
};