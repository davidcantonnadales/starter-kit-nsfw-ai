"use client";

import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";
import { useUser } from "reactfire";
import { UserNavMobile } from "./user-nav-mobile";

export const NavbarMobile = () => {
  const { data: user } = useUser();

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="-mr-4">
              <MenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col p-1">
              {!user ? (
                <>
                  {" "}
                  <NavigationMenuLink
                    href="#how"
                    className={buttonVariants({ variant: "link" })}
                  >
                    How does it work?
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="#why"
                    className={buttonVariants({ variant: "link" })}
                  >
                    ¿Why Us?
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="#examples"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Examples
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/contact"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Contact Form
                  </NavigationMenuLink>
                  <div className="flex flex-col mb-0.5">
                    <NavbarUserLinks />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <NavigationMenuLink
                    href="/app"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Dashboard
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/app/community-creations"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Creations
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/app/user-gallery"
                    className={buttonVariants({ variant: "link" })}
                  >
                    My Gallery
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/app/chat"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Community Chat
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    href="/contact"
                    className={buttonVariants({ variant: "link" })}
                  >
                    Contact Form
                  </NavigationMenuLink>
                  <UserNavMobile />
                </>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
