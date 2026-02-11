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
        <nav className="fixed top-0 w-full z-50 glass-card py-4 border-b border-amber-900/20">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <button
                    onClick={scrollToTop}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
                    aria-label="Vibe Flow Coding Home"
                >
                    <BrandLogo className="w-16 h-10" showText={false} />
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[#C5A059] text-base font-black tracking-[0.2em] uppercase">VIBE FLOW</span>
                        <span className="text-slate-400 text-[9px] font-bold tracking-[0.4em] uppercase mt-1">CODING</span>
                    </div>
                </button>

                <div className="hidden lg:flex gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-400 items-center">
                    <a href="#pain-points" onClick={scrollTo('pain-points')} className="hover:text-[#C5A059] transition-colors">{t.solutions}</a>
                    <a href="#restaurant-suite" onClick={scrollTo('restaurant-suite')} className="hover:text-[#C5A059] transition-colors">{t.suite}</a>
                    <a href="#services" onClick={scrollTo('services')} className="hover:text-[#C5A059] transition-colors">{t.services}</a>
                    <a href="#contact" onClick={scrollTo('contact')} className="hover:text-[#C5A059] transition-colors">{t.contact}</a>

                    <div className="flex items-center gap-2 border-l border-white/10 pl-10">
                        <button
                            onClick={() => setLang('es')}
                            className={`transition-colors font-bold ${lang === 'es' ? 'text-[#C5A059]' : 'text-slate-600 hover:text-slate-400'}`}
                        >
                            ES
                        </button>
                        <span className="text-slate-700">/</span>
                        <button
                            onClick={() => setLang('en')}
                            className={`transition-colors font-bold ${lang === 'en' ? 'text-[#C5A059]' : 'text-slate-600 hover:text-slate-400'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-[#C5A059] hover:bg-[#D4B069] px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest text-black transition-all shadow-lg shadow-amber-900/20"
                >
                    {t.book}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
