import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { InputNumber, Empty } from "antd";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCart,
  removeProductCart,
  updateCartProduct,
} from "../features/users/userSlice";
import { getTokenFromLocalStorage } from "./utils/localStorageUtils";

const Cart = () => {
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState({});
  
  const token = getTokenFromLocalStorage();
  const newToken = JSON.parse(token);

  useEffect(() => {
    const config2 = {
      headers: {
        Authorization: newToken ? `Bearer ${newToken}` : "",
        Accept: "application/json",
      },
    };

    dispatch(getUserCart(config2));
  }, [dispatch, newToken]);

  useEffect(() => {
    if (productUpdateDetail.cartItemId) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail.cartItemId,
          quantity: productUpdateDetail.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail, dispatch]);

  const total = userCartState
    ? userCartState.reduce((acc, item) => {
        return (
          acc + (item.productId ? item.productId.price * item.quantity : 0)
        );
      }, 0)
    : 0;

  const deleteProduct = (id) => {
    dispatch(removeProductCart(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  return (
    <>
      <Meta title={"Cart"} />
      <BredCrum title="Cart" />
      <div className="flex flex-col justify-between items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-16 xl:px-16">
        <a href="/" className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          sneekpeeks
        </a>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-3">
            <Link
              to={"/cart"}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
            >
              1
            </Link>
            <span className="font-semibold text-gray-900 hidden sm:block">
              Shop
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-2 text-gray-400 hidden sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div className="flex items-center space-x-3">
            <a
              href="/cart"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
            >
              2
            </a>
            <span className="font-semibold text-gray-500">Shipping</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mt-2 text-gray-400 hidden sm:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <div className="flex items-center space-x-3">
            <a
              href="/cart"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
            >
              3
            </a>
            <span className="font-semibold text-gray-500">Orders</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
        <div className="flex flex-col w-full h-fit gap-4">
          <p className="text-slate-500 text-xl font-extrabold">My cart</p>
          <div>
            {userCartState?.length === 0 && (
              <div>
                <Empty />
              </div>
            )}
          </div>
          {userCartState &&
            userCartState.map((item, index) => {
              return (
                <div
                  className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm"
                  key={index}
                >
                  <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <div className="flex flex-row gap-6 items-center">
                      <div className="w-28 h-28">
                        <img
                          className="w-full h-full"
                          src={
                            item?.productId?.images?.length > 0
                              ? item.productId.images[0].url
                              : ""
                          }
                          alt="img"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-lg text-gray-800 font-semibold">
                          {item?.productId?.title.substr(0, 20) + "..."}
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          Color:
                          <span
                            className="rounded-full h-5 w-5 flex m-1"
                            style={{ backgroundColor: item?.color?.title }}
                          ></span>
                        </p>
                        <p className="text-xs text-gray-600 font-semibold">
                          Size: <span className="font-normal">42</span>
                        </p>
                      </div>
                    </div>
                    <div className="self-center text-center">
                      <div className="flex">
                        <p className="text-gray-600 mt-1 font-normal text-sm line-through">
                          Rs.99.99
                        </p>
                        <p className="text-emerald-500 ml-2">(-50% OFF)</p>
                      </div>
                      <p className="text-gray-800 font-normal text-xl">
                        Rs.{item?.productId?.price * item?.quantity}
                      </p>
                    </div>
                    <div className="self-center">
                      <button className="">
                        <MdDelete
                          size={24}
                          onClick={() => deleteProduct(item?._id)}
                          className="hover:text-red-700"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row self-center gap-1">
                    <InputNumber
                      min={1}
                      max={10}
                      value={productUpdateDetail.cartItemId === item?._id ? productUpdateDetail.quantity : item?.quantity}
                      onChange={(value) => {
                        setProductUpdateDetail({
                          cartItemId: item?._id,
                          quantity: value,
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
          <p className="text-slate-500 text-xl font-extrabold">
            Purchase Resume
          </p>
          <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">
                Subtotal ({userCartState ? userCartState.length : 0}
                {userCartState && userCartState.length === 1 ? " item" : " items"})
              </p>
            </div>
            <hr className="bg-gray-200 h-0.5" />
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">Total</p>
              <div>
                <p className="text-end font-bold">Rs.{total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {userCartState !== null && userCartState?.length > 0 ? (
                <Link
                  to="/check-out"
                  className="transition-colors text-center text-sm bg-gray-900 hover:bg-gray-900 p-2 rounded-sm w-full text-white text-hover shadow-md"
                >
                  Check Out
                </Link>
              ) : (
                <button
                  className="transition-colors text-center text-sm bg-gray-500 cursor-not-allowed p-2 rounded-sm w-full text-white text-hover shadow-md"
                  disabled
                >
                  Check Out
                </button>
              )}

              <Link
                to={"/product"}
                className="transition-colors text-center text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md"
              >
                ADD MORE PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
