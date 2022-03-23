import updateBookList from './book-list';

const reducer = (state, action) => ({
  bookList: updateBookList(state, action)
});

export default reducer;
