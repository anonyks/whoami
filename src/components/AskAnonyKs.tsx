import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Knowledge base: each entry has keywords (any match scores) and a response
const KB: { keywords: string[]; exact?: string[]; response: string }[] = [
  {
    keywords: [],
    exact: ['hi', 'hey', 'hello', 'sup', 'yo', 'hola', 'hii', 'hiii'],
    response: "Hey! I'm Kishan (AnonyKs). Ask me about my projects, featured work, skills, or anything else.",
  },
  {
    keywords: ['who', 'about', 'yourself', 'introduce', 'kishan', 'anonyks', 'name', 'bio'],
    response: "Kishan Shah (AnonyKs) — CS student into automation, cybersec, programming & experimentation. Previously did bug bounty (break) with recognitions from the UN, UNESCO, Harvard, and US gov agencies.",
  },
  {
    keywords: ['project', 'repo', 'repos', 'repository', 'code', 'work', 'portfolio', 'made', 'created'],
    response: "I build automation scripts, security tools, and experimental projects. Check the projects section or github.com/anonyks",
  },
  {
    keywords: ['interest', 'into', 'passionate', 'like', 'enjoy', 'hobby', 'hobbies', 'do you do'],
    response: "Automation & scripting, cybersecurity (break), programming & experimentation, and general CS learning.",
  },
  {
    keywords: ['learn', 'study', 'studying', 'course', 'education', 'college', 'university', 'student', 'school'],
    response: "Currently studying automation, cybersec, programming, experimentation, algorithms, systems, networking, and data structures.",
  },
  {
    keywords: ['github', 'git', 'source', 'open source'],
    response: "github.com/anonyks — check out my repos!",
  },
  {
    keywords: ['contact', 'email', 'reach', 'telegram', 'message', 'dm', 'connect', 'hire', 'talk'],
    response: "shahishan555@gmail.com · GitHub: github.com/anonyks · X: x.com/anonyks_xD · Telegram: @AnonyKs_xD",
  },
  {
    keywords: ['featured', 'hall of fame', 'hof', 'recognition', 'security', 'bug bounty', 'bounty', 'hack', 'vuln', 'disclosure', 'cert', 'cybersec'],
    response: "Hall of Fame at the United Nations, UNESCO (3rd), European Govt (top 8), Debian.org, TOR Project, multiple US agencies, and recognition from Harvard. Full archive: github.com/anonyks/KS-Archive",
  },
  {
    keywords: ['tool', 'built', 'build', 'script', 'automat', 'utility', 'program'],
    response: "Automation scripts, security tools like HiddenVDP/ComboSorter/KeywordExtractor, and experimental projects. See github.com/anonyks",
  },
  {
    keywords: ['achieve', 'award', 'win', 'won', 'competition', 'contest', 'ctf', 'olympiad', 'robo', 'expo', 'stem', 'club', 'president'],
    response: "Robo Battle 2023 winner, 1st Runner Tech Expo 2023, UTECH CTF 2023, Top 100 Mathematical Olympiad 2024, PEA Quiz Winner 2024, STEM Club President 2022–2024.",
  },
  {
    keywords: ['skill', 'tech', 'stack', 'language', 'python', 'javascript', 'html', 'css', 'arduino'],
    response: "Python, JavaScript, HTML/CSS, C, Arduino — mostly building automation tools and experimenting with different tech.",
  },
  {
    keywords: ['social', 'twitter', 'x.com', 'instagram', 'reddit', 'facebook', 'link', 'profile'],
    response: "GitHub: github.com/anonyks · X: x.com/anonyks_xD · Instagram: anonyks_xD · Reddit: anonyks_xD · Telegram: @AnonyKs_xD",
  },
];

function findAnswer(q: string): string {
  const lower = q.toLowerCase().trim().replace(/[?!.,]/g, '');
  const words = lower.split(/\s+/);

  // Score each KB entry by how many keywords match
  // Check exact matches first (greetings, etc.)
  for (const entry of KB) {
    if (entry.exact && entry.exact.some(e => e === lower || words.includes(e))) {
      return entry.response;
    }
  }

  // Score by keyword overlap
  let bestScore = 0;
  let bestResponse = '';

  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestResponse = entry.response;
    }
  }

  if (bestScore > 0) return bestResponse;

  // Fallback: try to be helpful
  return "Hmm, try asking about my projects, featured work, interests, skills, or achievements.";
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function AskAnonyKs() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Hey, I'm Kishan (AnonyKs). Ask me anything about my work, interests, or projects." },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input };
    const botMsg: Message = { role: 'bot', text: findAnswer(input) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2 bg-secondary border border-border rounded text-sm text-foreground hover:border-foreground/30 transition-colors border-glow"
      >
        {open ? '✕ close' : '> ask anonyks'}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-6 z-40 w-80 max-h-96 border border-border rounded bg-card border-glow flex flex-col"
          >
            <div className="px-3 py-2 border-b border-border text-xs text-muted-foreground">
              ask anonyks — terminal chatbot
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 text-sm max-h-64">
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'text-foreground' : 'text-secondary-foreground'}>
                  <span className="text-terminal-green-dim">{msg.role === 'user' ? '>' : '$'}</span>{' '}
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex border-t border-border">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="ask something..."
                className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                spellCheck={false}
              />
              <button
                onClick={send}
                className="px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ↵
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
