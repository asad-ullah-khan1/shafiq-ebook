'use client';
export const dynamic = 'force-dynamic'

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
    const router = useRouter();
    const { data: session, status } = useSession({
        required: false,
        onUnauthenticated() {
            console.log("User is not authenticated");
        },
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Handle hydration and initial loading
    useEffect(() => {
        setIsClient(true);
        if (status !== 'loading') {
            setIsLoading(false);
        }
    }, [status]);

    // Session monitoring in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && status === 'authenticated') {
            console.log('Session Data:', {
                status,
                user: {
                    email: session?.user?.email,
                    role: session?.user?.role,
                    paymentStatus: session?.user?.paymentStatus
                }
            });
        }
    }, [session, status]);

    // Copy protection
    useEffect(() => {
        if (!isClient) return;

        const handleContextMenu = (e) => e.preventDefault();
        const handleCopy = (e) => e.preventDefault();
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('copy', handleCopy);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isClient]);

    // Handle sign out
    const handleSignOut = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: '/'
            });
        } catch (error) {
            console.error('Sign out error:', error);
            router.push('/');
        }
    };

    // Show loading state
    if (isLoading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    const shouldShowNavItems = isClient && status !== 'loading';
    const isAuthenticated = status === 'authenticated' && session?.user;

    // Safe access to user data
    const userEmail = session?.user?.email;
    const userRole = session?.user?.role;
    const userPaymentStatus = session?.user?.paymentStatus;


    const renderNavLinks = () => {
        if (!shouldShowNavItems) return null;

        return (
            <>
                <Link
                    href="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                    Home
                </Link>
                {isAuthenticated && (
                    <>
                        <Link
                            href="/subscription"
                            className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        >
                            Subscription
                        </Link>
                        {session.user.role === 'admin' && (
                            <Link
                                href="/admin"
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                Admin
                            </Link>
                        )}
                        {session.user.paymentStatus === 'approved' && (
                            <Link
                                href="/ebook"
                                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                Ebook
                            </Link>
                        )}
                    </>
                )}
            </>
        );
    };
    const renderMobileMenu = () => {
        if (!shouldShowNavItems) return null;

        return (
            <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="space-y-1 pb-3 pt-2">
                    <Link
                        href="/"
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                    >
                        Home
                    </Link>
                    {isAuthenticated && (
                        <>
                            <Link
                                href="/subscription"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                            >
                                Subscription
                            </Link>
                            {session.user.role === 'admin' && (
                                <Link
                                    href="/admin"
                                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    Admin
                                </Link>
                            )}
                            {session.user.paymentStatus === 'approved' && (
                                <Link
                                    href="/ebook"
                                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    Ebook
                                </Link>
                            )}
                        </>
                    )}
                </div>
                <div className="border-t border-gray-200 pb-3 pt-4">
                    {isAuthenticated ? (
                        <div className="space-y-1">
                            <p className="block px-4 py-2 text-base font-medium text-gray-500">
                                {session.user.email}
                            </p>
                            <button
                                onClick={() => signOut()}
                                className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <Link
                                href="/login"
                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/" className="text-xl font-bold text-indigo-600">
                                    Saiqic
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {renderNavLinks()}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            {shouldShowNavItems && (
                                isAuthenticated ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-500">
                                            {session.user.email}
                                        </span>
                                        <button
                                            onClick={() => signOut()}
                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-x-4">
                                        <Link
                                            href="/login"
                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">
                                    {isMenuOpen ? 'Close menu' : 'Open menu'}
                                </span>
                                <svg
                                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {renderMobileMenu()}
            </nav>
            <main>
                <div className="mx-auto max-w-9xl sm:px-6 lg:px-0">
                    {children}
                </div>
            </main>
        </div>
    );
}