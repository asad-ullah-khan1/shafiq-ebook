// src/utils/readMarkdown.js
import fs from "fs";
import path from "path";

export const getMarkdownContent = () => {
    const filePath = path.join(process.cwd(), 'ebook.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
};
