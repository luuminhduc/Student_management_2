import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  hideAuthError,
  loginRequest,
} from "../../redux/actions/loginAction/actions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { authError } = loginReducer;

  const history = useHistory();

  const submit = (data) => {
    dispatch(loginRequest(data, history));
  };

  return (
    <div className="min-h-screen px-3 min-w-full bg-orange-500 text-coolGray-700 flex flex-col justify-center items-center">
      <NavLink className="mb-5" to="/">
        <button className="px-4 py-1 bg-orange-300 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back
        </button>
      </NavLink>
      <div className="w-full md:max-w-md bg-white p-6 shadow-xl rounded">
        <div className="w-full text-center my-3">
          <h1 className="text-4xl">Login</h1>
        </div>
        <form onSubmit={handleSubmit((data) => submit(data))} className="my-3">
          <div className="flex flex-col justify-start items-start my-3">
            <label className="text-sm font-bold my-1">Email</label>
            <input
              name="email"
              {...register("email", { required: true })}
              type="text"
              placeholder="Email"
              className={`border border-solid ${
                errors.email ? "border-red-500" : "border-coolGray-200"
              } p-3 rounded w-full focus:outline-none focus:border-fuchsia-500`}
            />
            <small className="text-sm text-red-500">
              {errors.email && errors.email.type === "required"
                ? "Email can not be blank"
                : ""}
            </small>
          </div>
          <div className="flex flex-col justify-start items-start my-3">
            <label className="text-sm font-bold my-1">Password</label>
            <input
              name="password"
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className={`border border-solid ${
                errors.password ? "border-red-500" : "border-coolGray-200"
              } p-3 rounded w-full focus:outline-none focus:border-fuchsia-500`}
            />
            <small className="text-sm text-red-500">
              {errors.password && errors.password.type === "required"
                ? "Password can not be blank"
                : ""}
            </small>
          </div>
          {authError && (
            <div className="w-full p-3 rounded bg-red-500 text-white my-3 flex flex-row justify-between items-center">
              <span>{authError}</span>
              <svg
                onClick={() => dispatch(hideAuthError())}
                className="h-6 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <div className="w-full my-2">
            <span className="font-light text-xs ">
              Do not have an account?{" "}
              <NavLink className="font-bold" to="/register">
                Register
              </NavLink>
            </span>
          </div>
          <div className="w-full">
            <button className="bg-orange-600 text-white w-full p-3 rounded cursor-pointer hover:bg-orange-500 focus:outline-none">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
