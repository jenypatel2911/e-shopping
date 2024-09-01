import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ProductCart from "../components/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";

const OurStore = () => {
  const productState = useSelector((state) => state.product.product);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //filter
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [target, setTarget] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let newCategories = [];
    let newTags = [];

    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      newCategories.push(element.category);
      newTags.push(element.tags);
    }

    setBrands(newBrands);
    setCategories(newCategories);
    setTags(newTags);
  }, [productState]);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, [sort, target, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, target, brand, category, minPrice, maxPrice })
    );
  };

  return (
    <>
      <Meta title={"Out Store"} />
      <BredCrum title="Our Storage" />
      <div className="bg-gray-200">
        <section className="flex flex-col lg:flex-row lg:justify-center lg:mx-16 my-3">
          {/* Sidebar */}
          <div className="basis-3/12 lg:w-1/4 flex flex-col gap-3 my-3">
            <div className="bg-white rounded-lg">
              <div className="m-3">
                <h3 className="font-bold">Store By Categories</h3>
                <div className="flex-col ml-2 mt-2 text-slate-600">
                  {categories &&
                    [...new Set(categories)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg">
              <div className="m-3">
                <h3 className="font-bold mb-4">Filter By Price</h3>
                <div className="ml-2">
                  <div className="Filter">
                    <div className="flex gap-2">
                      <div className="mb-5">
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="From"
                          style={{ width: "100px" }}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="To"
                          style={{ width: "100px" }}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Product tag bg-white rounded-lg">
              <div className="m-3">
                <div className="font-bold mb-4">Product Brands</div>
                <div className="grid grid-cols-3">
                  {brands &&
                    [...new Set(brands)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => setBrand(item)}
                          className="bg-gray-50 border border-gray-300 rounded-md text-center text-slate-500 text-xs py-1 me-2 mb-2"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="Product tag bg-white rounded-lg">
              <div className="m-3">
                <div className="font-bold mb-4">Product Tags</div>
                <div className="grid grid-cols-3">
                  {tags &&
                    [...new Set(tags)].map((item, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => setTarget(item)}
                          className="bg-gray-50 border border-gray-300 rounded-md text-center text-slate-500 text-xs py-1 me-2 mb-2"
                        >
                          {item}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="basis-9/12 mx-2 my-3">
            <div className="bg-white rounded-lg p-2">
              <div className="flex flex-row text-right items-center gap-2">
                <div className="flex flex-row gap-2">
                  <p className="font-bold mt-1">Sort By:</p>
                  <div>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Best Selling
                          <ChevronDownIcon
                            className="-mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        onChange={(e)=>setSort(e.target.value)}>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                value={"title"}
                                  className={
                                    (active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700") +
                                    " block px-4 py-2 text-sm"
                                  }
                                >
                                  Alphabetically, A-Z
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                value={"-title"}

                                  className={
                                    (active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700") +
                                    " block px-4 py-2 text-sm"
                                  }
                                >
                                  Alphabetically, Z-A
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={
                                    (active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700") +
                                    " block px-4 py-2 text-sm"
                                  }
                                >
                                  Price low to high
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  className={
                                    (active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700") +
                                    " block px-4 py-2 text-sm"
                                  }
                                >
                                  Price high to low
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="hidden md:flex flex-row gap-2 ml-auto">
                  <div className="rounded bg-slate-300 hover:bg-slate-700 p-2 cursor-pointer">
                    <img src="images/gr.svg" className="h-5 w-5" alt="Grid 4" />
                  </div>
                  <div className="rounded bg-slate-300 hover:bg-slate-700 p-2 cursor-pointer">
                    <img
                      src="images/gr2.svg"
                      className="h-5 w-5"
                      alt="Grid 3"
                    />
                  </div>
                  <div className="rounded bg-slate-300 hover:bg-slate-700 p-2 cursor-pointer">
                    <img
                      src="images/gr3.svg"
                      className="h-5 w-5"
                      alt="Grid 2"
                    />
                  </div>
                  <div className="rounded bg-slate-300 hover:bg-slate-700 p-2 cursor-pointer">
                    <img
                      src="images/gr4.svg"
                      className="h-5 w-5"
                      alt="Grid 1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className={`grid grid-cols-3 gap-4`}>
              <ProductCart data={productState} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OurStore;
