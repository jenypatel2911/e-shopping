import React from "react";
import { Link } from "react-router-dom";

const BlogCart = (props) => {
  const { id, title, description, date, image } = props;
  return (
    <section className="bg-white  rounded-lg">
      <div>
        <img
          src={image ? image : "images/blog-1.jpg"}
          className="rounded-t-lg w-[100%] h-72"
          alt="blogs"
        />
      </div>
      <div className="p-4 lg:p-6 transition-all duration-300">
        <span className="text-black block mb-2">{date}</span>
        <h4 className="text-base font-bold mb-2">{title}</h4>
        <h4 className="text-xs text-slate-500 mb-5">
          {typeof description === "string" && description.length > 70 ? (
            <span
              dangerouslySetInnerHTML={{
                __html: description.substr(0, 86) + "...",
              }}
            />
          ) : (
            <span
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></span>
          )}
        </h4>

        <Link to={"/Blog/" + id}>
          <button
            type="button"
            className="bg-slate-500 hover:bg-slate-900 text-white px-4 py-1 rounded-2xl focus:outline-none"
          >
            Read more
          </button>
        </Link>
      </div>
    </section>
  );
};

export default BlogCart;
