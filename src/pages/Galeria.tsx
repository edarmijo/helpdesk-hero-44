export default function Galeria() {
  const images = [
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600",
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600",
    "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600",
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={image}
                alt={`Proyecto ${index + 1}`}
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-lg font-semibold">Proyecto {index + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
