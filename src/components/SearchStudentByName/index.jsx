import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchStudent } from "../../redux/actions/studentAction/actions";

const SearchStudentByName = () => {
  const dispatch = useDispatch();
  const studentReducer = useSelector((state) => state.studentReducer);
  const { searchTerm } = studentReducer;
  return (
    <input
      className="bg-gray-100 focus:outline-none focus:ring-1 p-3 rounded"
      value={searchTerm}
      placeholder="Search..."
      onChange={(e) => dispatch(searchStudent(e.target.value))}
      type="text"
    />
  );
};

export default SearchStudentByName;
