import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const blogAState = useSelector((state) => state?.blog?.singlBlog);
  const location = useLocation();
  console.log(blogAState);
  const getBlogId = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  useEffect(() => {
    getAblog();
  }, [getABlog]);

  const getAblog = () => {
    dispatch(getABlog(getBlogId));
  };
  return (
    <>
      <Meta title={blogAState?.title} />
      <BredCrum title={blogAState?.title} />
      <div className="bg-gray-200">
        <section className="flex flex-row m-16 my-3">
          {/* <div className="basis-3/12 flex flex-col gap-3">
            <div className="bg-white rounded-lg my-3">
              <div className="m-3">
                <h3 className="font-bold">Shop By Categories</h3>
                <div className="flex-col ml-2 mt-2 text-slate-600">
                  <div>Home</div>
                  <div>Our Store</div>
                  <div>Blog</div>
                  <div>Contect</div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="basis-9/12 mx-2 my-3">
            <div className="flex text-slate-500">
              <IoIosArrowRoundBack size={24} />
              <Link to={"/blog"}>Go back to Blog</Link>
            </div>
            <h2 className="font-bold text-xl mt-2">{blogAState?.title}</h2>
            <div className="mt-3">
              <img
                src={blogAState?.images && blogAState.images[0]?.url}
                className="rounded-t-xl h-[50%] w-[70%]"
                alt="blogs"
              />
              <p
                dangerouslySetInnerHTML={{ __html: blogAState?.description }}
              ></p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SingleBlog;
