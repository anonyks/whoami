import { motion } from 'framer-motion';

export default function GitHubSection() {
  return (
    <section className="px-4 py-16 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> github --activity
        </h2>
        <div className="border border-border rounded overflow-hidden border-glow">
          <img
            src="https://ghchart.rshah.org/00ff00/anonyks"
            alt="AnonyKs GitHub contribution graph"
            className="w-full opacity-80 p-4"
            loading="lazy"
          />
        </div>
        <a
          href="https://github.com/anonyks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          → view full profile on GitHub
        </a>
      </motion.div>
    </section>
  );
}
