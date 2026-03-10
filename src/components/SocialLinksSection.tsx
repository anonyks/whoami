import { motion } from 'framer-motion';

const socials = [
  { label: 'GitHub', href: 'https://github.com/anonyks', icon: '⌘' },
  { label: 'X / Twitter', href: 'https://x.com/anonyks_xD', icon: '𝕏' },
  { label: 'Instagram', href: 'https://instagram.com/anonyks_xD', icon: '◎' },
  { label: 'Reddit', href: 'https://reddit.com/user/anonyks_xD', icon: '⊙' },
  { label: 'Telegram', href: 'https://t.me/anonyks_xD', icon: '▷' },
  { label: 'Facebook', href: 'https://m.me/anonyks.xd', icon: '⬡' },
];

export default function SocialLinksSection() {
  return (
    <section id="social" className="px-4 py-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> cat social.txt
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 py-2.5 px-3 rounded border border-border hover:border-foreground/30 hover:bg-secondary/50 transition-colors group text-sm"
            >
              <span className="text-terminal-green-dim">{s.icon}</span>
              <span className="text-secondary-foreground group-hover:text-foreground transition-colors">
                {s.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
