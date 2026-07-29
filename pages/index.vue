<script setup lang="ts">
useSeoMeta({
  title: "Clases de guitarra en La Reina | Profesor",
  description:
    "Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.",
  ogTitle: "Clases de guitarra en La Reina | Profesor",
  ogDescription:
    "Clases presenciales de guitarra y bajo en La Reina. Aprende con método, canciones reales y agenda por WhatsApp.",
});

useCanonicalUrl();

useHead({
  script: [
    {
      type: "application/ld+json",
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "EducationalOrganization"],
        name: "Riff Club Local - Clases de guitarra y bajo",
        description:
          "Clases presenciales de guitarra eléctrica, guitarra acústica y bajo en La Reina, Santiago de Chile.",
        areaServed: [
          "La Reina",
          "Ñuñoa",
          "Las Condes",
          "Peñalolén",
          "Providencia",
          "Santiago Oriente",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "La Reina",
          addressRegion: "Región Metropolitana",
          addressCountry: "CL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -33.441,
          longitude: -70.535,
        },
         url: "https://riffclub.cl/",
        sameAs: [],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de guitarra eléctrica",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de guitarra acústica",
            },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Clases de bajo" },
          },
        ],
      }),
    },
  ],
});

const homeRef = useTemplateRef<HTMLElement>("homeRef");
const { runWhenMotionAllowed } = useGsapMotion();
let cleanupHomeMotion: (() => void) | undefined;

onMounted(async () => {
  cleanupHomeMotion = await runWhenMotionAllowed(
    homeRef,
    ({ gsap, ScrollTrigger }) => {
      const flyer = homeRef.value?.querySelector(".pain-flyer");

      if (!flyer) {
        return;
      }

      gsap
        .timeline({
          scrollTrigger: {
            trigger: flyer,
            start: "top top",
            end: "+=135%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
          },
        })
        .from(".pain-flyer__sheet", {
          yPercent: 18,
          scale: 0.92,
          rotate: -2.5,
          opacity: 0,
          duration: 0.32,
          ease: "power3.out",
        })
        .from(
          ".pain-flyer .eyebrow",
          { y: 36, opacity: 0, letterSpacing: "0.34em", duration: 0.22 },
          "-=0.08",
        )
        .from(
          "#dolores-title",
          {
            y: 46,
            opacity: 0,
            scale: 0.88,
            rotate: 1.2,
            duration: 0.28,
            ease: "back.out(1.4)",
          },
          "-=0.06",
        )
        .from(
          ".pain-flyer .note",
          {
            y: 70,
            opacity: 0,
            scale: 0.82,
            rotate: 7,
            duration: 0.3,
            stagger: 0.08,
            ease: "back.out(1.8)",
          },
          "+=0.08",
        )
        .to(
          ".pain-flyer__sheet",
          {
            yPercent: -7,
            scale: 0.98,
            rotate: 0,
            duration: 0.18,
            ease: "power2.inOut",
          },
          "+=0.08",
        );

      ScrollTrigger.refresh();
    },
  );
});

onBeforeUnmount(() => {
  cleanupHomeMotion?.();
});
</script>

<template>
  <div ref="homeRef">
    <HeroZine />
    <section class="pain-flyer" aria-labelledby="dolores-title">
      <div class="pain-flyer__sheet container">
        <p class="eyebrow">Si esto te suena</p>
        <h2 id="dolores-title">Deja de aprender con videos sueltos.</h2>
        <div class="note-grid">
          <article class="note">
            <h3>No sabes qué practicar</h3>
            <p>
              Ordenamos técnica, ritmo y canciones para que cada semana tenga
              foco.
            </p>
          </article>
          <article class="note">
            <h3>Te cuesta cambiar acordes</h3>
            <p>
              Trabajamos movimientos concretos, tempo lento y progresiones
              reales.
            </p>
          </article>
          <article class="note">
            <h3>Sientes que no avanzas</h3>
            <p>
              Detectamos el bloqueo y armamos ejercicios que se conectan con
              música.
            </p>
          </article>
        </div>
      </div>
    </section>
    <section
      class="section container services-stage"
      aria-labelledby="servicios-title"
    >
      <p class="eyebrow" id="servicios-eyebrow">Elige tu instrumento</p>
      <h2 id="servicios-title">
        Clases presenciales cerca de Santiago Oriente.
      </h2>
      <div class="service-grid">
        <ServiceCard
          title="Guitarra eléctrica"
          label="Riffs / técnica"
          text="Riffs, rock, técnica, sonido, improvisación y canciones que dan ganas de practicar."
          to="/clases-guitarra-electrica"
          variant="electric"
        />
        <ServiceCard
          title="Guitarra acústica"
          label="Acordes / canciones"
          text="Acompañamiento, rasgueos, acordes, ritmo y repertorio para tocar desde la primera etapa."
          to="/clases-guitarra-acustica"
          variant="acoustic"
        />
        <ServiceCard
          title="Bajo"
          label="Groove / ritmo"
          text="Base rítmica, digitación, groove, canciones y técnica aplicada al rol del bajista."
          to="/clases-bajo"
          variant="bass"
        />
      </div>
    </section>
    <section
      class="section container method setlist-panel"
      aria-labelledby="metodo-title"
    >
      <span class="sticker">Método sin relleno</span>
      <h2 id="metodo-title">Diagnóstico, ruta y canciones reales.</h2>
      <p>
        Las clases se adaptan a tu nivel, pero no son improvisadas: definimos
        objetivos, corregimos técnica y usamos canciones para que la práctica
        tenga sentido.
      </p>
    </section>
    <ContactCta />
  </div>
