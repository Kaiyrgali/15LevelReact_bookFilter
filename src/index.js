import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './main.scss';

// const url = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';

// async function getResource() {
//   let response = await fetch("https://bookshelves.p.rapidapi.com/books", {
//     "method": "GET",
//     "headers": {
//       "x-rapidapi-key": "5aea6a6c5fmshfbf9bf49513d8c9p1f57e8jsn5bee58ede18b",
//       "x-rapidapi-host": "bookshelves.p.rapidapi.com"
//     }
//   });
//   let rusult = await response.json();
//   console.log(rusult)
//   }
// getResource()
  

// const App = () => <p>This is WebPack React App</p>;

ReactDOM.render(<App/>, document.getElementById('root'));