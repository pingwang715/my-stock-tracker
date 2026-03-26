import React from "react";

export default function StockBoard() {

  const textFieldStyle = "p-3 text-base border border-primary rounded-md transition focus:ring focus:ring-dark focus:outline-none text-gray-800 placeholder-gray-400";
  const buttonStyle = "font-primary bg-primary hover:bg-dark text-white flex items-center py-3 px-5 rounded-md";

  return (
    <div className="max-w-[576px] rounded-md shadow-lg border border-gray-300 mx-auto p-10 m-7">
      <div className="font-primary font-extrabold text-primary text-xl flex justify-center items-center mx-auto ">
        What's on your mind today?
      </div>

      <div className="p-5 mt-5 flex flex-cols justify-center gap-3">
        <input type="text" placeholder="Stock picker" className={textFieldStyle}/>
        <button className={buttonStyle}>Submit</button>
      </div>

      <div className="p-5 mt-5 flex justify-between items-center bg-gray-200 rounded-md gap-5">
        <div className="font-primary text-lg">
          Stock Price
        </div>
        <div className="font-primary text-lg">
          Stock Change
        </div>
      </div>
    </div>
  );
}
