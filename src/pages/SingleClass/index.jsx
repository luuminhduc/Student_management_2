import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { firestore } from "../../firebase/config";
import { handleAlert } from "../../redux/actions/alertAction/actions";
import Student from "../../models/student";
import SearchStudentByName from "../../components/SearchStudentByName";
import SortStudent from "../../components/SortStudent";
import FilterStudentByEvaluation from "../../components/FilterStudentByEvaluation";
import { NavLink } from "react-router-dom";
import {
  deleteStudent,
  selectStudent,
} from "../../redux/actions/studentAction/actions";
import { showModal } from "../../redux/actions/modalAction/actions";
import { deleteClass } from "../../redux/actions/classAction/actions";

const SingleClass = () => {
  const params = useParams();
  const { classId } = params;
  const [singleClass, setSingleClass] = useState(null);
  const [currentStudentList, setCurrentStudentList] = useState([]);
  const studentReducer = useSelector((state) => state.studentReducer);
  const { studentList, searchTerm, sortTerm, filterTerm } = studentReducer;
  const dispatch = useDispatch();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;
  const history = useHistory();
  useEffect(() => {
    firestore
      .collection("classes")
      .doc(classId)
      .get()
      .then((doc) => {
        setSingleClass({ ...doc.data(), id: doc.id });
      })
      .catch((err) => {
        dispatch(handleAlert({ text: err.message, status: "error" }));
      });
  }, [classId]);

  useEffect(() => {
    if (!uid) history.push("/");
  }, [uid]);

  useEffect(
    () => {
      if (singleClass) {
        const { id } = singleClass;
        const list = studentList.filter((el) => el.className === id);
        setCurrentStudentList(
          list.map(
            (el) =>
              new Student(
                el.name,
                el.className,
                +el.english,
                +el.math,
                +el.literature,
                el.uid,
                el.id
              )
          )
        );
      }
    },
    [singleClass, studentList],
    () => {
      console.log("Hello");
    }
  );

  const returnSearchList = (list) => {
    return list.filter(
      (el) => el.name.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
    );
  };

  const returnSortList = (list) => {
    switch (sortTerm) {
      case "z":
        return sortListByZtoA(list);
      case "high-a":
        return sortListByAverageGrade(list, true);
      case "low-a":
        return sortListByAverageGrade(list, false);
      default:
        return sortListByAToZ(list);
    }
  };

  const sortListByAToZ = (list) => {
    return list.sort((a, b) => {
      const splitedNameOfA = a.name.split(" ");
      const splitedNameOfB = b.name.split(" ");
      return (
        splitedNameOfA[splitedNameOfA.length - 1]
          .split("")[0]
          .toLowerCase()
          .charCodeAt(0) -
        splitedNameOfB[splitedNameOfB.length - 1]
          .split("")[0]
          .toLowerCase()
          .charCodeAt(0)
      );
    });
  };
  const sortListByZtoA = (list) => {
    return list.sort((a, b) => {
      const splitedNameOfA = a.name.split(" ");
      const splitedNameOfB = b.name.split(" ");
      return (
        splitedNameOfB[splitedNameOfB.length - 1]
          .split("")[0]
          .toLowerCase()
          .charCodeAt(0) -
        splitedNameOfA[splitedNameOfA.length - 1]
          .split("")[0]
          .toLowerCase()
          .charCodeAt(0)
      );
    });
  };

  const sortListByAverageGrade = (list, isFromHigh) => {
    console.log(isFromHigh);
    if (isFromHigh) return list.sort((a, b) => b.getAverage() - a.getAverage());
    return list.sort((a, b) => a.getAverage() - b.getAverage());
  };

  const returnFilterList = (list) => {
    switch (filterTerm) {
      case "All":
        return list;
      default:
        return list.filter((el) => el.getEvaluation().status === filterTerm);
    }
  };

  const renderStudentList = () => {
    const renderedList = returnSearchList(
      returnSortList(returnFilterList(currentStudentList))
    );

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Math
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Literature
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      English
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Average
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Evaluation
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderedList.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{idx + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.math}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.literature}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.english}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.getAverage()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${
                            item.getEvaluation().color
                          }-200 text-green-800`}
                        >
                          {item.getEvaluation().status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <NavLink
                          onClick={() => dispatch(selectStudent(item))}
                          to="/editStudent"
                          className="text-indigo-600 mr-4 hover:text-indigo-900"
                        >
                          Edit
                        </NavLink>
                        <button
                          onClick={() =>
                            dispatch(
                              showModal({
                                title: "Delete student",
                                text: "Are you sure to delete this student",
                                callbackAction: () =>
                                  dispatch(deleteStudent(item.id, uid, true)),
                              })
                            )
                          }
                          className="text-red-600 font-semibold hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const onDeleteClass = async () => {
    await dispatch(
      showModal({
        title: "Delete class",
        text:
          "Every student in the class will be deleted as well, are you sure?",
        callbackAction: async () => {
          await deleteStudentInClass();
          await dispatch(deleteClass(classId, history, uid));
        },
      })
    );
  };

  const deleteStudentInClass = () => {
    const studentInDeletedClass = currentStudentList.filter(
      (el) => el.className === classId
    );
    if (studentInDeletedClass.length > 0) {
      for (let i = 0; i < studentInDeletedClass.length; i++) {
        dispatch(deleteStudent(studentInDeletedClass[i].id, uid));
      }
    }
  };

  const getNumberOfStudentByStatus = (status) => {
    const studentList = currentStudentList.filter(
      (el) => el.getEvaluation().status === status
    );
    return studentList.length;
  };

  const getHighestAverage = () => {
    let max = currentStudentList[0];
    for (let i = 1; i < currentStudentList.length; i++) {
      if (max.getAverage() < currentStudentList[i].getAverage())
        max = currentStudentList[i];
    }
    return max;
  };

  const getLowestAverage = () => {
    let min = currentStudentList[0];
    for (let i = 1; i < currentStudentList.length; i++) {
      if (min.getAverage() > currentStudentList[i].getAverage()) {
        min = currentStudentList[i];
      }
    }
    return min;
  };

  const getHighestBySubject = (subject) => {
    let max = currentStudentList[0];
    for (let i = 1; i < currentStudentList.length; i++) {
      if (max[subject] < currentStudentList[i][subject]) {
        max = currentStudentList[i];
      }
    }
    return max;
  };

  return singleClass ? (
    <div className="mt-10">
      <div className="mb-10 flex md:flex-row flex-col justify-between md:items-center items-start">
        <p className="text-xl">
          <span className="font-bold">Name: </span>
          {singleClass.name}
        </p>
        <p className="text-xl">
          <span className="font-bold">Teacher: </span>
          {singleClass.teacher}
        </p>
        <p className="text-xl">
          <span className="font-bold">Number Of students: </span>
          {currentStudentList.length}
        </p>
      </div>
      {currentStudentList.length > 0 && (
        <div className="mb-10 p-3 gap-4 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 rounded bg-gray-100">
          <p className="text-sm">
            <span className="font-bold">Excellent students</span>:{" "}
            {getNumberOfStudentByStatus("Excellent")}
          </p>
          <p className="text-sm">
            <span className="font-bold">Good students</span>:{" "}
            {getNumberOfStudentByStatus("Good")}
          </p>
          <p className="text-sm">
            <span className="font-bold">Avergae students</span>:{" "}
            {getNumberOfStudentByStatus("Average")}
          </p>
          <p className="text-sm">
            <span className="font-bold">Bad students</span>:{" "}
            {getNumberOfStudentByStatus("Bad")}
          </p>
          <p className="text-sm">
            <span className="font-bold">Terrible students</span>:{" "}
            {getNumberOfStudentByStatus("Terrible")}
          </p>
          <p className="text-sm">
            <span className="font-bold">Highest average</span>:{" "}
            <span>
              {getHighestAverage().getAverage()} ({getHighestAverage().name})
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Lowest average</span>:{" "}
            <span>
              {getLowestAverage().getAverage()} ({getLowestAverage().name})
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Highest math</span>:{" "}
            <span>
              {getHighestBySubject("math").math} (
              {getHighestBySubject("math").name})
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Highest literature</span>:{" "}
            <span>
              {getHighestBySubject("literature").literature} (
              {getHighestBySubject("literature").name})
            </span>
          </p>
          <p className="text-sm">
            <span className="font-bold">Highest english</span>:{" "}
            <span>
              {getHighestBySubject("english").english} (
              {getHighestBySubject("english").name})
            </span>
          </p>
        </div>
      )}

      <button
        onClick={onDeleteClass}
        className="mb-5 px-8 py-3 rounded bg-rose-200 text-rose-600 font-bold cursor-pointer"
      >
        Delete class
      </button>

      {currentStudentList.length > 0 ? (
        <div>
          <div className="flex mb-5 flex-wrap md:flex-row justify-between items-center">
            <SearchStudentByName />
            <div>
              <p className="text-xs">Sort student</p>
              <SortStudent />
            </div>
            <div>
              <p className="text-xs">Filter by evaluation</p>
              <FilterStudentByEvaluation />
            </div>
          </div>
          {renderStudentList()}
        </div>
      ) : (
        <div className="bg-violet-200 text-violet-600 rounded shadow-sm  px-8 py-5">
          No student
        </div>
      )}
    </div>
  ) : (
    ""
  );
};

export default SingleClass;
