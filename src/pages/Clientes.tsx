export default function Clientes() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-navy-dark to-navy py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-primary">CLIENTES</p>
          <h1 className="mb-4 text-5xl font-bold">Nuestros Clientes</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Empresas que confían en nuestras soluciones tecnológicas
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-12 text-center text-lg text-muted-foreground">
            Trabajamos con empresas líderes en diversos sectores, brindando soluciones
            tecnológicas personalizadas que impulsan su crecimiento y eficiencia operativa.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Policentro",
              "SCD",
              "Viamatica",
              "TodoFiesta",
              "Sony",
              "Acería Xinlong",
              "Banapov",
              "Omaconsa",
              "IMDO",
              "Soelec",
              "Clínica Cayaco",
              "Consitos",
              "Regus",
              "Viamatica",
              "Super Éxito",
            ].map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <p className="text-center font-semibold text-navy">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
