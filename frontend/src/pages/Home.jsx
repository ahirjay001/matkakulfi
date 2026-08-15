import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, MapPin, Sparkles, HandHeart, Milk } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { StampBadge } from "@/components/site/StampBadge";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FlavourCard } from "@/components/site/FlavourCard";
import { MatkaIcon, KulfiIcon, MarigoldGarland } from "@/components/site/Doodles";
import { getFlavours } from "@/lib/api";
import { IMAGES } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";

const TOP_CITIES = ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"];

export default function Home() {
  useSEO(
    "Desi Mastaani — Matka Kulfi | Banaye Meethi Yaadein",
    "Real kulfi ka asli mazaa! Traditional matka kulfi across 120+ locations in Gujarat. Explore flavours & franchise opportunities."
  );

  const [flavours, setFlavours] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const patternY = useTransform(scrollY, [0, 600], [0, 70]);
  const imgY = useTransform(scrollY, [0, 600], [0, -45]);

  useEffect(() => {
    getFlavours().then(setFlavours).catch(() => setFlavours([]));
  }, []);

  const goLocate = (e) => {
    e.preventDefault();
    navigate(searchVal ? `/locate?q=${encodeURIComponent(searchVal)}` : "/locate");
  };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#FFF3D6]"
        data-testid="home-hero"
      >
        <motion.div style={{ y: patternY }} className="absolute inset-0 jali-bg" aria-hidden="true" />
        <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full gulal-glow" aria-hidden="true" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full marigold-glow" aria-hidden="true" />
        <span
          className="font-display absolute right-2 top-10 hidden xl:block text-[190px] leading-none text-[#B6452C]/[0.07] select-none"
          aria-hidden="true"
        >
          मस्तानी
        </span>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#3A0B1E] text-[#FFC533] font-baloo font-bold text-xs sm:text-sm px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Mor N Mor Foods Family · Since 1998
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[#3A0B1E]">
                Matka Mein Bani,{" "}
                <span className="text-[#D11B6B]">Dil Se Banayi.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base sm:text-lg text-[#1A1208]/75 leading-relaxed max-w-md">
                Real kulfi ka asli mazaa. Har scoop mein nostalgia, har matke mein
                pyaar. <span className="font-baloo font-bold text-[#B6452C]">Banaye Meethi Yaadein!</span>
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-7 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                data-testid="hero-explore-flavours-button"
                className="bg-[#E46A12] hover:bg-[#C95C0E] text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] h-13 px-7 py-6 shadow-[0_8px_0_rgba(58,11,30,0.22)] hover:translate-y-[2px] transition-transform"
              >
                <Link to="/kulfi">
                  Explore Flavours <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-testid="hero-franchise-button"
                className="border-2 border-[#B6452C] text-[#B6452C] bg-transparent hover:bg-[#B6452C] hover:text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] px-7 py-6 transition-colors"
              >
                <Link to="/franchise">Franchise Ke Baare Mein</Link>
              </Button>
            </Reveal>
            <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-baloo font-bold text-[#1A1208]/70">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D11B6B]" /> 120+ Locations
              </span>
              <span className="flex items-center gap-2">
                <HandHeart className="h-4 w-4 text-[#E46A12]" /> 70+ Franchise Partners
              </span>
              <span className="flex items-center gap-2">
                <Milk className="h-4 w-4 text-[#1F7A3A]" /> 100% Asli Doodh
              </span>
            </Reveal>
          </div>

          {/* Right visual */}
          <motion.div style={{ y: imgY }} className="relative">
            <Reveal delay={0.15}>
              <div className="foil-frame relative rounded-[28px] overflow-hidden rotate-[-2deg]">
                <img
                  src={IMAGES.heroMatka}
                  alt="Handcrafted matka clay pot for kulfi"
                  className="w-full h-[320px] sm:h-[420px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3A0B1E]/80 to-transparent p-5 pt-14">
                  <p className="font-display text-[#FFC533] text-lg">Asli Matka, Asli Swaad</p>
                </div>
              </div>
            </Reveal>
            <div className="absolute -bottom-6 -left-4 sm:-left-8 float-anim">
              <StampBadge rotate={3} className="bg-[#FFFDF7] shadow-[0_14px_0_rgba(26,18,8,0.12)]">
                <KulfiIcon className="h-7 w-7 text-[#D11B6B] mb-1" />
                <span className="font-display text-lg text-[#3A0B1E]">10 Flavours</span>
                <span className="font-baloo text-[10px] font-bold uppercase tracking-wider text-[#B6452C]">
                  Sab Ke Sab Zabardast
                </span>
              </StampBadge>
            </div>
            <div className="absolute -top-5 -right-2 sm:-right-6 hidden sm:block">
              <StampBadge rotate={-4} className="bg-[#D11B6B] text-[#FFFDF7]">
                <span className="font-display text-2xl">120+</span>
                <span className="font-baloo text-[10px] font-bold uppercase tracking-wider">
                  Locations in Gujarat
                </span>
              </StampBadge>
            </div>
          </motion.div>
        </div>
        <TruckArtDivider />
      </section>

      {/* ============ BRAND STORY SNIPPET ============ */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="home-brand-story">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="foil-frame rounded-[28px] overflow-hidden rotate-[1.5deg]">
                <img
                  src={IMAGES.potWall}
                  alt="Traditional terracotta matka pots"
                  loading="lazy"
                  className="w-full h-[300px] sm:h-[380px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-4">
                <StampBadge rotate={-2} className="bg-[#1F7A3A] text-[#FFFDF7]">
                  <span className="font-display text-lg">Zero Shortcut</span>
                  <span className="font-baloo text-[10px] font-bold uppercase tracking-wider">
                    Sirf Sabar Aur Pyaar
                  </span>
                </StampBadge>
              </div>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              garland={false}
              kicker="Hamari Kahaani"
              title="Kulfi Nahi, Emotion Hai."
            />
            <MarigoldGarland className="!justify-start mt-4" />
            <Reveal delay={0.1}>
              <p className="mt-5 text-[#1A1208]/75 leading-relaxed">
                Dhime aanch pe ghanto ubla hua doodh. Asli kesar, asli mewa. Aur phir
                wahi purana jaadu — <strong className="text-[#B6452C]">mitti ka matka</strong>,
                jo kulfi ko deta hai wo earthy thandak aur khushboo jo koi machine kabhi
                nahi de sakti.
              </p>
              <p className="mt-4 text-[#1A1208]/75 leading-relaxed">
                Desi Mastaani — Mor N Mor Foods family (since 1998) ki sabse mastaani
                brand. Street-style heritage, har budget mein, har sheher mein.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-4">
              <Button
                asChild
                data-testid="story-about-button"
                className="bg-[#B6452C] hover:bg-[#9C3A24] text-[#FFFDF7] font-baloo font-bold rounded-[14px]"
              >
                <Link to="/about">
                  Poori Kahaani Padho <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FLAVOUR CAROUSEL ============ */}
      <section className="py-14 sm:py-20 bg-[#FFF3D6] jali-bg relative" data-testid="home-flavour-carousel">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Flavour Parade"
            title="Har Scoop Mein Nostalgia"
            sub="Kesar Pista se Paan Mastaani tak — swipe karo, favourite chuno."
          />
          <Reveal delay={0.15} className="mt-10">
            <Carousel opts={{ align: "start", loop: true }} className="w-full" data-testid="flavour-carousel">
              <CarouselContent className="-ml-4">
                {(flavours.length ? flavours : []).map((f) => (
                  <CarouselItem key={f.id} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                    <FlavourCard flavour={f} compact />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4 bg-[#FFFDF7] border-[#B6452C]/40 text-[#B6452C] hover:bg-[#B6452C] hover:text-[#FFFDF7] h-11 w-11" data-testid="flavour-carousel-prev" />
              <CarouselNext className="hidden sm:flex -right-4 bg-[#FFFDF7] border-[#B6452C]/40 text-[#B6452C] hover:bg-[#B6452C] hover:text-[#FFFDF7] h-11 w-11" data-testid="flavour-carousel-next" />
            </Carousel>
          </Reveal>
          <Reveal delay={0.2} className="mt-9 text-center">
            <Button
              asChild
              size="lg"
              data-testid="see-all-flavours-button"
              className="bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold rounded-[14px] px-7 shadow-[0_6px_0_rgba(58,11,30,0.22)] hover:translate-y-[1px] transition-transform"
            >
              <Link to="/kulfi">
                Saari Flavours Dekho <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS STAMP BAND ============ */}
      <section className="relative bg-[#3A0B1E] jali-bg-gold noise-overlay py-14 sm:py-20" data-testid="home-stats-band">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            onDark
            kicker="Bharosa By Numbers"
            title="Gujarat Ka Apna Kulfi Movement"
          />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7">
            <Reveal delay={0.05} className="flex justify-center">
              <StampBadge rotate={-1.5} className="w-full bg-[#4A1128] text-[#FFF3D6]" data-testid="stats-120-locations">
                <CountUp end={120} suffix="+" className="font-display text-4xl sm:text-5xl text-[#FFC533]" />
                <span className="font-baloo mt-1 text-xs font-bold uppercase tracking-wider text-[#FFF3D6]/80">Locations</span>
              </StampBadge>
            </Reveal>
            <Reveal delay={0.12} className="flex justify-center">
              <StampBadge rotate={1.5} className="w-full bg-[#4A1128] text-[#FFF3D6]" data-testid="stats-70-partners">
                <CountUp end={70} suffix="+" className="font-display text-4xl sm:text-5xl text-[#FFC533]" />
                <span className="font-baloo mt-1 text-xs font-bold uppercase tracking-wider text-[#FFF3D6]/80">Franchise Partners</span>
              </StampBadge>
            </Reveal>
            <Reveal delay={0.19} className="flex justify-center">
              <StampBadge rotate={-1} className="w-full bg-[#4A1128] text-[#FFF3D6]" data-testid="stats-18-months">
                <CountUp end={18} className="font-display text-4xl sm:text-5xl text-[#FFC533]" />
                <span className="font-baloo mt-1 text-xs font-bold uppercase tracking-wider text-[#FFF3D6]/80">Months — 70+ Partners</span>
              </StampBadge>
            </Reveal>
            <Reveal delay={0.26} className="flex justify-center">
              <StampBadge rotate={1} className="w-full bg-[#4A1128] text-[#FFF3D6]" data-testid="stats-since-1998">
                <span className="font-display text-4xl sm:text-5xl text-[#FFC533]">1998</span>
                <span className="font-baloo mt-1 text-xs font-bold uppercase tracking-wider text-[#FFF3D6]/80">Family Legacy Since</span>
              </StampBadge>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FRANCHISE CTA BAND ============ */}
      <section className="py-14 sm:py-20 bg-[#E46A12] relative overflow-hidden" data-testid="home-franchise-cta">
        <div className="absolute inset-0 jali-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <p className="font-baloo text-sm font-bold uppercase tracking-[0.18em] text-[#FFF3D6]">
                Business Bhi, Mithaas Bhi
              </p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl text-[#FFFDF7] leading-tight">
                Apne Sheher Mein Kholo Desi Mastaani
              </h2>
              <p className="mt-4 text-[#FFF3D6]/90 leading-relaxed max-w-md">
                70+ partners ne sirf 18 months mein humpe bharosa kiya. Proven FOCO model,
                poora support, aur ek brand jo log pehle se pyaar karte hain.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-6">
              <Button
                asChild
                size="lg"
                data-testid="franchise-band-cta-button"
                className="bg-[#3A0B1E] hover:bg-[#2B0816] text-[#FFC533] font-baloo font-bold text-base rounded-[14px] px-7 py-6 shadow-[0_8px_0_rgba(26,18,8,0.25)] hover:translate-y-[2px] transition-transform"
              >
                <Link to="/franchise">
                  Franchise Enquiry Karo <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { step: "01", label: "Enquire", desc: "Form bharo ya WhatsApp karo" },
                { step: "02", label: "Discuss", desc: "Team se model samjho" },
                { step: "03", label: "Onboard", desc: "Location + setup finalize" },
                { step: "04", label: "Launch", desc: "Grand opening, meethi shuruaat" },
              ].map((s) => (
                <div key={s.step} className="rounded-[20px] bg-[#FFFDF7] p-4 shadow-[0_10px_30px_rgba(26,18,8,0.14)]">
                  <span className="font-display text-2xl text-[#D11B6B]">{s.step}</span>
                  <p className="font-baloo font-bold text-[#3A0B1E] mt-1">{s.label}</p>
                  <p className="text-xs text-[#1A1208]/65 mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LOCATE TEASER ============ */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="home-locate-teaser">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeading
            kicker="Nearest Desi Mastaani"
            title="Kahan Milega Desi Mastaani?"
            sub="37 cities, 120+ outlets — apna sheher search karo."
          />
          <Reveal delay={0.1} className="mt-8">
            <form onSubmit={goLocate} className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B6452C]/60" />
                <Input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Apna sheher likho... jaise Rajkot"
                  data-testid="home-locate-search-input"
                  className="pl-10 h-12 bg-[#FFF3D6] border-[#D6A84A]/60 text-[#1A1208] rounded-[14px] focus-visible:ring-[#D11B6B]"
                />
              </div>
              <Button
                type="submit"
                data-testid="home-locate-search-button"
                className="h-12 bg-[#1F7A3A] hover:bg-[#186230] text-[#FFFDF7] font-baloo font-bold rounded-[14px] px-6"
              >
                Dhundo
              </Button>
            </form>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {TOP_CITIES.map((c) => (
                <Link
                  key={c}
                  to={`/locate?q=${encodeURIComponent(c)}`}
                  data-testid={`home-city-chip-${c.toLowerCase()}`}
                  className="rounded-full border border-[#B6452C]/40 bg-[#FFF3D6] px-4 py-1.5 text-sm font-baloo font-bold text-[#B6452C] hover:bg-[#B6452C] hover:text-[#FFFDF7] transition-colors"
                >
                  <MapPin className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                  {c}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
