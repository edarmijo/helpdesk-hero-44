import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-navy-dark to-navy">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 text-center text-white">
        <p className="mb-2 text-sm uppercase tracking-wider text-primary">SASS BLUM</p>
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">
          Innovación<br />tecnológica para tu<br />negocio
        </h1>
        <button
          onClick={() => {
            document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-8 animate-bounce text-primary hover:text-primary/80"
        >
          <ChevronDown className="h-12 w-12" />
        </button>
      </div>
    </section>
  );
}
