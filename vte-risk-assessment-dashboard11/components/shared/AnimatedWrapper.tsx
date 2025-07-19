import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: Variants;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  animation,
  className = '',
  style,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px 0px -50px 0px',
  as = 'div'
}) => {
  const { ref, controls } = useScrollAnimation({
    threshold,
    triggerOnce,
    rootMargin,
  });

  const defaultAnimation: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const MotionComponent = motion[as as keyof typeof motion] as any;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animation || defaultAnimation}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

// Specialized animated components for common use cases
export const AnimatedCard: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: {
        opacity: 0,
        y: 50,
        scale: 0.95,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
  />
);

export const AnimatedHeader: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: {
        opacity: 0,
        y: -30,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
  />
);

export const AnimatedTable: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: {
        opacity: 0,
        y: 40,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.05
        }
      }
    }}
  />
);

export const AnimatedChart: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
  />
);

export const AnimatedList: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2
        }
      }
    }}
  />
);

export const AnimatedListItem: React.FC<AnimatedWrapperProps> = (props) => (
  <AnimatedWrapper
    {...props}
    animation={{
      hidden: {
        opacity: 0,
        x: -20,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
  />
); 