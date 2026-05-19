import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav, FilaMark } from "@/components/Nav";
import { FilaStripes } from "@/components/FilaStripes";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Toaster } from "@/components/ui/sonner";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero-runners.jpg";
import afterRun from "@/assets/after-run.jpg";
import eventRunner from "@/assets/event-runner.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import filaNeon from "@/assets/fila-neon-logo.png";
import runPizzaGraphic from "@/assets/run-pizza-graphic.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FILA RUN & PIZZA — Corre. Comparte. Celebra." },
      {
        name: "description",
        content:
          "Una experiencia FILA que une running, comunidad y estilo de vida italiano. 22 de Mayo 2026 · Plaza TAF, Costa del Este.",
      },
      { property: "og:title", content: "FILA RUN & PIZZA" },
      {
        property: "og:description",
        content: "Running, comunidad y estilo de vida italiano en una sola experiencia.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const products = [
  { name: "MAXXIMUS Masculino", category: "Calzado", img: p4 },
  { name: "RACER FASTPACE", category: "Calzado", img: p2 },
  { name: "RACER T2 EXTREME MASCULINO", category: "Calzado", img: p3 },
  { name: "RACER T2 XTREME FEMENINO", category: "Calzado", img: p1 },
];

function Index() {
  const ref = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div ref={ref} id="top" className="bg-[var(--heritage)] text-[var(--slate-black)] overflow-x-hidden">
      <Nav />
      <Toaster position="bottom-center" />

      {/* HERO */}
      <section className="relative min-h-screen w-full bg-[var(--slate-black)] text-heritage overflow-hidden grain">
        <img
          src={heroImg}
          alt="Corredores urbanos al atardecer en una calle italiana"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--slate-black)]/70 via-[var(--slate-black)]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--slate-black)]/85 via-transparent to-[var(--slate-black)]/30" />

        {/* Subtle neon ambient lights */}
        <div className="neon-glow-red" style={{ width: 520, height: 520, top: "-120px", left: "-120px" }} />
        <div className="neon-glow-blue" style={{ width: 600, height: 600, bottom: "-180px", right: "-160px" }} />

        {/* Vertical stripes overlay */}
        <div className="absolute right-10 top-1/3 h-64 hidden md:block text-[var(--fila-red)] opacity-90">
          <FilaStripes orientation="vertical" animated />
        </div>

        <div className="relative z-10 mx-auto max-w-[1680px] px-6 md:px-10 pt-40 md:pt-48 pb-24 min-h-screen flex flex-col justify-end">
          <div className="max-w-5xl">
            <h1 className="text-editorial text-heritage leading-[0.85] tracking-tight text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] max-w-[60%] sm:max-w-[48%] md:max-w-[40%] lg:max-w-[36%]">
              <span className="block neon-text-red">Run</span>
              <span className="block text-editorial-italic">&amp; Pizza</span>
            </h1>
            <div className="mt-8 md:mt-10 max-w-none">
              <p className="text-editorial text-heritage text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
                Corre. <span className="text-editorial-italic">Comparte.</span> Celebra.
              </p>
              <p className="mt-5 text-base md:text-lg lg:text-xl text-heritage/80 leading-relaxed font-sans tracking-wide md:whitespace-nowrap">
                Running, comunidad y estilo de vida italiano en una sola experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE — slim & elegant */}
      <section className="bg-[var(--slate-black)] text-heritage border-y border-heritage/10 overflow-hidden py-4">
        <div className="marquee text-editorial text-2xl md:text-3xl">
          {Array.from({ length: 3 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 pr-12">
              <span>Corre</span>
              <span className="text-heritage/35">—</span>
              <span className="text-editorial-italic">Comparte</span>
              <span className="text-heritage/35">—</span>
              <span>Celebra</span>
              <span className="text-heritage/35">—</span>
              <span className="text-editorial-italic">Italia</span>
              <span className="text-heritage/35">—</span>
              <span>Run &amp; Pizza</span>
              <span className="text-heritage/35">—</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — TWO VERTICAL HALVES */}
      <section id="evento" className="relative bg-[var(--slate-black)] text-heritage overflow-hidden grain">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[92vh]">
          {/* LEFT: copy + 3 stripes */}
          <div className="relative px-6 md:px-16 lg:px-24 py-20 md:py-28 flex flex-col justify-between reveal-up">
            <div>
              <h2 className="text-editorial text-heritage text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.95] mb-12 max-w-xl">
                ¿Qué es <span className="text-editorial-italic">FILA</span>
                <br />
                Run &amp; Pizza?
              </h2>

              <div className="space-y-6 text-base md:text-lg text-heritage/75 leading-[1.7] max-w-xl">
                <p>
                  FILA RUN &amp; PIZZA es una experiencia creada para unir el running, la comunidad y
                  el estilo de vida italiano que caracteriza a FILA.
                </p>
                <p>
                  Este evento busca acercar la marca a corredores principiantes e intermedios a través
                  de una actividad diferente, divertida y social, donde el deporte se vive de una
                  manera más cercana, relajada y memorable.
                </p>
                <p>
                  La experiencia inicia con una corrida grupal por la ciudad y finaliza con un espacio
                  de integración, pizza y comunidad. Como marca deportiva, FILA busca inspirar a más
                  personas a moverse, disfrutar el proceso y conectar con un estilo de vida activo.
                </p>
              </div>
            </div>

            {/* 3-stripe Barretta */}
            <div className="mt-16 h-3 w-44">
              <FilaStripes variant="three" orientation="horizontal" />
            </div>
          </div>

          {/* RIGHT: full editorial image */}
          <div className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
            <img
              src={eventRunner}
              alt="Corredores FILA en formación urbana"
              width={1280}
              height={1920}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--slate-black)]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--slate-black)]/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* EVENT INFORMATION */}
      <section className="relative bg-[var(--heritage)] border-t border-[var(--slate-black)]/10 py-20 md:py-32 overflow-hidden">
        <div className="relative mx-auto max-w-[1680px] px-6 md:px-10">
          <div className="flex items-end justify-between mb-16 reveal-up">
            <div>
              <span className="label-tech text-[var(--fila-red)]">Detalles</span>
              <h2 className="text-editorial text-5xl md:text-7xl mt-4">
                Información del <span className="text-editorial-italic">evento</span>
              </h2>
            </div>
            <span className="barretta barretta-neon-outline hidden md:inline-flex">Cupos limitados</span>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 reveal-up neon-grid-top">
            <InfoCell label="Fecha" value="21 de mayo" sub="2026" />
            <InfoCell label="Hora" value="6:00 PM" />
            <InfoCell label="Lugar" value="Plaza TAF" sub="Costa del Este, Panamá" last />
          </div>
        </div>
      </section>

      {/* AFTER RUN */}
      <section
        id="after"
        className="relative bg-[var(--slate-black)] text-heritage pt-24 md:pt-40 pb-20 md:pb-28 overflow-hidden grain"
      >
        <div className="absolute inset-0">
          <img
            src={afterRun}
            alt="Comunidad after-run con neón FILA"
            width={1920}
            height={1280}
            loading="lazy"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--slate-black)]/75 via-[var(--slate-black)]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--slate-black)]/85 via-transparent to-[var(--slate-black)]/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1680px] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7 reveal-up">
              <h2 className="text-editorial text-heritage text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-[0.9] tracking-tight">
                After <span className="text-editorial-italic neon-text-red">Run</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-start-9 lg:col-span-4 flex flex-col justify-end space-y-8 reveal-up">
              <p className="text-xl md:text-2xl text-heritage font-light leading-relaxed">
                Cierra la jornada con música, pizza y comunidad en{" "}
                <span className="text-editorial-italic">Botánica</span> — TAF Costa del Este.
              </p>
              <blockquote className="border-l-2 border-[var(--fila-red)] pl-6 text-heritage/75 italic font-serif text-2xl leading-snug">
                “Música, pizza, comunidad y la mejor vibra para cerrar la noche.”
              </blockquote>
            </div>
          </div>
        </div>

      </section>


      {/* REGISTRATION */}
      <section
        id="inscripcion"
        className="relative bg-[var(--slate-black)] text-heritage pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 relative">
          <div className="grid grid-cols-12 gap-6 mb-12 md:mb-14 reveal-up">
            <div className="col-span-12 lg:col-span-6">
              <span className="label-tech text-[var(--fila-red)]">Formulario de inscripción</span>
              <h2 className="text-editorial text-heritage text-5xl md:text-6xl lg:text-7xl mt-4 leading-[0.95]">
                Inscríbete al
                <br />
                <span className="text-editorial-italic">Run &amp; Pizza.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex items-end">
              <p className="text-heritage/65 text-lg leading-relaxed">
                Completa tus datos para asegurar tu cupo. Recibirás la confirmación con todos los
                detalles del evento y un kit de bienvenida.
              </p>
            </div>
          </div>

          <div className="reveal-up">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="productos" className="bg-[var(--heritage)] py-24 md:py-40">
        <div className="mx-auto max-w-[1680px] px-6 md:px-10">
          <div className="mb-16 reveal-up max-w-3xl mx-auto text-center">
            <span className="label-tech text-[var(--fila-red)]">
              Recomendación de productos FILA
            </span>
            <h2 className="text-editorial text-5xl md:text-7xl lg:text-8xl mt-4 leading-[0.95]">
              Corre con <span className="text-editorial-italic">FILA.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-[var(--slate-black)]/70 text-lg leading-relaxed">
              Descubre los productos recomendados para vivir la experiencia RUN &amp; PIZZA con
              comodidad, estilo y rendimiento.
            </p>
          </div>

          <div className="reveal-up">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6 md:-mx-10 md:px-10 scrollbar-thin">
              {products.map((p, i) => (
                <article
                  key={p.name}
                  className="group shrink-0 snap-start w-[78vw] sm:w-[55vw] md:w-[36vw] lg:w-[26vw]"
                >
                  <div className="relative aspect-[4/5] bg-[var(--slate-black)]/[0.04] overflow-hidden flex items-center justify-center">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 label-tech text-[var(--slate-black)]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-5">
                    <div className="label-tech text-[var(--slate-black)]/55">{p.category}</div>
                    <h3 className="text-xl md:text-2xl font-serif mt-1">{p.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA below carousel */}
          <div className="mt-16 flex items-center justify-center reveal-up">
            <a href="#" className="cta-pill cta-pill-outline text-[var(--slate-black)]">
              Ver colección FILA
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function InfoCell({
  label,
  value,
  sub,
  last,
  tz,
}: {
  label: string;
  value: string;
  sub?: string;
  last?: boolean;
  tz?: string;
}) {
  return (
    <div
      className={`info-card relative py-12 md:py-16 px-4 md:px-8 ${
        last ? "neon-cell-last" : ""
      }`}
    >
      <div className="label-tech text-[var(--slate-black)]/55 mb-6">{label}</div>
      <div className="text-editorial text-5xl md:text-7xl">{value}</div>
      {tz ? <div className="mt-1 label-tech text-[var(--slate-black)]/45">{tz}</div> : null}
      {sub ? <div className="mt-4 text-[var(--slate-black)]/70">{sub}</div> : null}
    </div>
  );
}

function Footer() {
  const legal = [
    "Términos y Condiciones",
    "Política de Privacidad",
    "Políticas de Envíos",
    "Términos de Servicio",
    "Políticas de Cambios y Devoluciones",
    "Servicio al Cliente",
  ];
  const brand = ["Sobre FILA", "Contacto"];

  const socials: { label: string; href: string; path: string }[] = [
    {
      label: "YouTube",
      href: "#",
      path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z",
    },
    {
      label: "Instagram",
      href: "#",
      path: "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.5-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm5.1-2.1a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z",
    },
    {
      label: "Facebook",
      href: "#",
      path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
    },
    {
      label: "TikTok",
      href: "#",
      path: "M19.6 6.7a5.4 5.4 0 0 1-3.2-1V15a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1V12a3 3 0 1 0 2.1 2.9V2h2.7a5.4 5.4 0 0 0 3.2 4.7v0z",
    },
  ];

  return (
    <footer className="bg-[var(--slate-black)] text-heritage pt-24 pb-12 relative overflow-hidden">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 relative">
        {/* Top brand row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 pb-14 border-b border-heritage/10">
          <img src={filaNeon} alt="FILA" className="h-12 w-12 object-contain" />
          <div className="text-[var(--fila-red)] w-44 h-3">
            <FilaStripes variant="three" orientation="horizontal" />
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-16">
          <div className="md:col-span-5">
            <div className="label-tech text-heritage/45 mb-6">Legal</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 text-heritage/85 text-sm">
              {legal.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[var(--fila-red)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="label-tech text-heritage/45 mb-6">FILA</div>
            <ul className="space-y-3.5 text-heritage/85 text-sm">
              {brand.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[var(--fila-red)] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="label-tech text-heritage/45 mb-6">Síguenos</div>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="text-heritage/70 hover:text-[var(--fila-red)] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="label-tech text-heritage/45 mb-6">Pago</div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-8 px-3 border border-heritage/20 rounded-sm text-[10px] font-semibold tracking-[0.18em] text-heritage">
                VISA
              </span>
              <span className="inline-flex items-center justify-center h-8 px-3 border border-heritage/20 rounded-sm text-[10px] font-semibold tracking-[0.18em] text-heritage">
                MC
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-heritage/10 pt-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <span className="label-tech text-heritage/50">© 2026, FILA Panamá.</span>
          <span className="label-tech text-heritage/40">Panamá · Costa del Este</span>
        </div>
      </div>
    </footer>
  );
}
