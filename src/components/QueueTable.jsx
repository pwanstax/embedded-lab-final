import React from "react";

const QueueTable = ({allQueue, setFocusQueue, setRemainQueue, setWaitTime}) => {
  const handleFocus = (queue) => {
    for (let index = 0; index < allQueue.length; index++) {
      if (allQueue[index].queue === queue) {
        setFocusQueue(allQueue[index].queue);
        setRemainQueue(allQueue[index].remain);
        setWaitTime(allQueue[index].time);
        break;
      }
    }
  };
  return (
    <table className="table-auto basis-full text-center border-collapse ">
      <thead>
        <tr>
          <th className="border-2 p-2 bg-gray-200">#</th>
          <th className="border-2 p-2 bg-gray-200">Waiting Time</th>
        </tr>
      </thead>
      <tbody>
        {allQueue.map((each) => (
          <tr
            key={each.id}
            onClick={(e) => handleFocus(e.currentTarget.textContent / 120)}
          >
            <td className="border-2 border-l-0 p-2 border-b-0">{each.queue}</td>
            <td className="border-2 border-r-0 p-2 border-b-0">{each.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueTable;
