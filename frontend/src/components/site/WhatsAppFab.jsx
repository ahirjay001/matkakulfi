import { WhatsAppIcon } from "@/components/site/Doodles";
import { WHATSAPP_URL } from "@/lib/brand";

export const WhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    data-testid="whatsapp-floating-cta"
    className="whatsapp-fab fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white ring-4 ring-[#FFF3D6] hover:scale-105 transition-transform"
  >
    <WhatsAppIcon className="h-7 w-7" />
  </a>
);
