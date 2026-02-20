import React from 'react';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import BrandLogo from './BrandLogo';

interface NavbarProps {
    lang: Language;
    setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
    const t = translations[lang].nav;
    const navPillClass = "px-5 py-2.5 rounded-full border border-white/25 bg-white/5 text-white/90 backdrop-blur-md transition-all duration-300 hover:border-[#e41476]/70 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_rgba(228,20,118,0.28)]";
    const langPillBase = "px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-widest transition-all duration-300";

    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass-card header-glow py-4 border-b border-[#02c8ed]/20">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <button
                    onClick={scrollToTop}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                    aria-label="Agentyze Home"
                >
                    <BrandLogo className="h-12 w-auto" showText={true} />
                </button>

                <div className="hidden lg:flex gap-4 text-[11px] font-bold uppercase tracking-widest text-white/80 items-center">
                    <a href="#restaurant-suite" onClick={scrollTo('restaurant-suite')} className={navPillClass}>{t.suite}</a>
                    <a href="#how-it-works" onClick={scrollTo('how-it-works')} className={navPillClass}>{t.solutions}</a>
                    <a href="#services" onClick={scrollTo('services')} className={navPillClass}>{t.services}</a>
                    <a href="#contact" onClick={scrollTo('contact')} className={navPillClass}>{t.contact}</a>

                    <div className="flex items-center gap-2 border-l border-white/10 pl-6 ml-2">
                        <button
                            onClick={() => setLang('es')}
                            className={`${langPillBase} ${lang === 'es' ? 'border-[#02c8ed]/70 bg-[#02c8ed]/20 text-white' : 'border-white/25 bg-white/5 text-white/60 hover:text-white/85 hover:border-white/40'}`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`${langPillBase} ${lang === 'en' ? 'border-[#02c8ed]/70 bg-[#02c8ed]/20 text-white' : 'border-white/25 bg-white/5 text-white/60 hover:text-white/85 hover:border-white/40'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-2.5 rounded-full border border-white/25 bg-white/5 text-[11px] font-black uppercase tracking-widest text-white backdrop-blur-md transition-all duration-300 hover:border-[#e41476]/70 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(228,20,118,0.32)]"
                >
                    {t.book}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;


