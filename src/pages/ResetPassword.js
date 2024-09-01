import React from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { resetAPassword } from "../features/users/userSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is reuire"),
});

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getToken = location.pathname.split("/")[2];
  console.log(getToken);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetAPassword({ token: getToken, password: values.password }));
      navigate("/login");
    },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BredCrum title="Reset Password" />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-5 md:mb-5 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1 className="text-lg text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Your Password
            </h1>
            <p className="text-xs text-center my-2 text-slate-400">
              We Will send you an email to reset your password
            </p>
            <form
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <CustomInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required="password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="text-red-500 text-xs mt-1">
                  {formik.touched.password && formik.errors.password}
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset passwod
              </button>
              <div className="text-center mt-4">
                <Link
                  to={"/login"}
                  type="submit"
                  className=" font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
