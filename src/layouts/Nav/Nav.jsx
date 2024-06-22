import React from "react";
import { Icon } from "@iconify/react";
import { Outlet, Link } from "react-router-dom";
import EffectButton from "../Button/EffectButton";
export function Nav() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="flex">
      <div className="">
        <div className="fixed top-0 left-0 h-[calc(100vh)] w-80 p-4 shadow-xl shadow-blue-gray-900/5 bg-[#273559] rounded-none flex flex-col">
          <div className="text-white text-[50px] mb-[50px]">Logo</div>
          <div
            id="Profile-img"
            className="flex flex-col justify-center items-center"
          >
            <img
              className="rounded-full h-[100px] w-[100px] mb-6"
              src="https://avatars.githubusercontent.com/u/8845860?v=4"
              alt=""
            />
            <div className="text-white font-sans">Mr.Patcharapol Pannaen</div>
            <div className="text-white opacity-50 font-sans mb-10">
              Fullstack
            </div>
          </div>
          <div
            id="Menu-container"
            className="flex flex-col gap-10 justify-center items-start"
          >
            <Link to={"home"}>
              <div className="flex gap-2 items-center ">
                <Icon
                  icon="akar-icons:home"
                  width={30}
                  className="text-white"
                />
                <div className="text-white">Home</div>
              </div>
            </Link>
            <div className="flex gap-2 items-center ">
              {" "}
              <Icon
                icon="material-symbols:dashboard-outline"
                width={30}
                className="text-white"
              />
              <div className="text-white">Dashboard</div>
            </div>

            <Link to={"update"}>
              {" "}
              <div className="flex gap-2 items-center ">
                {" "}
                <Icon icon="tabler:edit" width={30} className="text-white" />
                <div className="text-white">Update / Edit Stock</div>
              </div>
            </Link>
            <Link to={"history"}>
              {" "}
              <div className="flex gap-2 items-center ">
                {" "}
                <Icon
                  icon="material-symbols:history"
                  width={30}
                  className="text-white"
                />
                <div className="text-white">History</div>
              </div>
            </Link>
            <div className="flex gap-[120px] items-center px-2  py-[200px]">
              <div className="text-white">v 1.0.0</div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="line-md:log-out"
                  width={25}
                  className="text-white"
                />
                <button className="text-white">Log out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-4 ml-80">
        <Outlet />
      </div>
    </div>
  );
}
