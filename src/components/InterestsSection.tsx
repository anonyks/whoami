import { motion } from 'framer-motion';

const interests = [
  { name: 'Automation & Scripting', icon: '⚙' },
  { name: 'Cybersecurity / Bug Bounty', icon: '🔒', note: 'break' },
  { name: 'Programming & Experimentation', icon: '⌨' },
  { name: 'General CS Learning', icon: '📚' },
];

export default function InterestsSection() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> ls interests/
        </h2>
        <div className="space-y-2">
          {interests.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-sm py-2 px-3 rounded hover:bg-secondary/50 transition-colors"
            >
              <span className="text-terminal-green-dim">drwxr-xr-x</span>
              <span className="text-secondary-foreground">{item.name}</span>
              {item.note && (
                <span className="text-xs text-muted-foreground">({item.note})</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
