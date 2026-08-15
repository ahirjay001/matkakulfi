import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  IceCreamCone,
  CheckCircle2,
  MessageSquare,
  Handshake,
  Store,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { CountUp } from "@/components/site/CountUp";
import { StampBadge } from "@/components/site/StampBadge";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { WhatsAppIcon } from "@/components/site/Doodles";
import { submitFranchiseEnquiry } from "@/lib/api";
import { WHATSAPP_FRANCHISE_URL } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";

const WHY_CARDS = [
  {
    icon: TrendingUp,
    title: "Rocket Momentum",
    desc: "70+ franchise partners sirf pehle 18 months mein. Ye speed batati hai — model kaam karta hai.",
  },
  {
    icon: ShieldCheck,
    title: "FOCO Model",
    desc: "Franchise-Owned, Company-Operated. Aap invest karo, operations ki tension hum sambhalte hain.",
  },
  {
    icon: Building2,
    title: "1998 Se Bharosa",
    desc: "Mor N Mor Foods LLP ki backing — 25+ saal ka F&B experience aapke saath.",
  },
  {
    icon: IceCreamCone,
    title: "Category Jo Kabhi Down Nahi",
    desc: "Kulfi India ka evergreen dessert hai. Low investment, high footfall, saal bhar demand.",
  },
];

const STEPS = [
  { icon: MessageSquare, title: "Enquire", desc: "Neeche form bharo ya seedha WhatsApp karo. 24-48 hours mein team contact karegi." },
  { icon: Handshake, title: "Discuss", desc: "Investment, location aur FOCO model — sab detail mein samjho, bina kisi pressure ke." },
  { icon: Store, title: "Onboard", desc: "Agreement, outlet setup, branding aur training — sab company handle karti hai." },
  { icon: PartyPopper, title: "Launch", desc: "Grand opening! Aapka outlet, hamari operations — meethi shuruaat." },
];

const TESTIMONIALS = [
  {
    initials: "RP",
    name: "Franchise Partner, Rajkot",
    quote: "Team ka support shuru se solid tha. Location selection se lekar daily operations tak — sab handle ho jaata hai.",
  },
  {
    initials: "MS",
    name: "Franchise Partner, Surat",
    quote: "Brand pehle se logo ko pata hai, isliye opening week se hi footfall achha mila. Best decision.",
  },
];

