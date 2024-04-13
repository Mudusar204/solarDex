import React, { useState } from "react";
import NavbarCustom from "@/pages/_navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import ScrollableCardList from "@/components/ScrollableCardList";
import TaskCard from "@/components/TaskCard";
const EarnPoints = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "like",
      points: 10,
    },
    {
      id: 2,
      title: "share",
      points: 20,
    },
    {
      id: 3,
      title: "comment",
      points: 30,
    },
    {
      id: 1,
      title: "like",
      points: 10,
    },
    {
      id: 2,
      title: "share",
      points: 20,
    },
    {
      id: 3,
      title: "comment",
      points: 30,
    },
    {
      id: 1,
      title: "like",
      points: 10,
    },
    {
      id: 2,
      title: "share",
      points: 20,
    },
    {
      id: 3,
      title: "comment",
      points: 30,
    },
  ]);
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
      <main className="flex justify-center gap-5 w-full bg-gray-100 py-20">
        <section className="w-[50%] flex justify-center">
          <ScrollableCardList>
            <div className=" bg-gray-400 m-3 p-2 rounded-lg flex justify-start items-center">
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
                <h3>SOLAR Points</h3>
                <h4>0 Points </h4>
              </div>
            </div>
            <div className=" bg-gray-200 m-3 p-1 rounded-lg">
              <div className=" bg-gray-400 m-3 p-2 rounded-lg flex justify-between items-center">
                <div className="w-full flex flex-col justify-between ">
                  <h4>People I've Referred </h4>
                </div>
                <div className=" flex justify-between items-center">
                  <button className="bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-full">
                    0
                  </button>
                </div>
              </div>

              <div className=" bg-gray-400 m-3 p-2 rounded-lg flex justify-between items-center">
                <div className="w-full flex flex-col justify-between ">
                  <h4>Referrals by People I've Referred </h4>
                </div>
                <div className=" flex justify-between items-center">
                  <button className="bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-full">
                    0
                  </button>
                </div>
              </div>

              <div className=" bg-white m-3 p-2 rounded-lg flex justify-between items-center">
                <div className="w-full flex flex-col justify-between ">
                  <h4>Boost Your Solar Points </h4>
                </div>
                <div className=" flex justify-between items-center">
                  <button className="bg-blue-500 text-white px-3 py-1 whitespace-nowrap rounded-md">
                    ?
                  </button>
                </div>
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
            {tasks.map((task) => (
              <TaskCard key={task.id} props={task} />
            ))}
          </ScrollableCardList>
        </section>
      </main>
    </div>
  );
};

export default EarnPoints;
