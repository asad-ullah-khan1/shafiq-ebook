// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/api/books')) {
        try {
            const token = await getToken({ req: request });

            if (!token) {
                return NextResponse.json(
                    { error: 'Unauthorized' },
                    { status: 401 }
                );
            }

            // Check for approved payment status
            if (token.user?.paymentStatus !== 'approved') {
                return NextResponse.json(
                    { error: 'Payment required' },
                    { status: 403 }
                );
            }

            return NextResponse.next();
        } catch (error) {
            console.error('Middleware error:', error);
            return NextResponse.json(
                { error: 'Internal server error' },
                { status: 500 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/books/']
};