</template>

<style scoped>
h2 {
  font-family: var(--font-heading);
  font-size: var(--type-h2);
  font-weight: var(--weight-heavy);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
  margin: 12px 0 28px;
}
.pain-flyer {
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: clip;
  padding: clamp(24px, 5vw, 48px) 0;
}
.pain-flyer__sheet {
  position: relative;
  min-height: min(760px, calc(100svh - 48px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 6vw, 72px);
  border: 3px solid var(--ink);
  background:
    radial-gradient(
      circle at 18% 20%,
      color-mix(in srgb, var(--red) 22%, transparent) 0 8rem,
      transparent 8.2rem
    ),
    radial-gradient(
      circle at 88% 18%,
      color-mix(in srgb, var(--acid) 26%, transparent) 0 7rem,
      transparent 7.2rem
    ),
    linear-gradient(135deg, var(--paper) 0%, var(--paper-aged) 100%);
  color: var(--ink);
  box-shadow: 18px 18px 0 var(--red);
  isolation: isolate;
}
.pain-flyer__sheet::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.18;
  background-image: radial-gradient(
    circle,
    var(--ink) 0 1px,
    transparent 1.4px
  );
  background-size: 8px 8px;
}
.pain-flyer .eyebrow {
  color: var(--red);
}
.services-stage {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#servicios-eyebrow {
  align-self: flex-start;
  width: max-content;
}
.note-grid,
.service-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.note {
  position: relative;
  box-sizing: border-box;
  max-width: calc(100% - 12px);
  padding: 24px;
  border: 2px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  box-shadow: 8px 8px 0 #000;
  transform: rotate(-1.5deg);
}
.note:nth-child(2) {
  transform: rotate(1deg);
}
.note:nth-child(3) {
  transform: rotate(-0.5deg);
}
.note::before {
  content: "";
  position: absolute;
  top: -11px;
  left: 24px;
  width: 72px;
  height: 20px;
  background: color-mix(in srgb, var(--acid) 78%, white);
  border: 1px solid var(--ink);
  transform: rotate(-3deg);
}
.note h3 {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: var(--type-h3);
  font-weight: var(--weight-bold);
  line-height: 1.08;
  letter-spacing: -0.015em;
}
.note p {
  color: #272727;
}
.method p {
  color: var(--section-muted);
}
.method {
  background: var(--section-bg);
  color: var(--section-text);
  padding-inline: 24px;
  border-left: 8px solid var(--red);
}
.setlist-panel {
  position: relative;
  box-sizing: border-box;
  max-width: calc(100% - 12px);
  border: 2px solid var(--section-border);
  box-shadow: 12px 12px 0 var(--red);
  background: linear-gradient(
    135deg,
    var(--section-bg) 0 78%,
    color-mix(in srgb, var(--acid) 16%, transparent) 78% 100%
  );
}
.setlist-panel::after {
  content: "setlist";
  position: absolute;
  right: 18px;
  top: 18px;
  padding: 5px 10px;
  border: 1px solid var(--section-border);
  color: var(--section-text);
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transform: rotate(4deg);
}
@media (max-width: 860px) {
  .pain-flyer {
    min-height: auto;
    padding: 64px 0;
  }
  .pain-flyer__sheet {
    min-height: auto;
    box-shadow: 6px 8px 0 var(--red);
  }
  .services-stage {
    min-height: auto;
  }
  .note-grid,
  .service-grid {
    grid-template-columns: 1fr;
  }
  .note,
  .note:nth-child(2),
  .note:nth-child(3) {
    transform: none;
    box-shadow: 4px 6px 0 #000;
  }
  .setlist-panel {
    box-shadow: 4px 6px 0 var(--red);
  }
  .setlist-panel::after {
    position: static;
    display: inline-block;
    margin-top: 18px;
  }
}
</style>
