import React from "react";
import { useSelector } from "react-redux";
import ClassItem from "../ClassItem";

const ClassList = () => {
  const classReducer = useSelector((state) => state.classReducer);
  const { classList, classSearchTerm } = classReducer;

  const returnSearchList = (list) => {
    return list.filter(
      (el) => el.name.toUpperCase().indexOf(classSearchTerm.toUpperCase()) > -1
    );
  };

  const renderClasses = () => {
    return (
      <div className="grid sm:grid-cols-2 gap-7 md:grid-cols-3 lg:grid-cols-4">
        {returnSearchList(classList)?.map((item, idx) => (
          <ClassItem item={item} key={idx} />
        ))}
      </div>
    );
  };

  return <div>{classList.length > 0 ? renderClasses() : ""}</div>;
};

export default ClassList;
