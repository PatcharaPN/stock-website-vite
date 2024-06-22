import React from "react";
import { Icon } from "@iconify/react";
const resource = {
  material: 70,
  tool: 50,
  close: 20,
  over: 2,
};

function Storebalance() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="h-[170px] bg-green-500 rounded-xl">
        <div className="text-[1.5rem] text-white mx-2">จำนวนวัสดุทั้งหมด</div>
        <div className="flex justify-between items-center">
          {" "}
          <Icon
            icon="lets-icons:materials"
            width="100"
            height="100"
            className="opacity-40 mx-1"
          />
          <div className="px-5 flex flex-col justify-center items-center">
            {" "}
            <div className="text-[4rem]  text-white">{resource.material}</div>
            <div className="text-white text-[1.2rem] ">จำนวนทั้งหมด</div>
          </div>
        </div>
      </div>
      <div className="h-[170px] bg-blue-500 rounded-xl">
        <div className="text-[1.5rem] text-white mx-2">
          จำนวนเครื่องมือทั้งหมด
        </div>
        <div className="flex justify-between items-center">
          {" "}
          <Icon
            icon="mingcute:tool-line"
            width="100"
            height="100"
            className="opacity-40 mx-1"
          />
          <div className="px-5 flex flex-col justify-center items-center">
            {" "}
            <div className="text-[4rem]  text-white">{resource.tool}</div>
            <div className="text-white text-[1.2rem] ">จำนวนทั้งหมด</div>
          </div>
        </div>
      </div>
      <div className="h-[170px] bg-orange-500 rounded-xl">
        <div className="text-[1.5rem] text-white mx-2">จำนวนวัสดุใกล้หมด</div>
        <div className="flex justify-between items-center">
          {" "}
          <Icon
            icon="ph:warning-bold"
            width="100"
            height="100"
            className="opacity-40 mx-1"
          />
          <div className="px-5 flex flex-col justify-center items-center">
            {" "}
            <div className="text-[4rem]  text-white">{resource.close}</div>
            <div className="text-white text-[1.2rem] ">จำนวนทั้งหมด</div>
          </div>
        </div>
      </div>
      <div className="h-[170px] bg-red-500 rounded-xl">
        <div className="text-[1.5rem] text-white mx-2">จำนวนวัสดุที่หมด</div>
        <div className="flex justify-between items-center">
          {" "}
          <Icon
            icon="ic:twotone-do-not-disturb"
            width="100"
            height="100"
            className="opacity-40 mx-1"
          />
          <div className="px-5 flex flex-col justify-center items-center">
            {" "}
            <div className="text-[4rem]  text-white">{resource.over}</div>
            <div className="text-white text-[1.2rem] ">จำนวนทั้งหมด</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Storebalance;
