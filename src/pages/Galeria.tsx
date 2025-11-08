import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Galeria() {
  const projects = [
    {
      title: "Oficinas Sony",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      description: "Infraestructura IT completa",
    },
    {
      title: "Sala de Reuniones",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      description: "Sistema de videoconferencia",
    },
    {
      title: "Centro de Impresión",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      description: "Soluciones de impresión corporativa",
    },
    {
      title: "Recepción Corporativa",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      description: "Sistema de vigilancia CCTV",
    },
    {
      title: "Data Center",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      description: "Servidores y almacenamiento en nube",
    },
    {
      title: "Oficina Moderna",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800",
      description: "Cableado estructurado",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-navy-dark to-navy py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-primary">GALERÍA</p>
          <h1 className="mb-4 text-5xl font-bold">Nuestros Proyectos</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Conozca algunos de los proyectos tecnológicos que hemos implementado
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="group relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent opacity-60 transition-opacity group-hover:opacity-90">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                      <p className="text-sm text-gray-200">{project.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>
    </div>
  );
}
