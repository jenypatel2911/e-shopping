import React from "react";
import { Rate } from "antd";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { FaRegEye } from "react-icons/fa";

const ProductCart = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  if (!Array.isArray(data)) {
    return null; 
  }
  return (
    <>
      {data.map((item, index) => {
        return (
          <Link
            to={`/product/${item?._id}`}
            key={index}
            className="group my-2 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
              <img
                className="peer absolute top-0 right-0 h-full w-full object-cover"
                src={
                  item?.images && item.images.length > 0
                    ? item.images[0].url
                    : ""
                }
                alt="products"
              />
              <img
                className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                src={
                  item?.images && item.images.length > 0
                    ? item.images[0].url
                    : ""
                }
                alt="product"
              />
              <div className="absolute grid grid-row gap-4 top-0 right-0 m-2 rounded-full px-2 text-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addToWish(item?._id)}>
                  <MdOutlineFavoriteBorder size={20} />
                </button>
                <Link to={`/product/${item?._id}`}>
                  <FaRegEye size={20} />
                </Link>
              </div>
              {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                39% OFF
              </span> */}
            </div>
            <div className="mt-4 px-5 pb-5">
              <h6 className="text-orange-600">{item?.brand}</h6>
              <h5 className="text-xs font-bold">{item?.title} </h5>
              <div className="my-2">
                <Rate defaultValue={item?.totalrating} disabled />
              </div>
              <p className="font-bold">Description</p>

              {/* <p className={`${grid === 12 ? "d-block":"D-none"}`}> */}
              {typeof item?.description === "string" &&
              item?.description.length > 70 ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.description.substr(0, 86) + "...",
                  }}
                />
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                ></span>
              )}
              <p className="font-bold">Rs.{item?.price}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default ProductCart;
