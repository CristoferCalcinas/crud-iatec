"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="inline-flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleSignIn}
      disabled={isLoading}
    >
      <FaGithub className="h-5 w-5" />
      {isLoading ? "Conectando..." : "Iniciar sesión con GitHub"}
    </button>
  );
}
