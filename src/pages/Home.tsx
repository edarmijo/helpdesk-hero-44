import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Server, Laptop, Headset, Camera, FileText, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  const services = [
    {
      title: "Infraestructura IT",
      description: "Soluciones completas de infraestructura tecnológica para empresas",
      icon: Server,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      title: "Soporte Técnico",
      description: "Asistencia técnica especializada para mantener sus sistemas operativos",
      icon: Headset,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    },
    {
      title: "Impresoras y Computadoras",
      description: "Venta y mantenimiento de equipos de cómputo y periféricos",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
    },
    {
      title: "Cámaras de Seguridad",
      description: "Sistemas de vigilancia y seguridad para proteger su negocio",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400",
    },
    {
      title: "Servidores y Nubes",
      description: "Soluciones de almacenamiento y procesamiento en la nube",
      icon: Server,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      title: "Redes WiFi",
      description: "Instalación y configuración de redes inalámbricas empresariales",
      icon: Wifi,
      image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400",
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      <section id="servicios" className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-primary">SERVICIOS</p>
          <h2 className="text-4xl font-bold text-navy">Áreas de experiencia</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/servicios">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Ver todos los servicios
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                alt="Acerca de SASS BLUM"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="mb-2 text-sm uppercase tracking-wider text-primary">
                ACERCA DE NOSOTROS
              </p>
              <h2 className="mb-4 text-4xl font-bold text-navy">
                20+ Años de experiencia
              </h2>
              <h3 className="mb-6 text-2xl font-semibold text-navy">
                En innovación tecnológica
              </h3>
              <p className="mb-6 text-muted-foreground">
                SASS BLUM ha dedicado más de 20 años a dar soluciones informáticas a
                empresas e industrias, liderando proyectos y siendo el nexo perfecto entre
                directivos y sus diferentes proveedores de tecnología
              </p>
              <Link to="/nosotros">
                <Button variant="outline" size="lg">
                  Conocer más
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
