import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteringStudent } from "../../redux/actions/studentAction/actions";

const FilterStudentByEvaluation = () => {
  const studentReducer = useSelector((state) => state.studentReducer);
  const { filterTerm } = studentReducer;
  const dispatch = useDispatch();
  return (
    <select
      value={filterTerm}
      onChange={(e) => dispatch(filteringStudent(e.target.value))}
      className="p-3 rounded bg-gray-100 focus:outline-none focus:ring-1"
    >
      <option>Excellent</option>
      <option>Good</option>
      <option>Average</option>
      <option>Bad</option>
      <option>Terrible</option>
      <option>All</option>
    </select>
  );
};

export default FilterStudentByEvaluation;
