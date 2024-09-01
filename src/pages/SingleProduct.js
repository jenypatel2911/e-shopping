import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputNumber } from "antd";
import { Image } from "antd";
import {
  AppstoreOutlined,
  TruckOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getAProduct } from "../features/product/productSlice";
import Color from "../components/Color";
import { toast } from "react-toastify";
import { addToProductCart, getUserCart } from "../features/users/userSlice";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { addToWishlist } from "../features/product/productSlice";

function getItem(label, key, icon, children, type) {
  return {
    key: `${key}-${Math.random().toString(36).substr(2, 9)}`,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Shipping & Return", "sub1", <TruckOutlined size={24} />, [
    getItem(
      <p
        key="shipping-return"
        className="text-gray-700 text-sm dark:text-gray-300"
      >
        Free Shipping and returns available on all orders! We ship all US
        <br />
        domestic orders within 5-10 business days.
      </p>
    ),
  ]),
  getItem("Material ", "sub2", <AppstoreOutlined />, [
    getItem(
      <p key="material-1" className="text-gray-700 text-sm dark:text-gray-300">
        Watches are primarily made out of four sorts of materials <br />
        titanium, stainless steel and steel, metal or alloys.
      </p>
    ),
    getItem(
      <p key="material-2" className="text-gray-700 text-sm dark:text-gray-300">
        Another Material Item
      </p>
    ),
  ]),
  getItem("Care Intraction", "sub3", <HeartOutlined />, [
    getItem(
      <p
        key="interaction"
        className="text-gray-700 text-sm my-3 dark:text-gray-300"
      >
        Quisque ut erat vitae nisi ultrices placerat non eget titanium,
        <br /> stainless steel and steel, metal or alloys.
      </p>
    ),
  ]),
];

const SingleProduct = () => {
  const location = useLocation();
  const navigat = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productStat = useSelector((state) => state?.product?.singleProduct);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [quantity, setQuntity] = useState(1);
  const [color, setColor] = useState(null);
  const [alredyAdded, setAlredyAdded] = useState(false);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  console.log(star, comment);

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const addratings = (e) => {
    e.preventDefault();
    if (star === null) {
      toast.error("Please Add to Star Rating");
      return false;
    }
    if (comment === null) {
      toast.error("Please Write Review About Product");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
  }, [dispatch, getProductId]);

  useEffect(() => {
    if (cartState) {
      for (let index = 0; index < cartState.length; index++) {
        if (getProductId === cartState[index]?.productId?._id) {
          setAlredyAdded(true);
          break;
        }
      }
    }
  }, [cartState, getProductId]);

  const onClick = (e) => {};
  const [orderProduct] = useState(true);

  const uploadCart = () => {
    if (color === null) {
      toast("Pleace choose the color");
      return false;
    } else {
      dispatch(
        addToProductCart({
          productId: productStat?._id,
          price: productStat?.price,
          quantity,
          color,
        })
      );
      navigat("/cart");
      window.location.reload();
    }
  };

  return (
    <>
      <Meta title={"Profile Page"} />
      <BredCrum title={productStat?.title} />
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 px-4 mb-4">
              <div className="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    className="object-cover"
                    src={
                      productStat?.images && productStat.images.length > 0
                        ? productStat.images[0].url
                        : ""
                    }
                    width={525}
                    height={500}
                    layout="fill"
                    alt="Product Image"
                  />
                </div>
                <div className="flex flex-row gap-2">
                  {productStat?.images.map((item, index) => {
                    return (
                      <div key={index}>
                        <Image width={200} src={item?.url} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 px-2">
                  <button
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={() => {
                      alredyAdded ? navigat("/cart") : uploadCart();
                    }}
                  >
                    {alredyAdded ? "Go To Cart" : "Add to Cart"}
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => addToWish(productStat?._id)}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {productStat?.title}
              </h2>
              <p
                className="font-bold dark:text-gray-300 mb-4"
                dangerouslySetInnerHTML={{ __html: productStat?.description }}
              ></p>
              <div className="mb-2">
                <Rate value={productStat?.totalrating} disabled />
              </div>
              <div className="flex flex-col mb-4 gap-2">
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {productStat?.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Type:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Category:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {productStat?.category}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Tags:{" "}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {productStat?.tags}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                {alredyAdded === false && (
                  <>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Color:{" "}
                    </span>
                    <span className="grid grid-cols-5 gap-2 items-center">
                      {" "}
                      <Color
                        setColor={setColor}
                        colorData={productStat?.color}
                      />
                    </span>
                  </>
                )}
              </div>
              <div className="grid grid-row gap-2 ">
                <div>
                  {alredyAdded === false && (
                    <>
                      {" "}
                      <span className="font-bold text-gray-700 dark:text-gray-300">
                        Quantity:{" "}
                      </span>
                      <InputNumber
                        size={25}
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={(value) => setQuntity(value)}
                        value={quantity}
                      />
                    </>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <Menu
                    onClick={onClick}
                    style={{ width: "100%", maxWidth: "530px" }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white  my-4">
              Descriptio
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-lg">
              <p
                className="m-4 py-4"
                dangerouslySetInnerHTML={{ __html: productStat?.description }}
              ></p>
            </div>
            <div className="">
              <h6 className="text-2xl font-bold text-gray-800 dark:text-white my-4">
                Review
              </h6>
              <section className="bg-white dark:bg-gray-900 rounded-lg">
                <div className="m-4 py-4">
                  <h2 className="text-slate-500">Customer Review</h2>
                  <div className="my-2 flex gap-3 justify-between">
                    <div className="flex flex-row gap-3">
                      <Rate allowHalf defaultValue={2} disabled />
                      <div>Brand 2 Review</div>
                    </div>
                    <div className="">
                      {orderProduct && (
                        <div>
                          <Link
                            to={""}
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Write a Review
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border"></div>
                  <div className="my-3">
                    <p className="text-slate-500">Write A Rivew</p>
                  </div>
                  <div className=" space-y-4 md:space-y-6">
                    <div>
                      <div className="flex flex-row gap-3">
                        <Rate
                          allowHalf
                          edit={true}
                          onChange={(e) => setStar(e)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Body of Review
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          edit={true}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={addratings}
                        className="text-white item-right bg-gray-800 md:mt-5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm md:text-base px-4 md:px-5 py-2 md:py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                      >
                        Submit Review
                      </button>
                    </div>
                    <div className="border"></div>
                    <div>
                      {productStat &&
                        productStat.ratings?.map((item, index) => {
                          return (
                            <>
                              <div className="flex gap-2 mb-2" key={index}>
                                <Rate allowHalf value={item?.star} disabled />
                              </div>
                              <p>{item?.comment}</p>
                            </>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
