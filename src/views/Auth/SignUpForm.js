import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { SIGNUP_SUCCESS } from '../../constants/constants';
const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(data);
    localStorage.setItem('users', JSON.stringify(users));
    setSignupSuccess(true);
    toast.success(SIGNUP_SUCCESS) 
    navigate("/");
  };
  return (
    <div className="form">
      <h1>Signup</h1>
      <div className="container">
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="username"
              className="form-control form-control-lg"
              id="exampleInputName"
              {...register("name", { 
                required: "Name is required",
                validate: {
                  noBlankSpace: value => value.trim() !== "" || "Username cannot consist only of blank spaces"
                }
              })}
            />
            <p style={{color:'red'}}>{formErrors.name?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
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
            <p style={{color:'red'}}>{formErrors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
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
            <p style={{color:'red'}}>{formErrors.password?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
          {signupSuccess && <p>Signup successful! </p>}
        </form>
      </div>
    </div>
  );
};
export default SignUpForm;
