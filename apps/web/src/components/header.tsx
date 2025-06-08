"use client";
import Link from "next/link";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function Header() {

  const route = useRouter()

  const links = [
    { to: "/", label: "Página inicial" },
    {to: "/selo", label: "Selo"},
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-8 py-3">
        <nav className="flex gap-8 items-center justify-center mx-auto">
          {links.map(({ to, label }) => {
            return (
              <Link className="hover:underline" key={to} href={to}>
                {label}
              </Link>
              
            );
          })}
        <Button className="ml-4 flex items-center justify-center gap-2" onClick={() => route.push("/rastreabilidade")}>
              <Search />
            Rastreabilidade
          </Button>
        </nav>
      </div>
      <hr />
    </div>
  );
}
