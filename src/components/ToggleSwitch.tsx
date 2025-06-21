"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface IToggleSwitchProps {
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
}

const ToggleSwitch = ({ onChange, defaultChecked }: IToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <motion.div
            animate={{
              borderColor: isChecked ? "#e5e7eb" : "#000000"
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="block h-8 w-14 rounded-full border bg-transparent"
          />
          <motion.div
            animate={{
              x: isChecked ? 24 : 0,
              backgroundColor: isChecked ? "#1e293b" : "#1e293b"
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              duration: 0.4
            }}
            className="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full"
          >
            <motion.div
              key={isChecked ? "moon" : "sun"}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              {isChecked ? (
                <Moon size={12} className="text-white" />
              ) : (
                <Sun size={12} className="text-white" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
