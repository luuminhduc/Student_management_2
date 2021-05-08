import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  addNewStudent,
  updateStudent,
} from "../../redux/actions/studentAction/actions";

const EditStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!selectedStudent) {
      const student = { ...data, uid };
      dispatch(addNewStudent(student, history, uid));
    } else {
      const { id } = selectedStudent;
      const student = { ...data, uid, id };
      dispatch(updateStudent(student, history));
    }
  };
  const classReducer = useSelector((state) => state.classReducer);
  const { classList } = classReducer;
  const [classNameList, setClassNameList] = useState([]);
  const history = useHistory();

  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;

  const studentReducer = useSelector((state) => state.studentReducer);
  const { selectedStudent } = studentReducer;

  useEffect(() => {
    if (classList.length > 0) {
      setClassNameList(classList);
    }
  }, [classList]);

  useEffect(() => {
    if (selectedStudent) {
      const { name, className, math, literature, english } = selectedStudent;
      setValue("name", name);
      setValue("className", className);
      setValue("math", math);
      setValue("literature", literature);
      setValue("english", english);
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (!auth.uid) history.push("/");
  }, [auth]);

  return classList.length > 0 ? (
    <div className="mt-10 mx-auto md:w-3/4">
      <p className="text-3xl font-bold">
        {selectedStudent ? "Edit student" : "Add student"}
      </p>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mt-10 bg-gray-100 bg-opacity-70 px-5 py-10 rounded"
      >
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm font-bold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
            className={`focus:outline-none ${
              errors.name ? "border border-red-500" : ""
            }  border-solid  shadow-md border-gray-200 rounded-3xl p-3 w-full`}
          />
          {errors.name && (
            <small className="text-xs text-red-500">
              Name can not be blank
            </small>
          )}
        </div>
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm font-bold">Class</label>

          {classNameList.length > 0 && (
            <select
              {...register("className", { required: true })}
              className={`focus:outline-none ${
                errors.className ? "border border-red-500" : ""
              }  border-solid  shadow-md border-gray-200 rounded-3xl p-3 w-full`}
            >
              {classNameList.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          {errors.className && (
            <small className="text-xs text-red-500">
              Class can not be blank
            </small>
          )}
        </div>
        <div className="grid grid-cols-3 mb-3 gap-4">
          {/* MATH */}
          <div className="">
            <label className="text-sm font-bold">Math</label>
            <input
              type="number"
              {...register("math", { required: true, max: 10, min: 0 })}
              placeholder="Math grade"
              className={`focus:outline-none ${
                errors.math ? "border border-red-500" : ""
              }  border-solid  shadow-md border-gray-200 rounded-3xl p-3 w-full`}
            />
            {errors.math && errors.math.type === "required" ? (
              <small className="text-xs text-red-500">
                Math can not be blank
              </small>
            ) : (
              ""
            )}
            {(errors.math && errors.math.type === "min") ||
            (errors.math && errors.math.type === "max") ? (
              <small className="text-xs text-red-500">Invalid grade</small>
            ) : (
              ""
            )}
          </div>
          {/* LITERATURE */}
          <div className="">
            <label className="text-sm font-bold">Literature</label>
            <input
              {...register("literature", { required: true, max: 10, min: 0 })}
              type="number"
              placeholder="Literature grade"
              className={`focus:outline-none ${
                errors.literature ? "border border-red-500" : ""
              }  border-solid  shadow-md border-gray-200 rounded-3xl p-3 w-full`}
            />
            {errors.literature && errors.literature.type === "required" ? (
              <small className="text-xs text-red-500">
                Literature can not be blank
              </small>
            ) : (
              ""
            )}
            {(errors.literature && errors.literature.type === "min") ||
            (errors.literature && errors.literature.type === "max") ? (
              <small className="text-xs text-red-500">Invalid grade</small>
            ) : (
              ""
            )}
          </div>
          {/* ENGLISH */}
          <div className="">
            <label className="text-sm font-bold">English</label>
            <input
              {...register("english", { required: true, max: 10, min: 0 })}
              type="number"
              placeholder="English grade"
              className={`focus:outline-none ${
                errors.english ? "border border-red-500" : ""
              }  border-solid  shadow-md border-gray-200 rounded-3xl p-3 w-full`}
            />
            {errors.english && errors.english.type === "required" ? (
              <small className="text-xs text-red-500">
                English can not be blank
              </small>
            ) : (
              ""
            )}
            {(errors.english && errors.english.type === "min") ||
            (errors.english && errors.english.type === "max") ? (
              <small className="text-xs text-red-500">Invalid grade</small>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          className="px-5 mt-3 py-2 hover:bg-blue-500 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  ) : (
    ""
  );
};

export default EditStudent;
