import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShopHeader from '../shop-header/shop-header';
import HomePage from '../pages/home-page';
// import CartPage from '../pages/cart-page';
import store from '../../store';
import ErrorBoundry from '../error-boundry';
import { BookstoreServiceProvider } from '../bookstore-service-context';
import BookstoreService from '../../services/bookstore-service';

const bookstoreService = new BookstoreService();
console.log(bookstoreService);
console.log('func', bookstoreService.getBooks());

    // return {
    //   term: newValue,


function App() {
  const FilterByFilterPanel = (eText) => {
    const newValue = String(eText.target.value);
    console.log(newValue);
  };

  return (
    <Provider store={store}>
      <ErrorBoundry>
        <BookstoreServiceProvider value={bookstoreService}>
          <Router>
            <main role="main" className="container">
              <ShopHeader numItems={5} total={210} /> 
              {/* // Заменить на страницу с фильтрами */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="cart" element={<CartPage />} /> ее нет, но нужны страницы с другими страницами */}
              </Routes>
            </main>
          </Router>
        </BookstoreServiceProvider>
      </ErrorBoundry>
    </Provider>
  );
}

export default App;
