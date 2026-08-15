import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LIGHT_BG = ["#FFC533"];

export const FlavourCard = ({ flavour, compact = false }) => {
  const isLight = LIGHT_BG.includes(flavour.color);
  const textMain = isLight ? "text-[#1A1208]" : "text-[#FFFDF7]";
  const textSub = isLight ? "text-[#1A1208]/75" : "text-[#FFF3D6]/85";
  const chipCls = isLight
    ? "bg-[#1A1208]/10 text-[#1A1208]"
    : "bg-[#FFFDF7]/20 text-[#FFFDF7]";

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 0.2 }}
      whileTap={{ scale: 0.98 }}
      className="group h-full overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(26,18,8,0.10)]"
      style={{ backgroundColor: flavour.color }}
      data-testid={`flavour-card-${flavour.id}`}
    >
      <div className="overflow-hidden">
        <AspectRatio ratio={compact ? 4 / 3 : 16 / 10}>
          <img
            src={flavour.image}
            alt={`${flavour.name} kulfi`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </AspectRatio>
      </div>
      <div className="p-5">
        <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-baloo font-bold uppercase tracking-wider ${chipCls}`}>
          {flavour.badge}
        </span>
        <h3 className={`font-display mt-2.5 text-xl sm:text-2xl ${textMain}`}>{flavour.name}</h3>
        <p className={`mt-1.5 text-sm leading-relaxed ${textSub}`}>{flavour.tagline}</p>
        {!compact && (
          <p className={`mt-2 text-xs leading-relaxed ${textSub} opacity-90`}>{flavour.description}</p>
        )}
      </div>
    </motion.div>
  );
};
