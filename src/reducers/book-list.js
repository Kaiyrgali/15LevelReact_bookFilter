const updateBookList = (state, action) => {

  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null,
      booksFilter: '',
      booksRaiting: null,
      booksPrice: null,
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
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null,
        booksFilter: null,
        booksRaiting: null,
        booksPrice: null,
        };

    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload,
        booksFilter: null,
        booksRaiting: null,
        booksPrice: null,
        };

    case 'GET_BOOK_FILTER':
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: action.payload,
        booksRaiting: state.bookList.booksRaiting,
        booksPrice: state.bookList.booksPrice,
        }

    case 'GET_BOOK_RAITING':
      console.log(state)
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: state.bookList.booksFilter,
        booksRaiting: action.payload,
        booksPrice: state.bookList.booksPrice,
        }
    
    case 'GET_BOOK_PRICE':
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: state.bookList.booksFilter,
        booksRaiting: state.bookList.booksRaiting,
        booksPrice: action.payload,  
      }

    default:
      return state.bookList;
  }
};

export default updateBookList;
