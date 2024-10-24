import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Type, Minus, Plus } from 'lucide-react';
import bookContent from '../../../lib/content.json';

// Font size controls component
const FontSizeControls = ({ fontSize, onAdjustFontSize }) => (
    <div className="flex items-center space-x-4">
        <Type className="w-5 h-5 text-gray-600" />
        <button
            onClick={() => onAdjustFontSize(-2)}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
            aria-label="Decrease font size"
        >
            <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm text-gray-600">{fontSize}px</span>
        <button
            onClick={() => onAdjustFontSize(2)}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
            aria-label="Increase font size"
        >
            <Plus className="w-4 h-4" />
        </button>
    </div>
);

// Navigation controls component
const PageNavigation = ({ currentPage, totalPages, onPageChange }) => (
    <div className="border-t border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full hover:bg-gray-200 transition duration-200 
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full hover:bg-gray-200 transition duration-200 
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Next page"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
        <div className="flex items-center space-x-2">
            <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => onPageChange(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 border rounded-md text-center focus:outline-none focus:ring focus:ring-blue-500"
                aria-label="Current page"
            />
            <span className="text-gray-600">of {totalPages}</span>
        </div>
    </div>
);

// Content section component
const ContentSection = ({ section, index }) => {
    const components = {
        h1: 'text-2xl font-bold my-4',
        h2: 'text-xl font-semibold my-3',
        h3: 'text-lg font-semibold my-2',
        p: 'my-2 text-gray-700 leading-relaxed'
    };

    const className = components[section.type] || '';

    return React.createElement(
        section.type,
        { key: index, className },
        section.content
    );
};

// Page content component
const PageContent = ({ content, fontSize }) => {
    if (!content) return null;

    return (
        <div
            className="min-h-[600px] p-8 bg-gray-50"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
        >
            <div className="prose max-w-none">
                <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
                {content.sections.map((section, index) => (
                    <ContentSection key={index} section={section} index={index} />
                ))}
            </div>
        </div>
    );
};

const FormattedEbookViewer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fontSize, setFontSize] = useState(16);
    const totalPages = 90;
    const content = bookContent;

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const adjustFontSize = (increment) => {
        setFontSize(prevSize => Math.min(Math.max(prevSize + increment, 12), 24));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Controls Bar */}
            <div className="bg-white rounded-t-lg shadow-lg p-4 flex items-center justify-between">
                <FontSizeControls
                    fontSize={fontSize}
                    onAdjustFontSize={adjustFontSize}
                />
            </div>

            {/* Reader Container */}
            <div className="bg-white shadow-lg rounded-b-lg">
                <PageContent
                    content={content[currentPage]}
                    fontSize={fontSize}
                />
                <PageNavigation
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                />
            </div>
        </div>
    );
};

export default FormattedEbookViewer;