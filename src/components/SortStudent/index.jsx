import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortingStudent } from "../../redux/actions/studentAction/actions";

const SortStudent = () => {
  const studentReducer = useSelector((state) => state.studentReducer);
  const { sortTerm } = studentReducer;
  const dispatch = useDispatch();
  return (
    <select
      value={sortTerm}
      onChange={(e) => dispatch(sortingStudent(e.target.value))}
      className="p-3 rounded bg-gray-100 focus:outline-none focus:ring-1"
    >
      <option value="a">A-Z</option>
      <option value="z">Z-A</option>
      <option value="high-a">High-Low average</option>
      <option value="low-a">Low-High average</option>
    </select>
  );
};

export default SortStudent;
