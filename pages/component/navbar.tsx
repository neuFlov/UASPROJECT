import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            Beranda
          </Link>
        </li>
        <li>
          <Link href="/turnamen">
            Daftar
          </Link>
        </li>
        <li>
          <Link href="/daftar_tim">
            Tim
          </Link>
        </li>
        <li>
          <Link href="/kontak">
            Kontak
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
