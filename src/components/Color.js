import React from "react";

const Color = (props) => {
  const { colorData, setColor } = props;

  return (
    <div className="grid grid-cols-5 gap-10">
      {colorData &&
        colorData.map((item, index) => (
          <div
            key={index}
            onClick={() => setColor(item?._id)}
            className="rounded-full h-5 w-5 flex m-1 cursor-pointer"
            style={{ backgroundColor: item?.title }}
          ></div>
        ))}
    </div>
  );
};

export default Color;
