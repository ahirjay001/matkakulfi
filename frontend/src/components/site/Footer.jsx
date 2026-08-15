import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { MatkaIcon, WhatsAppIcon, MarigoldIcon } from "@/components/site/Doodles";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { PHONE_DISPLAY, PHONE_TEL, EMAIL_PLACEHOLDER, WHATSAPP_URL } from "@/lib/brand";

export const Footer = () => (
  <footer className="relative" data-testid="main-footer">
    <TruckArtDivider />
    <div className="bg-[#3A0B1E] jali-bg-gold noise-overlay text-[#FFF3D6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E46A12] text-[#FFFDF7]">
                <MatkaIcon className="h-5 w-5" />
              </span>
              <div className="leading-none">
                <p className="font-display text-xl text-[#FFC533]">Desi Mastaani</p>
                <p className="font-baloo text-[11px] font-semibold text-[#FFF3D6]/70">
                  Banaye Meethi Yaadein
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#FFF3D6]/75">
              Matka mein bani, dil se banayi. Gujarat ki apni matka kulfi — 120+ locations,
              ek hi promise: har scoop mein nostalgia.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="footer-instagram-link" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6A84A]/50 text-[#FFC533] hover:bg-[#D6A84A]/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-testid="footer-facebook-link" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6A84A]/50 text-[#FFC533] hover:bg-[#D6A84A]/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-testid="footer-youtube-link" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6A84A]/50 text-[#FFC533] hover:bg-[#D6A84A]/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-lg text-[#FFC533] mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: "/kulfi", label: "Our Kulfi" },
                { to: "/franchise", label: "Franchise" },
                { to: "/locate", label: "Locate Us" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[#FFF3D6]/75 hover:text-[#FFC533] transition-colors inline-flex items-center gap-2">
                    <MarigoldIcon className="h-3 w-3 text-[#E46A12]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-[#FFC533] mb-4">Baat Karein</h3>
            <ul className="space-y-3 text-sm text-[#FFF3D6]/80">
              <li>
                <a href={PHONE_TEL} className="flex items-center gap-2.5 hover:text-[#FFC533] transition-colors" data-testid="footer-phone-link">
                  <Phone className="h-4 w-4 text-[#E46A12]" /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#FFC533] transition-colors" data-testid="footer-whatsapp-link">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp Karo
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#E46A12]" /> {EMAIL_PLACEHOLDER}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#E46A12] mt-0.5" /> Mor N Mor Foods LLP, Ahmedabad, Gujarat
              </li>
            </ul>
          </div>

          {/* Family */}
          <div>
            <h3 className="font-display text-lg text-[#FFC533] mb-4">Mor N Mor Family</h3>
            <p className="text-sm leading-relaxed text-[#FFF3D6]/75">
              Desi Mastaani is a proud member of the Mor N Mor Foods LLP family — Ahmedabad ka
              F&B ghar, since 1998. Sibling brands: Mor N Rich & Chill House.
            </p>
            <div className="stamp mt-5 inline-flex flex-col items-center px-5 py-3" style={{ transform: "rotate(1deg)" }}>
              <span className="font-display text-2xl text-[#FFC533]">120+</span>
              <span className="font-baloo text-[11px] font-bold uppercase tracking-wider text-[#FFF3D6]/80">
                Locations in Gujarat
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#D6A84A]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF3D6]/55">
          <p>© {new Date().getFullYear()} Desi Mastaani · Mor N Mor Foods LLP. All rights reserved.</p>
          <p className="font-baloo font-semibold">Made with pyaar in Gujarat</p>
        </div>
      </div>
    </div>
  </footer>
);
