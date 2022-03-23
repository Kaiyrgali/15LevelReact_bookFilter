import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks, gotoPage } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

function BookList({ books, page, gotoPageNew }) {
  const pages = Math.ceil(books.length/5);
  const pagesNumbers = new Array;
  for (let i = 0; i < pages; i++) {
    pagesNumbers.push(i+1);
  };
  const onPageBooks = books.splice((page-1)*5,5);
  
  return (
    <div>
      <ul className="book-list">
        { onPageBooks.map((book) => ( 
            <li key={book.id}>
              <BookListItem
                book={book}
              />
            </li>
          ))
        }
      </ul>
      <div>
        <span>Страницы </span>
        { pagesNumbers.map((page) => ( 
            <button key={page}
                    className="btn btn-info add-to-cart"
                    onClick={()=> gotoPageNew(page)}>
              {page}
            </button>
          ))
        }
      </div>
    </div>
  );
}

class BookListContainer extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const {
      books, loading, error, booksFilter, booksRaiting, booksPrice, page, gotoPageNew
    } = this.props;
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
        if (Number(item.price.substr(1)) <= booksPrice) {
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
        page = {page}
        gotoPageNew = {gotoPageNew}
      />
    );
  }
}

const mapStateToProps = ({ bookList: { books, loading, error, booksFilter, booksRaiting, booksPrice, page } }) => ({ books, loading, error, booksFilter, booksRaiting, booksPrice, page });

const mapDispatchToProps = (dispatch, { bookstoreService }) =>
  bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    gotoPageNew: gotoPage,
  }, dispatch);
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
