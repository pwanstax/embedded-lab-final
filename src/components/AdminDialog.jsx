import React from "react";

const AdminDialog = ({showModal, setShowModal, setMode}) => {
  const enterClick = (key) => {
    if (key === "Enter") {
      document.getElementById("submitBtn").click();
    }
  };
  const handleSubmit = () => {
    const input = document.getElementById("passwordInput").value;
    if (input === "admin") {
      setMode("admin");
    } else {
      alert("Wrong Password !");
    }
    setShowModal(false);
  };
  return (
    <div>
      {showModal ? (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Enter Password</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <input
                    id="passwordInput"
                    type="text"
                    className="w-full px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md"
                    placeholder="admin"
                    onKeyDown={(e) => enterClick(e.key)}
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(_) => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    id="submitBtn"
                    className="text-white bg-gradient-to-r from-indigo-600 to-pink-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
};

export default AdminDialog;
