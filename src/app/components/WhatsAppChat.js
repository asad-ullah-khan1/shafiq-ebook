// components/WhatsAppChat.js
'use client';
import React from 'react';

export default function WhatsAppChat() {
    return (
        <a
            href="https://wa.me/923176824639"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all"
            aria-label="Chat with us on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="32"
                height="32"
            >
                <path d="M12 2C6.485 2 2 6.484 2 12c0 1.613.385 3.147 1.06 4.522L2 22l5.505-1.024C8.877 21.615 10.413 22 12 22c5.516 0 10-4.484 10-10S17.516 2 12 2zm.186 18.16c-1.438 0-2.841-.35-4.107-1.011l-.29-.155-3.262.607.621-3.177-.168-.314C4.748 14.932 4.4 13.486 4.4 12 4.4 7.589 8.587 4.4 12.186 4.4c4.368 0 7.6 3.29 7.6 7.6 0 4.24-3.269 7.56-7.6 7.56zm3.709-5.468c-.193-.099-1.142-.562-1.319-.625-.178-.062-.307-.093-.437.093s-.5.624-.612.75c-.112.124-.225.14-.418.042-.193-.099-.814-.3-1.55-.955-.574-.511-.96-1.142-1.073-1.336-.112-.193-.012-.297.084-.396.088-.088.193-.225.289-.337.095-.111.125-.186.188-.311.062-.124.031-.233-.016-.326-.047-.093-.438-1.048-.6-1.433-.157-.375-.313-.325-.437-.331-.112-.006-.225-.006-.347-.006s-.325.047-.497.233c-.162.186-.668.654-.668 1.597 0 .943.684 1.854.78 1.984.093.124 1.345 2.059 3.283 2.842.459.199.818.318 1.098.407.46.147.88.127 1.213.078.371-.056 1.142-.466 1.303-.916.16-.45.16-.837.112-.916-.047-.078-.178-.124-.37-.222z" />
            </svg>
        </a>
    );
}
