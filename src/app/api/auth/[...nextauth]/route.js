// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '../../../../../lib/mongodb';
import User from '../../../../../models/User';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password');
                }

                await connectDB();

                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('No user found with this email');
                }

                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordMatch) {
                    throw new Error('Invalid password');
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    paymentStatus: user.paymentStatus,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
        signUp: '/register',
    },
    callbacks: {
        async jwt({ token, user }) {
            // If it's a new user signing in, add details to the token
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.paymentStatus = user.paymentStatus;
            }
            return token;
        },
        async session({ session, token }) {
            // Transfer token information to session
            if (token) {
                session.user = {
                    id: token.id,
                    username: token.username,
                    role: token.role,
                    paymentStatus: token.paymentStatus,
                    email: session.user?.email || token.email // Preserve email if available
                };
            }
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';
