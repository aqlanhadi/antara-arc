"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import AntaraIcon from "@/public/icon.png";
import { Button } from "@/components/ui/button"

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      {/* <SignInModal /> */}
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <div className="flex gap-6 items-center">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src={AntaraIcon}
                alt="Precedent logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
            </Link>
            <Link href="/search">About</Link>
            <Link href="/search">Catalog</Link>
          </div>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <Link href='/login'>
                <Button variant='rounded'>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
