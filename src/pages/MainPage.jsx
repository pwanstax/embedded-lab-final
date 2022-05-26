import React, {useState, useEffect} from "react";
import QueueTable from "../components/QueueTable";
import CurrentQueue from "../components/CurrentQueue";
import QueuePaper from "../components/QueuePaper";
import AdminDialog from "../components/AdminDialog";
import AnalogClock from "analog-clock-react";
import {firebase} from "../services/initFirebase";

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

  const db = firebase.database();

  const customModeStyle =
    mode === "admin"
      ? "md:container col-span-3 md:col-span-2 md:mx-auto "
      : "md:container col-span-3 md:col-span-3 md:mx-auto ";
  const customModeHeadline =
    mode === "admin"
      ? "md:container col-span-3 flex justify-center text-xl text-white md:text-7xl box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 px-20 py-10 rounded-lg "
      : "md:container col-span-3 border-b-4 text-xl md:text-7xl px-20 py-10";

  let adminClock = {
    useCustomTime: false,
    width: "250px",
    border: true,
    borderColor: "#0298E6",
    baseColor: "#E8B1F2",
    centerColor: "#ffffff",
    centerBorderColor: "#CC83C2",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };

  let normalClock = {
    width: "250px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };

  const mapData = (data) => {
    const key = Object.keys(data);
    const dt = [];
    for (let index = 0; index < key.length; index++) {
      const element = data[key[index]];
      const id = Object.keys(element);
      dt.push(element[id]);
    }
    return dt;
  };

  const censorCheck = () => {
    const newRef = db.ref("sensor");
    newRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data !== undefined && data !== null && data !== 0) {
        handleAdd(data);
        console.log(data);
      }
    });
  };

  const remainCalculate = async (oldQueue) => {
    if (oldQueue !== undefined && oldQueue !== null) {
      var newQueue = oldQueue;
      for (let index = 0; index < oldQueue.length; index++) {
        newQueue[index].remain = index + 1;
      }
      await setAllQueue(newQueue);
      setLoading(false);
    }
  };

  const handleChangeMode = () => {
    mode === "user" ? setShowModal(true) : setMode("user");
  };

  const handleNextQueue = () => {
    const nextQueue = allQueue[0];
    if (nextQueue !== null && nextQueue !== undefined) {
      setQueue(nextQueue.queue);
      setStatus(nextQueue.status);
      handleDelete(nextQueue.queue);
    }
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

    const newTestRef = db.ref(`queueData/${queue}`);
    newTestRef.remove();
  };

  const handleAdd = (queue) => {
    var messageListRef = firebase.database().ref(`queueData/${queue}`);
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
      queue: queue,
      time: new Date().toLocaleTimeString(),
      id: queue,
      status: "งิ่",
      remain: 0,
    });
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
    for (let index = 0; index < allQueue.length; index++) {
      const element = allQueue[index];
      if (element.queue === queue) {
        setQueue(element.queue);
        setStatus(element.status);
      }
    }
    handleDelete(queue);
  };

  useEffect(() => {
    const fetchData = () => {
      try {
        const newRef = db.ref("queueData");
        newRef.on("value", (snapshot) => {
          const data = snapshot.val();
          if (data !== undefined && data !== null) {
            const res = mapData(data);
            remainCalculate(res);
          } else {
            remainCalculate([]);
          }
        });
        const reset = db.ref("reset");
        reset.on("value", (snapshot) => {
          const data = snapshot.val();

          console.log(data);
          if (data === 1 && allQueue !== undefined && allQueue !== null) {
            console.log("hah");
            const newTestRef = db.ref(`queueData`);
            newTestRef.remove();
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    censorCheck();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {isLoading === true ? (
        <div></div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-10 p-10 h-full font-mono content-center">
            <div className={customModeHeadline}>
              <button onClick={handleChangeMode} className="text-left">
                WELCOME TO OUR QUEUE GENERATOR
              </button>
            </div>
            <div className={customModeStyle}>
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex justify-center m-auto">
                  {mode === "admin" ? (
                    <AnalogClock {...adminClock} />
                  ) : (
                    <AnalogClock {...normalClock} />
                  )}
                </div>
                <div className="col-span-1">
                  <CurrentQueue
                    currentQueue={currentQueue}
                    status={status}
                    handleNextQueue={handleNextQueue}
                    mode={mode}
                  />
                </div>
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
