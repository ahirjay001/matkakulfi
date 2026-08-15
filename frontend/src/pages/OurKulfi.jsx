import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Wind, Timer, Snowflake, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FlavourCard } from "@/components/site/FlavourCard";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { StampBadge } from "@/components/site/StampBadge";
import { MatkaIcon } from "@/components/site/Doodles";
import { getFlavours } from "@/lib/api";
import { useSEO } from "@/hooks/useSEO";

const PROCESS_STEPS = [
  {
    icon: Flame,
    title: "Dhimi Aanch, Gaada Doodh",
    desc: "Fresh doodh ghanto tak dhimi aanch pe ubalta hai — jab tak wo gaada, malaidaar aur halka caramel na ho jaaye. Shortcut? Bilkul nahi.",
  },
  {
    icon: Heart,
    title: "Asli Mewa, Asli Swaad",
    desc: "Kashmiri kesar, roasted pista, kaju, anjeer — jo dikhta hai wahi milta hai. No essence, no artificial jhol.",
  },
  {
    icon: MatkaIcon,
    title: "Matke Mein Set",
    desc: "Mitti ka matka moisture ko balance karta hai aur kulfi ko deta hai wo earthy khushboo — hamara secret ingredient jo koi factory copy nahi kar sakti.",
    isCustomIcon: true,
  },
  {
    icon: Snowflake,
    title: "Raat Bhar Thandak",
    desc: "No blast freezing. Dheere-dheere jamti hai kulfi, taaki texture creamy rahe — icy nahi.",
  },
  {
    icon: Timer,
    title: "Pehla Bite = Time Travel",
    desc: "Wahi swaad jo bachpan mein thela wale bhaiya ki kulfi mein tha. Bas ab 120+ locations pe milta hai.",
  },
];

const WHY_MATKA = [
  {
    icon: Wind,
    title: "Earthy Khushboo",
    desc: "Mitti ki natural khushboo kulfi mein utar jaati hai — ye flavour bottle mein nahi milta.",
  },
  {
    icon: Snowflake,
    title: "Natural Thandak",
    desc: "Matka natural insulator hai — kulfi dheere jamti hai, creamy banti hai.",
  },
  {
    icon: Heart,
    title: "Heritage Ka Promise",
    desc: "Ye tarika sadiyon purana hai. Hum bas usse zinda rakh rahe hain — pyaar se.",
  },
];

export default function OurKulfi() {
  useSEO(
    "Our Kulfi — Desi Mastaani | Matka Kulfi Flavours",
    "Kesar Pista, Malai Matka, Paan Mastaani aur bhi bahut kuch. Traditional matka-made kulfi flavours by Desi Mastaani."
  );
  const [flavours, setFlavours] = useState([]);

  useEffect(() => {
    getFlavours().then(setFlavours).catch(() => setFlavours([]));
  }, []);

  return (
    <div>
      {/* Page hero */}
      <section className="bg-[#FFF3D6] jali-bg py-14 sm:py-18 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full marigold-glow" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Hamari Kulfi"
            title="Ek Se Badhkar Ek, Sab Matke Wali"
            sub="10 flavours, ek hi rule — asli doodh, asli mewa, asli matka. Chuno apna favourite."
          />
        </div>
      </section>
      <TruckArtDivider />

      {/* Flavour grid */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="kulfi-flavour-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {flavours.map((f, i) => (
              <Reveal key={f.id} delay={Math.min(i * 0.06, 0.3)}>
                <FlavourCard flavour={f} />
              </Reveal>
            ))}
          </div>
          {flavours.length === 0 && (
            <p className="text-center text-[#1A1208]/60 py-10" data-testid="flavours-loading">
              Flavours load ho rahi hain...
            </p>
          )}
        </div>
      </section>

      {/* Matka process */}
      <section className="bg-[#3A0B1E] jali-bg-gold noise-overlay py-14 sm:py-20" data-testid="kulfi-matka-process">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            onDark
            kicker="The Matka Method"
            title="Aise Banti Hai Asli Matka Kulfi"
            sub="5 steps. Zero shortcuts. Yahi hai hamara differentiator."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={Math.min(i * 0.08, 0.4)}>
                  <div className="h-full rounded-[22px] bg-[#4A1128] border border-[#D6A84A]/30 p-5 hover:border-[#D6A84A]/70 transition-colors" data-testid={`process-step-${i + 1}`}>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E46A12] text-[#FFFDF7]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-3xl text-[#D6A84A]/50">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-display text-lg text-[#FFC533] mt-4 leading-snug">{s.title}</h3>
                    <p className="text-xs text-[#FFF3D6]/75 leading-relaxed mt-2">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why matka */}
      <section className="py-14 sm:py-20 bg-[#FFF3D6] jali-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Kyun Matka?"
            title="Kyunki Mitti Jhooth Nahi Bolti"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WHY_MATKA.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i * 0.1}>
                  <div className="h-full rounded-[24px] bg-[#FFFDF7] p-6 shadow-[0_10px_30px_rgba(26,18,8,0.08)] text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#D11B6B]/10 text-[#D11B6B]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl text-[#3A0B1E] mt-4">{w.title}</h3>
                    <p className="text-sm text-[#1A1208]/70 leading-relaxed mt-2">{w.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <StampBadge rotate={-1} className="bg-[#FFFDF7]">
              <p className="font-display text-xl text-[#3A0B1E]">Taste karna hai?</p>
              <p className="font-baloo text-xs font-bold text-[#B6452C] uppercase tracking-wider mb-3">120+ locations mein se apna dhundo</p>
              <Button
                asChild
                data-testid="kulfi-locate-cta-button"
                className="bg-[#E46A12] hover:bg-[#C95C0E] text-[#FFFDF7] font-baloo font-bold rounded-[14px]"
              >
                <Link to="/locate">
                  Nearest Outlet Dhundo <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </StampBadge>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
