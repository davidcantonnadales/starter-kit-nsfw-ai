"use client";

import { UserNav } from "@/components/navbar/user-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, Link } from "@radix-ui/themes";
import { User } from "firebase/auth";

import { FC, useState, useEffect, use } from "react";
import { useUser } from "reactfire";
import { useRole } from "../../components/auth/roleContext";

export const NavbarUserLinks: FC = () => {
  const { data, hasEmitted } = useUser();
  const { role } = useRole();

  return (
    <>
      {hasEmitted && data ? (
        <>
          {role !== null ? (
            <Button className="p-2 bg-pink-600 text-white rounded">
              {role}
            </Button>
          ) : (
            <Link href="/app/subscriptions">Subscriptions</Link>
          )}
          <UserNav />
        </>
      ) : (
        <>
          <Link href="/login">Login / Register &rarr;</Link>
        </>
      )}
    </>
  );
};
