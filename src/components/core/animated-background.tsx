import React, { createContext, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundContextProps {
  value: string;
  setValue: (value: string) => void;
}

const AnimatedBackgroundContext = createContext<AnimatedBackgroundContextProps | undefined>(undefined);

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
  transition?: any;
}

interface ChildProps {
  'data-id': string;
  onClick?: () => void;
  [key: string]: any;
}

export function AnimatedBackground({
  children,
  defaultValue,
  className,
  transition,
}: AnimatedBackgroundProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return (
    <AnimatedBackgroundContext.Provider value={{ value, setValue: handleSetValue }}>
      <div className="relative">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ChildProps>(child)) {
            const childProps = child.props as ChildProps;
            return React.cloneElement(child, {
              'data-checked': childProps['data-id'] === value,
              onClick: () => {
                handleSetValue(childProps['data-id']);
                childProps.onClick?.();
              },
            });
          }
          return child;
        })}
        <motion.div
          className={cn('absolute inset-0', className)}
          layoutId="background"
          transition={transition}
          style={{
            zIndex: -1,
          }}
        />
      </div>
    </AnimatedBackgroundContext.Provider>
  );
}
