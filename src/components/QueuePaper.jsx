import React from "react";
import jsPDF from "jspdf";

const QueuePaper = ({
  focusQueue,
  currentWaitTime,
  remainQueue,
  handleDelete,
  handleJump,
}) => {
  const print = () => {
    const pdf = new jsPDF("p", "mm", "a9");
    pdf.setFont("helvetica", "standard");
    pdf.text("Queue", 18, 8, "center");
    pdf.setFontSize(50);
    pdf.text(focusQueue.toString(), 18, 28, "center");
    pdf.setFontSize(14);
    pdf.text(currentWaitTime.toString(), 18, 40, "center");
    pdf.text("remaining : " + remainQueue.toString(), 18, 48, "center");
    pdf.save("your-queue");
  };

  return (
    <div className="md:container col-span-3 md:col-span-1 mx-auto flex justify-center">
      <div className="md:container max-w-full h-full text-center border-2 bg-gray-200 p-4 rounded-lg">
        <div className="grid grid-rows-7 h-full">
          <div className="row-span-1  container m-auto text-xl">WELCOME</div>
          <div className="row-span-1  container m-auto">Your Queue</div>
          <div className="row-span-2  container m-auto text-7xl">
            {focusQueue}
          </div>
          <div className="row-span-1  container m-auto">
            ({currentWaitTime})
          </div>
          <div className="row-span-1  container m-auto">
            Queue Remaining : {remainQueue}
          </div>
          <div className="row-span-1  container m-auto ">
            <button
              onClick={(_) => handleJump(focusQueue)}
              className="text-white bg-gradient-to-r from-indigo-600 to-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Jump
            </button>
            <button
              onClick={(_) => handleDelete(focusQueue)}
              className="text-white bg-gradient-to-r from-indigo-600 to-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Delete
            </button>
            <button
              onClick={(_) => print()}
              className="text-white bg-gradient-to-r from-indigo-600 to-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueuePaper;
