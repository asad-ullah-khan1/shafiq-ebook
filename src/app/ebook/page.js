'use client';
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import FormattedEbookViewer from "../components/FormattedEbookViewer";
import Book from '../components/AsadBook'

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
            <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
                <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center">SAIQO SEO Blog Post Writer</h1>
                    <h2 className="text-2xl font-bold mb-6 text-center">An eBook for newbies & mid-level SEO writers.</h2>
                    <p className="text-2xl font-bold mb-6 text-center">Write better blog posts for your clients and earn legit & more money</p>

                    <p className="text-lg mb-4">Welcome, {session.user?.username}</p>

                    {session.user?.paymentStatus === "approved" ? (
                        <div>
                            <Book />
                        </div>
                    ) : (
                        <div className="text-red-600 text-lg">
                            <h2 className="font-bold">Payment Pending</h2>
                            <p>Your payment status is pending. Please contact the admin for approval.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default EbookPage;
