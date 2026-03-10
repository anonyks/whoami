import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  'initializing portfolio...',
  'loading modules...',
  'connecting to github...',
  'decrypting identity...',
  'welcome, visitor.',
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 600);
        setTimeout(onComplete, 1200);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md w-full px-6">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${i === lines.length - 1 && i === bootLines.length - 1 ? 'text-foreground text-glow' : 'text-muted-foreground'}`}
              >
                <span className="text-terminal-green-dim mr-2">&gt;</span>
                {line}
              </motion.div>
            ))}
            <span className="inline-block w-2 h-4 bg-foreground animate-blink mt-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
