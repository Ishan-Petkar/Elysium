"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide if scrolled past 100vh
      if (window.scrollY > window.innerHeight - 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full h-[100px] z-50 bg-[var(--background)] border-b border-[var(--border)]"
      >
        <div className="w-full h-full px-6 md:px-12 flex items-center justify-between max-w-[2000px] mx-auto">
          {/* Logo Section */}
          <Link href="/" className="flex flex-col items-start justify-center group" onClick={() => setIsMenuOpen(false)}>
            <div className="relative w-[260px] h-[60px] md:w-[320px] md:h-[70px]">
              <Image 
                src="/logo-cropped.png" 
                alt="Elysium Logo" 
                fill
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </div>
          </Link>

          {/* Minimalist Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative w-10 h-10 flex flex-col items-end justify-center gap-[6px] z-[60] group"
            aria-label="Toggle Menu"
          >
            <motion.div 
              animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="h-[1px] bg-[var(--foreground)] transition-colors group-hover:bg-[#6b705c]"
              style={{ width: isMenuOpen ? '24px' : '28px' }}
            />
            <motion.div 
              animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="h-[1px] bg-[var(--foreground)] transition-colors group-hover:bg-[#6b705c]"
              style={{ width: '24px' }}
            />
          </button>
        </div>
      </motion.header>

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
              className="fixed top-0 right-0 w-[320px] max-w-[85vw] h-screen bg-[var(--background)] border-l border-[var(--border)] z-50 flex flex-col justify-center px-10 shadow-2xl"
            >
              <nav className="flex flex-col gap-6 max-w-sm mt-12">
                {navLinks.map((link, i) => (
                  <motion.div key={link.name} custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-serif text-3xl text-[var(--muted-foreground)] hover:text-[#6b705c] transition-colors duration-300 font-light tracking-wide"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div 
                custom={navLinks.length} 
                variants={linkVariants}
                className="absolute bottom-12 left-10"
              >
                <div className="text-[11px] text-[var(--muted-foreground)] uppercase tracking-[0.2em] flex flex-col gap-2">
                  <span className="text-[#6b705c] mb-2">Elysium HQ</span>
                  <span>124 Architectural Way</span>
                  <span>Mumbai, Maharashtra</span>
                  <span>contact@elysium-studio.com</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
