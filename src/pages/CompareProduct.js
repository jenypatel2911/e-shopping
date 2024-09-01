import React from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import Color from "../components/Color";
import { IoIosClose } from "react-icons/io";

const CompareProduct = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BredCrum title="Compare Products" />
      <div className="bg-gray-200">
        <div className="grid grid-cols-4 gap-4 m-16">
          <div className="bg-white my-3 rounded relative">
            <IoIosClose size={24} className="absolute top-0 right-0 m-2" />
            <img src="images/watch.jpg" alt="blogs" className="w-full h-auto" />
            <div className="border-b">
              <p className="mx-6 text-xs">
                If you cannot provide a valid href, but still need the element
                to resemble a link
              </p>
              <p className="font-bold mx-6 my-2">$100</p>
            </div>
            <div className="m-4 flex-col gap-6 mx-6">
              <div className="grid grid-cols-2 gap-6">
                <h5 className="font-bold">Brand:</h5>
                <p className="text-right">Havels</p>
              </div>
              <div className="border my-2"></div>
              <div className="grid grid-cols-2 gap-6">
                <h5 className="font-bold">Type:</h5>
                <p className="text-right">Watch</p>
              </div>
              <div className="border my-2"></div>
              <div className="grid grid-cols-2 gap-6 mt-1">
                <h5 className="font-bold">Availability:</h5>
                <p className="text-right">In Stock</p>
              </div>
              <div className="border my-2"></div>
              <div className="grid grid-cols-2 gap-6 mt-1">
                <h5 className="font-bold">Color:</h5>
                <div className="flex items-center">
                  <Color />
                </div>
              </div>
              <div className="border my-2"></div>
              <div className="grid grid-cols-2 gap-6 mb-1">
                <h5 className="font-bold">Size:</h5>
                <div className="flex items-center justify-end">
                  <p className="mr-2">S</p>
                  <p>M</p>
                </div>
              </div>
            </div>
          </div>
          {/* Add more comparison items here */}
        </div>
      </div>
    </>
  );
};

export default CompareProduct;
