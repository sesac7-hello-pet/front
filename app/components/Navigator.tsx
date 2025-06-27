import Link from "next/link";
import React from "react";

export default function Navigator() {
  return (
    <nav className="flex justify-between items-center border-b border-black-500 p-4">
      <Link href="/" className="text-lg font-semibold">
        Home
      </Link>

      <div>
        <Link
          href="/auth/login"
          className="px-4 py-2 border border-gray-300 rounded text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
