import React, { useState} from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/AuthSlice";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  INVALID_CREDENTIALS,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  LOGIN_SUCCESS,
} from "../../constants/constants";
const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const onSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      dispatch(loginSuccess(loggedInUser));
      navigate("/products");
      toast.success(LOGIN_SUCCESS);
    } else {
      let errorMessage = "";
      const userWithEmail = users.find((user) => user.email === email);
      const userWithPassword = users.find((user) => user.password === password);
      if (!userWithEmail && !userWithPassword) {
        errorMessage = INVALID_CREDENTIALS;
      } else if (!userWithEmail) {
        errorMessage = INVALID_EMAIL;
      } else if (!userWithPassword) {
        errorMessage = INVALID_PASSWORD;
      }
      setLoginError(errorMessage);
      dispatch(loginFailure(errorMessage));
    }
  };
  return (
    <div className="form">
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <h2>Login</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="form-control form-control-lg"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "This email is not valid",
              },
            })}
          />
          <p style={{ color: "red" }}>{formErrors.email?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="form-control form-control-lg"
            id="exampleInputPassword1"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Minimum length of password is 4",
              },
              maxLength: {
                value: 8,
                message: "Maximum length of password is 8",
              },
            })}
          />
          <p style={{ color: "red" }}>{formErrors.password?.message}</p>
        </div>
        {loginError && <p className="text-danger">{loginError}</p>}
        <div className="container">
          <button type="submit" className="btn btn-primary mx-2 mb-3">
            Submit
          </button>
          <Link
            className="btn btn-primary mx-2 mb-3"
            to="/signup"
            role="button"
          >
            Register
          </Link>{" "}
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
