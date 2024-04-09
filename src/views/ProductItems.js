import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCarts } from "../redux/CartSlice";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { ADDED_SUCCESSFULLY } from "../constants/constants";
const ProductItems = ({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  count,
  addToCart,
}) => {
  const dispatch = useDispatch();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddToCart = () => {
    if (loggedInUser) {
      dispatch(addToCarts(id));
      toast.success(ADDED_SUCCESSFULLY);
      addToCart({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        count: count + 1,
      });
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedCartItems = storedCartItems.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <div className="card h-100">
      <table border={2}>
        <tr>
          <td>
            <img
              src={image}
              className="card-img-top"
              style={{ maxWidth: "200px", margin: "auto", marginTop: "10px" }}
              alt={image}
            />
          </td>
          <td>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p
                className="card-text"
                style={{
                  maxHeight: "90px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {description.slice(0, 90)}...
              </p>
              <p className="card-text">
                <strong>Price:</strong> {price}$
              </p>
              <p className="card-text">
                <strong>Category:</strong> {category}
              </p>
              <p className="card-text">
                <strong>Rating:</strong> {rating.rate} ({rating.count} reviews)
              </p>
              <button onClick={handleAddToCart} className="btn btn-success">
                Add to Cart
              </button>
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Please Log In</h2>
                <p>You need to be logged in to add items to the cart.</p>
              </Modal>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default ProductItems;
