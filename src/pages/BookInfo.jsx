import React, {useState} from "react";
import { useParams, Link } from "react-router";
import Rating from "../components/ui/Rating";
import Price from "../components/ui/Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import BestBooks from "../components/ui/BestBooks";
import Book from '../components/ui/Book'

const BookInfo = ({ books, addItemToCart, cart }) => {
  const { id } = useParams();
  const book = books.find((book) => +book.id === +id); //adding a plus converts strings to numbers.  this ensures the parameter which is a string matches the id of the book which is a number

  //const [added, setAdded] = useState(false);

  function addBookToCart(book) {
    //setAdded(true);
    addItemToCart(book);
  }

  function bookExistsOnCart() {
    //cart array is passed in from App.jsx via props into BookInfo
    //if this book is in the cart already, return true
    return cart.find(book => +book.id === +id);
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books" className="book__link">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img className="book__selected--img" src={book.url} alt="" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Veniam, repellendus modi odio porro, consequuntur,
                    asperiores minima sint voluptatem at reiciendis ducimus
                    neque provident alias iure nihil explicabo nobis id
                    voluptas.
                  </p>
                </div>
                {
                  bookExistsOnCart() ? (
                  <Link to={`/cart`}><button className="btn">Checkout</button></Link>
                  ) : (
                  <button className="btn" onClick={() => addBookToCart(book)}>
                  Add to Cart
                </button>)
                }
               
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="book__selected--title--top">Recommended Books</h2>
            </div>
            {/* <BestBooks id={id} /> */}
            <div className="books">
            { books
              .filter(book => book.rating === 5 && +book.id !== +id)
              .slice(0,4)
              .map((book) => (
              <Book book={book} key={book.id} />
            ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookInfo;
