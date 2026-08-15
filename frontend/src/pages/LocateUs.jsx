import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, MapPin, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TruckArtDivider } from "@/components/site/TruckArtDivider";
import { MatkaIcon } from "@/components/site/Doodles";
import { getLocations } from "@/lib/api";
import { WHATSAPP_FRANCHISE_URL } from "@/lib/brand";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const REGIONS = ["All", "Central", "North", "South", "Saurashtra", "Kutch"];

const REGION_COLORS = {
  Central: "#E46A12",
  North: "#1E4ED8",
  South: "#1F7A3A",
  Saurashtra: "#D11B6B",
  Kutch: "#B6452C",
};

export default function LocateUs() {
  useSEO(
    "Locate Us — Desi Mastaani | 120+ Outlets in Gujarat",
    "Kahan milega Desi Mastaani? Search karo apna sheher — 120+ matka kulfi outlets across 37 cities in Gujarat."
  );

  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [region, setRegion] = useState("All");
  const [data, setData] = useState({ locations: [], total_outlets: 0, total_cities: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations()
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = data.locations;
    if (region !== "All") list = list.filter((l) => l.region === region);
    if (query.trim()) {
      const needle = query.trim().toLowerCase();
      list = list.filter(
        (l) =>
          l.city.toLowerCase().includes(needle) ||
          l.region.toLowerCase().includes(needle) ||
          l.areas.some((a) => a.toLowerCase().includes(needle))
      );
    }
    return list;
  }, [data.locations, query, region]);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#FFF3D6] jali-bg py-14 sm:py-18 relative overflow-hidden" data-testid="locate-hero">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full marigold-glow" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            kicker="Nearest Desi Mastaani"
            title="Kahan Milega Desi Mastaani?"
            sub={`${data.total_outlets || "120+"} outlets · ${data.total_cities || "37"} cities · poora Gujarat covered.`}
          />
        </div>
      </section>
      <TruckArtDivider />

      {/* Search + results */}
      <section className="py-12 sm:py-16 bg-[#FFFDF7]" data-testid="locate-search">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B6452C]/60" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sheher ya area search karo... jaise Ahmedabad, Adajan"
                data-testid="locate-city-search-input"
                className="pl-12 h-14 text-base bg-[#FFF3D6] border-[#D6A84A]/60 text-[#1A1208] rounded-[16px] focus-visible:ring-[#D11B6B]"
              />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  data-testid={`locate-region-chip-${r.toLowerCase()}`}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-baloo font-bold border transition-colors",
                    region === r
                      ? "bg-[#3A0B1E] text-[#FFC533] border-[#3A0B1E]"
                      : "bg-[#FFF3D6] text-[#B6452C] border-[#B6452C]/40 hover:bg-[#B6452C]/10"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-10" data-testid="locate-city-results">
            {loading ? (
              <p className="text-center text-[#1A1208]/60 py-10">Locations load ho rahi hain...</p>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((loc, i) => (
                  <Reveal key={loc.city} delay={Math.min(i * 0.04, 0.25)}>
                    <div
                      className="h-full rounded-[22px] bg-[#FFF3D6] border border-[#D6A84A]/40 p-5 hover:border-[#D6A84A] hover:shadow-[0_14px_40px_rgba(26,18,8,0.10)] transition-[border-color,box-shadow]"
                      data-testid={`locate-city-card-${loc.city.toLowerCase()}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full text-[#FFFDF7]" style={{ backgroundColor: REGION_COLORS[loc.region] || "#E46A12" }}>
                            <MapPin className="h-4.5 w-4.5" />
                          </span>
                          <div>
                            <h3 className="font-display text-lg text-[#3A0B1E] leading-tight">{loc.city}</h3>
                            <span className="font-baloo text-[11px] font-bold uppercase tracking-wider" style={{ color: REGION_COLORS[loc.region] || "#E46A12" }}>
                              {loc.region} Gujarat
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#3A0B1E] text-[#FFC533] font-baloo font-bold text-xs px-2.5 py-1">
                          <Store className="h-3 w-3" /> {loc.outlets}
                        </span>
                      </div>
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {loc.areas.map((a) => (
                          <span key={a} className="rounded-full bg-[#FFFDF7] border border-[#D6A84A]/40 px-2.5 py-0.5 text-[11px] text-[#1A1208]/70">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-md mx-auto" data-testid="locate-empty-state">
                <MatkaIcon className="h-16 w-16 text-[#B6452C]/40 mx-auto" />
                <h3 className="font-display text-2xl text-[#3A0B1E] mt-4">
                  Aapke sheher mein jaldi aa rahe hain!
                </h3>
                <p className="text-sm text-[#1A1208]/65 mt-2 leading-relaxed">
                  Abhi “{query}” mein hamara outlet nahi hai — par aap chaaho toh khud khol
                  sakte ho. Franchise ke liye ping karo!
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    data-testid="locate-empty-franchise-button"
                    className="bg-[#D11B6B] hover:bg-[#B0165A] text-[#FFFDF7] font-baloo font-bold rounded-[14px]"
                  >
                    <Link to="/franchise">Franchise Enquiry Karo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-[#1F7A3A] text-[#1F7A3A] bg-transparent hover:bg-[#1F7A3A] hover:text-[#FFFDF7] font-baloo font-bold rounded-[14px] transition-colors"
                  >
                    <a href={WHATSAPP_FRANCHISE_URL} target="_blank" rel="noopener noreferrer">WhatsApp Karo</a>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-10 text-center text-xs text-[#1A1208]/50">
            * Ye city list placeholder hai — exact outlet addresses ke liye WhatsApp pe poochho.
            Real location data aane par ye list update ho jayegi.
          </p>
        </div>
      </section>
    </div>
  );
}
