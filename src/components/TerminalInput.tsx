import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  help      - show this message
  about     - who is AnonyKs
  featured  - highlighted security work
  projects  - list projects
  skills    - areas of interest
  github    - open GitHub profile
  contact   - contact info
  clear     - clear terminal`,
  featured: `→ Featured Security Work (Hall of Fame & Recognitions):
  ★ United Nations — Hall of Fame (2021)
  ★ UNESCO — 3rd on Hall of Fame (2024)
  ★ European Government — 10th induction (2023)
  ★ Harvard University — Thank You Letter (2021)
  ★ US Dept. of Education — Recognition ×2 (2024)
  ★ Dutch Government — Multiple appreciations (2021–2023)
  ★ Debian.org, TOR Project, SONY, Vivaldi & more
  → Full archive: github.com/anonyks/KS-Archive`,
  about: `Kishan Shah (AnonyKs) — CS Student
Previously explored bug bounty & cybersecurity (break).
Now focused on core CS, automation scripts, and experimental tools.
A curious all-rounder exploring multiple areas of computing.`,
  projects: `→ Check the projects section above or visit:
  https://github.com/anonyks`,
  skills: `→ Automation & Scripting
→ Cybersecurity / Bug Bounty (break)
→ Programming & Experimentation
→ General CS Learning`,
  github: () => {
    window.open('https://github.com/anonyks', '_blank');
    return 'Opening GitHub profile...';
  },
  contact: `→ GitHub: https://github.com/anonyks
→ Email: shahishan555@gmail.com
→ X/Twitter: x.com/anonyks_xD
→ Instagram: instagram.com/anonyks_xD`,
};

interface HistoryLine {
  type: 'input' | 'output';
  text: string;
}

export default function TerminalInput() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Type "help" for available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: HistoryLine[] = [
      ...history,
      { type: 'input', text: `$ ${cmd}` },
    ];

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const output = typeof handler === 'function' ? handler() : handler;
      newHistory.push({ type: 'output', text: output });
    } else if (trimmed) {
      newHistory.push({ type: 'output', text: `command not found: ${trimmed}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> terminal
        </h2>
        <div
          className="border border-border rounded border-glow bg-card cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <div ref={scrollRef} className="p-4 max-h-64 overflow-y-auto space-y-1 text-sm">
            {history.map((line, i) => (
              <div
                key={i}
                className={line.type === 'input' ? 'text-foreground' : 'text-muted-foreground'}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {line.text}
              </div>
            ))}
            <div className="flex items-center gap-1">
              <span className="text-terminal-green-dim">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none text-foreground caret-foreground"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
