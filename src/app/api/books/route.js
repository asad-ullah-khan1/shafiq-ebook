// app/api/books/route.js


import connectDB from '../../../../lib/mongodb';
import Book from '../../../../models/Book.js'


export async function GET() {
    await connectDB();

    const books = await Book.find({});

    return new Response(JSON.stringify(books), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
