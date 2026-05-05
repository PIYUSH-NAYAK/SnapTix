"use client";
import { usePathname } from "next/navigation";
import Footer from "../app/mycomp/home/Footer";

const HIDE_FOOTER_PATHS = ["/ai-assistant"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  if (HIDE_FOOTER_PATHS.includes(pathname)) return null;
  return <Footer />;
}
