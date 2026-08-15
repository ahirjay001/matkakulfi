import { cn } from "@/lib/utils";

export const TruckArtDivider = ({ className = "" }) => (
  <div className={cn("truck-art-strip w-full", className)} aria-hidden="true" />
);
