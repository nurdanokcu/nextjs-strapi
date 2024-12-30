"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  path: string;
  text: string;
}

export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === props.path;

  return (
    <Link
      className={active ? "opacity-100" : "opacity-50 hover:opacity-65"}
      href={props.path}
    >
      {props.text}
    </Link>
  );
}
