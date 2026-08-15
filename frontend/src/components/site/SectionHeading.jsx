import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/Reveal";
import { MarigoldGarland } from "@/components/site/Doodles";

export const SectionHeading = ({
  kicker,
  title,
  sub,
  onDark = false,
  align = "center",
  garland = true,
  className = "",
}) => (
  <Reveal
    className={cn(
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}
  >
    {kicker && (
      <p
        className={cn(
          "font-baloo text-sm sm:text-base font-bold uppercase tracking-[0.18em] mb-2",
          onDark ? "text-[#FFC533]" : "text-[#D11B6B]"
        )}
      >
        {kicker}
      </p>
    )}
    <h2
      className={cn(
        "font-display text-2xl sm:text-3xl lg:text-4xl leading-tight",
        onDark ? "text-[#FFFDF7]" : "text-[#3A0B1E]"
      )}
    >
      {title}
    </h2>
    {garland && <MarigoldGarland className="mt-4" />}
    {sub && (
      <p
        className={cn(
          "mt-4 text-sm sm:text-base leading-relaxed",
          onDark ? "text-[#FFF3D6]/80" : "text-[#1A1208]/70"
        )}
      >
        {sub}
      </p>
    )}
  </Reveal>
);
