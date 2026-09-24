import { ArrowUpRight, PlusIcon, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Input } from "./ui/input";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  return (
    <nav className="h-16 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-lg) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Menu */}
            <div className="relative hidden md:block">
            <Search className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
            <Input
              className="w-[280px] flex-1 rounded-full border-none bg-muted pl-10 shadow-none"
              placeholder="Search"
            />
          </div>
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <Button>
            Get Started <ArrowUpRight />
          </Button>
          <div className="border-s-[1.5px] border-primary ps-3">
 <Avatar className="">
      <AvatarFallback className="bor">
        <ShoppingCart/>
      </AvatarFallback>
      <AvatarBadge className="top-0 p-1.5 text-[10px]">
<span>2</span>
      </AvatarBadge>
    </Avatar>

          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
