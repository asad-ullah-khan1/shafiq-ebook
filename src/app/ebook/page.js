'use client';
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Book from '../components/AsadBook'
import EbookHeader from "../components/EbookHeader";

const EbookPage = () => {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        },
    });

    // Add state to track if session is fully loaded
    const [isSessionLoaded, setIsSessionLoaded] = useState(false);
    useEffect(() => {
        if (status === 'authenticated' && session?.user) {
            setIsSessionLoaded(true);
        }
    }, [status, session]);

    // For debugging in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('Session:', session);
            console.log('Status:', status);
            console.log('IsSessionLoaded:', isSessionLoaded);
        }
    }, [session, status, isSessionLoaded]);

    if (status === "loading" || !isSessionLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-lg mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session?.user) {
        return null; // Will redirect due to required: true
    }

    return (
        <>
            <EbookHeader />
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 overflow-y-auto">
                    <p className="text-lg mb-4 text-center">
                        Welcome, {session.user.username || session.user.email}
                    </p>

                    {session.user.paymentStatus === "approved" ? (
                        <div>
                            <Book />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h2 className="text-lg font-medium text-yellow-800">
                                            Payment Under Review
                                        </h2>
                                        <p className="mt-2 text-yellow-700">
                                            Our team is verifying your payment. Once approved, you'll be able to read the book.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto max-w-4xl text-center my-12">
                                <p className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mt-4">
                                    Payment Information
                                </p>

                                <h2 className="text-2xl sm:text-4xl font-bold text-red-500 py-4">
                                    JazzCash:
                                </h2>

                                <div className="text-xl sm:text-2xl font-light py-2">
                                    <p>Account Number: <span className="font-semibold">03176824639</span></p>
                                    <p>Account Name: <span className="font-semibold">Muhammad Shafique</span></p>
                                </div>

                                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-lg">
                                        Please send a <span className="font-bold">screenshot</span> of your payment on WhatsApp
                                        at <a href="https://wa.me/923176824639"
                                            className="text-blue-600 hover:text-blue-800 underline transition-colors">
                                            03176824639
                                        </a>
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Feel free to message us on WhatsApp if you have any questions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EbookPage;