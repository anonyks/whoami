import { motion } from 'framer-motion';

const topics = [
  'automation',
  'cybersecurity',
  'programming',
  'experimentation',
  'algorithms',
  'systems',
  'networking',
  'data-structures',
];

export default function LearningSection() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> cat learning.log
        </h2>
        <div className="space-y-1">
          {topics.map((topic, i) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-sm py-1.5 px-3 flex items-center gap-2"
            >
              <span className="text-terminal-green-dim">→</span>
              <span className="text-secondary-foreground">{topic}</span>
              <span className="text-muted-foreground text-xs">[in progress]</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
