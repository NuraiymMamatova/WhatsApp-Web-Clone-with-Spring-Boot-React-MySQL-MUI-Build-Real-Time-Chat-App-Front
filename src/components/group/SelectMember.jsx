import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export const SelectMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2023/10/28/16/27/mountains-8347890_640.jpg"
        alt="mountains"
      />
      <p className="px-2">username</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};
