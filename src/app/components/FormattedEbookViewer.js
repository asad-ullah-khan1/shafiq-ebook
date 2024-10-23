import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Type, Minus, Plus } from 'lucide-react';
import bookContent from '../../../lib/content.json';


const FormattedEbookViewer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.6);
    const totalPages = 90;

    // Example formatted content - replace with your actual content
    const content = bookContent;

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const adjustFontSize = (increment) => {
        setFontSize(prev => {
            const newSize = prev + increment;
            return Math.min(Math.max(newSize, 12), 24); // Limit font size between 12 and 24
        });
    };

    const renderContent = (pageContent) => {
        if (!pageContent) return null;

        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">{pageContent.title}</h1>
                {pageContent.sections.map((section, index) => {
                    switch (section.type) {
                        case 'h1':
                            return <h1 key={index} className="text-2xl font-bold my-4">{section.content}</h1>;
                        case 'h2':
                            return <h2 key={index} className="text-xl font-semibold my-3">{section.content}</h2>;
                        case 'h3':
                            return <h3 key={index} className="text-lg font-semibold my-2">{section.content}</h3>;
                        case 'p':
                            return <p key={index} className="my-2">{section.content}</p>;
                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Controls Bar */}
            <div className="bg-white rounded-t-lg shadow-lg border-b p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Type className="w-5 h-5 text-gray-600" />
                        <button
                            onClick={() => adjustFontSize(-1)}
                            className="p-2 rounded-full hover:bg-gray-100"
                            aria-label="Decrease font size"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-600">{fontSize}px</span>
                        <button
                            onClick={() => adjustFontSize(1)}
                            className="p-2 rounded-full hover:bg-gray-100"
                            aria-label="Increase font size"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reader Container */}
            <div className="bg-white shadow-lg">
                {/* Content Area */}
                <div
                    className="min-h-[600px] p-8 bg-gray-50"
                    style={{
                        fontSize: `${fontSize}px`,
                        lineHeight: lineHeight
                    }}
                >
                    <div className="prose max-w-none">
                        {renderContent(content[currentPage])}
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Page Input */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 border rounded-md text-center"
                        />
                        <span className="text-gray-600">
                            of {totalPages}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormattedEbookViewer;