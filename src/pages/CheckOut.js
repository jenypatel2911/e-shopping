import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createAOrder,
  emptyACart,
  getUserCart,
  resetState,
} from "../features/users/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "./utils/axiosConfig";
import { getTokenFromLocalStorage } from "./utils/localStorageUtils";

const shippingSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  pincode: yup.string().required("Pincode is required"),
  other: yup.string().required("Other is required"),
});

const CheckOut = () => {
  const cartState = useSelector((state) => state.auth.cartProducts);
  const authState = useSelector((state) => state.auth);
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [shippingInfo, setShippinfInfo] = useState(null);

  const [cartProductState, setCartProductState] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippinfInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const token = getTokenFromLocalStorage();
  const newToken = JSON.parse(token);

  const config2 = {
    headers: {
      Authorization: newToken ? `Bearer ${newToken}` : "",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispacth(getUserCart(config2));
  }, [dispacth]);

  const total = cartState
    ? cartState.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity;
      }, 0)
    : 0;

  useEffect(() => {
    if (
      authState?.orderProduct?.order &&
      authState?.orderProduct?.success === true
    ) {
      navigate("/orders");
    }
  }, [authState.orderProduct, navigate]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        price: cartState[index].price,
      });
    }
    setCartProductState(items);
  }, [cartState]);

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const result = await axios.post(
      "http://localhost:4000/api/user/order/checkout",
      { amount: total + 40 },
      config
    );

    if (!result || !result.data) {
      alert("Something went wrong while creating the order");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;
    console.log("Order created", result.data.order);

    const options = {
      key: "rzp_test_uoTfgbEenTCxfy",
      amount: amount,
      currency: currency,
      name: "Jenisha Nakrani",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:4000/api/user/order/paymentVerification",
          data,
          config
        );

        dispacth(
          createAOrder({
            totalPrice: total,
            totalPriceAfterDiscount: total,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );

        dispacth(emptyACart(config2));
        dispacth(resetState());
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Meta title={"Check Out"} />
      <BredCrum title="Check Out" />

      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-16 xl:px-16">
        <a href="/" className="text-2xl font-bold text-gray-800">
          sneekpeeks
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  to={"/cart"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </Link>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <Link
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  to={"/check-out"}
                >
                  2
                </Link>
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="/check-out"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Orders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-16 xl:px-16">
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <div>
            <p className="text-xl font-medium">Shipping Address</p>
            <form
              className="space-y-4 mt-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-row gap-4">
                <div className="basis-1/2">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name{" "}
                  </label>
                  <input
                    type="name"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your first name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="basis-1/2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name{" "}
                  </label>
                  <input
                    type="name"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your last name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                <div className="text-red-500 text-xs mt-1">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country/Region
                </label>
                <input
                  type="country"
                  name="country"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your country"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                />
                <div className="text-red-500 text-xs mt-1">
                  {formik.touched.country && formik.errors.country}
                </div>
              </div>
              <div className="flex gap-2">
                <span>
                  <ExclamationCircleOutlined />
                </span>
                <p>Add a house number if you have one</p>
              </div>
              <div>
                <label
                  htmlFor="apprtment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flat, House no., Building, Company, Apaerment
                </label>
                <input
                  type="text"
                  name="apprtment"
                  id="apprtment"
                  placeholder="Enter your full address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formik.values.other}
                  onChange={formik.handleChange("other")}
                  onBlur={formik.handleBlur("other")}
                />
                <div className="text-red-500 text-xs mt-1">
                  {formik.touched.other && formik.errors.other}
                </div>
              </div>
              <div className="flex flex-row-3 gap-4">
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter your state"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Zip Code
                  </label>
                  <input
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    placeholder="Enter your zip code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.pincode}
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-center">
                  <span className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    <LeftOutlined />
                  </span>
                  <Link
                    to={"/cart"}
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Return to cart
                  </Link>
                </div>
                <button className="mt-4 mb-8 rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                  Place Orderd
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      className="flex flex-col rounded-lg bg-white sm:flex-row relative"
                      key={index}
                    >
                      <img
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                        src={
                          item?.productId.images &&
                          item.productId.images.length > 0
                            ? item.productId.images[0].url
                            : ""
                        }
                        alt=""
                      />
                      <span className="absolute top-0 right-3/4 rounded-full bg-slate-400 px-1">
                        1
                      </span>

                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-semibold">
                          {item?.productId.title}
                        </span>
                        <span
                          className="float-right text-gray-400"
                          dangerouslySetInnerHTML={{
                            __html: item?.productId.description,
                          }}
                        ></span>
                        <p className="mt-auto text-lg font-bold">
                          {" "}
                          Rs.{item?.productId.price * item?.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  Rs. {total.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">Rs. 40.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                RS. {(total + 40).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
