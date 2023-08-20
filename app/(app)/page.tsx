import { LoginButton, LogoutButton, ProfileButton, RegisterButton } from "@/components/shared/auth-button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
        <p>{JSON.stringify(session)}</p>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
    </>
  );
}
