import React, { useState, useEffect } from "react";
import ProductItems from "./ProductItems";
import axios from "axios"
import Slider from "./Slider";
const Products = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return storedCartItems;
  });
  useEffect(() => {
    const fetchProducts = async () => {
      const url = "https://fakestoreapi.com/products";
      try {
        setLoading(true);
        const response = await axios.get(url); 
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevCartItems => [...prevCartItems, {...product, quantity: 1}]);
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, {...product, quantity: 1}]));
    }
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  const handleSortToggle = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
  };
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (categoryFilter === "" || item.category.toLowerCase() === categoryFilter.toLowerCase())
  );
  filteredItems.sort((a, b) => {
    if (sortAscending) {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="container my-3">
      <Slider/>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", marginTop:"20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <button className="btn btn-dark" onClick={handleSortToggle}>
          {sortAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
      </div>
      <div className="row">
        {currentItems.map((element) => (
          <div className="col-m-4 mt-4" key={element.id}>
            <ProductItems
              addToCart={addToCart}
              id={element.id}
              price={element.price}
              title={element.title}
              description={element.description}
              image={element.image}
              category={element.category}
              rating={element.rating}
              count={element.count}
              quantity={element.quantity}
            />
          </div>
        ))}
      </div>
      {filteredItems.length > 0 && (
        <>
          <button className="btn btn-primary m-3" onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <button
          className="btn btn-primary"
            onClick={handleNextPage}
            disabled={indexOfLastItem >= filteredItems.length}
          >
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default Products;
