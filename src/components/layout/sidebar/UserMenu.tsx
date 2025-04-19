
import { LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  expanded: boolean;
}

export function UserMenu({ expanded }: UserMenuProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  // Get user avatar_url and full_name with fallbacks
  const avatarUrl = user?.avatar_url || "";
  const fullName = user?.full_name || "User";
  const userInitial = fullName?.charAt(0) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`group relative flex h-14 w-full items-center ${expanded ? "justify-start px-3" : "justify-center px-3"} transition-all hover:bg-primary/10 hover:text-primary`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          {expanded && <span className="ml-3 truncate">{fullName}</span>}
          {!expanded && <span className="sr-only">{fullName}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-36">
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
