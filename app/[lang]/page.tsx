import { ArrowDown, Clock, MapPin, MessageCircle, Phone, QrCode } from "lucide-react";
import { BuildSection } from "@/components/BuildSection";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartContext";
import { Offers, PhotoStrip, Picks, Story } from "@/components/Sections";
import { DishSheet } from "@/components/cart/DishSheet";
import Link from "next/link";
import QRCode from "qrcode";
import { Reserve } from "@/components/Reserve";
import { Header } from "@/components/Header";
import { Intro } from "@/components/Intro";
import { Logo } from "@/components/Logo";
import { MenuTabs } from "@/components/MenuTabs";
import { OpenStatus } from "@/components/OpenStatus";
import { Ribbons } from "@/components/Ribbons";
import { HeroScene } from "@/components/Scenes";
import { MAP_LINK, PHONE_DISPLAY, PHONE_LINK, WHATSAPP_LINK, content, isLocale, type Locale } from "@/lib/content";
import { catalog } from "@/lib/catalog";

const TILTS = [-6, 4, -3, 5, -4, 3];
const STRIP_IDS = ["masgouf", "mixed", "milaq", "offer-family", "baklava", "chai", "tikka", "hummus"];

// A slowly turning ring of text, like a sticker on the takeaway bag.
function SpinBadge({ text, arabic }: { text: string; arabic: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full motion-safe:animate-[spin_18s_linear_infinite]" aria-hidden="true">
      <defs>
        <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="98" fill="#f2a71b" />
      <text
        fill="#3b1f14"
        fontSize={arabic ? 19 : 17}
        fontFamily="Lalezar, Rubik, sans-serif"
        letterSpacing={arabic ? 0 : 2}
        direction="ltr"
        style={{ direction: "ltr" }}
      >
        <textPath href="#ring">{text}</textPath>
      </text>
    </svg>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Locale = isLocale(raw) ? raw : "en";
  const t = content[lang];
  const locale = lang === "ar" ? "ar-IQ" : "en-US";
  const arabicWord = /[؀-ۿ]/.test(t.word);
  const badge = lang === "ar" ? "على الفحم  •  من ١٩٩٨  •  أبو نواس  •  بغداد  •  على الفحم  •  شط دجلة  •  " : "OVER CHARCOAL • SINCE 1998 • ABU NUWAS • BAGHDAD • ";

  const names = catalog(t);
  const menuUrl = `https://mustafacoder365.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${lang}/menu/`;
  const qrSvg = await QRCode.toString(menuUrl, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#3b1f14", light: "#00000000" },
  });
  const stripCaptions = STRIP_IDS.map((id) => names[id]?.name ?? "");

  return (
    <CartProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-saffron focus:px-4 focus:py-2 focus:text-date"
      >
        {t.skip}
      </a>
      <Intro word={t.word} />
      <Header t={t} lang={lang} />

      <main id="main">
        {/* Hero: a giant name with food flying around it. */}
        <section id="top" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-pomegranate text-cream">
          {/* Faint repeated word behind everything */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex -rotate-12 flex-col justify-center gap-0 opacity-[0.08] select-none">
            {[0, 1, 2].map((r) => (
              <span key={r} className="whitespace-nowrap font-[family-name:var(--font-display)] text-[22vw] leading-[0.95]">
                {`${t.word} ${t.word} ${t.word}`}
              </span>
            ))}
          </div>

          <div className="relative flex flex-1 items-center justify-center px-5 pt-24">
            <h1 id="hero-title" className="relative text-center">
              <span className="sr-only">{t.brand}</span>
              <span aria-hidden="true" className="block font-[family-name:var(--font-display)] text-[26vw] leading-[0.9] text-cream drop-shadow-[0_10px_0_rgba(0,0,0,0.12)] lg:text-[21vw]">
                {arabicWord ? (
                  <span className="hero-letter" style={{ ["--r" as string]: "-3deg" }}>
                    {t.word}
                  </span>
                ) : (
                  Array.from(t.word).map((l, i) => (
                    <span key={i} className="hero-letter" style={{ ["--r" as string]: `${TILTS[i % TILTS.length]}deg` }}>
                      {l}
                    </span>
                  ))
                )}
              </span>
            </h1>
          </div>

          {/* 3D food, layered over the title */}
          <HeroScene label={t.hero.sceneLabel} />

          <div className="pointer-events-none absolute end-6 top-28 hidden h-32 w-32 sm:block lg:end-12 lg:h-40 lg:w-40">
            <SpinBadge text={badge} arabic={arabicWord} />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-5 pb-10 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <div>
              <p className="max-w-[18ch] font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">{t.hero.tagline}</p>
              <p className="mt-2 max-w-[42ch] text-cream/80">{t.hero.sub}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#menu"
                  className="rounded-full bg-saffron px-6 py-3 font-semibold text-date transition-transform hover:-rotate-2 hover:scale-105"
                >
                  {t.hero.primary}
                </a>
                <a
                  href={WHATSAPP_LINK}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream px-6 py-3 font-semibold transition-colors hover:bg-cream hover:text-pomegranate"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <a href="#menu" className="nudge hidden flex-col items-center gap-1 text-sm font-medium text-cream/80 md:flex">
              {t.hero.scroll}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <OpenStatus
              open={t.status.open}
              closed={t.status.closed}
              className="font-[family-name:var(--font-display)] text-2xl md:justify-self-end md:text-end md:text-3xl"
            />
          </div>
        </section>

        <Ribbons first={t.ribbons.first} second={t.ribbons.second} />

        <Picks t={t} locale={locale} />

        <BuildSection
          title={t.build.title}
          lead={t.build.lead}
          steps={t.build.steps}
          done={t.build.done}
          sceneLabel={t.build.sceneLabel}
          numberLocale={locale}
        />

        {/* Menu */}
        <section id="menu" aria-labelledby="menu-title" className="bg-cream">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="text-center">
              <h2 id="menu-title" className="inline-block -rotate-2 text-7xl text-pomegranate sm:text-8xl">
                {t.menu.title}
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-lg text-date/75">{t.menu.lead}</p>
            </div>
            <div className="mt-10">
              <MenuTabs t={t.menu} locale={locale} />
            </div>

            {/* Table QR menu */}
            <div className="mt-16 grid items-center gap-8 rounded-[2rem] bg-date p-6 text-cream sm:grid-cols-[auto_1fr] sm:p-10">
              <div className="mx-auto w-44 -rotate-3 rounded-3xl bg-cream p-4 shadow-xl sm:w-52">
                <div className="aspect-square" role="img" aria-label={t.tableMenu.scan} dangerouslySetInnerHTML={{ __html: qrSvg }} />
                <p className="mt-2 text-center font-[family-name:var(--font-display)] text-lg text-pomegranate">{t.brand}</p>
              </div>
              <div className="text-center sm:text-start">
                <p className="inline-flex items-center gap-2 rounded-full bg-saffron px-3 py-1 text-sm font-semibold text-date">
                  <QrCode className="h-4 w-4" aria-hidden="true" />
                  {t.tableMenu.scan}
                </p>
                <h3 className="mt-3 text-5xl">{t.tableMenu.title}</h3>
                <p className="mt-2 max-w-[44ch] text-cream/75 sm:mx-0">{t.tableMenu.lead}</p>
                <Link
                  href={`/${lang}/menu/`}
                  className="mt-5 inline-flex rounded-full bg-cream px-6 py-3 font-semibold text-pomegranate transition-transform hover:-rotate-2 hover:scale-105"
                >
                  {t.tableMenu.link}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Offers t={t} locale={locale} />

        <PhotoStrip title={t.gallery.title} captions={stripCaptions} />

        <Story t={t} locale={locale} />

        <Reserve t={t} locale={locale} />

        {/* Visit */}
        <section id="visit" aria-labelledby="visit-title" className="bg-pomegranate text-cream">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div>
              <h2 id="visit-title" className="text-6xl text-saffron sm:text-7xl">
                {t.visit.title}
              </h2>
              <p className="mt-5 max-w-[46ch] text-xl text-cream/85">{t.visit.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 font-semibold text-date transition-transform hover:-rotate-2 hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t.visit.whatsapp}
                </a>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream px-6 py-3 font-semibold transition-colors hover:bg-cream hover:text-pomegranate"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t.visit.call}
                  <span dir="ltr" className="font-normal">
                    {PHONE_DISPLAY}
                  </span>
                </a>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rotate-1 rounded-3xl bg-cream p-7 text-date">
                <h3 className="flex items-center gap-2 text-3xl text-pomegranate">
                  <MapPin className="h-6 w-6" aria-hidden="true" />
                  {t.visit.addressTitle}
                </h3>
                <p className="mt-3 text-lg">{t.visit.address}</p>
                <p className="mt-1 text-date/70">{t.visit.directions}</p>
                <a href={MAP_LINK} className="mt-4 inline-block font-semibold text-pomegranate underline decoration-2 underline-offset-4">
                  {t.visit.map}
                </a>
              </div>
              <div className="-rotate-1 rounded-3xl bg-turquoise p-7">
                <h3 className="flex items-center gap-2 text-3xl text-saffron">
                  <Clock className="h-6 w-6" aria-hidden="true" />
                  {t.visit.hoursTitle}
                </h3>
                <p className="mt-3 text-lg">{t.visit.hours}</p>
                <p className="mt-1 text-cream/75">{t.visit.hoursNote}</p>
                <OpenStatus open={t.status.open} closed={t.status.closed} className="mt-4 inline-block font-semibold" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-date text-cream/75">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-14 text-center sm:px-8">
          <Logo name={t.brand} className="bg-pomegranate text-cream" />
          <p className="max-w-[40ch]">{t.footer.tagline}</p>
          <p className="max-w-[70ch] text-sm text-cream/60">{t.footer.concept}</p>
          <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
            <a href="https://github.com/MustafaCoder365" className="text-cream underline-offset-4 hover:underline">
              {t.footer.credit}
            </a>
            <a href="https://unsplash.com" className="underline-offset-4 hover:underline">
              {t.footer.photos}
            </a>
          </p>
        </div>
      </footer>
      <DishSheet t={t} lang={lang} locale={locale} />
      <CartDrawer t={t} locale={locale} lang={lang} />
    </CartProvider>
  );
}
