import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" flex justify-center h-screen items-center bg-gray-200">
      <SignIn afterSignOutUrl="/" />;
    </div>
  );
}
