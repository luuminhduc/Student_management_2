import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClasses } from "../../redux/actions/classAction/actions";
import { fetchStudentList } from "../../redux/actions/studentAction/actions";

const Container = ({ children }) => {
  const dispatch = useDispatch();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const studentReducer = useSelector((state) => state.studentReducer);
  const { selectedStudent } = studentReducer;
  const { auth } = firebaseReducer;
  const { uid } = auth;
  useEffect(() => {
    if (uid) {
      dispatch(fetchStudentList(uid));
    }
  }, [dispatch, uid, selectedStudent]);
  useEffect(() => {
    if (uid) {
      dispatch(fetchAllClasses(uid));
    }
  }, [dispatch, uid]);
  return (
    <div className="md:max-w-6xl pb-10 px-3 mx-auto text-gray-700">
      {children}
    </div>
  );
};

export default Container;
