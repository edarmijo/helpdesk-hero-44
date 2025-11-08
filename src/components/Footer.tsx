import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-dark py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Dirección */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Dirección
            </h3>
            <p className="text-gray-300">Guayaquil - Ecuador</p>
          </div>

          {/* Email */}
          <div className="text-center">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Email
            </h3>
            <a
              href="mailto:info@sassblum.com"
              className="text-gray-300 transition-colors hover:text-primary"
            >
              info@sassblum.com
            </a>
          </div>

          {/* Teléfonos */}
          <div className="text-center md:text-right">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Teléfonos
            </h3>
            <div className="space-y-1 text-gray-300">
              <p>+593-9-6999-0990</p>
              <p>+593-9-9528-6319</p>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-300">
              Puedes contactarnos a través de nuestras redes sociales
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-white p-2 transition-colors hover:border-primary hover:bg-primary/10"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
              Nuestros Productos
            </h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>› Infraestructura IT</li>
              <li>› Soporte Técnico</li>
              <li>› Cableado Estructurado</li>
              <li>› Sistema de Vigilancia CCTV</li>
              <li>› Domótica</li>
              <li>› Venta de Servidores</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>
            © <a href="https://sassblum.com" className="hover:text-primary">sassblum.com</a>
            . All Rights reserved. Designed by{" "}
            <a href="#" className="hover:text-primary">KaitoTech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
