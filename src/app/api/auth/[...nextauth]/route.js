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

                // Return user data as a plain object
                return {
                    id: user._id.toString(), // Convert ObjectId to string
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
        async jwt({ token, user, trigger, session }) {
            try {
                if (user) {
                    // When signing in, add user data to token
                    token = {
                        ...token,
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        paymentStatus: user.paymentStatus,
                    };
                }

                // Handle user updates if needed
                if (trigger === "update" && session) {
                    // Using optional chaining and ensuring properties exist
                    token = {
                        ...token,
                        username: session?.username || token.username,
                        role: session?.role || token.role,
                        paymentStatus: session?.paymentStatus || token.paymentStatus,
                    };
                }

                return token;
            } catch (error) {
                console.error('JWT Callback Error:', error);
                return token; // Return original token if there's an error
            }
        },
        async session({ session, token }) {
            try {
                if (token) {
                    // Ensure session.user exists before adding properties
                    session.user = {
                        ...session.user,
                        id: token.id,
                        username: token.username || null,
                        role: token.role || null,
                        paymentStatus: token.paymentStatus || null,
                        email: session.user?.email // Preserve email from session
                    };
                }
                console.log('Session Callback - Output:', session);
                return session;
            } catch (error) {
                console.error('Session Callback Error:', error);
                return session; // Return original session if there's an error
            }
        }
    },
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
export const dynamic = 'force-dynamic';
export const revalidate = 0;
