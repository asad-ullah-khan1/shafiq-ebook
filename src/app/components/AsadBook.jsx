import React, { useEffect, useState } from 'react';
import { X, Menu, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';

        return !inline && language ? (
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                className="rounded-lg"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={`${className} px-1 py-0.5 rounded-md bg-gray-100`} {...props}>
                {children}
            </code>
        );
    },
    h1: ({ children }) => (
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800">{children}</h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="mb-4 ml-4 list-disc space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children, ordered, start }) => {
        // Add CSS counter-reset to ensure proper numbering
        return (
            <ol start={start} className="mb-4 ml-4 list-decimal space-y-2 text-gray-700" style={{ counterReset: `list-item ${(start || 1) - 1}` }}>
                {children}
            </ol>
        );
    },
    li: ({ children, ordered, index }) => {
        // For ordered lists, use CSS counters to ensure proper numbering
        const listStyle = ordered ? { counterIncrement: 'list-item' } : {};
        return (
            <li className="ml-4" style={listStyle}>
                {children}
            </li>
        );
    },
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700">
            {children}
        </blockquote>
    ),
};

const BookReader = () => {
    const [bookData, setBookData] = useState(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);
    const [currentChapter, setCurrentChapter] = useState(0);

    useEffect(() => {
        const fetchBookData = async () => {
            const response = await fetch('/api/books');
            const data = await response.json();
            setBookData(data[0]);
        };

        fetchBookData();
    }, []);

    const navigateChapter = (direction) => {
        if (direction === 'next' && currentChapter < bookData.chapters.length - 1) {
            setCurrentChapter(currentChapter + 1);
            window.scrollTo(0, 0);
        } else if (direction === 'prev' && currentChapter > 0) {
            setCurrentChapter(currentChapter - 1);
            window.scrollTo(0, 0);
        }
    };

    if (!bookData) {
        return <div>Book is Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="sticky top-0 bg-white border-b z-40">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 lg:hidden"
                            aria-label="Toggle mobile menu"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        {/* <h1 className="text-lg md:text-xl font-bold">{bookData.title}</h1> */}
                    </div>

                    <button
                        onClick={() => setIsDesktopSidebarVisible(!isDesktopSidebarVisible)}
                        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                        aria-label="Toggle table of contents"
                    >
                        {isDesktopSidebarVisible ? (
                            <><PanelLeftClose size={16} /> Hide Contents</>
                        ) : (
                            <><PanelLeft size={16} /> Show Contents</>
                        )}
                    </button>
                </div>
            </header>

            <div className="flex relative">
                {/* Dark overlay for mobile when sidebar is open */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`
          fixed lg:static top-[57px] left-0 w-[270px] max-w-[85vw]
          h-[calc(100vh-57px)] bg-white border-r overflow-y-auto
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isDesktopSidebarVisible ? 'lg:translate-x-0 lg:w-[270px]' : 'lg:-translate-x-full lg:w-0'}
          z-5z0
        `}>
                    <nav className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Table of Contents</h2>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-lg lg:hidden"
                                aria-label="Close sidebar"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <ul className="space-y-2">
                            {bookData.chapters.map((chapter, index) => (
                                <li key={chapter.id}>
                                    <button
                                        onClick={() => {
                                            setCurrentChapter(index);
                                            setIsSidebarOpen(false);
                                            window.scrollTo(0, 0);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm
                      ${currentChapter === index
                                                ? 'bg-blue-50 text-blue-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }
                    `}
                                    >
                                        {chapter.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className={`
          flex-1 min-w-0 px-4 sm:px-6 py-8 transition-all duration-200
          ${!isDesktopSidebarVisible ? 'lg:max-w-3xl lg:mx-auto' : ''}
        `}>
                    <div className="max-w-3xl mx-auto">
                        <article className="mb-12">
                            <ReactMarkdown
                                components={MarkdownComponents}
                                className="prose max-w-none"
                            >
                                {bookData.chapters[currentChapter].content}
                            </ReactMarkdown>
                        </article>

                        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t pt-6">
                            <button
                                onClick={() => navigateChapter('prev')}
                                disabled={currentChapter === 0}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto mb-4 sm:mb-0
                  ${currentChapter === 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:bg-blue-50'
                                    }
                `}
                            >
                                <ChevronLeft size={20} />
                                Previous Chapter
                            </button>

                            <button
                                onClick={() => navigateChapter('next')}
                                disabled={currentChapter === bookData.chapters.length - 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto
                  ${currentChapter === bookData.chapters.length - 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:bg-blue-50'
                                    }
                `}
                            >
                                Next Chapter
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BookReader;
