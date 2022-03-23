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
  // const ar = 
  console.log(books);
  return (
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
      books, loading, error, booksFilter, onAddedToCart,
    } = this.props;
    console.log('filter', booksFilter);
    console.log('books', books);
    let displayBooks = books.slice();
    // displayBooks = [];
    if (booksFilter) {
      console.log("make filter");
      function filterByTitle(item) {
        console.log(item)
        if (item.title.toLowerCase().indexOf(booksFilter.toLowerCase()) > -1) {
          console.log('true')
          return true
        }
        // invalidEntries++
        return false;
      }

      displayBooks = books.filter(filterByTitle);
      console.log('display', displayBooks)
    } 

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

const mapStateToProps = ({ bookList: { books, loading, error, booksFilter } }) => ({ books, loading, error, booksFilter });

const mapDispatchToProps = (dispatch, { bookstoreService }) =>
  bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart,
  }, dispatch);
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
