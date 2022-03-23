export default class BookstoreService {
  _apiBase = 'https://bookshelves.p.rapidapi.com/books';
  _apiBaseKey = '5aea6a6c5fmshfbf9bf49513d8c9p1f57e8jsn5bee58ede18b';
  _apiBaseHost = 'bookshelves.p.rapidapi.com';

  getBooks = async () => {
    console.log('Start');
    const res = await fetch(this._apiBase, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": this._apiBaseKey,
            "x-rapidapi-host": this._apiBaseHost
          }});
    if (!res.ok) {
      console.log('Error')
      throw new Error(`Could not fetch Books DataBase recieved ${res.status}`);
    };
    const parseData = await res.json();
    const data = Object.values(parseData.Books);
    return data;
   }



};  
    // data = getBooks();
  


  // };
  // data = [
  //   {
  //     id: 1,
  //     title: 'Production-Ready Microservices',
  //     author: 'Susan J. Fowler',
  //     price: 32,
  //     coverImage: 'https://images-na.ssl-images-amazon.com/images/I/41yJ75gpV-L._SX381_BO1,204,203,200_.jpg',
  //   },
  //   {
  //     id: 2,
  //     title: 'Release It!',
  //     author: 'Michael T. Nygard',
  //     price: 45,
  //     coverImage: 'https://images-na.ssl-images-amazon.com/images/I/414CRjLjwgL._SX403_BO1,204,203,200_.jpg',
  //   },
  // ];

  // getBooks() {
  //   return new Promise((resolve, reject) => {
  //   reject(new Error('Something bad happened !'));
  //   resolve(this.data());
  //       })}}