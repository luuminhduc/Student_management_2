import React from "react";
import { useSelector } from "react-redux";
import Main from "../../components/Main";

const Home = () => {
  const firebaseReducer = useSelector((state) => state.firebaseReducer);
  const { auth } = firebaseReducer;
  const { uid } = auth;

  return (
    <div>
      {uid ? (
        <Main />
      ) : (
        <div className="mt-5 px-3 flex justify-center items-center h-60 mx-auto">
          <div className="bg-violet-200 text-violet-600 rounded shadow-sm  px-8 py-5">
            <p className="text-2xl">
              Please register to create an account or login to use the app
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
