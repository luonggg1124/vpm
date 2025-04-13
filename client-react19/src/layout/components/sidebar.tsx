import { Building2, ChartColumn, FileCheck2, House, Users } from "lucide-react";
import React, { JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ItemSidebarProps = {
  icon?: JSX.Element;
  label: string;
  href: string;
  type: "link" | "collapse";
  children?: ItemSidebarProps[];
};
const listItem: ItemSidebarProps[] = [
  {
    icon: <House size={20} />,
    label: "Tổng quan",
    href: "/dashboard",
    type: "link",
  },
  {
    icon: <FileCheck2 size={20} />,
    label: "Quản lý dự án",
    href: "/projects",
    type: "collapse",
    children: [
      {
        label: "Dự án",
        type: "link",
        href: "/projects",
      },
      {
        label: "Phê duyệt",
        type: "link",
        href: "/projects/approve",
      },
    ],
  },
  {
    icon: <Building2 size={20} />,
    label: "Nhân sự",
    href: "/personnel",
    type: "link",
  },
  {
    icon: <ChartColumn size={20} />,
    label: "Khai báo",
    href: "/declare",
    type: "link",
  },
  {
    icon: <Users size={20} />,
    label: "Tài khoản",
    href: "/account",
    type: "link",
  },
];
const Item: React.FC<ItemSidebarProps> = ({
  icon,
  label,
  href,
  children,
  type,
  ...props
}) => {
  const pathname = useLocation().pathname;

  if (type === "collapse") {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`${
              pathname.startsWith(href) ? "bg-[#98DDC9]" : "hover:bg-[#98DDC9]"
            } py-3 rounded-l-none rounded-r-4xl cursor-pointer`}
          >
            <div className="flex items-center gap-2 rounded-lg   w-full ">
              <div className="ml-6">{icon}</div> <p>{label}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col items-center mt-2 w-full">
              {children?.map((item, index) => (
                <Link
                  className={`${
                    pathname === item.href
                      ? "text-[#98DDC9] bg-gray-100 font-medium opacity-50"
                      : "hover:text-[#98DDC9]  hover:bg-slate-50"
                  } w-full text-center  py-3 rounded-r-3xl`}
                  key={index}
                  to={item.href as string}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
  return (
    <Link
      to={href}
      className={`flex items-center gap-2 py-3 rounded-r-4xl text-left text-sm font-medium transition-all outline-none ${
        pathname === href
          ? "bg-[#98DDC9]  font-medium"
          : "hover:font-medium hover:bg-[#98DDC9]"
      }`}
      {...props}
    >
      <div className="ml-6">{icon}</div> <p>{label}</p>
    </Link>
  );
};
type SidebarProps = {
  className?: string;
};
const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <nav {...props} className={`h-screen flex flex-col gap-2 ${className}`}>
      {listItem.map((item, index) => (
        <Item
          icon={item.icon}
          label={item.label}
          children={item.children}
          type={item.type}
          key={index}
          href={item.href}
        />
      ))}
    </nav>
  );
};
export default Sidebar;
