import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowRight, Phone, Mail, MapPin, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { WhatsAppIcon } from "@/components/site/Doodles";
import { submitContact } from "@/lib/api";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL_PLACEHOLDER, WHATSAPP_URL } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";

export default function Contact() {
  useSEO(
    "Contact — Desi Mastaani | Baat Karein",
    "Desi Mastaani se contact karo — phone, WhatsApp ya form ke through. General enquiries welcome!"
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
      const res = await submitContact(data);
      setSuccess(res.message);
      toast.success("Message mil gaya!", { description: res.message });
      reset();
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        "Kuch gadbad ho gayi. Please dobara try karo ya WhatsApp karo.";
      toast.error("Oops!", { description: String(msg) });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#FFF3D6] jali-bg py-14 sm:py-18 relative overflow-hidden" data-testid="contact-hero">
        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full gulal-glow" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Baat Karein"
            title="Sawaal? Suggestion? Ya Bas Kulfi Ki Taarif?"
            sub="Sab sunna hai humein. Form bharo, call karo, ya seedha WhatsApp — jo easy lage."
          />
        </div>
      </section>
      <TruckArtDivider />

      <section className="py-14 sm:py-20 bg-[#FFFDF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact details */}
          <Reveal className="lg:col-span-2">
            <div className="rounded-[24px] bg-[#3A0B1E] jali-bg-gold noise-overlay p-7 h-full">
              <h2 className="font-display text-2xl text-[#FFC533]">Seedha Contact</h2>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={PHONE_TEL} className="flex items-center gap-3.5 text-[#FFF3D6] hover:text-[#FFC533] transition-colors" data-testid="contact-phone-link">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E46A12] shrink-0">
                      <Phone className="h-5 w-5 text-[#FFFDF7]" />
                    </span>
                    <span>
                      <span className="block font-baloo font-bold text-sm">Call Karo</span>
                      <span className="block text-sm text-[#FFF3D6]/75">{PHONE_DISPLAY}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 text-[#FFF3D6] hover:text-[#FFC533] transition-colors" data-testid="contact-whatsapp-link">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] shrink-0">
                      <WhatsAppIcon className="h-5 w-5 text-white" />
                    </span>
                    <span>
                      <span className="block font-baloo font-bold text-sm">WhatsApp Karo</span>
                      <span className="block text-sm text-[#FFF3D6]/75">Fastest reply yahin milta hai</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3.5 text-[#FFF3D6]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D11B6B] shrink-0">
                    <Mail className="h-5 w-5 text-[#FFFDF7]" />
                  </span>
                  <span>
                    <span className="block font-baloo font-bold text-sm">Email</span>
                    <span className="block text-sm text-[#FFF3D6]/75">{EMAIL_PLACEHOLDER}</span>
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-[#FFF3D6]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E4ED8] shrink-0">
                    <MapPin className="h-5 w-5 text-[#FFFDF7]" />
                  </span>
                  <span>
                    <span className="block font-baloo font-bold text-sm">Head Office</span>
                    <span className="block text-sm text-[#FFF3D6]/75">Mor N Mor Foods LLP, Ahmedabad, Gujarat</span>
                  </span>
                </li>
                <li className="flex items-center gap-3.5 text-[#FFF3D6]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1F7A3A] shrink-0">
                    <Clock className="h-5 w-5 text-[#FFFDF7]" />
                  </span>
                  <span>
                    <span className="block font-baloo font-bold text-sm">Response Time</span>
                    <span className="block text-sm text-[#FFF3D6]/75">24–48 hours, pakka promise</span>
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-[#FFF3D6]/50">
                Franchise ke liye?{" "}
                <a href="/franchise" className="underline text-[#FFC533]">Franchise page</a> pe dedicated form hai.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            {success ? (
              <div
                className="rounded-[24px] bg-[#FFF3D6] border-2 border-[#1F7A3A]/40 p-10 text-center h-full flex flex-col items-center justify-center"
                data-testid="contact-success-panel"
              >
                <CheckCircle2 className="h-14 w-14 text-[#1F7A3A]" />
                <h3 className="font-display text-2xl text-[#3A0B1E] mt-4">Message Mil Gaya!</h3>
                <p className="text-sm text-[#1A1208]/75 mt-2 leading-relaxed max-w-sm">{success}</p>
                <Button
                  onClick={() => setSuccess(null)}
                  data-testid="contact-new-message-button"
                  className="mt-6 bg-[#E46A12] hover:bg-[#C95C0E] text-[#FFFDF7] font-baloo font-bold rounded-[14px]"
                >
                  Naya Message Bhejo
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[24px] bg-[#FFF3D6] shadow-[0_18px_50px_rgba(26,18,8,0.10)] p-6 sm:p-8 space-y-5"
                data-testid="contact-form"
                noValidate
              >
                <input
                  type="text"
                  {...register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Naam *</label>
                    <Input
                      {...register("name", { required: "Naam zaroori hai", minLength: { value: 2, message: "Kam se kam 2 characters" } })}
                      placeholder="Aapka naam"
                      data-testid="contact-name-input"
                      className="mt-1.5 h-12 bg-[#FFFDF7] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                    />
                    {errors.name && (
                      <p className="text-xs text-[#C22] mt-1" data-testid="contact-name-error">{errors.name.message}</p>
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
                      data-testid="contact-email-input"
                      className="mt-1.5 h-12 bg-[#FFFDF7] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#C22] mt-1" data-testid="contact-email-error">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Phone (optional)</label>
                  <Input
                    type="tel"
                    {...register("phone", {
                      pattern: { value: /^[+]?[\d\s\-()]{10,15}$/, message: "Valid phone number likho (10 digits)" },
                    })}
                    placeholder="98765 43210"
                    data-testid="contact-phone-input"
                    className="mt-1.5 h-12 bg-[#FFFDF7] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#C22] mt-1" data-testid="contact-phone-error">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="font-baloo font-bold text-sm text-[#3A0B1E]">Message *</label>
                  <Textarea
                    {...register("message", { required: "Message zaroori hai", minLength: { value: 5, message: "Thoda detail mein likho (min 5 characters)" } })}
                    placeholder="Kya kehna chahte ho?"
                    rows={5}
                    data-testid="contact-message-input"
                    className="mt-1.5 bg-[#FFFDF7] border-[#D6A84A]/60 rounded-[14px] focus-visible:ring-[#D11B6B]"
                  />
                  {errors.message && (
                    <p className="text-xs text-[#C22] mt-1" data-testid="contact-message-error">{errors.message.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="contact-submit-button"
                  className="w-full py-6 bg-[#1F7A3A] hover:bg-[#186230] text-[#FFFDF7] font-baloo font-bold text-base rounded-[14px] shadow-[0_8px_0_rgba(26,18,8,0.2)] hover:translate-y-[2px] transition-transform disabled:opacity-60"
                >
                  {isSubmitting ? "Bhej rahe hain..." : "Message Bhejo"}
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
