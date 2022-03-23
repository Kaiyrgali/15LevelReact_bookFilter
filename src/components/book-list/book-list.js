import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

function BookList({ books, onAddedToCart }) {
  const pages = Math.ceil(books.length/5);
  console.log(pages);
  // const ar = 
  // console.log(books);
  return (
    <div>
      <ul className="book-list">
        { books.map((book) => ( 
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id)}
              />
            </li>
          ))
        }
      </ul>
      <div>
        
      </div>
    </div>
  );
}

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  // componentDidUpdate() {
  //   if (books)
  //   console.log('Updete', this.bookstoreService)
  //   const displayBooks = this.books.slice(0,10);
  //   console.log(displayBooks);
  // }
  render() {
    const {
      books, loading, error, booksFilter, booksRaiting, booksPrice, onAddedToCart,
    } = this.props;
    // console.log('filter', booksFilter);
    // console.log('books', books);
    let displayBooks = books.slice();
    
    if (booksFilter) {
      function filterByTitle(item) { //можно переименовать добавив и автора
        if (item.title.toLowerCase().indexOf(booksFilter.toLowerCase()) > -1 ||
        item.author.toLowerCase().indexOf(booksFilter.toLowerCase()) > -1) {
          return true
        }
        return false;
      }
      displayBooks = displayBooks.filter(filterByTitle);
    };

    if (booksRaiting) {
      function filterByRaiting(item) {
        if (item.review.substr(0, 1) >= booksRaiting) {
          return true
        }
        return false;
      }
      displayBooks = displayBooks.filter(filterByRaiting);
    };

    if (booksPrice) {
      function filterByPrice(item) {
        if (item.number(item.price.substr(1)) <= booksPrice) {
          return true
        }
        return false;
      }
      displayBooks = displayBooks.filter(filterByPrice);
    };

    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <BookList
        books={displayBooks}
        onAddedToCart={onAddedToCart}
      />
    );
  }
}

const mapStateToProps = ({ bookList: { books, loading, error, booksFilter, booksRaiting, booksPrice } }) => ({ books, loading, error, booksFilter, booksRaiting, booksPrice });

const mapDispatchToProps = (dispatch, { bookstoreService }) =>
  bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart,
  }, dispatch);
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
