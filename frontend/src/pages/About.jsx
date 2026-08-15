import { Link } from "react-router-dom";
import { ArrowRight, Milk, HandHeart, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StampBadge } from "@/components/site/StampBadge";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { MatkaIcon, KulfiIcon, MarigoldGarland } from "@/components/site/Doodles";
import { IMAGES } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";

const VALUES = [
  {
    icon: Milk,
    title: "Asli Ingredients",
    desc: "Fresh doodh, asli kesar, asli mewa. Jo packet pe likha hai, wahi matke mein hai.",
  },
  {
    icon: HandHeart,
    title: "Matka Method",
    desc: "Sadiyon purana clay-pot tarika — slow, earthy, authentic. Machine se nahi, sabr se.",
  },
  {
    icon: Wallet,
    title: "Har Budget Mein",
    desc: "Premium taste, street price. Kulfi sabki hai — isliye hum har sheher, har pocket tak pahunchte hain.",
  },
];

const FAMILY = [
  {
    name: "Mor N Rich",
    role: "Kulfi & ice cream · since 1998",
    desc: "Jahan se sab shuru hua — family ki original kulfi legacy.",
    highlight: false,
  },
  {
    name: "Desi Mastaani",
    role: "Matka kulfi · 120+ locations",
    desc: "Family ki sabse mastaani brand — street-heritage matka kulfi, franchise-led growth.",
    highlight: true,
  },
  {
    name: "Chill House",
    role: "Premium dessert café",
    desc: "Family ka premium café experience — alag vibe, alag audience.",
    highlight: false,
  },
];

export default function About() {
  useSEO(
    "About — Desi Mastaani | Hamari Kahaani",
    "Desi Mastaani ki heritage story — Mor N Mor Foods LLP family (Ahmedabad, since 1998) ki matka kulfi brand. Banaye Meethi Yaadein."
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#FFF3D6] jali-bg py-14 sm:py-18 relative overflow-hidden" data-testid="about-hero">
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full gulal-glow" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Hamari Kahaani"
            title="Ek Matka, Ek Parivaar, Ek Sapna"
            sub="1998 se mithaas bana rahe hain — ab matke mein bhar ke poore Gujarat tak pahuncha rahe hain."
          />
        </div>
      </section>
      <TruckArtDivider />

      {/* Heritage story */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="about-heritage">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl text-[#3A0B1E] leading-tight">
                Ahmedabad Ke Ek Kitchen Se...
              </h2>
              <MarigoldGarland className="!justify-start mt-4" />
              <p className="mt-5 text-[#1A1208]/75 leading-relaxed">
                Saal 1998. Ahmedabad mein Mor N Mor Foods ki shuruaat hui — ek simple
                belief ke saath: <strong className="text-[#B6452C]">asli cheez ka koi
                substitute nahi hota.</strong> Pehle Mor N Rich ne kulfi aur ice cream se
                gharon mein jagah banayi. Phir Chill House ne premium dessert lovers ka
                dil jeeta.
              </p>
              <p className="mt-4 text-[#1A1208]/75 leading-relaxed">
                Par ek kahaani abhi baaki thi — wo purani, thele wali,{" "}
                <strong className="text-[#B6452C]">matke wali kulfi</strong> jo hamare
                bachpan ki yaadon mein jami hui thi. Usi nostalgia ko wapas laane ke liye
                bani <strong className="text-[#D11B6B]">Desi Mastaani</strong>.
              </p>
              <p className="mt-4 text-[#1A1208]/75 leading-relaxed">
                Aaj Desi Mastaani Gujarat ke 120+ locations pe hai — 70+ franchise
                partners ke saath, sirf 18 months mein. Par mission wahi hai jo din ek
                tha: <strong className="text-[#B6452C]">Banaye Meethi Yaadein.</strong>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="foil-frame rounded-[28px] overflow-hidden rotate-[2deg]">
                <img
                  src={IMAGES.heritageMarket}
                  alt="Indian heritage street market"
                  loading="lazy"
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-4">
                <StampBadge rotate={-2} className="bg-[#FFFDF7]">
                  <span className="font-display text-2xl text-[#E46A12]">Since 1998</span>
                  <span className="font-baloo text-[10px] font-bold uppercase tracking-wider text-[#3A0B1E]/70">
                    Mor N Mor Foods LLP · Ahmedabad
                  </span>
                </StampBadge>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pull-quote band */}
      <section className="bg-[#3A0B1E] jali-bg-gold noise-overlay py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <KulfiIcon className="h-10 w-10 text-[#FFC533] mx-auto mb-4" />
            <p className="font-display text-2xl sm:text-3xl text-[#FFFDF7] leading-snug">
              “Kulfi sirf dessert nahi — wo dadi ke haath ka pyaar hai,
              school ke baad ka celebration hai, garmi ki har shaam ka intezaar hai.”
            </p>
            <p className="font-baloo font-bold text-sm text-[#FFC533] mt-4 uppercase tracking-wider">
              — Desi Mastaani Team
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 bg-[#FFF3D6] jali-bg" data-testid="about-values">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading kicker="Hamare Values" title="3 Cheezein Jo Kabhi Nahi Badlengi" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.1}>
                  <div className="h-full rounded-[24px] bg-[#FFFDF7] p-6 shadow-[0_10px_30px_rgba(26,18,8,0.08)] text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E46A12]/10 text-[#E46A12]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl text-[#3A0B1E] mt-4">{v.title}</h3>
                    <p className="text-sm text-[#1A1208]/70 leading-relaxed mt-2">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Family band */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="about-family">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="The Mor N Mor Family"
            title="Ek Parivaar, Teen Swaad"
            sub="Desi Mastaani apne parivaar ki sabse loud, sabse desi member hai — proudly!"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FAMILY.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <div
                  className={
                    f.highlight
                      ? "h-full rounded-[24px] bg-[#3A0B1E] p-6 text-center border-2 border-[#D6A84A] shadow-[0_18px_50px_rgba(26,18,8,0.18)]"
                      : "h-full rounded-[24px] bg-[#FFF3D6] p-6 text-center border border-[#D6A84A]/40"
                  }
                >
                  {f.highlight && <MatkaIcon className="h-8 w-8 text-[#FFC533] mx-auto mb-2" />}
                  <h3 className={`font-display text-xl ${f.highlight ? "text-[#FFC533]" : "text-[#3A0B1E]"}`}>
                    {f.name}
                  </h3>
                  <p className={`font-baloo text-xs font-bold uppercase tracking-wider mt-1 ${f.highlight ? "text-[#D11B6B]" : "text-[#B6452C]"}`}>
                    {f.role}
                  </p>
                  <p className={`text-sm leading-relaxed mt-3 ${f.highlight ? "text-[#FFF3D6]/80" : "text-[#1A1208]/70"}`}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              data-testid="about-franchise-cta-button"
              className="bg-[#E46A12] hover:bg-[#C95C0E] text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] px-7 shadow-[0_6px_0_rgba(58,11,30,0.22)] hover:translate-y-[1px] transition-transform"
            >
              <Link to="/franchise">
                Is Kahaani Ka Hissa Bano <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
