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

                // Log the authorized user data for debugging
                console.log('Authorized user:', user);

                return {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login',
        signUp: '/register',
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log('JWT callback - token before:', token);

            if (user) {
                token.role = user.role;
                token.username = user.username;
            }
            console.log('JWT callback - token after:', token);  // Debug modified token
            return token;
        },
        async session({ session, token }) {
            console.log('Session callback - session before:', session);  // Debug session before modification
            if (token) {
                session.user.role = token.role;
                session.user.username = token.username;
            }
            console.log('Session callback - session after:', session);  // Debug session after modification
            return session;
        }
    }
});

export { handler as GET, handler as POST };
