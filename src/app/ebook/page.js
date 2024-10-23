"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import FormattedEbookViewer from "../components/FormattedEbookViewer";

const EbookPage = () => {
    const { data: session, status } = useSession();
    const [markdownContent, setMarkdownContent] = useState('');
    const [toc, setToc] = useState([]); // Table of Contents
    const router = useRouter();

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
                    generateTOC(response.data); // Generate Table of Contents
                } catch (error) {
                    console.error('Error fetching the markdown file:', error);
                }
            };

            fetchMarkdown();
        }
    }, [session, status]);

    // Function to generate the Table of Contents and create corresponding IDs
    const generateTOC = (markdown) => {
        const headings = markdown.match(/^(#{1,6})\s(.+)/gm);
        if (headings) {
            const tocItems = headings.map((heading) => {
                const level = heading.match(/^(#{1,6})/)[0].length;
                const title = heading.replace(/^(#{1,6})\s/, '');
                const id = title.toLowerCase().replace(/\s+/g, '-'); // Generate a more URL-friendly ID
                return { title, level, id };
            });
            setToc(tocItems);
        }
    };

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "authenticated") {
        return (
            <div className="min-h-screen flex bg-gradient-to-r from-gray-100 to-gray-200 p-8">
                <div className="flex-grow max-w-6xl mx-auto flex">

                    <div className="flex-grow bg-white shadow-lg rounded-lg p-8 overflow-y-auto">
                        <h1 className="text-3xl font-bold mb-6">Protected Ebook Page</h1>
                        <p className="text-lg mb-4">Welcome, {session.user?.username}</p>

                        {session.user?.paymentStatus === "approved" ? (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">You're approved and can read the ebook</h2>


                                <FormattedEbookViewer />
                            </div>
                        ) : (
                            <h2 className="text-red-600">Your Payment Status is still pending. Please contact the admin via email!</h2>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default EbookPage;
