import React from "react";
import { Rate } from "antd";
import { Link } from "react-router-dom";

const SpecialCart = (props) => {
  const { id, title, brand, totalrating, price, sold, quntity, image } = props;

  return (
    <div className="grid grid-cols-2 bg-white gap-4">
      <div className="flex flex-cols-2 my-2">
        <div className="m-1">
          <div className="m-1">
            <img className="rounded-lg border w-68" src={image} alt="" />
          </div>
          <div className="grid grid-cols-3 justify-center gap-4">
            <div>
              <img className="rounded-lg h-16 border" src={image} alt="" />
            </div>
            <div>
              <img className="rounded-lg h-16 border" src={image} alt="" />
            </div>
            <div>
              <img className="rounded-lg h-16 border" src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-4 m-2">
        <div className="grid gap-2">
          <p className="text-orange-500 font-semibold">{brand}</p>
          <h5 className="text-sm font-bold">{title}</h5>
        </div>
        <div>
          <div className="my-1">
            <Rate allowHalf defaultValue={totalrating} disabled />
          </div>
          <div className="flex gap-2">
            <p>Rs.10000</p>
            <p className="line-through">{price}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="font-bold mt-2">5</p>
          <span className="mt-2">days:</span>
          <span className="rounded-2xl bg-red-500 p-2">1</span>
          <span className="mt-2">:</span>
          <span className="rounded-2xl bg-red-500 p-2">0</span>
          <span className="mt-2">:</span>
          <span className="rounded-2xl bg-red-500 p-2">0</span>
        </div>
        <div>
          <p>Products: {quntity}</p>
          <div
            className="w-full mt-2 relative bg-gray-200 rounded"
            role="progressbar"
            aria-valuemax={sold + quntity}
            aria-valuemin={quntity}
            aria-valuenow={quntity / quntity + sold * 100}
          >
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: quntity / quntity + sold * 100 + "%" }}
            ></div>
          </div>
        </div>
        <Link
          to={`/product/${id}`}
          className="bg-slate-500 hover:bg-slate-900 text-white text-center px-2 py-1 rounded-2xl focus:outline-none"
          style={{ width: "100px" }}
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default SpecialCart;
