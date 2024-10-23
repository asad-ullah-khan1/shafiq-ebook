import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();  // Use req.json() instead of req.body

        if (!username || !email || !password) {
            return new Response(JSON.stringify({ message: 'Please provide all required fields' }), { status: 400 });
        }

        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return new Response(JSON.stringify({ message: 'User created successfully', user: userWithoutPassword }), { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ message: 'Error creating user' }), { status: 500 });
    }
}
