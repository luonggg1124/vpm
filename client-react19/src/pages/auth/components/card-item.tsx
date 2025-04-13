import ErrorMessage from "@/components/page/error-message";
import { Label } from "@/components/ui/label";
import { JSX } from "react";

interface Props extends React.ComponentProps<"div"> {
  label?: string;
  error?: string;
  children: JSX.Element;
  className?: string;
}
const CardItem = ({ label, error, children, className, ...props }: Props) => {
  return (
    <div className={`w-full p-2 flex flex-col gap-1  ${className}`} {...props}>
      <Label className="font-semibold px-1">{label}</Label>
      {children}
      <ErrorMessage className="px-1" label={error} />
    </div>
  );
};

export default CardItem;
