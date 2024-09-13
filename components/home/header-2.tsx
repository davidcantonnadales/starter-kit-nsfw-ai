"use client";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../ui/navigation-option";
import NavigationOption from "../ui/navigation-option";
import useSticky from "../hooks/useSticky";
import Find from "../ui/find";
import { NavBar } from "@/components/navbar/navbar";
import { NavbarUserLinks } from "../navbar/navbar-user-links";
import { NavbarMobile } from "../navbar/navbar-mobile";
import { buttonVariants } from "../ui/button";
import { GalleryThumbnailsIcon } from "lucide-react";
import { useUser } from "reactfire";

export default function Header2() {
  const isFixed = useSticky(120);
  const { data: user } = useUser();

  return (
    <>
      <div className="header-wrapper is-sticky">
        <div className="navbar-area">
          <div className="main-nav">
            <div className="container-fluid">
              <div className="logo grid gap-4 mb-6">
                <Link href="/" className="navbar-brand">
                  <div className="flex items-center">
                    <Image
                      height={25}
                      width={256}
                      src="/assets/logo.png"
                      alt="Logo"
                    />
                  </div>
                </Link>
              </div>
              <button
                className="btn side-menu d-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <Image
                  height={25}
                  width={25}
                  src="/assets/image/icons/humberg-menu.svg"
                  alt="Menu"
                />
              </button>
              <div className="w-full">
                <nav className="container px-6 md:px-8 py-4">
                  <div className="flex items-center justify-between">
                    <div className="hidden md:flex justify-between grow">
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
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <NavbarUserLinks />
                      </div>
                    </div>
                    <div className="md:hidden flex justify-end">
                      <NavbarMobile />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* find start */}
      <Find />
      {/* find end */}
    </>
  );
}
