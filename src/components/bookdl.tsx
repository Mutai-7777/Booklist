import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
}

interface BookTableProps {
  books: Book[];
  deleteBook: (id: number) => void;
  updateBook: (book: any) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, deleteBook, updateBook }) => {
  const handleDelete = (id: number) => {
    deleteBook(id);
  };

  const handleUpdate = (book: Book) => {
    const updatedTitle = prompt('Enter the updated title:', book.title);
    const updatedAuthor = prompt('Enter the updated author:', book.author);
    const updatedPublicationYear = prompt(
      'Enter the updated publication year:',
      book.publicationYear.toString()
    );

    if (updatedTitle && updatedAuthor && updatedPublicationYear) {
      updateBook({
        ...book,
        title: updatedTitle,
        author: updatedAuthor,
        publicationYear: parseInt(updatedPublicationYear),
      });
    }
  };
  

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publicationYear}</td>
            <td>
              <button onClick={() => handleUpdate(book)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;