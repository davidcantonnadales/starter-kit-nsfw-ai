"use client";

import { NavbarMobile } from "@/components/navbar/navbar-mobile";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useUser } from "reactfire"; // Importa el hook de autenticación si usas reactfire

export const NavBar: FC = () => {
  const { data: user } = useUser(); // Obtén el usuario autenticado

  return (
    <>
      <div className="animate-in fade-in w-full navbar-area">
        <nav className="container px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center">
                <Image
                  height={25}
                  width={128}
                  src="/assets/logo.png"
                  alt="Logo"
                />
              </div>
            </Link>
            <div className="hidden lg:flex justify-between grow">
              {!user ? (
                <div>
                  <Link
                    href="#how"
                    className={buttonVariants({ variant: "link" })}
                  >
                    How does it work?
                  </Link>
                  <Link
                    href="#why"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Why Us?
                  </Link>
                  <Link
                    href="#examples"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Examples
                  </Link>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Contact Form
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    href="/app"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/app/community-creations"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Creations
                  </Link>
                  <Link
                    href="/app/user-gallery"
                    className={buttonVariants({ variant: "link" })}
                  >
                    My Gallery
                  </Link>
                  <Link
                    href="/app/chat"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Chat
                  </Link>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Contact Form
                  </Link>
                </div>
              )}
              <div className="flex items-center space-x-4">
                <NavbarUserLinks />
              </div>
            </div>
            <div className="lg:hidden">
              <NavbarMobile />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
