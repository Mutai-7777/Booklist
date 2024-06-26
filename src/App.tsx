import React, { useState, useEffect, useReducer } from 'react';
import BookForm from './components/bookmain';
import BookTable from './components/bookdl';
import { useLocalStorage } from './hooks/localstorage';
import './App.css'

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
}

const ACTIONS = {
  ADD_BOOK: 'add_book',
  DELETE_BOOK: 'delete_book',
  UPDATE_BOOK: 'update_book',
  SET_BOOKS: 'set_books',
};

type Action =
  | { type: typeof ACTIONS.ADD_BOOK; payload: Book }
  | { type: typeof ACTIONS.DELETE_BOOK; payload: number }
  | { type: typeof ACTIONS.UPDATE_BOOK; payload: any }
  | { type: typeof ACTIONS.SET_BOOKS; payload: Book[] };

  const bookReducer = (books: Book[], action: Action): Book[] => {
    switch (action.type) {
      case ACTIONS.ADD_BOOK:
        return [...books, { ...action.payload, id: Date.now() }];
      case ACTIONS.DELETE_BOOK:
        return books.filter((book) => book.id !== action.payload);
      case ACTIONS.UPDATE_BOOK:
        return books.map((book) => {
          if (book.id === action.payload) {
            return action.payload;
          }
          return book;
        });
      case ACTIONS.SET_BOOKS:
        return action.payload;
      default:
        return books;
    }
  };

const BookList = () => {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [storedBooks, setStoredBooks] = useLocalStorage('books', []);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_BOOKS, payload: storedBooks });
  }, [storedBooks]);

  const addBook = (book: Book) => {
    const newBook = { ...book, id: Date.now() };
    dispatch({ type: ACTIONS.ADD_BOOK, payload: newBook });
    setStoredBooks([...books, newBook]);
  };

  const deleteBook = (id: number) => {
    dispatch({ type: ACTIONS.DELETE_BOOK, payload: id });
    setStoredBooks(books.filter((book) => book.id !== id));
  };

  const updateBook = (updatedBook: Book) => {
    dispatch({ type: ACTIONS.UPDATE_BOOK, payload: updatedBook });
    setStoredBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : prevPage - 1
    );
  };

  const getPaginationData = () => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalPages === 0;

    return {
      filteredBooks,
      totalPages,
      isFirstPage,
      isLastPage,
    };
  };

  const { filteredBooks, totalPages, isFirstPage, isLastPage } = getPaginationData();
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className='books'>
      <h1>Book Repository</h1>
      <BookForm addBook={addBook} />
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearch}
      />
      <BookTable books={currentBooks} deleteBook={deleteBook} updateBook={updateBook} />
      <div>
        <button disabled={isFirstPage} onClick={() => handlePageChange('prev')}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={isLastPage} onClick={() => handlePageChange('next')}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;