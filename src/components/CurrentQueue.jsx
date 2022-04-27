import React from "react";

const CurrentQueue = ({currentQueue, status, handleNextQueue, mode}) => {
  const customGrid =
    mode === "admin" ? "grid grid-rows-5 h-full" : "grid grid-rows-4 h-full";
  return (
    <div className="md:container max-w-full h-64 text-center border-2 bg-gray-200 p-4 rounded-lg">
      <div className={customGrid}>
        <div className="row-span-1  container m-auto">Current Queue</div>
        <div className="row-span-2  container m-auto text-7xl">
          {currentQueue}
        </div>
        <div className="row-span-1  container m-auto">({status})</div>
        {mode === "user" ? (
          <div></div>
        ) : (
          <div className="row-span-1  container m-auto">
            <button
              onClick={(_) => handleNextQueue()}
              className="text-white bg-gradient-to-r from-indigo-600 to-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentQueue;
