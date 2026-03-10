import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Featured Work Section
 * Showcases the most impressive security achievements from KS-Archive:
 * Hall of Fame inductions at major organizations and government bodies.
 */

interface FeaturedItem {
  organization: string;
  type: 'hall-of-fame' | 'recognition' | 'appreciation';
  detail: string;
  year: string;
  link: string;
  highlight?: boolean;
}

// Ordered by prestige/top-tier importance
const featuredItems: FeaturedItem[] = [
  {
    organization: 'United Nations',
    type: 'hall-of-fame',
    detail: 'Inducted into the United Nations Hall of Fame for responsible vulnerability disclosure.',
    year: '2021',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Hall%20of%20Fame%20~%20United%20Nations%20~%202021-08.PNG',
    highlight: true,
  },
  {
    organization: 'UNESCO',
    type: 'hall-of-fame',
    detail: 'Ranked 3rd on the UNESCO Hall of Fame for security contributions.',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Hall%20of%20Fame%20%5B3rd%5D%20~%20UNESCO%20~%202024.jpeg',
    highlight: true,
  },
  {
    organization: 'Harvard University',
    type: 'recognition',
    detail: 'Received a Thank You Letter from Harvard University for security research.',
    year: '2021',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Thank%20You%20Letter%20~%20Harvard%20University%20~%202021-06-30.pdf',
    highlight: true,
  },
  {
    organization: 'European Government',
    type: 'hall-of-fame',
    detail: 'Top 8 recognition across European Government Hall of Fame (10 inductions).',
    year: '2023',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Hall%20of%20Fame%20(10th)%20~%20European%20Government%20~%202023.jpeg',
    highlight: true,
  },
  {
    organization: 'TOR Project',
    type: 'appreciation',
    detail: 'Swag Pack & Thank You Memo from the TOR Project.',
    year: '2021',
    link: 'https://github.com/anonyks/KS-Archive',
    highlight: true,
  },
  {
    organization: 'Debian.org',
    type: 'hall-of-fame',
    detail: 'Hall of Fame induction at Debian.org.',
    year: '2023',
    link: 'https://github.com/anonyks/KS-Archive',
    highlight: true,
  },
  {
    organization: 'US Dept. of Education',
    type: 'recognition',
    detail: 'Certificate of Recognition from the US Department of Education (×2).',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Certificate%20of%20Recognition%20~%20US%20Department%20of%20Education%20~%202024-08.pdf',
    highlight: true,
  },
  {
    organization: 'SONY',
    type: 'appreciation',
    detail: 'Swag received from SONY for security contributions.',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive',
  },
  {
    organization: 'US Environmental Protection Agency',
    type: 'hall-of-fame',
    detail: 'Hall of Fame induction at the US EPA.',
    year: '2023',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Hall%20of%20Fame%20~%20US%20Environmental%20Protection%20Agency%20~%202023.png',
  },
  {
    organization: 'US Dept. of Health & Human Services',
    type: 'hall-of-fame',
    detail: 'Hall of Fame recognition at HHS.',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Hall%20of%20Fame%20~%20US%20Department%20of%20Health%20%26%20Human%20Services%20~%202024.jpeg',
  },
  {
    organization: 'US Dept. of Agriculture',
    type: 'hall-of-fame',
    detail: 'Hall of Fame induction at USDA.',
    year: '2023',
    link: 'https://github.com/anonyks/KS-Archive',
  },
  {
    organization: 'US Dept. of Veteran Affairs',
    type: 'hall-of-fame',
    detail: 'Hall of Fame induction at VA.',
    year: '2023',
    link: 'https://github.com/anonyks/KS-Archive',
  },
  {
    organization: 'University of Nebraska',
    type: 'hall-of-fame',
    detail: 'Hall of Fame induction & Security Champion recognition.',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive',
  },
  {
    organization: 'Dutch Government',
    type: 'appreciation',
    detail: 'Multiple appreciation letters and swag from the Dutch Government for responsible disclosure.',
    year: '2021–2023',
    link: 'https://github.com/anonyks/KS-Archive/blob/main/Letter%20of%20Appreciation%20~%20Dutch%20Government%20%7BNetherlands%7D%20~%202021-2023.jpg',
  },
  {
    organization: 'Leiden University',
    type: 'appreciation',
    detail: 'Appreciation Letters from Leiden University.',
    year: '2024',
    link: 'https://github.com/anonyks/KS-Archive',
  },
];

// Type badge colors using semantic tokens
const typeBadge: Record<string, { label: string; className: string }> = {
  'hall-of-fame': { label: 'HALL OF FAME', className: 'text-foreground border-foreground/30' },
  recognition: { label: 'RECOGNITION', className: 'text-terminal-cyan border-terminal-cyan/30' },
  appreciation: { label: 'APPRECIATION', className: 'text-terminal-amber border-terminal-amber/30' },
};

export default function FeaturedWorkSection() {
  const [showAll, setShowAll] = useState(false);

  // Array is already ordered by prestige — no sorting needed
  const visible = showAll ? featuredItems : featuredItems.slice(0, 8);

  return (
    <section id="featured" className="px-4 py-20 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-1">
          <span className="text-muted-foreground">$</span> cat featured-work.md
        </h2>
        <p className="text-xs text-muted-foreground mb-6 pl-4">
          Security research recognitions from governments, universities, and organizations worldwide.
        </p>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground mb-3 px-2">
            top {featuredItems.length} recognitions
          </div>

          {visible.map((item, i) => {
            const badge = typeBadge[item.type];
            return (
              <motion.a
                key={`${item.organization}-${item.year}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`block py-3 px-3 rounded hover:bg-secondary/50 transition-colors group ${
                  item.highlight ? 'border-l-2 border-foreground/40' : ''
                }`}
              >
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-terminal-green-dim shrink-0 mt-0.5">→</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-foreground group-hover:text-glow transition-all font-medium">
                        {item.organization}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 border rounded ${badge.className}`}>
                        {badge.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.year}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {featuredItems.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 ml-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAll ? '→ show less' : `→ show all ${featuredItems.length} recognitions`}
          </button>
        )}

        <a
          href="https://github.com/anonyks/KS-Archive"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 ml-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          → view full archive on GitHub
        </a>
      </motion.div>
    </section>
  );
}
