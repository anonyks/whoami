import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg text-foreground text-glow mb-1">
          <span className="text-muted-foreground">$</span> cat about.txt
        </h2>
        <div className="border-l-2 border-border pl-4 mt-4 space-y-3 text-sm text-secondary-foreground leading-relaxed">
          <p>
            Kishan Shah, known online as <span className="text-foreground">AnonyKs</span>, is a
            CS undergraduate who previously explored bug bounty hunting and
            cybersecurity (break). Now focused on strengthening core CS knowledge while
            building automation scripts and experimental tools.
          </p>
          <p>
            Curious about many areas of computing and currently exploring different domains
            rather than focusing on a single specialization for now.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
