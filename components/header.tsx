import { Calendar } from "lucide-react";
import { auth } from "@/auth";
import { SignOut } from "@/src/components/signout-button";
import { SignIn } from "@/src/components/signin-button";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <>
      <header className="bg-background border-b" role="banner">
        <nav className="container mx-auto px-4 py-3" role="navigation">
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className="flex items-center space-x-4 justify-center"
            >
              <Calendar className="h-6 w-6" aria-hidden="true" />
              <span className="text-lg font-bold">Inicio</span>
            </Link>

            <div className="flex justify-end">
              {session ? <SignOut /> : <SignIn />}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
