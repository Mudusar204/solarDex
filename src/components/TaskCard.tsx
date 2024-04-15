import Link from "next/link";
import React from "react";
import axios from "axios";
const TaskCard = ({ props, index, showModal2, toggleModal2 }: any) => {
  const markAsDone = async () => {
    try {
      // const tasks = await axios.get(  "https://548c-2a0d-5600-41-d000-00-77d5.ngrok-free.app",{
      const tasks = await axios.get("http://localhost:4000/task/markAsDone", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjNjEzZmJiOTlhMTA0M2M0MTdjZDYiLCJpYXQiOjE3MTMxMzU5MzV9.w0v9xwvUOy77ZLrfv7N9Af_hy7Juq9jWnI9SSsjxGso`,
        },
      });
      console.log(tasks, "tasks");
    } catch (error) {
      console.log(error, "--------");
    }
  };
  return (
    <div className=" bg-white m-3 p-2 rounded-lg flex justify-between items-center">
      <div className="w-full flex flex-col justify-between ">
        <h5>Task {index}</h5>
        <h6>{props.title}</h6>
      </div>
      <div className=" flex justify-between items-center">
        <button
          onClick={() => toggleModal2()}
          className="bg-[rgba(180,180,180)] text-white px-3 py-1 whitespace-nowrap rounded-md"
        >
          {/* <Link
            target="blank"
            style={{ textDecoration: "none", color: "white" }}
            href={props?.link}
          > */}
          {props?.points} POINTS
          {/* </Link> */}
        </button>
      </div>
      {showModal2 && (
        <div className="fixed bg-[rgba(265,265,265,0.1)] inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4 text-center">
              Earn More SOLAR Points
            </h2>

            <button
              className="bg-blue-500 w-full text-white px-3 py-1 rounded-md"
              onClick={() => {
                toggleModal2(), markAsDone();
              }}
            >
              <Link
                target="blank"
                style={{ textDecoration: "none", color: "white" }}
                href={props?.link}
              >
                Continue to X
              </Link>
            </button>
            <button
              className="bg-blue-500 my-2 w-full text-white px-3 py-1 rounded-md"
              onClick={toggleModal2}
            >
              Claim Your Reward
            </button>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
              onClick={toggleModal2}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
