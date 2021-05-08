import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchingClass } from "../../redux/actions/classAction/actions";

const SearchClassByName = () => {
  const dispatch = useDispatch();
  const classReducer = useSelector((state) => state.classReducer);
  const { classSearchTerm } = classReducer;
  return (
    <input
      placeholder="Search class..."
      value={classSearchTerm}
      onChange={(e) => dispatch(searchingClass(e.target.value))}
      className="bg-gray-100 focus:outline-none focus:ring-1 p-3 rounded"
      type="text"
    />
  );
};

export default SearchClassByName;
