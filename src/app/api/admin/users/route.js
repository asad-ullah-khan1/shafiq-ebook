// app/api/admin/users/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../models/User';

export async function GET(req) {
    try {
        const session = await getServerSession();

        console.log('checking here:', session)

        // console.log('Session data:', session); // Log    
        if (!session || session.user.email !== 'asadkhan602@gmail.com') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const users = await User.find({})
            .select('-password')
            .sort({ createdAt: -1 });


        // console.log('Fetched users:', users);
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        // console.error('Admin users fetch error:', error);
        return NextResponse.json(
            { message: 'Error fetching users' },
            { status: 500 }
        );
    }
}