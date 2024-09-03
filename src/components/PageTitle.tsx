"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function PageTitle({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex gap-12 items-center ">
      <Button
        // isIconOnly
        size="md"
        variant="light"
        className=" font-bold text-primary-btn tracking-widest"
        onClick={() => router.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="15px"
          height="25px"
        >
          <path d="M12 13V20L4 12L12 4V11H20V13H12Z"></path>
        </svg>
        back
      </Button>
      <span className="text-xl font-semibold text-gray-500">{title}</span>
    </div>
  );
}
export default PageTitle;
