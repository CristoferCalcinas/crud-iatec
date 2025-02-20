import Image from "next/image";
import { SignIn } from "../components/signin-button";
import { auth } from "@/auth";
import { SignOut } from "../components/signout-button";

export default async function Home() {
  const session = await auth();
  console.log({ session });

  return (
    <section>
      <div></div>
      <div></div>
    </section>
  );
}
