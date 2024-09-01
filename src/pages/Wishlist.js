import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/users/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import { Empty } from "antd";

const Wishlist = () => {
  const wishlistState = useSelector((state) =>
    state.auth.wishlist ? state.auth.wishlist.wishlist : []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getwishlistFromDB();
  }, [getUserProductWishlist]);

  const getwishlistFromDB = () => {
    dispatch(getUserProductWishlist());
  };
  const removeToWishliste = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };
  return (
    <>
      <Meta title={"Wishlist"} />
      <BredCrum title="Wishlist" />
      {wishlistState?.length === 0 && (
        <div className="mt-16">
          <Empty/>
        </div>
      )}
      <div className="bg-slate-200">
        <div className="grid grid-cols-5 gap-4 m-16">
          {wishlistState &&
            wishlistState?.map((item, index) => {
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
                    <button>
                      <span className="absolute top-0 right-0 m-2 rounded-full px-2 text-center text-sm font-medium text-white">
                        <CloseOutlined
                          onClick={() => {
                            removeToWishliste(item?._id);
                          }}
                        />
                      </span>
                    </button>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <h6 className="font-bold">{item?.title}</h6>
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                    ></p>
                    <p className="font-bold">Rs.{item?.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
