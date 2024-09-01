import React from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";

const TremAndCondition = () => {
  return (
    <>
      <div className="bg-gray-200">
        <Meta title={"Terms And Condition"} />
        <BredCrum title="Terms And Condition" />{" "}
        <section className="bg-white dark:bg-gray-900 rounded-lg m-16 my-2">
          <div className="container px-6 py-12 mx-auto">
            <div className="lg:flex lg:items-center lg:-mx-6"></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TremAndCondition;
