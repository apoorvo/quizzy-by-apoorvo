import React from "react";

import PropTypes from "prop-types";

const Button = ({
  type = "button",
  buttonText,
  onClick = () => {},
  loading = false,
  icon
}) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        onClick={onClick}
        className="relative flex justify-center space-x-5 w-full px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-blue-500 border border-transparent rounded-md
         group hover:bg-opacity-90 focus:outline-none"
      >
        {icon && <i className={icon}></i>}
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
};
export default Button;