export default function Franchise() {
  useSEO(
    "Franchise — Desi Mastaani | Kulfi Franchise India",
    "Kulfi franchise opportunity in Gujarat & India. 70+ partners in 18 months, FOCO model, full company support. Apply now!"
  );

  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await submitFranchiseEnquiry(data);
      setSuccess(res.message);
      toast.success("Enquiry mil gayi!", { description: res.message });
      reset();
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        "Kuch gadbad ho gayi. Please dobara try karo ya WhatsApp karo.";
      toast.error("Oops!", { description: String(msg) });
    }
  };

  const scrollToForm = () => {
    document.getElementById("franchise-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFF3D6] jali-bg py-16 sm:py-20" data-testid="franchise-hero">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full gulal-glow" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Reveal>
              <span className="inline-block rounded-full bg-[#1F7A3A] text-[#FFFDF7] font-baloo font-bold text-xs sm:text-sm px-4 py-1.5">
                Franchise Opportunity · FOCO Model
              </span>
              <h1 className="font-display mt-4 text-4xl sm:text-5xl leading-[1.1] text-[#3A0B1E]">
                Business Bhi, <span className="text-[#E46A12]">Mithaas Bhi.</span>
              </h1>
              <p className="mt-4 text-[#1A1208]/75 leading-relaxed max-w-md">
                Gujarat ka fastest-growing kulfi brand ab aapke sheher aane ko taiyaar hai.
                Investment aapki, operations hamari — wahi FOCO magic jo 70+ partners ne chuna.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-7 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={scrollToForm}
                data-testid="franchise-hero-apply-button"
                className="bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] px-7 py-6 shadow-[0_8px_0_rgba(58,11,30,0.22)] hover:translate-y-[2px] transition-transform"
              >
                Abhi Enquiry Karo <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                data-testid="franchise-whatsapp-button"
                className="border-2 border-[#1F7A3A] text-[#1F7A3A] bg-transparent hover:bg-[#1F7A3A] hover:text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] px-7 py-6 transition-colors"
              >
                <a href={WHATSAPP_FRANCHISE_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5 mr-2" /> WhatsApp Pe Baat Karo
                </a>
              </Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="grid grid-cols-3 gap-4" data-testid="franchise-growth-story">
            <StampBadge rotate={-2} className="bg-[#FFFDF7]">
              <CountUp end={70} suffix="+" className="font-display text-3xl sm:text-4xl text-[#D11B6B]" />
              <span className="font-baloo text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A0B1E]/70 mt-1">Partners</span>
            </StampBadge>
            <StampBadge rotate={2} className="bg-[#FFFDF7]">
              <CountUp end={18} className="font-display text-3xl sm:text-4xl text-[#E46A12]" />
              <span className="font-baloo text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A0B1E]/70 mt-1">Months</span>
            </StampBadge>
            <StampBadge rotate={-1} className="bg-[#FFFDF7]">
              <CountUp end={120} suffix="+" className="font-display text-3xl sm:text-4xl text-[#1F7A3A]" />
              <span className="font-baloo text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#3A0B1E]/70 mt-1">Outlets</span>
            </StampBadge>
          </Reveal>
        </div>
      </section>
      <TruckArtDivider />

      {/* Why */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="franchise-why-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Kyun Desi Mastaani?"
            title="Proof Dekho, Phir Decide Karo"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.08}>
                  <div className="h-full rounded-[24px] bg-[#FFF3D6] border border-[#D6A84A]/40 p-6 hover:border-[#D6A84A] hover:shadow-[0_18px_50px_rgba(26,18,8,0.12)] transition-[border-color,box-shadow]">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E46A12] text-[#FFFDF7]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg text-[#3A0B1E] mt-4">{c.title}</h3>
                    <p className="text-sm text-[#1A1208]/70 leading-relaxed mt-2">{c.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOCO model overview */}
      <section className="py-14 sm:py-20 bg-[#FFF3D6] jali-bg" data-testid="franchise-foco-model">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Model Overview"
            title="Seedhi Baat, No Confusion"
            sub="Sab kuch transparent — investment se support tak."
          />
          <Reveal delay={0.1} className="mt-10">
            <Accordion type="single" collapsible defaultValue="investment" className="space-y-4">
              {[
                {
                  id: "investment",
                  q: "Investment Range Kitna Hai?",
                  a: "Approximate range ₹5–15 Lakh (PLACEHOLDER — exact investment range, setup cost aur breakdown discussion call pe share kiye jaate hain, location aur format ke hisaab se).",
                },
                {
                  id: "included",
                  q: "Package Mein Kya-Kya Included Hai?",
                  a: "Outlet setup & branding, equipment, initial stock, staff hiring & training, aur launch marketing support (PLACEHOLDER — final inclusions list team confirm karegi).",
                },
                {
                  id: "support",
                  q: "Company Se Kya Support Milta Hai?",
                  a: "FOCO model mein daily operations, supply chain, quality control aur marketing company handle karti hai. Aapko regular reports aur returns milte hain.",
                },
                {
                  id: "eligibility",
                  q: "Kaun Apply Kar Sakta Hai?",
                  a: "Koi bhi individual ya business jo apne sheher mein prime/high-footfall location arrange kar sake (PLACEHOLDER — detailed eligibility criteria discussion pe clear hoti hai).",
                },
              ].map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-[20px] border border-[#D6A84A]/50 bg-[#FFFDF7] px-5 data-[state=open]:border-[#D6A84A]"
                  data-testid={`foco-accordion-${item.id}`}
                >
                  <AccordionTrigger className="font-baloo font-bold text-[#3A0B1E] hover:no-underline text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#1A1208]/75 leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-4 text-xs text-[#1A1208]/55 text-center">
              * PLACEHOLDER figures — exact investment, inclusions aur eligibility final discussion mein confirm hoti hai.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="py-14 sm:py-20 bg-[#3A0B1E] jali-bg-gold noise-overlay" data-testid="franchise-steps">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            onDark
            kicker="Sirf 4 Steps"
            title="Enquiry Se Launch Tak"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="relative h-full rounded-[22px] bg-[#4A1128] border border-[#D6A84A]/30 p-6 pt-8">
                    <span className="absolute -top-4 left-6 font-display text-lg bg-[#FFC533] text-[#3A0B1E] rounded-full h-9 w-9 flex items-center justify-center shadow-[0_4px_0_rgba(26,18,8,0.3)]">
                      {i + 1}
                    </span>
                    <Icon className="h-7 w-7 text-[#E46A12]" />
                    <h3 className="font-display text-xl text-[#FFC533] mt-3">{s.title}</h3>
                    <p className="text-xs text-[#FFF3D6]/75 leading-relaxed mt-2">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 bg-[#FFFDF7]" data-testid="franchise-testimonials">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Partners Ki Zubaani"
            title="Jo Jud Chuke Hain, Wo Kya Kehte Hain"
            sub="(Placeholder testimonials — real partner quotes & photos coming soon)"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.initials} delay={i * 0.1}>
                <div className="h-full rounded-[24px] bg-[#FFF3D6] border border-[#D6A84A]/40 p-6">
                  <p className="font-display text-4xl text-[#D11B6B]/40 leading-none">“</p>
                  <p className="text-sm text-[#1A1208]/80 leading-relaxed -mt-2">{t.quote}</p>
                  <div className="flex items-center gap-3 mt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B6452C] text-[#FFFDF7] font-baloo font-bold text-sm">
                      {t.initials}
                    </span>
                    <span className="font-baloo font-bold text-sm text-[#3A0B1E]">{t.name}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="franchise-enquiry" className="py-14 sm:py-20 bg-[#FFF3D6] jali-bg" data-testid="franchise-enquiry-section">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Chalo Shuru Karein"
            title="Franchise Enquiry Form"
            sub="2 minute lagenge. Team 24–48 hours mein contact karegi — pakka."
          />
          <Reveal delay={0.1} className="mt-10">
            {success ? (
              <div
                className="rounded-[24px] bg-[#FFFDF7] border-2 border-[#1F7A3A]/40 p-8 text-center"
                data-testid="franchise-success-panel"
              >
                <CheckCircle2 className="h-14 w-14 text-[#1F7A3A] mx-auto" />
                <h3 className="font-display text-2xl text-[#3A0B1E] mt-4">Enquiry Mil Gayi!</h3>
                <p className="text-sm text-[#1A1208]/75 mt-2 leading-relaxed">{success}</p>
                <Button
                  onClick={() => setSuccess(null)}
                  data-testid="franchise-new-enquiry-button"
                  className="mt-6 bg-[#E46A12] hover:bg-[#C95C0E] text-[#FFFDF7] font-baloo font-bold rounded-[14px]"
                >
                  Nayi Enquiry Bhejo
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[24px] bg-[#FFFDF7] shadow-[0_18px_50px_rgba(26,18,8,0.12)] p-6 sm:p-8 space-y-5"
                data-testid="franchise-enquiry-form"
                noValidate
              >
                {/* Honeypot (hidden anti-spam field) */}
                <input
                  type="text"
                  {...register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div>
                  <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Naam *</label>
                  <Input
                    {...register("name", { required: "Naam zaroori hai", minLength: { value: 2, message: "Kam se kam 2 characters" } })}
                    placeholder="Aapka poora naam"
                    data-testid="franchise-name-input"
                    className="mt-1.5 h-12 bg-[#FFF3D6] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#C22] mt-1" data-testid="franchise-name-error">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Phone *</label>
                    <Input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number zaroori hai",
                        pattern: { value: /^[+]?[\d\s\-()]{10,15}$/, message: "Valid phone number likho (10 digits)" },
                      })}
                      placeholder="98765 43210"
                      data-testid="franchise-phone-input"
                      className="mt-1.5 h-12 bg-[#FFF3D6] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#C22] mt-1" data-testid="franchise-phone-error">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Email *</label>
                    <Input
                      type="email"
                      {...register("email", {
                        required: "Email zaroori hai",
                        pattern: { value: /^[\w.+-]+@[\w-]+\.[\w.-]+$/, message: "Valid email likho" },
                      })}
                      placeholder="aap@example.com"
                      data-testid="franchise-email-input"
                      className="mt-1.5 h-12 bg-[#FFF3D6] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#C22] mt-1" data-testid="franchise-email-error">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="font-baloo font-bold text-sm text-[#3A0B1E]">City / Location of Interest *</label>
                  <Input
                    {...register("city", { required: "City zaroori hai", minLength: { value: 2, message: "Kam se kam 2 characters" } })}
                    placeholder="Jaise: Rajkot, Kalawad Road"
                    data-testid="franchise-city-input"
                    className="mt-1.5 h-12 bg-[#FFF3D6] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                  />
                  {errors.city && (
                    <p className="text-xs text-[#C22] mt-1" data-testid="franchise-city-error">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Message (optional)</label>
                  <Textarea
                    {...register("message")}
                    placeholder="Kuch bhi poochna ho toh yahan likho..."
                    rows={4}
                    data-testid="franchise-message-input"
                    className="mt-1.5 bg-[#FFF3D6] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="franchise-enquiry-submit-button"
                  className="w-full h-13 py-6 bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] shadow-[0_8px_0_rgba(58,11,30,0.22)] hover:translate-y-[2px] transition-transform disabled:opacity-60"
                >
                  {isSubmitting ? "Bhej rahe hain..." : "Enquiry Submit Karo"}
                  {!isSubmitting && <ArrowRight className="ml-1 h-5 w-5" />}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
