import { useTypingEffect } from '@/hooks/useTypingEffect';
import { motion } from 'framer-motion';

const terminalLines = [
  { text: '$ whoami', isCommand: true, delay: 300 },
  { text: 'Kishan Shah (AnonyKs)', delay: 200 },
  { text: '', delay: 100 },
  { text: '$ role', isCommand: true, delay: 400 },
  { text: 'CS Student', delay: 200 },
  { text: '', delay: 100 },
  { text: '$ interests', isCommand: true, delay: 400 },
  { text: 'automation', delay: 100 },
  { text: 'cybersec', delay: 100 },
  { text: 'programming', delay: 100 },
  { text: 'experimentation', delay: 100 },
];

export default function HeroTerminal() {
  const { displayedLines, isComplete, currentLineIndex } = useTypingEffect(terminalLines, 800);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Terminal window */}
        <div className="rounded border border-border border-glow overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-terminal-amber/60" />
            <div className="w-3 h-3 rounded-full bg-terminal-green/60" />
            <span className="ml-2 text-xs text-muted-foreground">kishan@anonyks:~</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 bg-background min-h-[320px] relative">
            <div className="scanline absolute inset-0" />
            <div className="relative z-10 space-y-0.5">
              {displayedLines.map((line, i) => {
                const isCmd = terminalLines[i]?.isCommand;
                return (
                  <div key={i} className="leading-relaxed">
                    {isCmd ? (
                      <span className="text-foreground text-glow">{line}</span>
                    ) : (
                      <span className="text-secondary-foreground">{line}</span>
                    )}
                  </div>
                );
              })}
              {!isComplete && (
                <span className="inline-block w-2 h-5 bg-foreground animate-blink" />
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 mt-6"
          >
            <a
              href="#projects"
              className="px-5 py-2 border border-border rounded text-sm text-foreground hover:bg-secondary hover:border-foreground/30 transition-colors"
            >
              View Projects
            </a>
            <a
              href="https://github.com/anonyks"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              GitHub ↗
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
