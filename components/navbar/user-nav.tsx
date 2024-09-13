"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";
import Link from "next/link";
import { useRole } from "../auth/roleContext";

export function UserNav() {
  const { data } = useUser();
  const { role } = useRole();
  const router = useRouter();
  const doLogout = async () => {
    await signOut(getAuth());
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
    router.replace("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data?.photoURL || "/avatars/04.png"}
              alt="@shadcn"
            />
            <AvatarFallback>
              {data?.displayName?.slice(0, 2) || data?.email?.slice(0, 2) || ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {data?.displayName ||
                data?.email?.slice(0, data?.email?.indexOf("@")) ||
                "Anonymous"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {data?.email || "No email"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/app">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>

          {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}

          {/* {role != null ? (
            <Link
              href="https://billing.stripe.com/p/login/bIYcNXcf28bj9dC144"
              target="_blank"
            >
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
          ) : (
            <Link href="/app/subscriptions">
              <DropdownMenuItem>Subscribe now</DropdownMenuItem>
            </Link>
          )} */}

          {/* <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={doLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
