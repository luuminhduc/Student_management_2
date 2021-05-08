import React from "react";
import { NavLink } from "react-router-dom";

const ClassItem = ({ item }) => {
  const { name, teacher, id } = item;
  return (
    <div className="bg-gray-100 p-4 rounded flex flex-col justify-between items-start">
      <p className="font-bold text-blue-500 text-2xl">{name}</p>
      <p className="mb-3">
        <span className="font-bold">Teacher: </span>
        {teacher}
      </p>
      <NavLink to={`/class/${id}`}>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">
          Detail
        </button>
      </NavLink>
    </div>
  );
};

export default ClassItem;
