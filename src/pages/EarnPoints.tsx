import React, { useEffect, useState } from "react";
import NavbarCustom from "@/pages/_navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import ScrollableCardList from "@/components/ScrollableCardList";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import { env } from "process";

const EarnPoints = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  console.log(env, "-------------------------------------------------");

  const toggleModal = () => {
    setShowModal(!showModal); // Function to toggle modal visibility
  };
  const toggleModal2 = () => {
    setShowModal2(!showModal2); // Function to toggle modal visibility
  };
  const getTasks = async () => {
    try {
      // const tasks = await axios.get(  "https://548c-2a0d-5600-41-d000-00-77d5.ngrok-free.app",{
      const tasks = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/task`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjNjEzZmJiOTlhMTA0M2M0MTdjZDYiLCJpYXQiOjE3MTMxMzU5MzV9.w0v9xwvUOy77ZLrfv7N9Af_hy7Juq9jWnI9SSsjxGso`,
          },
        }
      );
      console.log(tasks, "tasks");
      setTasks(tasks?.data?.data);
    } catch (error) {
      console.log(error, "--------");
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  const [tasks, setTasks] = useState([]);
  return (
    <div>
      <NavbarCustom />
      <header>
        <div
          className="flex justify-center px-[10%] items-center h-[250px]"
          style={{
            // background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
            // background: "linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)",
            // background: rgb(255,255,255);
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 15%, rgba(180,180,180,1) 50%, rgba(255,255,255,1) 85%)",
          }}
        >
          <h2 className="text-4xl text-white">EARN SOLAR POINTS </h2>
          {/* <Image
            src="/logo-solar.svg"
            width="200"
            style={{ height: "100px", width: "100px" }}
            height="200"
            alt={"logo"}
          /> */}
        </div>
      </header>
      <main className="flex justify-center gap-5 w-full bg-white py-20">
        <section className="w-[50%] flex justify-center">
          <ScrollableCardList>
            <div className=" bg-white m-3 p-2 rounded-lg flex justify-start items-center">
              <div className=" flex justify-between items-center">
                <Image
                  src="/logo-solar.svg"
                  width="200"
                  style={{ height: "60px", width: "60px" }}
                  height="200"
                  alt={"logo"}
                />
              </div>
              <div className="w-full flex flex-col justify-between ">
                <h4>SOLAR Points</h4>
                <h5>0 Points </h5>
              </div>
            </div>
            <div className=" bg-white m-3 p-1 rounded-lg">
              <div className=" bg-[rgba(200,200,200,1)] m-3 p-2 rounded-lg flex justify-between items-center">
                {/* <div className="w-full  flex flex-col justify-between "> */}
                <h6 className="pt-2">People I have Referred </h6>
                {/* </div> */}
                {/* <div className=" flex justify-between items-center"> */}
                <button className="bg-white text-black px-3 py-1 whitespace-nowrap rounded-full">
                  0
                </button>
                {/* </div> */}
              </div>

              <div className=" bg-[rgba(200,200,200,1)] m-3 p-2 rounded-lg flex justify-between items-center">
                {/* <div className=" "> */}
                <h6 className="pt-2">Referrals by People I have Referred </h6>
                {/* </div> */}
                {/* <div className=" flex justify-between items-center"> */}
                <button className="bg-white text-black px-3 py-1 whitespace-nowrap rounded-full">
                  0
                </button>
                {/* </div> */}
              </div>

              <div className=" bg-[rgba(200,200,200,1)] m-3 p-2 rounded-lg flex justify-between items-center">
                {/* <div className="w-full flex flex-col justify-between "> */}
                <h6 className="pt-2">Boost Your Solar Points </h6>
                {/* </div> */}
                {/* <div className=" flex justify-between items-center"> */}
                <button
                  onClick={toggleModal}
                  className="bg-white text-black px-3 py-1 whitespace-nowrap rounded-md"
                >
                  ?
                </button>
                {/* </div> */}
              </div>
              <div className="pl-3">
                <li style={{ listStyle: "none" }}>1. Complete Tasks</li>
                <li style={{ listStyle: "none" }}>2. Earn SOLAR Points</li>
                <li style={{ listStyle: "none" }}>
                  3. Claim Ecosystem Rewards
                </li>
                <p>Join the Gaming Revolution Today!</p>
              </div>
            </div>
          </ScrollableCardList>
        </section>
        <section className="w-[50%] flex justify-center">
          <ScrollableCardList>
            {tasks.length > 0 ? (
              tasks.map((task, i) => (
                <TaskCard
                  key={i + 1}
                  props={task}
                  index={i + 1}
                  showModal2={showModal2}
                  toggleModal2={toggleModal2}
                />
              ))
            ) : (
              <div className=" h-full w-full flex justify-center items-center ">
                <div className="h-10 w-10 animate-spin  border-b-2 border-t-1 rounded-full border-gray-400 m-5"></div>
              </div>
            )}
          </ScrollableCardList>
        </section>
      </main>
      {/* Modal */}
      {showModal && (
        <div className="fixed  bg-[rgba(265,265,265,0.4)] inset-0 flex justify-center items-center z-50">
          <div className="bg-white border p-8 rounded-lg">
            <h2 className="text-2xl mb-4">How to Earn More SOLAR Points</h2>
            <p>
              Want to earn Solar Points for social media support? Here’s how:
              <br />
              1. Tweet using $SOLAR.
              <br /> Points will be automatically awarded each week based on the
              activity from your connected Twitter account.
            </p>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarnPoints;
