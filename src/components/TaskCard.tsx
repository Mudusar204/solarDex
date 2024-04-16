import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const TaskCard = ({
  props,
  index,
  showModal2,
  toggleModal2,
  taskId,
  setTaskId,
}: any) => {
  const [disableReward, setDisableReward] = useState(true);
  const markAsDone = async () => {
    try {
      const token = localStorage.getItem("token");

      // const tasks = await axios.get(  "https://548c-2a0d-5600-41-d000-00-77d5.ngrok-free.app",{
      const done = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/task/markAsDone`,
        { taskId: taskId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDisableReward(false);
      console.log(done, "done");
      toast.success(done?.data?.message);
    } catch (error) {
      setDisableReward(false);
      toast.success("something went wrong");

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
          disabled={props?.isDone}
          onClick={() => {
            toggleModal2();
            setTaskId(props._id);
            console.log(props._id, "---------------id of task");
          }}
          className={`${
            props?.isDone ? "bg-green-500" : "bg-[rgba(180,180,180)]"
          }  text-white px-3 py-1 whitespace-nowrap rounded-md`}
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
        <div className="fixed bg-[rgba(255,255,255,0.01)] inset-0 flex justify-center items-center z-50">
          <div className="border bg-white p-8 rounded-lg">
            <h2 className="text-2xl mb-4 text-center">
              Earn More SOLAR Points
            </h2>

            <button
              className="bg-gray-400 w-full text-white px-3 py-1 rounded-md"
              onClick={() => {
                setDisableReward(false);
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
              disabled={disableReward}
              className={`${
                disableReward ? "bg-gray-300" : "bg-gray-400"
              }  my-2 w-full text-white px-3 py-1 rounded-md`}
              onClick={() => {
                markAsDone();
                toggleModal2();
              }}
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
