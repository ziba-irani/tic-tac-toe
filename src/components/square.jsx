import React from "react";

const Square = ({ value, onChange }) => {
  return (
    <div
      className="h-28 flex text-blue-700 items-center justify-center text-4xl bg-blue-200 border-4 border-yellow-200 cursor-pointer"
      onClick={onChange}
    >
      {value}
    </div>
  );
};

export default Square;
