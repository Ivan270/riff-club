<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <p class="eyebrow">Clases presenciales</p>
        <h2>Guitarra y bajo en La Reina</h2>
        <p class="footer-stamp">La Reina / Santiago Oriente</p>
      </div>
      <p>Para estudiantes de La Reina, Ñuñoa, Las Condes, Peñalolén, Providencia y Santiago Oriente.</p>
      <NuxtLink class="button button-primary" to="/contacto">Agendar clase</NuxtLink>
    </div>
  </footer>
</template>

<style scoped>
.footer { position: relative; padding: 72px 0 64px; border-top: 4px solid var(--paper); background: linear-gradient(180deg, #101010 0%, #050505 100%); overflow: hidden; }
.footer::before,
.footer::after { content: ""; position: absolute; inset: 18px auto auto 5%; width: min(520px, 70vw); height: 86px; border: 2px solid var(--paper); background: var(--red); transform: rotate(-2deg); opacity: .8; }
.footer::after { inset: auto 6% 20px auto; width: min(420px, 62vw); background: var(--purple); transform: rotate(2deg); }
.footer-grid { position: relative; z-index: 1; display: grid; gap: 24px; grid-template-columns: 1.3fr 1fr auto; align-items: center; padding: clamp(24px, 4vw, 34px); background: rgba(5, 5, 5, .9); border: 2px dashed var(--paper); box-shadow: 9px 9px 0 var(--acid); }
h2 { margin: 0; font-family: var(--font-display); font-size: clamp(2rem, 6vw, 4.5rem); line-height: .9; letter-spacing: -.06em; text-transform: uppercase; }
p { color: var(--muted); }
.footer-stamp { display: inline-block; margin: 16px 0 0; padding: 8px 10px; color: var(--ink); background: var(--paper); border: 2px solid var(--red); font: 900 .78rem/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; box-shadow: 4px 4px 0 var(--red); transform: rotate(-1deg); }
@media (max-width: 820px) { .footer-grid { grid-template-columns: 1fr; } }
</style>
