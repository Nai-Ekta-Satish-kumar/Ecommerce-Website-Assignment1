import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./views/Products";
import LoginForm from "./views/Auth/LoginForm.js";
import SignUpForm from "./views/Auth/SignUpForm.js";
import Mycart from "./views/Mycart";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./redux/AuthSlice.js";
import Slider from "./views/Slider.js";
function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, [dispatch]);
  const storageListener = (event) => {
    if (event.storageArea === localStorage && event.key === "loggedInUser") {
      const user = JSON.parse(event.newValue);
      dispatch(loginSuccess(user));
    }
  };
  useEffect(() => {
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [dispatch]);
  return (
    <div className="App">
      <React.Fragment>
        <Navbar />
        <Routes>
        <Route path='/slider' element={<Slider />}/>
          {!loggedInUser ? (
            <>
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/" element={<LoginForm />} />
            </>
          ) : (
            <>
              <Route path="/mycart" element={<Mycart />} />
            </>
          )}
          <Route path="/products" element={<Products />} />
        </Routes>
        <Toaster />
      </React.Fragment>
    </div>
  );
}
export default App;
