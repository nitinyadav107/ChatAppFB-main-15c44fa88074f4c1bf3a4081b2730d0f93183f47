import React from "react";

function Loading() {
  return (
    <div className=" flex  items-center justify-center bg-slate-600 "  style={{ minHeight: "calc(89vh )" }} >
      <div className="flex py-5 flex-col gap-4 w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  );
}

export default Loading;
