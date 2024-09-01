import React from "react";
import { Link } from "react-router-dom";

const BredCrum = (props) => {
  const { title } = props;
  return (
    <div className="py-4 text-center">
      <p>
        <Link className="" to={"/"}>Home / </Link>
        {title}
      </p>
    </div>
  );
};

export default BredCrum;
