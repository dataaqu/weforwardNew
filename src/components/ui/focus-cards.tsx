"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const CardContent = (
      <motion.div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img
          src={card.src}
          alt={card.title}
          className="object-cover absolute inset-0 w-full h-full"
        />
        
        {/* Title and description overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 transition-opacity duration-300",
            hovered === index ? "opacity-100" : "opacity-0"
          )}
        >
          <h3 className="uppercase text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#309f69] to-[#2ff9c3] mb-4 text-center">
            {card.title}
          </h3>
          <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed font-firago">
            {card.description}
          </p>
        </div>
      </motion.div>
    );

    return card.link ? (
      <Link to={card.link} className="block">
        {CardContent}
      </Link>
    ) : (
      CardContent
    );
  }
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  description?: string;
  link?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
