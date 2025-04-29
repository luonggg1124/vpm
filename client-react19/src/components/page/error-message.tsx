import React from "react";
interface Props extends React.ComponentProps<"p"> {
  label?: string;
}
const ErrorMessage = ({ className, label, ...props }: Props) => {
  return (
    <p className={`text-sm px-1 md:text-md font-thin text-red-600  ${className}`} {...props}>
      {label}
    </p>
  );
};
export default ErrorMessage;
