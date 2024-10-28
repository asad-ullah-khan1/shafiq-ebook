import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    chapters: [chapterSchema],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
