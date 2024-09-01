import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/users/userSlice";

const registerSchema = yup.object({
  firstname: yup.string().required("First name is reuire"),
  lastname: yup.string().required("Last name is reuire"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email Address require"),
  mobile: yup.string().required("Mobile number is reuire"),
  password: yup.string().required("Password is reuire"),
});

const Rgister = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(authState);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if (authState.createdUser !== null && authState.isError === false) {
      navigate("/login");
    }
  });

  return (
    <>
      <Meta title={"Register"} />
      <BredCrum title="Register" />
      <section className="bg-gray-50  dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-5 md:mb-5 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-lg mt-2 text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action=""
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="fname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <CustomInput
                    type="name"
                    name="fname"
                    id="fname"
                    placeholder="Enter your first name"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="text-red-500 text-xs  mt-1">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <CustomInput
                    type="name"
                    name="lname"
                    id="lname"
                    placeholder="Enter your last name"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <CustomInput
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile No.
                  </label>
                  <CustomInput
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <CustomInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                  />
                  <div className="text-red-500 text-xs mt-1">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <CustomInput
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the
                      <Link
                        to={""}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rgister;
