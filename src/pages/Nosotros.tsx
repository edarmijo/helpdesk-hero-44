export default function Nosotros() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-navy-dark to-navy py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-primary">ACERCA DE NOSOTROS</p>
          <h1 className="mb-4 text-5xl font-bold">SASS BLUM</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Más de 20 años liderando la innovación tecnológica empresarial
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
              alt="Equipo SASS BLUM"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold text-navy">
              20+ Años de experiencia en innovación tecnológica
            </h2>
            <p className="mb-4 text-muted-foreground">
              SASS BLUM ha dedicado más de 20 años a dar soluciones informáticas a empresas e
              industrias, liderando proyectos y siendo el nexo perfecto entre directivos y sus
              diferentes proveedores de tecnología.
            </p>
            <p className="text-muted-foreground">
              Nuestra misión es proporcionar soluciones tecnológicas innovadoras y confiables que
              impulsen el crecimiento y la eficiencia de nuestros clientes, manteniéndonos a la
              vanguardia de las últimas tendencias tecnológicas.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-primary/5 p-6 text-center">
            <div className="mb-4 text-4xl font-bold text-primary">20+</div>
            <p className="text-muted-foreground">Años de experiencia</p>
          </div>
          <div className="rounded-lg bg-primary/5 p-6 text-center">
            <div className="mb-4 text-4xl font-bold text-primary">500+</div>
            <p className="text-muted-foreground">Clientes satisfechos</p>
          </div>
          <div className="rounded-lg bg-primary/5 p-6 text-center">
            <div className="mb-4 text-4xl font-bold text-primary">24/7</div>
            <p className="text-muted-foreground">Soporte técnico</p>
          </div>
        </div>
      </section>
    </div>
  );
}
