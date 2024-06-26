import React, { useRef } from 'react';



const BookForm: React.FC<{ addBook: (book: any) => void }> = ({ addBook }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const publicationYearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const publicationYear = publicationYearRef.current?.value;

    if (title && author && publicationYear) {
      addBook({ title, author, publicationYear: Number(publicationYear) });

      if (titleRef.current) {
        titleRef.current.value = '';
      }
      if (authorRef.current) {
        authorRef.current.value = '';
      }
      if (publicationYearRef.current) {
        publicationYearRef.current.value = '';
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={titleRef} placeholder="Title" required />
      <input type="text" ref={authorRef} placeholder="Author" required />
      <input type="number" ref={publicationYearRef} placeholder="Publication Year" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;