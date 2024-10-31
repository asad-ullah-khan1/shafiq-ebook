'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const EbookHeader = () => {
    const [showDedication, setShowDedication] = useState(false);

    return (
        <div className="my-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
                SAIQO SEO Blog Post Writer
            </h1>
            <h2 className="text-sm font-bold mb-6 text-center">
                An eBook for newbies & mid-level SEO writers.
            </h2>
            <p className="text-sm font-bold mb-6 text-center">
                Write better blog posts for your clients and earn legit & more money
            </p>

            <div className="max-w-3xl mx-auto mt-8">
                <button
                    onClick={() => setShowDedication(!showDedication)}
                    className="flex items-center justify-center gap-2 mx-auto text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                    {showDedication ? (
                        <>
                            <ChevronUp size={20} />
                            <span>Hide Dedication</span>
                        </>
                    ) : (
                        <>
                            <ChevronDown size={20} />
                            <span>Show Dedication</span>
                        </>
                    )}
                </button>

                {showDedication && (
                    <div className="mt-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-sm border border-indigo-100 animate-fade-in">
                        <div className="prose prose-indigo max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To all the SEO writers working hard to pay the bills, pursue their dreams, and support their families.
                                I feel you. I get you.
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                And to my mom, who doesn't know what I do…but believes in me and supports me.
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-6">
                                A cordially thanks to my very talented, dedicated, and amazing fellow <Link href="https://www.linkedin.com/in/hafsa-raja/">Hafsa Raja</Link>,
                                who has greatly supported me in completing this eBook. I owe you bigtime, Hafsa.
                            </p>

                            <p className="text-right text-indigo-600 font-semibold italic">
                                ~Saiqo
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EbookHeader;