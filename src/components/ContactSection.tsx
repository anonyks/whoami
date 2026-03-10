import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 py-20 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> contact
        </h2>
        <div className="space-y-2 text-sm">
          <a
            href="https://github.com/anonyks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition-colors py-1"
          >
            <span className="text-terminal-green-dim">→</span>
            github.com/anonyks
          </a>
          <a
            href="mailto:shahishan555@gmail.com"
            className="flex items-center gap-2 text-secondary-foreground hover:text-foreground transition-colors py-1"
          >
            <span className="text-terminal-green-dim">→</span>
            shahishan555@gmail.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}
