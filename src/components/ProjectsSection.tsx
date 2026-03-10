import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  // Repos to exclude from display (trivial, basic, or practice repos)
  const EXCLUDED_REPOS = new Set([
    'anonyks', 'anonyks.github.io', 'sorter', 'movebysize',
    'hello-world', 'test', 'practice', 'demo', 'beivsbct',
  ]);

  useEffect(() => {
    fetch('https://api.github.com/users/anonyks/repos?sort=updated&per_page=30')
      .then(r => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) { setLoading(false); return; }
        const filtered = data.filter(r =>
          !r.fork &&
          !EXCLUDED_REPOS.has(r.name.toLowerCase()) &&
          (r.description || r.stargazers_count > 0)
        );
        // Sort KS-Archive to top
        filtered.sort((a, b) => {
          if (a.name.toLowerCase() === 'ks-archive') return -1;
          if (b.name.toLowerCase() === 'ks-archive') return 1;
          return 0;
        });
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="px-4 py-20 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg text-foreground text-glow mb-6">
          <span className="text-muted-foreground">$</span> ls projects/
        </h2>

        {loading ? (
          <div className="text-muted-foreground text-sm animate-blink">loading...</div>
        ) : repos.length === 0 ? (
          <div className="text-muted-foreground text-sm">No repositories found.</div>
        ) : (
          <div className="space-y-1">
            {repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-sm py-2.5 px-3 rounded hover:bg-secondary/50 transition-colors group"
              >
                <span className="text-terminal-green-dim shrink-0">→</span>
                <div className="flex-1 min-w-0">
                  <span className="text-foreground group-hover:text-glow transition-all">
                    {repo.name}/
                  </span>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">
                      {repo.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                  {repo.language && <span>{repo.language}</span>}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
