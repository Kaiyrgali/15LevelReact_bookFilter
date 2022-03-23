const updateBookList = (state, action) => {

  if (state === undefined) {
    return {
      books: [],
      loading: true,
      error: null,
      booksFilter: ''
    };
  }

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return {
        books: [],
        loading: true,
        error: null,
        booksFilter: null,
      };

    case 'FETCH_BOOKS_SUCCESS':
      return {
        books: action.payload,
        loading: false,
        error: null,
        booksFilter: null,
      };

    case 'FETCH_BOOKS_FAILURE':
      return {
        books: [],
        loading: false,
        error: action.payload,
        booksFilter: null,
      };

    case 'GET_BOOK_FILTER':
      console.log(action.payload)
      // const newBooks = state.bookList.books.slice(0,3);
      // console.log('state', newBooks);
      return {
        books: state.bookList.books,
        loading: false,
        error: null,
        booksFilter: action.payload,
      }

    default:
      return state.bookList;
  }
};

export default updateBookList;
