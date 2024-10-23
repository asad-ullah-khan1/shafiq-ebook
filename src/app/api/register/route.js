import { NextApiResponse, NextApiRequest } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            await connectDB();

            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ email }, { username }],
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
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

            return res.status(201).json({ message: 'User created successfully', user: userWithoutPassword });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({ message: 'Error creating user' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
