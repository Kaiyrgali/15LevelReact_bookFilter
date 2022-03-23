const updateBookList = (state, action) => {

  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null,
      booksFilter: '',
      booksRaiting: null,
      booksPrice: null,
      page: 1,
    };
  }

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        loading: true,
        error: null,
        booksFilter: null,
        booksRaiting: null,
        booksPrice: null,
        page: 1,
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null,
        booksFilter: null,
        booksRaiting: null,
        booksPrice: null,
        page: 1,
        };

    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload,
        booksFilter: null,
        booksRaiting: null,
        booksPrice: null,
        page: 1,
        };

    case 'GET_BOOK_FILTER':
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: action.payload,
        booksRaiting: state.bookList.booksRaiting,
        booksPrice: state.bookList.booksPrice,
        page: 1,
        }

    case 'GET_BOOK_RAITING':
      console.log('Price', state.bookList.booksPrice)
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: state.bookList.booksFilter,
        booksRaiting: action.payload,
        booksPrice: state.bookList.booksPrice,
        page: 1,
        }
    
    case 'GET_BOOK_PRICE':
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: state.bookList.booksFilter,
        booksRaiting: state.bookList.booksRaiting,
        booksPrice: action.payload,
        page: 1,
      }

    case 'GET_BOOK_PAGE':
      console.log('GET_BOOK_action', action.payload)
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: state.bookList.booksFilter,
        booksRaiting: state.bookList.booksRaiting,
        booksPrice: state.bookList.booksPrice,
        page: action.payload,
      }

    default:
      return state.bookList;
  }
};

export default updateBookList;
