"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { foods, travelMenuItems } from "@/config/navbar";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-1 space-x-0 rtl:space-x-reverse text-sm">

      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/products">Products</Link>
        </Button>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/categories">Categories</Link>
        </Button>
      </NavigationMenuItem>
       <NavigationMenuItem>
        <Button asChild variant="ghost">
          <Link href="/brands">Brands</Link>
        </Button>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "select-none flex-col items-start rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          <props.icon className="mb-3 size-6" />
          <div className="font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
