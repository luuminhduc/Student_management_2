import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modalAction/actions";

const Modal = () => {
  const modalReducer = useSelector((state) => state.modalReducer);
  const { title, text, callbackAction } = modalReducer;
  const dispatch = useDispatch();

  const handleClick = () => {
    if (callbackAction) {
      callbackAction();
    }
    dispatch(hideModal());
  };

  return title ? (
    <div className="fixed top-0 px-3 left-0 w-full h-screen flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="w-full bg-white rounded shadow-lg md:max-w-md lg:max-w-sm p-4">
        <p className="text-2xl font-bold mb-2">{title}</p>
        <p className="mb-3">{text}</p>
        <div className="flex flex-row justify-start items-start">
          {callbackAction && (
            <button
              onClick={() => dispatch(hideModal())}
              className="px-5 mr-2 py-2 rounded cursor-pointer  bg-gray-200"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleClick}
            className="px-5 py-2 rounded cursor-pointer text-white bg-blue-600 hover:bg-blue-500"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
