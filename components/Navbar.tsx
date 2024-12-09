import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import GitHub from "next-auth/providers/github";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logoSvg.png" alt="logo" width={144} height={28}></Image>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="max-sm:hidden">
                  Logout
                </button>
                <LogOut className="size-6 sm:hidden text-red-500" />
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar>
                  <AvatarImage
                    className="size-10 rounded-full"
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login with Github</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
