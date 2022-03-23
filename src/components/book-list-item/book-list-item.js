import React from 'react';
import './book-list-item.css';

function BookListItem({ book }) {
  const {
    author, imgUrl, price, review, title
  } = book;
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={imgUrl} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title">{title}</span>
        <div className="book-author">{author}</div>
        <div className="book-title">{review}</div>
        <div className="book-price">
          {price}
        </div>
      </div>
    </div>
  );
}

export default BookListItem;
