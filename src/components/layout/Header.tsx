"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Upcoming Projects", href: "#upcoming-projects" },
    { name: "Preview", href: "#video-preview" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header 
        className="relative w-full h-[70px] landscape:h-[60px] sm:h-[120px] md:h-[140px] z-50 bg-[var(--background)] border-b border-[var(--border)]"
      >
        <div className="w-full h-full pl-0 pr-4 sm:pl-0 sm:pr-6 md:pl-0 md:pr-12 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="#home" className="flex flex-col items-start justify-center group -ml-2 sm:-ml-4 md:-ml-6" onClick={() => setIsMenuOpen(false)}>
            <div className="relative w-[200px] h-[50px] landscape:w-[180px] landscape:h-[44px] sm:w-[320px] sm:h-[90px] md:w-[480px] md:h-[120px]">
              <Image 
                src="/elysium-logo-ultra.png" 
                alt="Elysium For You Logo" 
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </Link>

          {/* Minimalist Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-10 h-10 flex flex-col items-end justify-center gap-[6px] z-[60] group -mr-2 sm:-mr-4 md:-mr-8"
            aria-label="Toggle Menu"
          >
            <motion.div 
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] bg-[#D4AF37] transition-colors group-hover:bg-[#E5C158]"
              style={{ width: isMenuOpen ? '24px' : '28px' }}
            />
            <motion.div 
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="h-[1.5px] bg-[#D4AF37] transition-colors group-hover:bg-[#E5C158]"
              style={{ width: '24px' }}
            />
          </button>
        </div>
      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 w-[320px] max-w-[85vw] h-screen bg-[var(--background)] border-l border-[var(--border)] z-50 flex flex-col justify-center px-8 landscape:px-6 shadow-2xl overflow-y-auto"
            >
              <nav className="flex flex-col gap-4 landscape:gap-2 max-w-sm mt-12 landscape:mt-6 mb-auto pb-8 landscape:pb-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        // Smooth scrolling for anchor links
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          const target = document.querySelector(link.href);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                        setIsMenuOpen(false);
                      }}
                      className="font-serif text-3xl landscape:text-xl text-[var(--muted-foreground)] hover:text-[#6b705c] transition-colors duration-300 font-light tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div 
                custom={navLinks.length} 
                variants={linkVariants}
                className="mt-8 mb-12"
              >
                <div className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.15em] flex flex-col gap-4">
                  <div>
                    <span className="text-[#6b705c] mb-1 block">Mumbai Office</span>
                    <span className="block leading-relaxed">C Wing, Gajanan Society<br/>Lt. Dilip Gupte Marg, Mahim West<br/>Mumbai 400016</span>
                  </div>
                  <div>
                    <span className="text-[#6b705c] mb-1 block">Pune Office</span>
                    <span className="block leading-relaxed">Trendy Towers, Amanora Park Town<br/>Hadapsar, Pune 28</span>
                  </div>
                  <div className="pt-2 border-t border-[var(--border)]">
                    <span className="block mb-1">+91 83088 37355 | +91 98334 96137</span>
                    <span className="block lowercase">ashish@elysiumforyou.com</span>
                    <span className="block lowercase">sonal@elysiumforyou.com</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
