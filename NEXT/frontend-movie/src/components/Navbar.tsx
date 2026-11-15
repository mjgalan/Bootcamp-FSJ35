"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/movies", label: "Películas" },
  { href: "/series", label: "Series" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/search", label: "Buscar" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <span className="rounded bg-red-600 px-2 py-1 text-sm">FM</span>
          <span className="hidden sm:inline">Frontend Movie</span>
        </Link>

        <button
          className="rounded-md p-2 text-white sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <ul
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 top-full w-full flex-col gap-1 bg-zinc-950 px-4 py-3 sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-2 sm:bg-transparent sm:p-0`}
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-red-600 text-white"
                      : "text-zinc-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
