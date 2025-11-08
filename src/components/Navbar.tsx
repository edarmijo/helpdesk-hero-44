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

  return (
    <nav className="sticky top-0 z-50 w-full bg-navy shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center">
          <div className="bg-primary px-6 py-2 text-2xl font-bold text-primary-foreground">
            SASS BLUM
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className={`transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-white"
            }`}
          >
            INICIO
          </Link>
          <Link
            to="/nosotros"
            className={`transition-colors hover:text-primary ${
              isActive("/nosotros") ? "text-primary" : "text-white"
            }`}
          >
            NOSOTROS
          </Link>
          <Link
            to="/servicios"
            className={`transition-colors hover:text-primary ${
              isActive("/servicios") ? "text-primary" : "text-white"
            }`}
          >
            SERVICIOS
          </Link>
          <Link
            to="/galeria"
            className={`transition-colors hover:text-primary ${
              isActive("/galeria") ? "text-primary" : "text-white"
            }`}
          >
            GALERÍA
          </Link>
          <Link
            to="/clientes"
            className={`transition-colors hover:text-primary ${
              isActive("/clientes") ? "text-primary" : "text-white"
            }`}
          >
            CLIENTES
          </Link>
          {user && (
            <Link
              to="/tickets"
              className={`transition-colors hover:text-primary ${
                isActive("/tickets") ? "text-primary" : "text-white"
              }`}
            >
              TICKETS
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              className={`transition-colors hover:text-primary ${
                isActive("/admin") ? "text-primary" : "text-white"
              }`}
            >
              ADMIN
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="border-primary text-white hover:bg-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {profile?.full_name || user.email}
                  </DropdownMenuLabel>
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
              <Button className="bg-primary hover:bg-primary/90">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
