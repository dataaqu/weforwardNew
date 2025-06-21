import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "framer-motion";

// Import service images
import airServiceImg from '../assets/air service.webp';
import roadServiceImg from '../assets/road service.webp';
import seaServiceImg from '../assets/sea service.webp';
import railServiceImg from '../assets/rail service.webp';
import warehouseServiceImg from '../assets/warehouse service.webp';
import brokageServiceImg from '../assets/brockage service.webp';

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Air Freight",
      src: airServiceImg,
      description: "Fast and reliable air cargo services for urgent shipments worldwide. We handle time-sensitive deliveries with precision and care."
    },
    {
      title: "Road Freight",
      src: roadServiceImg,
      description: "Comprehensive ground transportation solutions for domestic and international deliveries. Door-to-door service with real-time tracking."
    },
    {
      title: "Sea Freight",
      src: seaServiceImg,
      description: "Cost-effective ocean freight for large volumes and oversized cargo. Full container load (FCL) and less than container load (LCL) options available."
    },
    {
      title: "Rail freight",
      src: railServiceImg,
      description: "Eco-friendly rail transport for bulk commodities and containers. Efficient intermodal solutions connecting major trade routes."
    },
    {
      title: "Warehouse Service",
      src: warehouseServiceImg,
      description: "Modern warehouse facilities with advanced inventory management systems. Secure storage, pick & pack, and distribution services."
    },
    {
      title: "Customs brokerage",
      src: brokageServiceImg,
      description: "Expert customs brokerage services to ensure smooth border crossings. Complete documentation handling and compliance management."
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
