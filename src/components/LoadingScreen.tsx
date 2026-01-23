import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Icon Placeholder */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 mb-8 text-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M20 16V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12" />
            <path d="M2 16h20" />
            <path d="M6 22h12" />
            <path d="m9 16 3 3 3-3" />
          </svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-tight text-foreground mb-4"
        >
          IT Support <span className="text-primary">Bekasi</span>
        </motion.h1>

        {/* Loading Bar Container */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-primary"
          />
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">
          Memuat pengalaman terbaik...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
