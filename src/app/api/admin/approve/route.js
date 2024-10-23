// app/api/admin/approve/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../models/User';

export async function POST(req) {
    try {
        const session = await getServerSession();

        if (!session || session.user.email !== 'asadkhan602@gmail.com') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json(
                { message: 'User ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findByIdAndUpdate(
            userId,
            { paymentStatus: 'approved' },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'User approved successfully', user },
            { status: 200 }
        );
    } catch (error) {
        console.error('Admin approve error:', error);
        return NextResponse.json(
            { message: 'Error approving user' },
            { status: 500 }
        );
    }
}