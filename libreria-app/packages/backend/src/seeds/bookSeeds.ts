import { Book } from '../models/Book';
import { AppDataSource } from '../data-source';

const sampleBooks = [
    {
        title: "One Hundred Years of Solitude",
        author: "Gabriel García Márquez",
        isbn: "9780060883287",
        price: 14.99,
        stock: 25,
        coverImage: "/images/books/hundred-years-solitude.jpg",
        description: "The multi-generational story of the Buendía family in the fictional town of Macondo."
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        price: 12.99,
        stock: 30,
        coverImage: "/images/books/1984.jpg",
        description: "A dystopian novel set in a totalitarian society."
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "9780141439518",
        price: 9.99,
        stock: 20,
        coverImage: "/images/books/pride-and-prejudice.jpg",
        description: "A romantic novel following the character of Elizabeth Bennet."
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        price: 15.99,
        stock: 35,
        coverImage: "/images/books/the-hobbit.jpg",
        description: "The precursor to The Lord of the Rings, following Bilbo Baggins' adventure."
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780446310789",
        price: 13.99,
        stock: 28,
        coverImage: "/images/books/to-kill-mockingbird.jpg",
        description: "A story of racial injustice and loss of innocence in the American South."
    }
];

export const seedBooks = async () => {
    try {
        const bookRepository = AppDataSource.getRepository(Book);
        
        // Clear existing books
        await bookRepository.clear();
        
        // Insert sample books
        for (const bookData of sampleBooks) {
            const book = bookRepository.create(bookData);
            await bookRepository.save(book);
        }
        
        console.log('Sample books have been seeded successfully!');
    } catch (error) {
        console.error('Error seeding books:', error);
    }
}; 