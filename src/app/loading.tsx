"use client";

import { Spinner } from "@nextui-org/react";

function loading() {
  return (
    <div className="backdrop-blur-sm flex justify-center h-screen">
      <Spinner size="lg" />
    </div>
  );
}
export default loading;
