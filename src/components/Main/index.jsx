import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { dropStudent } from "../../redux/actions/studentAction/actions";
import ClassList from "../ClassList";
import SearchClassByName from "../SearchClassByName";

const Main = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex h-60 mt-5 flex-row justify-center items-center">
        <NavLink onClick={() => dispatch(dropStudent())} to="/editClass">
          <button className="px-7 py-3 rounded mx-3 bg-blue-600 hover:bg-blue-500 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            Add class
          </button>
        </NavLink>
        <NavLink onClick={() => dispatch(dropStudent())} to="/editStudent">
          <button className="px-7 py-3 rounded mx-3 bg-blue-200 hover:bg-blue-500 hover:text-white  text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Add student
          </button>
        </NavLink>
      </div>
      <div className="">
        <SearchClassByName />
      </div>
      <div className="mt-5">
        <ClassList />
      </div>
    </div>
  );
};

export default Main;
