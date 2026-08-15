import { cn } from "@/lib/utils";

// Festive seal / mithai-box certification stamp
export const StampBadge = ({ children, className = "", rotate = -1, ...rest }) => (
  <div
    className={cn(
      "stamp inline-flex flex-col items-center justify-center px-6 py-5 text-center",
      className
    )}
    style={{ transform: `rotate(${rotate}deg)` }}
    {...rest}
  >
    {children}
  </div>
);
