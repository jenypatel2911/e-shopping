import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import BlogCart from "../components/BlogCart";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";
import moment from "moment";

const Blog = () => {
  const blogState = useSelector((state) => state?.blog?.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    getblog();
  }, [getAllBlogs]);

  const getblog = () => {
    dispatch(getAllBlogs());
  };

  return (
    <>
      <Meta title={"Blogs"} />
      <BredCrum title="Blogs" />

      <div className="bg-gray-200">
        <section className="flex flex-row m-16 my-3">
          <div className="basis-3/12 flex flex-col gap-3">
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
          </div>

          <div className="grid grid-cols-2 gap-4 mx-2 my-3">
            {blogState &&
              blogState.map((item, index) => {
                return (
                  <div key={index}>
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
              })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
