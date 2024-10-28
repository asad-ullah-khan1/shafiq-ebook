import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Sample book data with Markdown content
const bookData = {
    title: "My Book Title",
    chapters: [
        {
            id: 1,
            title: "Unit 0: Preface",
            content: `
# Unit 0: Preface

## Who am I to write this guide?

I am Saiqo :)

I started my SEO content writing journey in the middle of 2021 (yes, wayyy before GPT), and in the past 4 years, I have (ghost)written over 340 blogs and articles for over 55 clients in 15+ industries. In the mid of 2022, I got a Level Two Seller badge on Fiverr, and then in the early 2023, my Fiverr got banned. And I shifted to LinkedIn. Then I started on Upwork in January 2024..., and in March 2024, I got the top-rated badge.

I have earned $20k+ in the past two years solely from SEO blog posts. Through those blog posts, I've been able to provide for my family of 7, explore nearly 65% of Pakistan (I lovee traveling & especially mountains), and started building my new home.

Now, I have a non-typical DFY SEO blog writing agency, and we manage our client's blog from scratch.

Sounds like I'm writing a resume:)

But anyways....I know a thing or two about SEO blog writing and will share everything I know.

Fair enough?

## Ok, but what's this SAIQO thing?

Saiqo is an acronym. It stands for:

* **S** = Search Intent
* **A** = Authenticity
* **I** = Insightful
* **Q** = Quality
* **O** = Original

These are 'elements' that make a blog post 'rank-worthy' and 'read-worthy.'

## Why am I writing this guide when you can literally find 1000s of SEO content writing guides on Google and tutorials on YouTube?

There were times when I was a total nut...and used to get excessively nervous when clients approached me for a project.

"How to start the project...what if I can't complete the project...what if the client gets angry with me...what if they curse me...." were some of my first thoughts...

At that time, I did not find any guide to show me the process...everything needed to complete a client's blog post project. Some guides get too deep into research and ignore other factors. Some touch on all the aspects (On-page SEO, structure, etc.) but miss other details, like how to research and outline stuff.

I really wish I knew everything that I know today. But today, when I know... I want to transfer everything... in the hope that it will save you time...loads of time and stress.

## What you should expect from this guide?

**There are two things in SEO blog writing:**

1. Writing
2. The format & structure of the blog. It also includes the research process for the topic, tone, style, and placement of on-page SEO elements, etc.

After reading this guide, you won't become an "EXPERT" SEO blog writer.

Writing needs practice. Expertise comes with grinding and writing daily. You also need discipline, a constant reading habit, a curious mind, and an itch to serve the reader with THE best.

No one can spoon-feed you "good writing." And there is no 'good writing' as 'good' is always subjective. That is your part to excel.

This guide will show you a roadmap, a method..., and a way to write blog posts the right way. You won't need to take any other courses...or spend countless days and nights just navigating the process...as I once struggled to do.

This guide is about the process from scratch to end with important concepts you must know. In other words, I can safely say that this guide has all the ingredients you need to cook a perfect blog post....but as you know, every cook cooks differently (and as per their cheffing talent) even given the same ingredients...so is the case with this guide....

The better you can write...the better this guide will serve.
      `
        },
        {
            id: 2,
            title: "Chapter 1: Getting Started",
            content: `

      `
        }
    ]
};

// Custom components for ReactMarkdown
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
    // Custom styling for other Markdown elements
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">{children}</h3>
    ),
    p: ({ children }) => (
        <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="mb-4 ml-4 list-disc space-y-2 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="mb-4 ml-4 list-decimal space-y-2 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => (
        <li className="ml-4">{children}</li>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic text-gray-700">
            {children}
        </blockquote>
    ),
};

const BookReader = () => {
    const [bookData, setBookData] = useState(null);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    useEffect(() => {
        const fetchBookData = async () => {
            const response = await fetch('/api/books'); // Fetch data from the API route
            const data = await response.json();
            setBookData(data); // Set the fetched book data
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

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 lg:hidden"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <h1 className="text-xl font-bold">{bookData.title}</h1>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar - Table of Contents */}
                <aside className={`
          fixed lg:sticky top-[57px] w-[30%] max-w-xs h-[calc(100vh-57px)] 
          bg-white border-r overflow-y-auto
          transform transition-transform duration-200 ease-in-out
          lg:transform-none z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
                    <nav className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
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

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="max-w-3xl mx-auto px-4 py-8">
                        {/* Chapter Content */}
                        <article className="mb-12">
                            <ReactMarkdown
                                components={MarkdownComponents}
                                className="prose max-w-none"
                            >
                                {bookData.chapters[currentChapter].content}
                            </ReactMarkdown>
                        </article>

                        {/* Navigation Buttons */}
                        <div className="mt-12 flex items-center justify-between border-t pt-6">
                            <button
                                onClick={() => navigateChapter('prev')}
                                disabled={currentChapter === 0}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg
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