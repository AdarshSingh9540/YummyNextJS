import React from "react";

const Shimmer = () =>{
    return (
        
        <div className="m-10 grid gap-4 lg:gap-8  lg:grid-cols-4 md:grid-cols-4 lg:mt-24 mx-24">
        {
            Array(20).fill("").map((e,index)=>( <div
            className="bg-gradient-to-r mx-auto from-slate-200 via-gray-300 to-slate-200 h-64 w-60 animate-shimmer "
            key={index}
          ></div>))
        }
        </div>
    )
}

export default Shimmer;