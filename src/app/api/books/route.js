// app/api/books/route.js
import connectDB from '../../../../lib/mongodb';
import Book from '../../../../models/Book.js';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        // Get token with all user details
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });

        if (!token) {
            return NextResponse.json(
                { error: 'Please login to access content' },
                { status: 401 }
            );
        }

        // Debug log to see what's in the token
        console.log('Token contents:', token);

        // Check payment status from token
        if (token.paymentStatus !== 'approved') {
            return NextResponse.json(
                { error: 'Payment required to access content' },
                { status: 403 }
            );
        }

        await connectDB();
        const books = await Book.find({}).select('-__v').lean();

        if (!books || books.length === 0) {
            return NextResponse.json(
                { error: 'No books found' },
                { status: 404 }
            );
        }

        return NextResponse.json(books, { status: 200 });

    } catch (error) {
        console.error('Error in /api/books:', error);
        return NextResponse.json(
            { error: 'Failed to fetch books' },
            { status: 500 }
        );
    }
}