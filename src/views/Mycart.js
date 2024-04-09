import React, { useState } from "react";
const Mycart = ({ cartItems }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [cart, setCart] = useState([]);
  const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleIncrement = (id) => {
    const updatedCartItems = storedCartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  };



  const handleRemoveToCart = (productId) => {
    const updatedCartItems = storedCartItems.filter(
      (item) => item.id !== productId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  };
  const handleRemoveOneCart = (productId) => {
    const updatedCartItems = storedCartItems
      .map((item) => {
        if (item.id === productId) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          if (updatedItem.quantity <= 0) {
            return null;
          }
          return updatedItem;
        }
        return item;
      })
      .filter(Boolean);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCart(updatedCartItems);
  };
  return (
    <div className="container my-5">
      <h2 className="mb-4">Cart</h2>
      <div className="row">
        {storedCartItems.map((element) => (
          <div className="col-md-4 mb-4" key={element.id}>
            <div className="card">
              <img
                src={element.image}
                alt={element.title}
                style={{ maxWidth: "150px", margin: "auto", marginTop: "10px" }}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{element.title}</h5>
                <div className="container">
                  <p className="card-text">
                    {element.description && (
                      <>
                        {showFullDescription
                          ? element.description
                          : element.description.slice(0, 120)}
                        {element.description.length > 80 && (
                          <button
                            className="btn btn-link p-0"
                            onClick={toggleDescription}
                          >
                            {showFullDescription ? "Show less" : "Show more"}
                          </button>
                        )}
                      </>
                    )}
                  </p>
                </div>
                <p className="card-text">
                  <strong>Price</strong>: {element.price*element.quantity}$
                </p>
                <p className="card-text">
                  <strong>Category</strong>: {element.category}
                </p>
                <p className="card-text">
                  <strong>Rating</strong>: {element.rating.rate} (
                  {element.rating.count} reviews)
                </p>
                 <button
                    onClick={() => handleIncrement(element.id)}
                    className="btn btn-secondary m-2"
                    >
                    +
                  </button>
                  <strong className="ml-2">Quantity:</strong> {element.quantity}
                    {storedCartItems.length > 0 && (
                        <button
                          onClick={() => handleRemoveOneCart(element.id)}
                          className="btn btn-secondary m-2"
                        >
                          -
                        </button>
                      )}
                    
              <p>
                {storedCartItems.length > 0 && (
                  <button
                    onClick={() => handleRemoveToCart(element.id)}
                    className="btn btn-danger m-3"
                  >
                    Delete
                  </button>
                )}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Mycart;
