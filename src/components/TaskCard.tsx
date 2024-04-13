import React from "react";

const TaskCard = ({ props }: any) => {
  return (
    <div className=" bg-gray-400 m-3 p-2 rounded-lg flex justify-between items-center">
      <div className="w-full flex flex-col justify-between ">
        <h4>Task {props.id}</h4>
        <h5>{props.title}</h5>
      </div>
      <div className=" flex justify-between items-center">
        <button className="bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-md">
          {props.points} POINTS
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
