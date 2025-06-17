import { FocusCards } from "@/components/ui/focus-cards";
import { motion } from "framer-motion";

export function FocusCardsDemo() {
  const cards = [
    {
      title: "Air Freight",
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Fast and reliable air cargo services for urgent shipments worldwide. We handle time-sensitive deliveries with precision and care."
    },
    {
      title: "Road Freight",
      src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive ground transportation solutions for domestic and international deliveries. Door-to-door service with real-time tracking."
    },
    {
      title: "Sea Freight",
      src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Cost-effective ocean freight for large volumes and oversized cargo. Full container load (FCL) and less than container load (LCL) options available."
    },
    {
      title: "Rail freight",
      src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Eco-friendly rail transport for bulk commodities and containers. Efficient intermodal solutions connecting major trade routes."
    },
    {
      title: "Warehouse Service",
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern warehouse facilities with advanced inventory management systems. Secure storage, pick & pack, and distribution services."
    },
    {
      title: "Customs brokerage",
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
