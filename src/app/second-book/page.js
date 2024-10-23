"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const EbookPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn();
        }
    }, [status]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "authenticated") {
        return (
            <div className="min-h-screen flex bg-gradient-to-r from-gray-100 to-gray-200 p-8">
                <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-6 my-5">
                    <h1 className="text-3xl font-bold mb-6">Protected Ebook Page</h1>
                    <p className="text-lg mb-4">Welcome, {session.user?.username}</p>

                    {session.user?.paymentStatus === "approved" ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">You're approved and can read the ebook</h2>
                            {/* Full-width Google Docs Embed */}
                            <div className="w-full h-[80vh]">
                                <iframe
                                    src="https://docs.google.com/document/d/1xOesud9hjAuQx12YE5TXK3bejQsJ3thFSFDsVzAsX0c/preview"
                                    className="w-full h-full border-none"
                                    title="Ebook"
                                ></iframe>
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-red-600">Your Payment Status is still pending. Please contact the admin via email!</h2>
                    )}
                </div>
            </div>
        );
    }

    return null;
};

export default EbookPage;
