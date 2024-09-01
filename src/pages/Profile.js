import React from "react";
import Meta from "../components/Meta";
import BredCrum from "../components/BredCrum";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/users/userSlice";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getTokenFromLocalStorage } from "./utils/localStorageUtils";

const ProfileSchema = yup.object({
  firstname: yup.string().required("First name is reuire"),
  lastname: yup.string().required("Last name is reuire"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email Address require"),
  mobile: yup.string().required("Mobile number is reuire"),
});

const Profile = () => {
  const token = getTokenFromLocalStorage();
  const newToken = JSON.parse(token);

  const config2 = {
    headers: {
      Authorization: newToken ? `Bearer ${newToken}` : "",
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile({ data: values, config2: config2 }));
      setEdit(true);
    },
  });

  return (
    <>
      <Meta title={"Profile Page"} />
      <BredCrum title="Profile Page" />
      <form
        className="w-full max-w-lg mx-auto my-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex justify-center items-center my-6 text-2xl font-bold">
          <div>Update Profile</div>
          <FiEdit
            className="ml-5 hover:text-blue-600"
            onClick={() => setEdit(false)}
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              value={formik.values.firstname}
              onChange={formik.handleChange("firstname")}
              onBlur={formik.handleBlur("firstname")}
              disabled={edit}
            />
            <div className="text-red-500 text-xs  mt-1">
              {formik.touched.firstname && formik.errors.firstname}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="name"
              placeholder="Doe"
              value={formik.values.lastname}
              onChange={formik.handleChange("lastname")}
              onBlur={formik.handleBlur("lastname")}
              disabled={edit}
            />
            <div className="text-red-500 text-xs mt-1">
              {formik.touched.lastname && formik.errors.lastname}
            </div>{" "}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="email"
              placeholder="example@gamil.com"
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              disabled={edit}
            />
            <div className="text-red-500 text-xs mt-1">
              {formik.touched.email && formik.errors.email}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="mobile"
            >
              Mobile
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="mobile"
              type="number"
              placeholder="+91 0000000000"
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              onBlur={formik.handleBlur("mobile")}
              disabled={edit}
            />
            <div className="text-red-500 text-xs mt-1">
              {formik.touched.mobile && formik.errors.mobile}
            </div>
          </div>
        </div>
        {edit === false && (
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Profile
          </button>
        )}
      </form>
    </>
  );
};

export default Profile;
