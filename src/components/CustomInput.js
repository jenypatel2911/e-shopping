import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    className,
    required,
    id,
    value,
    onChange,
    onBlur,
  } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default CustomInput;
