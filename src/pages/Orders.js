import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/users/userSlice";
import { Empty } from "antd";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state?.auth?.getorderProduct?.orders
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Meta title={"Orders"} />
      <BredCrum title="Orders" />
      {orderState?.length === 0 ? (
        <div className="m-20">
          <Empty />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-16 xl:px-16">
            <div className="text-2xl font-bold text-gray-800">sneekpeeks</div>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
              <div className="relative">
                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a
                      href="#"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </a>
                    <span className="font-semibold text-gray-900">Shop</span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">
                      Shipping {" / "} Payment
                    </span>
                  </li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <li className="flex items-center space-x-3 text-left sm:space-x-4">
                    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                      3
                    </a>
                    <span className="font-semibold text-gray-500">Orders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <section className="py-24 bg-white">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
              <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
                Payment Successful
              </h2>
              <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
                Thanks for making a purchase you can check our order summary
                from below
              </p>
              {orderState &&
                orderState?.map((item, index) => {
                  const expectedDeliveryDate = addDays(
                    new Date(item?.createdAt),
                    7
                  ).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  });

                  return (
                    <div
                      className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl lg:max-w-full mx-auto mb-6"
                      key={index}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                        <div className="data">
                          <p className="font-semibold text-base leading-7 text-black mt-4">
                            Order Payment :{" "}
                            <span className="text-gray-400 font-medium">
                              {new Date(item?.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </p>
                        </div>
                        <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 mt-4 lg:mt-0 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                          Track Your Order
                        </button>
                      </div>
                      <div className="w-full px-3 md:px-6">
                        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-10 w-full">
                          <div className="flex flex-col lg:flex-row gap-3 lg:block">
                            <p className="font-medium leading-7 text-black">
                              Order Id
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7">
                              {item?._id}
                            </p>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-3 lg:block mt-3 lg:mt-0">
                            <p className="font-medium leading-7 text-black">
                              Total Price After Discount
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              Rs.{item?.totalPriceAfterDiscount}
                            </p>
                          </div>
                          <div className="flex flex-col lg:flex-row gap-3 lg:block mt-3 lg:mt-0">
                            <p className="font-medium leading-7 text-black">
                              Status
                            </p>
                            <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              {item?.orderStatus}
                            </p>
                          </div>
                          <div className="flex flex-col lg:flex-row gap-3 lg:block mt-3 lg:mt-0">
                            <p className="font-medium whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                              {expectedDeliveryDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Orders;
