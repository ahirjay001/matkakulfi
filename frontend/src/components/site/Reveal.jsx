import { motion } from "framer-motion";

// Scroll-triggered pop reveal with joyful spring (per design guidelines)
export const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 18, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.9, delay }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);
