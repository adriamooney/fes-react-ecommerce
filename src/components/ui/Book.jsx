import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import Rating from './Rating';
import Price from './Price';


 const Book = ({book}) => {

    const [img, setImg] = useState();

    // When we switch routes dont set image to unmounted component
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        const image = new Image();
        image.src = book.url;
        image.onload = () => {
          setTimeout(() => {
            console.log(mountedRef.current)
            if (mountedRef.current) {
              setImg(image);
            }
          }, 300);
        };
        return () => {
          // When the component unmounts  
          mountedRef.current = false;
        };
      }, [book.url]);

    return (
         
            <div className="book">
                {!img ? (
                <>
                    <div className="book__img--skeleton"></div>
                    <div className="skeleton book__title--skeleton"></div>
                    <div className="skeleton book__rating--skeleton"></div>
                    <div className="skeleton book__price--skeleton"></div>
                </>
                ) : (
                <>
                <Link to={`/books/${book.id}`}>
                    <div className="book__img--wrapper">
                        <img src={img.src} alt="" className="book__img" />
                    </div>
                </Link>
                <div className="book__title">
                    <Link to={`/books/${book.id}`} className="book__title--link">
                        {book.title}
                    </Link>
                </div>
               <Rating rating={book.rating} />
               <Price originalPrice={book.originalPrice} salePrice={book.salePrice} /> </>

                )}
               
            </div>
        
    )
 }

 export default Book;