import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { handleAlert } from "../../redux/actions/alertAction/actions";
import { addNewClass } from "../../redux/actions/classAction/actions";
const EditClass = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classReducer = useSelector((state) => state.classReducer);
  const { classList } = classReducer;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const onSubmit = (data) => {
    if (!checkExistingClass()) {
      const newClass = { ...data, uid: auth.uid };
      dispatch(addNewClass(newClass, history, auth.uid));
    } else {
      dispatch(
        handleAlert({
          text: "This name has already been taken",
          status: "warning",
        })
      );
    }
  };
  const checkExistingClass = () => {
    const classNameLists = classList?.map((el) => el.name);
    console.log(classNameLists);
    const result = classNameLists.find(
      (el) => el.toUpperCase() === watch("name").toUpperCase()
    );
    console.log(result);
    return result;
  };
  useEffect(() => {
    if (!auth.uid) history.push("/");
  }, [auth]);
  return (
    <div className="mt-10 mx-auto md:w-3/4">
      <p className="text-3xl font-bold">Add class</p>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mt-10 bg-gray-100 bg-opacity-70 px-5 py-10 rounded shadow"
      >
        <div className="flex flex-col mb-3 justify-start items-start">
          <label className="text-sm font-bold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Class name"
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
          <label className="text-sm font-bold">Teacher</label>
          <input
            {...register("teacher", { required: true })}
            type="text"
            placeholder="Class teacher"
            className={`focus:outline-none shadow-md ${
              errors.teacher ? "border border-red-500" : ""
            } focus:border-blue-500 border-solid border-gray-200 rounded-3xl p-3 w-full`}
          />
          {errors.teacher && (
            <small className="text-xs text-red-500">
              Teacher can not be blank
            </small>
          )}
        </div>
        <button
          type="submit"
          className="px-5 mt-3 py-2 hover:bg-blue-500 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditClass;
