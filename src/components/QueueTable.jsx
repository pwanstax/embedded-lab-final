import React from "react";

const QueueTable = ({allQueue, handleFocus}) => {
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
          <tr key={each.id} onClick={(e) => handleFocus(e.target.id)}>
            <td id={each.queue} className="border-2 border-l-0 p-2 border-b-0">
              {each.queue}
            </td>
            <td id={each.queue} className="border-2 border-r-0 p-2 border-b-0">
              {each.time}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QueueTable;
