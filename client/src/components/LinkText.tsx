import React from "react";
import { Link } from "react-router-dom";

interface LinkTextProps {
  linkUrl: string;
  linkText: string;
  linkLabel: string;
}

const LinkText: React.FC<LinkTextProps> = ({
  linkUrl,
  linkText,
  linkLabel,
}) => {
  return (
    <p className="mt-10 text-center text-sm text-gray-500">
      {linkLabel}{" "}
      <Link
        to={linkUrl}
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default LinkText;
