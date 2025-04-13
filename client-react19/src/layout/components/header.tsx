import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { AlignJustify } from "lucide-react";
import useAuth from "@/api/hook/useAuth";
import LoadingPage from "@/components/page/loading-page";

const Header: React.FC = () => {
  const { logout, loading } = useAuth();
  return (
    <header className="w-full flex h-10 shadow items-center justify-between px-4 mb-1">
      {loading.logout && <LoadingPage />}
      <div className="flex items-center gap-4">
        <button className="cursor-pointer">
          <AlignJustify />
        </button>
        <div className="font-serif">vPM</div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="outline-none cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => logout()}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
export default Header;
