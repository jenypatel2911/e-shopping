import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Marquee from "react-fast-marquee";
import BlogCart from "../components/BlogCart";
import SpecialCart from "../components/SpecialCart";
import { services } from "./utils/Data";
import { getAllBlogs } from "../features/blog/blogSlice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import { addToWishlist } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { Rate } from "antd";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const items = [
  {
    imageSrc: "images/main-banner-1.jpg",
  },
  {
    imageSrc: "images/main-banner.jpg",
  },
];

const Home = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);

  const dispatch = useDispatch();
  useEffect(() => {
    getblog();
    getProductSpe();
  }, [getAllBlogs, getAllProducts]);

  const getblog = () => {
    dispatch(getAllBlogs());
  };
  const getProductSpe = () => {
    dispatch(getAllProducts());
  };
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-6 md:mx-16 my-6 md:my-14">
          <AliceCarousel
            autoPlay
            autoPlayStrategy="none"
            autoPlayInterval={5000}
            animationDuration={1000}
            animationType="fadeout"
            infinite
            touchTracking={false}
            disableDotsControls
            disableButtonsControls
            items={items.map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item.imageSrc}
                  alt={index + 1}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 flex justify-items-start items-center">
                  <div className="grid gap-2 m-4 md:m-8 mb-16 md:mb-36">
                    <p className="text-orange-700 font-bold text-sm md:text-lg">
                      SUPERCHARGED FOR PROS.
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-black">
                      Special Sale
                    </p>
                    <p className="text-xs md:text-sm">
                      From $9000.00 or $41.6/mo
                    </p>
                    <p className="text-xs md:text-sm">For 24 mo. Footnote*</p>
                    <button
                      type="button"
                      className="text-white bg-gray-800 mt-2 md:mt-5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm md:text-base px-4 md:px-5 py-2 md:py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-0">
            <div className="relative grid">
              <img
                src="images/catbanner-01.jpg"
                alt="Cat Banner 1"
                className="w-full h-auto rounded-lg"
              />
              <div className="gap-2 absolute inset-16 md:inset-6 justify-start items-top">
                <p className="text-orange-700 font-bold text-sm  md:text-sm">
                  BEST SALE
                </p>
                <p className="text-lg md:text-xl font-bold">Laptops</p>
                <p className="text-xs md:text-sm">
                  From $9000.00 or
                  <br /> $41.6/mo
                </p>
              </div>
            </div>
            <div className="relative grid">
              <img
                src="images/catbanner-02.jpg"
                alt="Cat Banner 2"
                className="w-full h-auto rounded-lg"
              />
              <div className="gap-2 absolute  inset-16 md:inset-6 justify-start items-top">
                <p className="text-orange-700 font-bold text-sm md:text-sm">
                  NEW ARRIVAL
                </p>
                <p className="text-lg md:text-xl font-bold">Buy iPad Air</p>
                <p className="text-xs md:text-sm">
                  From $599.00 or
                  <br /> $49.93/mo.for 12 mo.
                </p>
              </div>
            </div>
            <div className="relative grid">
              <img
                src="images/catbanner-03.jpg"
                alt="Cat Banner 3"
                className="w-full h-auto rounded-lg"
              />
              <div className="gap-2 absolute inset-16 md:inset-6 justify-start items-top">
                <p className="text-orange-700 font-bold text-sm md:text-sm">
                  15% OFF
                </p>
                <p className="text-lg md:text-xl font-bold">Smartwatch 7</p>
                <p className="text-xs md:text-sm">
                  Shop the latest brand
                  <br /> Styles and Colors
                </p>
              </div>
            </div>
            <div className="relative grid">
              <img
                src="images/catbanner-04.jpg"
                alt="Cat Banner 4"
                className="w-full h-auto rounded-lg"
              />
              <div className="gap-2 absolute inset-16 md:inset-6 justify-start items-top">
                <p className="text-orange-700 font-bold text-sm md:text-sm">
                  FREE ENGRAVING
                </p>
                <p className="text-lg md:text-xl font-bold">AirPods Max</p>
                <p className="text-xs md:text-sm">
                  High-playback &
                  <br /> ultra-low distortion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-5 md:mx-16 justify-items-center sm:justify-start">
          {services?.map((i, j) => {
            return (
              <div
                key={j}
                className="flex flex-col gap-6 items-center justify-center"
              >
                <div>
                  <img src={i.image} alt="service" />
                </div>
                <div className="text-xs text-center sm:text-sm">
                  <h6 className="font-bold">{i.title}</h6>
                  <p className="text-slate-500">{i.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-white m-16 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 md:mx-16 justify-items-center py-8 gap-10 sm:justify-start divide-y">
            <div className="flex flex-row items-center justify-center shadow-2xl p-5 rounded-lg">
              <div className="text-xs sm:text-sm">
                <h6 className="font-bold">Computer & Laptops</h6>
                <p className="text-slate-500">8 Items</p>
              </div>
              <div>
                <img src="images/laptop.jpg" alt="service" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center shadow-2xl p-5 rounded-lg">
              <div className="text-xs sm:text-sm">
                <h6 className="font-bold">Camera & Vidio</h6>
                <p className="text-slate-500">8 Items</p>
              </div>
              <div>
                <img src="images/camera.jpg" alt="service" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center shadow-2xl p-5 rounded-lg">
              <div className="text-xs sm:text-sm">
                <h6 className="font-bold">Smart Televistion</h6>
                <p className="text-slate-500">8 Items</p>
              </div>
              <div>
                <img src="images/tv.jpg" alt="service" />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center shadow-2xl p-5 rounded-lg">
              <div className="text-xs sm:text-sm">
                <h6 className="font-bold">Computer & Laptops</h6>
                <p className="text-slate-500">8 Items</p>
              </div>
              <div>
                <img src="images/watch.jpg" alt="service" />
              </div>
            </div>
          </div>
        </div>

        {/* Our Featured Product */}
        <div className="py-5 px-4 mx-6 md:px-6 lg:px-8">
          <p className="text-2xl font-bold mb-6">Our Featured Product</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "featured") {
                  return (
                    <div
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
                          alt="products"
                        />
                        <div className="absolute grid grid-row gap-4 top-0 right-0 m-2 rounded-full px-2 text-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => addToWish(item?._id)}>
                            <MdOutlineFavoriteBorder size={20} />
                          </button>
                          <Link to={`/product/${item?._id}`}>
                            <FaRegEye size={20} />
                          </Link>
                        </div>
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          39% OFF
                        </span>
                      </div>

                      <div className="mt-4 px-5 pb-5">
                        <h6 className="text-orange-600">{item?.brand}</h6>
                        <h5 className="text-xs font-bold">{item?.title} </h5>
                        <div className="my-2">
                          <Rate defaultValue={item?.totalrating} disabled />
                        </div>
                        <p className="font-bold">Description</p>

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
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Brand */}
        <div className="mx-16">
          <Marquee className="rounded-lg">
            <div className="flex gap-10">
              <div className="w-25 h-25">
                <img src="images/brand-01.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-02.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-03.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-04.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-05.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-06.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img src="images/brand-07.png" alt="imageb1" />
              </div>
              <div className="w-25 h-25">
                <img
                  src="images/brand-08.png"
                  className="mr-10"
                  alt="imageb1"
                />
              </div>
            </div>
          </Marquee>
        </div>

        {/* Only Products Show */}
        <div className="font-[sans-serif]">
          <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl sm:max-w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all relative">
                <div className="absolute top-0 flex flex-col m-6">
                  <p className="text-slate-400 text-xs font-bold">
                    BIG SCREEN{" "}
                  </p>
                  <p className="text-white text-xl font-bold">
                    Smart Watch Series 7
                  </p>
                  <p className="text-slate-400 font-bold text-xs">
                    From $399 or $16.6/mo. for 24 mo.*
                  </p>
                </div>
                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                  <img
                    src="images\aaa.jpg"
                    alt="Products 1"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all relative">
                <div className="absolute top-0 flex flex-col m-5">
                  <p className=" text-gray-500 text-xs font-bold">
                    STUDIO DISPLAY{" "}
                  </p>
                  <p className="text-black text-xl font-bold">
                    600 nits of brightness.
                  </p>
                  <p className="text-gray-500 font-bold text-xs">
                    27-inch 5K Retina display
                  </p>
                </div>
                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                  <img
                    src="images\laptops.jpg"
                    alt="Product 3"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all relative">
                <div className="absolute top-0 flex flex-col m-6">
                  <p className="text-gray-500 text-xs font-bold">SMARTPHONE </p>
                  <p className="text-black text-xl font-bold">
                    Smart Phone 14 Pro.
                  </p>
                  <p className="text-gray-500 font-bold text-xs">
                    Now in Purpul. From $999.00 or $40.99 mo.Footnote
                  </p>
                </div>
                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                  <img
                    src="images\elegant-smartphone-composition.jpg"
                    alt="Product 3"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all relative">
                <div className="absolute top-0 flex flex-col m-6">
                  <p className="text-gray-500 text-xs font-bold">
                    HOME SPEAKERS{" "}
                  </p>
                  <p className="text-black text-xl font-bold">
                    Room filling Sound
                  </p>
                  <p className="text-gray-500 font-bold text-xs">
                    From $399 or $16.6/mo. for 24 mo.*
                  </p>
                </div>
                <div className="w-full aspect-w-16 aspect-h-8 lg:h-80">
                  <img
                    src="images\alexa.jpg"
                    alt="Product 3"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Populer Product */}
        <div className="py-5 px-4 mx-6 md:px-6 lg:px-8">
          <p className="text-2xl font-bold mb-6">Our Populer Product</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "popular") {
                  return (
                    <div
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
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          39% OFF
                        </span>
                      </div>
                      <div className="mt-4 px-5 pb-5">
                        <h6 className="text-orange-600">{item?.brand}</h6>
                        <h5 className="text-xs font-bold">{item?.title} </h5>
                        <div className="my-2">
                          <Rate defaultValue={item?.totalrating} disabled />
                        </div>
                        <p className="font-bold">Description</p>

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
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Blog Cart */}
        <div className="py-5 px-3 mx-6 md:px-6 lg:px-8">
          <p className="text-2xl font-bold mb-6">Our Latest Blogs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogState &&
              blogState.map((item, index) => {
                if (index < 4) {
                  return (
                    <div key={index} className="h-">
                      <BlogCart
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        image={item?.images && item.images[0]?.url}
                        date={moment(item?.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>

        {/* Our Special Blogs */}
        <div className="py-5 px-3 mx-6 md:px-6 lg:px-8">
          <p className="text-2xl font-bold mb-6">Our Special Blogs</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "special") {
                  return (
                    <SpecialCart
                      key={index}
                      id={item?._id}
                      image={item?.images && item.images[0]?.url}
                      brand={item?.brand}
                      price={item?.price}
                      title={item?.title}
                      totalrating={item?.totalrating}
                      sold={item?.sold}
                      quntity={item?.quantity}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
