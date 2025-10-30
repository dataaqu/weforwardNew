'use client';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface TextEffectProps {
  children: string;
  className?: string;
  per?: 'word' | 'char';
  variants?: any;
  trigger?: boolean;
}

export function TextEffect({
  children,
  className,
  per = 'word',
  variants,
  trigger = true,
}: TextEffectProps) {
  const words = children.split(' ');
  const chars = children.split('');

  const renderWords = () => (
    <motion.div
      className={cn('inline-flex flex-wrap', className)}
      variants={variants?.container}
      initial="hidden"
      animate={trigger ? 'visible' : 'exit'}
      exit="exit"
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={`${word}-${wordIndex}`}
          className="inline-block mr-2"
          variants={variants?.item}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );

  const renderChars = () => (
    <motion.div
      className={cn('inline-flex', className)}
      variants={variants?.container}
      initial="hidden"
      animate={trigger ? 'visible' : 'exit'}
      exit="exit"
    >
      {chars.map((char, charIndex) => (
        <motion.span
          key={`${char}-${charIndex}`}
          className="inline-block"
          variants={variants?.item}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {per === 'word' ? renderWords() : renderChars()}
    </AnimatePresence>
  );
}
