"use client";

import { useEffect, useState } from "react";

type Props = {
  id: string;
  kind: "movie" | "series";
};

export default function FavoriteButton({ id, kind }: Props) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      const list = raw ? JSON.parse(raw) : [];
      setIsFav(list.some((f: { kind: string; id: string }) => f.kind === kind && f.id === id));
    } catch {
      setIsFav(false);
    }
  }, [id, kind]);

  const toggle = () => {
    try {
      const raw = localStorage.getItem("favorites");
      const list = raw ? JSON.parse(raw) : [];
      const exists = list.some((f: { kind: string; id: string }) => f.kind === kind && f.id === id);
      const next = exists
        ? list.filter((f: { kind: string; id: string }) => !(f.kind === kind && f.id === id))
        : [...list, { kind, id }];
      localStorage.setItem("favorites", JSON.stringify(next));
      setIsFav(!exists);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={toggle}
      className={`rounded-md px-4 py-2 text-sm font-medium transition ${
        isFav
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border border-zinc-300 text-black hover:bg-zinc-100"
      }`}
    >
      {isFav ? "♥ En favoritos" : "♡ Agregar a favoritos"}
    </button>
  );
}
