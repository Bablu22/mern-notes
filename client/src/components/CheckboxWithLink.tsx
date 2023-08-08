import React from "react";

interface CheckboxWithLinkProps {
  checkboxId: string;
  checkboxLabel: string;
  linkText: string;
  linkUrl: string;
}

const CheckboxWithLink: React.FC<CheckboxWithLinkProps> = ({
  checkboxId,
  checkboxLabel,
  linkText,
  linkUrl,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id={checkboxId}
          name={checkboxId}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label
          htmlFor={checkboxId}
          className="ml-3 block text-sm leading-6 text-gray-900"
        >
          {checkboxLabel}
        </label>
      </div>

      <div className="text-sm leading-6">
        <a
          href={linkUrl}
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default CheckboxWithLink;
