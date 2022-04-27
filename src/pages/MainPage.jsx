import React, {useState, useEffect} from "react";
import QueueTable from "../components/QueueTable";
import CurrentQueue from "../components/CurrentQueue";
import QueuePaper from "../components/QueuePaper";
import AdminDialog from "../components/AdminDialog";
import {DATA_IN_TABLE} from "../utils/MockData";

const MainPage = () => {
  const [allQueue, setAllQueue] = useState("");
  const [currentQueue, setQueue] = useState(0);
  const [status, setStatus] = useState("บอกว่ามาทำไร");

  const [focusQueue, setFocusQueue] = useState(0);
  const [remainQueue, setRemainQueue] = useState(0);
  const [currentWaitTime, setWaitTime] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("admin");

  const [isLoading, setLoading] = useState(true);

  const handleChangeMode = () => {
    mode === "user" ? setShowModal(true) : setMode("user");
  };
  const remainCalculate = (oldQueue) => {
    var newQueue = oldQueue;
    for (let index = 0; index < oldQueue.length; index++) {
      newQueue[index].remain = index + 1;
    }
    setAllQueue(newQueue);
  };
  const handleNextQueue = () => {
    const nextQueue = allQueue[0];
    setQueue(nextQueue.queue);
    setStatus(nextQueue.status);
    const newQueue = allQueue.filter((each) => each.queue !== nextQueue.queue);
    remainCalculate(newQueue);
  };
  const handleDelete = (queue) => {
    var trigger = true;
    const newQueue = allQueue.filter((each) => {
      if (trigger && each.queue !== queue) {
        setFocusQueue(each.queue);
        setWaitTime(each.time);
        trigger = false;
      }
      return each.queue !== queue;
    });
    remainCalculate(newQueue);
  };

  const handleFocus = (queue) => {
    for (let index = 0; index < allQueue.length; index++) {
      if (allQueue[index].queue === parseInt(queue)) {
        setFocusQueue(allQueue[index].queue);
        setRemainQueue(allQueue[index].remain);
        setWaitTime(allQueue[index].time);
        break;
      }
    }
  };
  const handleJump = (queue) => {
    const newQueue = allQueue.filter((each) => {
      if (each.queue === queue) {
        setQueue(each.queue);
        setStatus(each.status);
      }
      return each.queue !== queue;
    });
    remainCalculate(newQueue);
  };

  const customModeStyle =
    mode === "admin"
      ? "md:container col-span-3 md:col-span-2 md:mx-auto "
      : "md:container col-span-3 md:col-span-3 md:mx-auto ";
  const customModeHeadline =
    mode === "admin"
      ? "md:container col-span-3 flex justify-center text-xl md:text-7xl box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 px-20 py-10 rounded-lg "
      : "md:container col-span-3 border-b-4 text-xl md:text-7xl px-20 py-10";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get("/");
        const res = DATA_IN_TABLE;
        remainCalculate(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <div></div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-10 p-10 h-full sm:h-screen font-mono content-center">
            <div className={customModeHeadline}>
              <button onClick={handleChangeMode} className="text-left">
                WELCOME TO OUR QUEUE GENERATOR
              </button>
            </div>
            <div className={customModeStyle}>
              <div className="md:container md:px-36">
                <CurrentQueue
                  currentQueue={currentQueue}
                  status={status}
                  handleNextQueue={handleNextQueue}
                  mode={mode}
                />
              </div>
              <div className="md:container mt-10 flex justify-center border-2 rounded-lg md:mx-auto ">
                <QueueTable allQueue={allQueue} handleFocus={handleFocus} />
              </div>
            </div>
            {mode === "admin" ? (
              <QueuePaper
                focusQueue={focusQueue}
                currentWaitTime={currentWaitTime}
                remainQueue={remainQueue}
                handleDelete={handleDelete}
                handleJump={handleJump}
              />
            ) : (
              <div></div>
            )}
            <AdminDialog
              showModal={showModal}
              setShowModal={setShowModal}
              setMode={setMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
