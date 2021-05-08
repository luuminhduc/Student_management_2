import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/loginAction/actions";
import { dropStudent } from "../../redux/actions/studentAction/actions";

const Header = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-between bg-orange-500 md:px-10 text-white px-3 py-4 items-center">
      <NavLink onClick={() => dispatch(dropStudent())} to="/">
        <div className="text-3xl">App</div>
      </NavLink>
      {auth.uid ? (
        <button
          onClick={() => dispatch(logout())}
          className="px-6 py-2 rounded focus:outline-none"
        >
          Logout
        </button>
      ) : (
        <div className="flex flex-row justify-start items-center">
          <NavLink to="/register">
            <button className="px-6 py-2 rounded focus:outline-none">
              Register
            </button>
          </NavLink>
          <NavLink to="/login">
            <button className="bg-orange-600 px-6 ml-3 py-2 rounded focus:outline-none">
              Login
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
