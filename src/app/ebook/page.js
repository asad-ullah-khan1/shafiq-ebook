'use client';
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import FormattedEbookViewer from "../components/FormattedEbookViewer";
import Book from '../components/AsadBook'
import EbookHeader from "../components/EbookHeader";

const EbookPage = () => {
    const { data: session, status } = useSession();


    useEffect(() => {
        if (status === "unauthenticated") {
            signIn();
        }
    }, [status]);



    if (status === "loading") {
        return <p className="text-center text-lg py-12">Loading...</p>;
    }

    if (status === "authenticated") {
        return (
            <>
                <EbookHeader />

                <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
                    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 overflow-y-auto">


                        <p className="text-lg mb-4 text-center">Welcome, {session.user?.username}</p>

                        {session.user?.paymentStatus === "approved" ? (
                            <div>
                                <Book />
                            </div>
                        ) : (
                            <div className="">
                                <h2 className="font-bold">Payment Under Review</h2>
                                <p>Our Team is verifying your payment.Once approve you'll be able to read the book</p>
                                <p>if you have not sent us your payment screenshots yet.</p>

                                <div className="mx-auto max-w-4xl text-center my-12">
                                    <p className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mt-4">
                                        Payment Information
                                    </p>

                                    <h2 className="text-2xl sm:text-4xl font-bold text-red-500 py-4">JazzCash:</h2>
                                    <div className="text-xl sm:text-2xl font-light py-2">
                                        <p>Account Number: <span className="font-semibold">03176824639</span></p>
                                        <p>Account Name: <span className="font-semibold">Muhammad Shafique</span></p>
                                    </div>

                                    <p className="text-lg font-light mt-4">
                                        Please send a <span className="font-bold">screenshot</span> of your payment on WhatsApp
                                        at <a href="https://wa.me/923176824639" className="text-blue-600 underline">03176824639</a>.<br />
                                        Feel free to message us on WhatsApp if you have any questions.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return null;
};

export default EbookPage;
