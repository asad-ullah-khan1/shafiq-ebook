'use client';
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from 'axios';
import FormattedEbookViewer from "../components/FormattedEbookViewer";

const EbookPage = () => {
    const { data: session, status } = useSession();
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn();
        }
    }, [status]);

    useEffect(() => {
        if (status === "authenticated" && session.user?.paymentStatus === "approved") {
            const fetchMarkdown = async () => {
                try {
                    const response = await axios.get('https://res.cloudinary.com/dsf2qupc6/raw/upload/v1729678394/ebook_sicdam.md');
                    setMarkdownContent(response.data);
                } catch (error) {
                    console.error('Error fetching the markdown file:', error);
                }
            };

            fetchMarkdown();
        }
    }, [session, status]);

    if (status === "loading") {
        return <p className="text-center text-lg py-12">Loading...</p>;
    }

    if (status === "authenticated") {
        return (
            <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 overflow-y-auto">
                    <h1 className="text-3xl font-bold mb-6">Protected Ebook</h1>
                    <p className="text-lg mb-4">Welcome, {session.user?.username}</p>

                    {session.user?.paymentStatus === "approved" ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">You have access to the ebook</h2>
                            <FormattedEbookViewer markdownContent={markdownContent} />
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
