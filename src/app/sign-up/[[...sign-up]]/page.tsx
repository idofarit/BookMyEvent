import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center bg-gray-200 items-center h-screen">
      <SignUp afterSignOutUrl="/" />;
    </div>
  );
}
