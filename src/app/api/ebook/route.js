import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth'; // Adjust this if you're using another method for your session
import cloudinary from '../../../../cloudinaryConfig'; // Import your Cloudinary setup
import connectDB from '../../../../lib/mongodb'; // Import your MongoDB connection utility
import User from '../../../../models/User'; // Import your User model

export async function GET(req) {
    await connectDB();

    const session = await getServerSession({ req });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized: Please log in.' }, { status: 401 });
    }

    try {
        const user = await User.findOne({ email: session.user.email });

        if (!user || !user.isApproved) {
            return NextResponse.json({ error: 'Unauthorized: Your account is awaiting approval.' }, { status: 403 });
        }

        const signedUrl = cloudinary.utils.sign_url(
            'https://res.cloudinary.com/dsf2qupc6/raw/upload/v1729678394/ebook_sicdam.md',
            {
                resource_type: 'raw',
                type: 'authenticated',
                expires_at: Math.floor(Date.now() / 1000) + 60 * 60, // URL expires in 1 hour
            }
        );

        return NextResponse.json({ url: signedUrl });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
    }
}
