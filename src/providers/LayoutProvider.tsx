"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const menusForAdmin = [
    { title: "Home", path: "/" },
    { title: "Events", path: "/admin/events" },
    { title: "Bookings", path: "/admin/bookings" },
    { title: "Users", path: "/admin/users" },
    { title: "Reports", path: "/admin/reports" },
  ];

  const menusForUser = [
    { title: "Home", path: "/" },
    { title: "Bookings", path: "/bookings" },
  ];

  const [menusToShow, setMenusToShow] = React.useState<any[]>([]);

  const pathName = usePathname();

  const isPrivateRoute = !["/sign-in", "/sign-up"].includes(pathName);

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/current-user");
      if (response.data.user.isAdmin) setMenusToShow(menusForAdmin);
      else setMenusToShow(menusForUser);
      console.log(response.data);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPrivateRoute) getUserData();
  }, []);

  return (
    <div className="absolute inset-0 -z-10 w-full overflow-hidden overflow-y-scroll no-scrollbar bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff81_40%,#63e_100%)]">
      {isPrivateRoute && (
        <div className=" flex justify-between items-center p-8">
          <div
            className="main-div cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span>Book</span>
            <span>My</span>
            <span>Events</span>
          </div>
          <div className="flex gap-5 items-center">
            <Dropdown size="sm">
              <DropdownTrigger>
                <Button
                  radius="full"
                  className="bg-gradient-to-tr from-violet-500 to-blue-300 text-white shadow-lg"
                >
                  Profile
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {menusToShow.map((item) => (
                  <DropdownItem
                    key={item.title}
                    onClick={() => router.push(item.path)}
                  >
                    {item.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <UserButton />
          </div>
        </div>
      )}
      <div className="p-12">{children}</div>
    </div>
  );
}
export default LayoutProvider;
