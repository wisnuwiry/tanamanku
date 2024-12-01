import Link from "next/link";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <nav className="sticky top-0 inset-x-0 bg-background z-40">
      <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-x-3">
          <div>
            <Link className="relative size-10" href="/">
              <Image src="/logo.png" width={40} height={40} className="object-contain" alt="Tanamanku Logo" />
            </Link>
          </div>

          <ThemeSwitcher/>
        </div>
      </div>
    </nav>
  );
}
