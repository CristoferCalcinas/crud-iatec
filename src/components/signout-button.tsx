"use client";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export function SignOut() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="inline-flex items-center gap-x-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <FaSignOutAlt className="h-4 w-4" />
      {isLoading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
