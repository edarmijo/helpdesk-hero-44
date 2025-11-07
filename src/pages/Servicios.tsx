import { ServiceCard } from "@/components/ServiceCard";
import { Server, Laptop, Headset, Camera, FileText, Wifi, HardDrive, Shield } from "lucide-react";

export default function Servicios() {
  const services = [
    {
      title: "Infraestructura IT",
      description: "Diseño, implementación y mantenimiento de infraestructura tecnológica completa para empresas de todos los tamaños.",
      icon: Server,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      title: "Soporte Técnico",
      description: "Asistencia técnica especializada 24/7 para mantener sus sistemas operativos y resolver incidencias rápidamente.",
      icon: Headset,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    },
    {
      title: "Impresoras y Computadoras",
      description: "Venta, instalación y mantenimiento preventivo y correctivo de equipos de cómputo y periféricos de las mejores marcas.",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
    },
    {
      title: "Servidores",
      description: "Implementación y gestión de servidores físicos y virtuales para maximizar el rendimiento de su empresa.",
      icon: Server,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      title: "Máquinas Virtuales",
      description: "Soluciones de virtualización para optimizar recursos y reducir costos de infraestructura tecnológica.",
      icon: HardDrive,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
    },
    {
      title: "Cámaras de Seguridad",
      description: "Sistemas de videovigilancia con tecnología de punta para proteger sus instalaciones las 24 horas del día.",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400",
    },
    {
      title: "Configuración DVR/NVR",
      description: "Instalación y configuración de sistemas de grabación digital para cámaras de seguridad.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
    },
    {
      title: "Configuración de Teléfonos",
      description: "Implementación de sistemas de telefonía IP y configuración de centralitas telefónicas.",
      icon: Headset,
      image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400",
    },
    {
      title: "Redes WiFi",
      description: "Diseño e instalación de redes inalámbricas empresariales de alto rendimiento y cobertura total.",
      icon: Wifi,
      image: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400",
    },
    {
      title: "Sistema Operativo Office",
      description: "Instalación, configuración y licenciamiento de sistemas operativos y suite Microsoft Office.",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
    },
    {
      title: "Antivirus",
      description: "Implementación de soluciones de seguridad informática y protección antivirus corporativa.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400",
    },
    {
      title: "Suscripciones",
      description: "Gestión y renovación de licencias y suscripciones de software empresarial.",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-navy-dark to-navy py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-primary">SERVICIOS</p>
          <h1 className="mb-4 text-5xl font-bold">Nuestros Servicios</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Soluciones tecnológicas integrales para impulsar el crecimiento de su empresa
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
