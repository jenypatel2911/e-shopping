import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { VscGitCompare } from "react-icons/vsc";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaOpencart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAProduct } from "../features/product/productSlice";
import { CiSearch } from "react-icons/ci";
import { getTokenFromLocalStorage } from "../pages/utils/localStorageUtils";
import { getUserCart } from "../features/users/userSlice";

const Headers = ({ setSelectedSection }) => {
  const dispatch = useDispatch();
  const userCartState = useSelector((state) => state.auth.cartProducts);
  const productState = useSelector((state) => state?.product?.product);
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const token = getTokenFromLocalStorage();
  const newToken = JSON.parse(token);

  const config2 = {
    headers: {
      Authorization: newToken ? `Bearer ${newToken}` : "",
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, [dispatch]);

  const [productOpt, setProductOpt] = useState([]);
  const total = userCartState
    ? userCartState.reduce((acc, item) => {
        return (
          acc + (item.productId ? item.productId.price * item.quantity : 0)
        );
      }, 0)
    : 0;

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  return (
    <>
      <header className="header-top bg-slate-900 py-1 border-b border-slate-700">
        <div className="container text-white">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <p className="text-sm md:text-base md:ml-20 md:mr-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-2 md:mt-0">
              <p className="text-sm md:text-base md:mr-20">
                Hotline:
                <a href="ref:+91 7046676078">+91 7046676078</a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-middle bg-slate-900">
        <div className=" mx-auto px-4 py-1 bg-slate-900 mr-8">
          <div className="lg:flex md:flex justify-between items-center ">
            <div className="md:flex lg:flex grid items-center md:ml-16">
              <h2 className="text-white text-lg md:text-xl text-center mr-4">
                <Link to="/" className="text-white hover:text-gray-300">
                  Dev Corner
                </Link>
              </h2>
              <div className="flex items-center relative">
                <Typeahead
                  id="menu-align-example"
                  labelKey="name"
                  options={productOpt}
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  minLength={2}
                  placeholder="Search"
                  className="w-full pr-1"
                />
                <div className="absolute right-0 bg-orange-300 ">
                  <CiSearch color="white" size={24} />
                </div>
              </div>
            </div>

            <div className="md:flex lg:flex grid lg:mr-6 md:mr-6 items-center">
              <Link
                to={"/compare-product"}
                className="flex justify-center lg:w-24 lg:mx-3 my-2"
              >
                <div className="flex justify-center items-center text-center">
                  <VscGitCompare size={25} color="white" />
                </div>
                <span className="text-white ml-2">Compare Products</span>
              </Link>
              <Link
                to={"/wishlist"}
                className="flex justify-center lg:w-24 lg:mx-3 my-2"
              >
                <div className="flex justify-center items-center text-center">
                  <MdFavoriteBorder size={25} color="white" />
                </div>
                <span className="text-white ml-2">Favourite Wishlist</span>
              </Link>
              <Link
                to={authState?.user === null ? "/login" : "/profile"}
                className="flex justify-center lg:w-28 lg:mx-3 my-2"
              >
                {" "}
                <div className="flex justify-center items-center text-center">
                  <FaRegUserCircle size={25} color="white" />
                </div>
                {authState?.user === null ? (
                  <span className="text-white ml-2">Login My Account</span>
                ) : (
                  <span className="text-white ml-2">
                    welcome {authState?.user?.firstname}
                  </span>
                )}
              </Link>
              <Link to={"/cart"} className="flex justify-center lg:w-20 my-2 ">
                <div className=" flex justify-center items-center text-center">
                  <FaOpencart size={25} color="orange" />
                </div>

                <div className="md:grid lg:grid flex justify-center ml-3">
                  <div className="flex justify-center">
                    <span className="bg-white rounded-lg w-4  text-center items-center flex justify-center text-black">
                      {userCartState ? userCartState.length : 0}
                    </span>
                  </div>
                  <p className="text-white">Rs.{total}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <header className="header-top bg-slate-600 py-1 border-y border-slate-700">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* SHOP CATEGORIES Menu */}
            <div className="mb-4 md:mb-0 ml-16 md:ml-0 z-10">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center ml-16 gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    SHOP CATEGORIES
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item key="featured">
                        {({ active }) => (
                          <Link
                            to="/"
                            onClick={() => setSelectedSection("featured")}
                            className={
                              (active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700") + " block px-4 py-2 text-sm"
                            }
                          >
                            Our Featured Product
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            onClick={() => setSelectedSection("popular")}
                            className={
                              (active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700") + " block px-4 py-2 text-sm"
                            }
                          >
                            Our Populer Product
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            onClick={() => setSelectedSection("special")}
                            className={
                              (active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700") + " block px-4 py-2 text-sm"
                            }
                          >
                            Our Special Blogs
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            {/* Navigation Links */}
            <div className="text-white flex flex-row gap-5 text-center items-center mr-16">
              <Link to={"/"}>HOME</Link>
              <Link to={"/product"}>OUR STORAGE</Link>
              <Link to={"/blog"}>BLOGS</Link>
              <Link to={"/contact"}>CONTACT</Link>
              <Link to={"/orders"}>MY ORDERS</Link>

              <button onClick={handleLogout}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Headers;
