import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart, gotoPage } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

// let  page =1;

// const gotoPageNew = (newPage) => {
//   let page = newPage;
//   console.log('goto ', page)
//   return page;
// }

function BookList({ books, page, onAddedToCart, gotoPageNew }) {
  const pages = Math.ceil(books.length/5);
  const pagesNumbers = new Array;
  for (let i = 0; i < pages; i++) {
    pagesNumbers.push(i+1);
    // console.log(pagesNumbers)
  };
  let onPageBooks = books.splice((page-1)*5,5);
  console.log(page);
  
  // const ar = 
  // console.log(books);
  return (
    <div>
      <ul className="book-list">
        { onPageBooks.map((book) => ( 
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
  // componentDidUpdate() {
  //   if (books)
  //   console.log('Updete', this.bookstoreService)
  //   const displayBooks = this.books.slice(0,10);
  //   console.log(displayBooks);
  // }
  render() {
    console.log('render page', page);
    const {
      books, loading, error, booksFilter, booksRaiting, booksPrice, onAddedToCart, page,gotoPageNew
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
        // console.log(item.price.substr(1));
        // console.log(Number('3'))
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

    // function gotoPageNew (newPage) {
    //   page = newPage;
    //   console.log('goto ', page)
    //   return page;
    // }

    return (
      <BookList
        books={displayBooks}
        onAddedToCart={onAddedToCart}
        page = {page}
        gotoPageNew = {gotoPageNew}
        // gotoPage = {gotoPage}
      />
    );
  }
}

const mapStateToProps = ({ bookList: { books, loading, error, booksFilter, booksRaiting, booksPrice, page } }) => ({ books, loading, error, booksFilter, booksRaiting, booksPrice, page });

const mapDispatchToProps = (dispatch, { bookstoreService }) =>
  bindActionCreators({
    fetchBooks: fetchBooks(bookstoreService),
    onAddedToCart: bookAddedToCart,
    gotoPageNew: gotoPage,
  }, dispatch);
export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
