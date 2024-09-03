import { handleNewUserRegistration } from "@/actions/users";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await handleNewUserRegistration();

  return (
    <div>
      <h1>BookMyEvent</h1>
    </div>
  );
}
