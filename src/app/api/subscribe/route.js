// app/api/subscribe/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { tier } = await req.json();
        if (!tier || !['tier1', 'tier2'].includes(tier)) {
            return NextResponse.json(
                { message: 'Invalid subscription tier' },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                subscriptionTier: tier,
                paymentStatus: 'pending'
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Subscription updated successfully', user },
            { status: 200 }
        );
    } catch (error) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { message: 'Error updating subscription' },
            { status: 500 }
        );
    }
}