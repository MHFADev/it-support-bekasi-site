import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Award, ArrowRight, Laptop, Settings, Shield } from 'lucide-react';
import { CONTENT, SITE_INFO } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

function getHeroTitleLines(title: string): [string, string] {
  // Prefer splitting by sentences for clean 2-line desktop titles.
  const sentences = title
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length >= 2) {
    const first = `${sentences[0]}.`;
    const second = `${sentences.slice(1).join(' ').trim()}.`;
    return [first, second.replace(/\.\.+$/, '.')];
  }

  // Fallback: split by comma.
  const parts = title.split(',').map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 2) return [`${parts[0]},`, parts.slice(1).join(', ')];

  // Final fallback: split roughly in half.
  const words = title.split(' ').filter(Boolean);
  const mid = Math.max(1, Math.floor(words.length / 2));
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ') || ''];
}

const Hero: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].hero;

  const titleLines = getHeroTitleLines(content.title);

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-28 bg-[#0F172A]">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 animate-pulse delay-700"></div>
        {/* Abstract Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>
      
      {/* Bottom transition gradient to content below (blue → white) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10",
          "h-56 bg-gradient-to-b",
          "from-blue-900/55 via-primary/20 to-background"
        )}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 backdrop-blur-sm"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em]">{content.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn(
                "mb-7 font-bold tracking-tight",
                "leading-[1.08] lg:leading-[1.02]",
                "text-4xl sm:text-5xl md:text-6xl lg:text-[4rem]",
                "text-white",
                "max-w-[20ch] lg:max-w-none",
                "[text-wrap:balance]",
                // Desktop: paksa tepat 2 baris (tiap baris tidak wrap lagi)
                "lg:[&>span]:whitespace-nowrap"
              )}
            >
              <span className="block">{titleLines[0]}</span>
              {titleLines[1] ? <span className="block">{titleLines[1]}</span> : null}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-normal"
            >
              {content.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="rounded-xl px-8 h-14 font-semibold text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Link to="/shop" className="flex items-center gap-2">
                  {content.ctaSecondary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl px-8 h-14 font-semibold text-base border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                <a href="#shop">{content.ctaPrimary}</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 group">
              {/* Main Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-700">
                <img 
                  src="https://cdn.jsdelivr.net/gh/mhfadev/asset@main/itsupport/20260203_120154_0000.png" 
                  alt="Technician working" 
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700"></div>
              </div>

              {/* Advanced Decorative Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-blue-600 rounded-3xl shadow-xl flex items-center justify-center z-20 hidden md:flex"
              >
                <Laptop className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 z-20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Garansi Unit</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">100% Aman Terjamin</p>
                  </div>
                </div>
              </motion.div>

              {/* Glowing Background Glows */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/30 blur-[120px] rounded-full -z-10 animate-pulse delay-700"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;