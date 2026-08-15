import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MatkaIcon } from "@/components/site/Doodles";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/kulfi", label: "Our Kulfi" },
  { to: "/franchise", label: "Franchise" },
  { to: "/locate", label: "Locate Us" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50" data-testid="main-navbar">
      <TruckArtDivider />
      <div
        className={cn(
          "bg-[#FFF3D6]/95 backdrop-blur-md border-b border-[#D6A84A]/40",
          scrolled ? "shadow-[0_10px_30px_rgba(26,18,8,0.10)]" : ""
        )}
      >
        <nav
          className={cn(
            "max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-[padding] duration-300",
            scrolled ? "py-2" : "py-3.5"
          )}
        >
          <Link to="/" className="flex items-center gap-2.5" data-testid="navbar-logo-link">
            <span
              className={cn(
                "flex items-center justify-center rounded-full bg-[#E46A12] text-[#FFFDF7] transition-[width,height] duration-300",
                scrolled ? "h-9 w-9" : "h-11 w-11"
              )}
            >
              <MatkaIcon className={scrolled ? "h-5 w-5" : "h-6 w-6"} />
            </span>
            <span className="leading-none">
              <span className="font-display block text-lg sm:text-xl text-[#B6452C]">
                Desi Mastaani
              </span>
              <span className="font-baloo block text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#D11B6B]">
                Banaye Meethi Yaadein
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  cn(
                    "nav-link font-baloo font-bold text-sm text-[#1A1208]/80 hover:text-[#B6452C]",
                    isActive && "active text-[#B6452C]"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button
              asChild
              data-testid="nav-franchise-cta-button"
              className="bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold rounded-[14px] px-5 shadow-[0_6px_0_rgba(58,11,30,0.25)] hover:translate-y-[1px] transition-transform"
            >
              <Link to="/franchise">Franchise Enquiry</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden border-[#B6452C]/50 text-[#B6452C] bg-transparent hover:bg-[#B6452C]/10 rounded-[12px]"
                data-testid="mobile-menu-button"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FFF3D6] border-l-[#D6A84A]/50 w-[300px]" data-testid="mobile-menu-sheet">
              <div className="mt-8 flex flex-col gap-1">
                {LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={({ isActive }) =>
                      cn(
                        "font-display text-2xl py-2.5 px-3 rounded-[14px] text-[#3A0B1E] hover:bg-[#E46A12]/10",
                        isActive && "text-[#D11B6B] bg-[#D11B6B]/5"
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <Button
                  asChild
                  className="mt-4 bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold rounded-[14px] h-12 text-base"
                  data-testid="mobile-franchise-cta-button"
                >
                  <Link to="/franchise" onClick={() => setOpen(false)}>
                    Franchise Enquiry
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};
