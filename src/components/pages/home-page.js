import React from 'react';
import BookListContainer from '../book-list';
import './main.css';

function HomePage({ bookstoreService }) {
  return (
    <div>
      <BookListContainer books={[]} />
    </div>
  );
}

export default HomePage;
