import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../redux/actions/alertAction/actions";

const Alerts = () => {
  const alertReducer = useSelector((state) => state.alertReducer);
  const { alertList } = alertReducer;

  const dispatch = useDispatch();

  const getAlertClass = (status) => {
    switch (status) {
      case "success":
        return "green";
      case "warning":
        return "violet";
      case "info":
        return "cyan";
      default:
        return "red";
    }
  };

  const getAlertIcon = (status) => {
    switch (status) {
      case "success":
        return (
          <svg
            className="h-6 mr-1 bg-emerald-600 rounded-full p-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="h-6 mr-1 rounded-full p-1 bg-violet-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="h-6 mr-1 rounded-full p-1 bg-cyan-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-6 mr-1 rounded-full p-1 bg-red-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  return (
    alertList.length > 0 && (
      <div className="fixed top-40 right-0 z-40">
        {alertList.map((item, idx) => (
          <div
            key={idx}
            className={`w-72 rounded-sm bg-fu  z-40 text-white mb-2 shadow text-sm flex flex-row justify-between bg-${getAlertClass(
              item.status
            )}-500 items-center px-4 py-6 transition-all`}
          >
            <div className="flex flex-row justify-start items-center">
              {getAlertIcon(item.status)}
              <span>{item.text}</span>
            </div>
            <svg
              className="h-5 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={() => dispatch(hideAlert(item.id))}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    )
  );
};

export default Alerts;
