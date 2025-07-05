import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "framer-motion";
import { useTranslation } from './translation-provider';

// Import service images
import airServiceImg from '../assets/air service.webp';
import roadServiceImg from '../assets/road service.webp';
import seaServiceImg from '../assets/sea service.webp';
import railServiceImg from '../assets/rail service.webp';
import warehouseServiceImg from '../assets/warehouse service.webp';
import brokageServiceImg from '../assets/brockage service.webp';

export function FocusCardsDemo() {
  const { t } = useTranslation();
  
  const cards = [
    {
      title: t.services.services.airFreight.title,
      src: airServiceImg,
      description: t.services.services.airFreight.description
    },
    {
      title: t.services.services.roadFreight.title,
      src: roadServiceImg,
      description: t.services.services.roadFreight.description
    },
    {
      title: t.services.services.seaFreight.title,
      src: seaServiceImg,
      description: t.services.services.seaFreight.description
    },
    {
      title: t.services.services.railFreight.title,
      src: railServiceImg,
      description: t.services.services.railFreight.description
    },
    {
      title: t.services.services.warehouse.title,
      src: warehouseServiceImg,
      description: t.services.services.warehouse.description
    },
    {
      title: t.services.services.brokerage.title,
      src: brokageServiceImg,
      description: t.services.services.brokerage.description
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <FocusCards cards={cards} />
    </motion.div>
  );
}
