import { useState } from 'react';

const links = [
  { label: 'about', href: '#about' },
  { label: 'featured', href: '#featured' },
  { label: 'projects', href: '#projects' },
  { label: 'social', href: '#social' },
  { label: 'contact', href: '#contact' },
  { label: 'github', href: 'https://github.com/anonyks', external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-sm text-foreground text-glow font-semibold">
          AnonyKs
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex gap-6">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-xs text-muted-foreground"
        >
          {menuOpen ? '[close]' : '[menu]'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border bg-background px-4 py-3 space-y-2">
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
