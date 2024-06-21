// pages/home_page/homepage.jsx
import React from "react";

import Storebalance from "../../components/Store_balance";
const Dashboard = () => {
  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 grid-rows-4  md:gap-6 lg:gap-5">
      <div class="bg-white p-4 rounded-lg h-[200px] col-span-3"></div>
      <div class="bg-white p-4 rounded-lg h-[200px] col-span-3 row-span-1">
        <Storebalance />
      </div>
      <div class="bg-white p-4 rounded-lg h-[450px] col-span-2 row-span-2 "></div>
      <div class="bg-white p-4 rounded-lg h-[450px] col-span-1 row-span-2 flex items-center "></div>
    </div>
  );
};

export default Dashboard;
