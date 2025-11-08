import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import NotificationBell from "./NotificationBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const location = useLocation();
  const { user, profile, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const leftLinks = [
    { to: "/", label: "INICIO" },
    { to: "/nosotros", label: "NOSOTROS" },
    { to: "/servicios", label: "SERVICIOS" },
  ];

  const rightLinks = [
    { to: "/galeria", label: "GALERÍA" },
    { to: "/clientes", label: "CLIENTES" },
    user
      ? isAdmin
        ? { to: "/admin", label: "ADMIN" }
        : { to: "/profile", label: "MI PERFIL" }
      : { to: "/auth", label: "PORTAL" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-navy shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="hidden flex-1 items-center justify-start gap-6 md:flex">
          {leftLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors hover:text-primary ${
                isActive(link.to) ? "text-primary" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="flex items-center justify-center rounded-full border-2 border-primary px-6 py-2 text-xl font-bold text-primary md:text-2xl"
        >
          SASS BLUM
        </Link>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-6 md:flex">
            {rightLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user ? (
            <>
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex h-10 w-10 items-center justify-center border border-primary bg-transparent text-white hover:bg-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{profile?.full_name || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90">Iniciar Sesión</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
