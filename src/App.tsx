import React, { useState, useEffect } from 'react';
import { translations } from './i18n/translations';
import { Language } from './types';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import BrandLogo from './components/BrandLogo';
import divisorOne from '../assets/divisor_one.png';

type IndustryCard = {
    title: string;
    description: string;
    image: string;
    alt: string;
};

const INDUSTRY_CARDS_BY_LANG: Record<Language, IndustryCard[]> = {
    es: [
        {
            title: 'Automatización de Tickets',
            description: 'Pedidos conversacionales con IA contextual que eliminan tareas manuales y aumentan el ticket promedio.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1400',
            alt: 'Restaurante elegante con ambientación premium',
        },
        {
            title: 'Automatización de Respuestas por Correo',
            description: 'Agentes IA que gestionan consultas, reclamos y seguimiento en tiempo real.',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1400',
            alt: 'Laptop mostrando bandeja de correo y automatizaciones',
        },
        {
            title: 'Optimización de Ganancias',
            description: 'Análisis predictivo para maximizar margen y reducir desperdicio operativo.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400',
            alt: 'Dashboard financiero con métricas y análisis',
        },
        {
            title: 'Agente Conversacional IA',
            description: 'Asistencia automatizada 24/7 conectada a su ecosistema de negocio.',
            image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=1400',
            alt: 'Chat de WhatsApp en dispositivo móvil',
        },
        {
            title: 'Gestión Inteligente de Inventario',
            description: 'Predicción de demanda y control automatizado de stock.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1400',
            alt: 'Inventario y estanterías de almacén industrial',
        },
    ],
    en: [
        {
            title: 'Ticket Automation',
            description: 'Context-aware conversational ordering that removes manual tasks and increases average ticket value.',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1400',
            alt: 'Elegant restaurant with premium ambience',
        },
        {
            title: 'Email Response Automation',
            description: 'AI agents that manage inquiries, claims, and follow-ups in real time.',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1400',
            alt: 'Laptop showing inbox and automation workflows',
        },
        {
            title: 'Profit Optimization',
            description: 'Predictive analytics to maximize margin and reduce operational waste.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1400',
            alt: 'Financial dashboard with metrics and analysis',
        },
        {
            title: 'Conversational AI Agent',
            description: '24/7 automated assistance connected to your business ecosystem.',
            image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=1400',
            alt: 'WhatsApp chat on a mobile device',
        },
        {
            title: 'Smart Inventory Management',
            description: 'Demand forecasting and automated stock control.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1400',
            alt: 'Inventory and industrial warehouse shelving',
        },
    ],
};

const INDUSTRY_SUITE_COPY: Record<
    Language,
    {
        ariaLabel: string;
        badge: string;
        titleStart: string;
        titleHighlight: string;
        description: string;
        cardAriaPrefix: string;
    }
> = {
    es: {
        ariaLabel: 'Sistemas inteligentes para su industria',
        badge: 'Sistemas inteligentes para su industria',
        titleStart: 'Sistemas Inteligentes para su',
        titleHighlight: 'Industria',
        description: 'Automatización modular impulsada por IA para operaciones de alto rendimiento',
        cardAriaPrefix: 'Mostrar card',
    },
    en: {
        ariaLabel: 'Intelligent systems for your industry',
        badge: 'Intelligent systems for your industry',
        titleStart: 'Intelligent Systems for your',
        titleHighlight: 'Industry',
        description: 'AI-powered modular automation for high-performance operations',
        cardAriaPrefix: 'Show card',
    },
};

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('es');
    const t = translations[lang];

    // SEO: Dynamically update the html lang attribute and document title
    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = lang === 'es'
            ? 'Agentyze | Transformación Empresarial con IA'
            : 'Agentyze | AI-Powered Business Transformation';
    }, [lang]);

    const contactInfo = {
        phone: "+50671266775",
        whatsappLink: "https://wa.me/50671266775",
        email: "vibeflowcoding@gmail.com"
    };

    const handleEmailClick = () => {
        const subject = lang === 'es' ? 'Solicitud de Auditoría Estratégica' : 'Strategic Audit Request';
        window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}`;
    };
    const [activeIndustryCardIndex, setActiveIndustryCardIndex] = useState(0);
    const [industryCardProgress, setIndustryCardProgress] = useState(0);
    const [isIndustryCardPaused, setIsIndustryCardPaused] = useState(false);
    const industryCards = INDUSTRY_CARDS_BY_LANG[lang];
    const industrySuiteCopy = INDUSTRY_SUITE_COPY[lang];

    const activeIndustryCard = industryCards[activeIndustryCardIndex];

    useEffect(() => {
        setActiveIndustryCardIndex(0);
        setIndustryCardProgress(0);
    }, [lang]);

    useEffect(() => {
        const tickMs = 100;
        if (isIndustryCardPaused) return;

        const timer = window.setInterval(() => {
            setIndustryCardProgress((current) => {
                const next = current + (tickMs / 4000) * 100;
                if (next >= 100) {
                    setActiveIndustryCardIndex((idx) => (idx + 1) % industryCards.length);
                    return 0;
                }
                return next;
            });
        }, tickMs);

        return () => window.clearInterval(timer);
    }, [isIndustryCardPaused, industryCards.length]);

    const handleIndustryCardSelect = (index: number) => {
        setActiveIndustryCardIndex(index);
        setIndustryCardProgress(0);
    };

    const renderBeyondIcon = (icon: string) => {
        switch (icon) {
            case 'robot':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 3h6" />
                        <path d="M12 3v3" />
                        <rect x="4" y="7" width="16" height="12" rx="3" />
                        <path d="M4 12H2M22 12h-2" />
                        <circle cx="9" cy="12" r="1" />
                        <circle cx="15" cy="12" r="1" />
                        <path d="M9 16h6" />
                    </svg>
                );
            case 'mail':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 8l9 6 9-6" />
                    </svg>
                );
            case 'conversion':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19h16" />
                        <path d="M6 15l4-4 3 3 5-6" />
                        <path d="M15 8h3v3" />
                    </svg>
                );
            case 'money':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M8 6h8" />
                        <path d="M10 3c.5 1.2 1.6 2 2 2s1.5-.8 2-2" />
                        <path d="M5 14c0-4 3-7 7-7s7 3 7 7c0 4-3.5 7-7 7s-7-3-7-7z" />
                        <path d="M12 10v8" />
                        <path d="M14.2 12.2c-.3-.7-1-1.2-2.2-1.2-1.3 0-2 .6-2 1.4s.8 1.2 2 1.5c1.2.3 2.2.7 2.2 1.8 0 .9-.8 1.7-2.2 1.7-1.2 0-2.1-.5-2.5-1.5" />
                    </svg>
                );
            case 'gear':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.8 1.8 0 0 1-2.6 2.6l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.8 1.8 0 0 1-3.6 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.8 1.8 0 0 1-2.6-2.6l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1.8 1.8 0 0 1 0-3.6h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.8 1.8 0 0 1 2.6-2.6l.1.1a1 1 0 0 0 1.1.2h.2a1 1 0 0 0 .6-.9V4a1.8 1.8 0 0 1 3.6 0v.2a1 1 0 0 0 .6.9h.2a1 1 0 0 0 1.1-.2l.1-.1a1.8 1.8 0 0 1 2.6 2.6l-.1.1a1 1 0 0 0-.2 1.1v.2a1 1 0 0 0 .9.6H20a1.8 1.8 0 0 1 0 3.6h-.2a1 1 0 0 0-.9.6z" />
                    </svg>
                );
            case 'calendar':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                    </svg>
                );
            case 'chart':
                return (
                    <svg className="w-[46px] h-[46px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 20V6" />
                        <path d="M4 20h16" />
                        <rect x="7" y="12" width="3" height="6" />
                        <rect x="12" y="9" width="3" height="9" />
                        <rect x="17" y="6" width="3" height="12" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen gradient-bg selection:bg-[#02c8ed] selection:text-white">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#02c8ed] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold focus:text-xs focus:uppercase focus:tracking-widest">
                {lang === 'es' ? 'Ir al contenido principal' : 'Skip to main content'}
            </a>
            <Navbar lang={lang} setLang={setLang} />

            <main id="main-content" role="main">
                <header className="group pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${divisorOne})` }}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-[#101b37]/60" aria-hidden="true" />
                    <div className="container mx-auto text-center relative z-10">
                        <div className="inline-block px-5 py-2 mb-8 rounded-sm text-[10px] font-black text-[#67E7FF] uppercase tracking-[0.32em] border border-[#02c8ed]/70 bg-[#101b37]/40 backdrop-blur-sm [text-shadow:0_0_10px_rgba(2,200,237,0.9),0_0_20px_rgba(2,200,237,0.45)]">
                            {t.hero.badge}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-8xl font-black mb-10 tracking-tighter leading-none">
                            {t.hero.title.split(' ').slice(0, -1).join(' ')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#02c8ed] to-[#02c8ed]">{t.hero.title.split(' ').slice(-1)}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-6 font-medium leading-relaxed tracking-wide">
                            {t.hero.desc}
                        </p>
                        <p className="text-sm md:text-base text-[#e41476] max-w-2xl mx-auto mb-14 font-bold tracking-wide">
                            {t.hero.stats}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a
                                href={contactInfo.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#e41476] hover:bg-[#e41476] text-white px-6 py-4 md:px-10 md:py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#e41476]/20 transition-all transform hover:-translate-y-1 flex items-center gap-2 justify-center w-full sm:w-auto"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.897-5.335 11.9-11.894a11.83 11.83 0 00-3.415-8.414" /></svg>
                                {t.hero.cta1}
                            </a>
                            <button
                                onClick={handleEmailClick}
                                className="glass-card hover:bg-white/5 px-6 py-4 md:px-10 md:py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                {t.hero.cta2}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Divider 1 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                                {/* Restaurant Suite Section */}
                <section id="restaurant-suite" className="py-20 md:py-32 px-6 bg-[#0f1326] overflow-hidden relative" aria-label={industrySuiteCopy.ariaLabel}>
                    <div className="container mx-auto">
                        <div className="text-center mb-14 animate-on-scroll">
                            <div className="inline-block px-4 py-1 mb-6 rounded-sm bg-[#02c8ed]/10 text-[#02c8ed] text-[10px] font-black uppercase tracking-[0.3em] border border-[#02c8ed]/20">
                                {industrySuiteCopy.badge}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter uppercase">
                                {industrySuiteCopy.titleStart} <span className="text-[#02c8ed]">{industrySuiteCopy.titleHighlight}</span>
                            </h2>
                            <p className="text-white/80 max-w-3xl mx-auto text-base md:text-lg font-medium leading-relaxed">
                                {industrySuiteCopy.description}
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto" onMouseEnter={() => setIsIndustryCardPaused(true)} onMouseLeave={() => setIsIndustryCardPaused(false)}>
                            <div className="relative rounded-2xl overflow-hidden border border-[#02c8ed]/35 shadow-2xl shadow-[#02c8ed]/10">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20">
                                    <div
                                        className="h-full bg-[#02c8ed] transition-[width] duration-100 ease-linear"
                                        style={{ width: `${industryCardProgress}%` }}
                                    />
                                </div>

                                <div
                                    key={activeIndustryCardIndex}
                                    className="relative min-h-[420px] md:min-h-[460px] opacity-0"
                                    style={{ animation: 'fadeInUp 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
                                >
                                    <img
                                        src={activeIndustryCard.image}
                                        alt={activeIndustryCard.alt}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#101b37]/95 via-[#101b37]/78 to-[#101b37]/45" />

                                    <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
                                        <div className="w-16 h-1 bg-[#02c8ed] mb-6" />
                                        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-white mb-4">
                                            {activeIndustryCard.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-white/90 max-w-2xl leading-relaxed font-medium">
                                            {activeIndustryCard.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center gap-3">
                                {industryCards.map((card, index) => (
                                    <button
                                        key={card.title}
                                        onClick={() => handleIndustryCardSelect(index)}
                                        className={`h-1.5 rounded-full transition-all ${index === activeIndustryCardIndex ? 'w-10 bg-[#02c8ed]' : 'w-6 bg-white/25 hover:bg-white/40'}`}
                                        aria-label={`${industrySuiteCopy.cardAriaPrefix} ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Divider 2 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 md:py-32 px-6 relative overflow-hidden" aria-label="How it works process">
                    <div className="absolute top-0 left-0 w-[40%] h-full bg-[#02c8ed]/3 blur-[150px] -z-10 rounded-full -translate-x-1/2"></div>
                    <div className="container mx-auto">
                        <div className="text-center mb-20 animate-on-scroll">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4">{t.process.title}</h2>
                            <div className="w-20 h-1 bg-[#02c8ed] mx-auto mb-6"></div>
                            <p className="text-white/70 font-bold tracking-widest uppercase text-xs">{t.process.subtitle}</p>
                        </div>
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#02c8ed]/40 to-transparent -translate-x-1/2" />
                            {t.process.steps.map((step, i) => (
                                <div
                                    key={i}
                                    className={`relative pl-20 md:pl-0 ${i % 2 === 0 ? 'md:pr-[54%]' : 'md:pl-[54%]'} mb-10 md:mb-12 last:mb-0 animate-on-scroll stagger-${i + 1}`}
                                >
                                    <div className="absolute left-6 md:left-1/2 top-3 -translate-x-1/2 w-14 h-14 bg-[#02c8ed]/12 border-2 border-[#02c8ed]/45 rounded-full flex items-center justify-center z-10">
                                        <span className="text-[#02c8ed] font-black text-sm tracking-[0.15em]">{step.number}</span>
                                    </div>
                                    <div className="glass-card p-6 md:p-8 border border-[#02c8ed]/25">
                                        <h3 className="text-lg font-black uppercase tracking-widest mb-4">{step.title}</h3>
                                        <p className="text-sm text-white/80 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider 4 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Beyond Restaurants Section */}
                <section id="beyond-restaurants" className="py-20 md:py-32 px-6 bg-[#0f1326] overflow-hidden" aria-label="General business automation">
                    <div className="container mx-auto">
                        <div className="text-center mb-20 animate-on-scroll">
                            <div className="inline-block px-4 py-1 mb-6 rounded-sm bg-[#02c8ed]/10 text-[#02c8ed] text-[10px] font-black uppercase tracking-[0.3em] border border-[#02c8ed]/20">
                                {t.beyondRestaurants.badge}
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4">{t.beyondRestaurants.title}</h2>
                            <div className="w-20 h-1 bg-[#02c8ed] mx-auto mb-6"></div>
                            <p className="text-white/80 font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed">{t.beyondRestaurants.desc}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {t.beyondRestaurants.items.map((item, i) => (
                                <div key={i} className={`h-full px-6 pt-5 pb-6 md:px-8 md:pt-6 md:pb-8 rounded-[14px] glass-card border border-white/8 shadow-[0_12px_28px_-20px_rgba(2,200,237,0.25)] hover:border-[#60F0F0]/45 hover:shadow-[0_20px_40px_-20px_rgba(2,200,237,0.45),0_0_18px_rgba(96,240,240,0.22)] transition-all duration-300 ease-in-out transform-gpu hover:-translate-y-2 group animate-on-scroll stagger-${i + 1}`}>
                                    <div className="text-[#02c8ed] mb-5 opacity-80 group-hover:opacity-100 group-hover:text-[#60F0F0] group-hover:drop-shadow-[0_0_14px_rgba(96,240,240,0.65)] transition-all duration-300 ease-in-out">
                                        {renderBeyondIcon(item.icon)}
                                    </div>
                                    <div className="w-10 h-px bg-[#02c8ed]/70 mb-4 group-hover:w-14 transition-all duration-300" />
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-3 text-[#02c8ed]">{item.title}</h3>
                                    <p className="text-xs text-white/80 leading-relaxed font-medium">{item.desc}</p>
                                    <div className="mt-4 space-y-2">
                                        {(item.bullets ?? []).map((bullet, j) => (
                                            <p key={j} className="text-[11px] text-white/85 leading-relaxed font-medium flex items-start gap-2">
                                                <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-[#02c8ed] shrink-0" aria-hidden="true" />
                                                <span>{bullet}</span>
                                            </p>
                                        ))}
                                    </div>
                                    {'impact' in item && item.impact ? (
                                        <p className="mt-4 pt-3 border-t border-[#60F0F0]/25 text-[11px] text-[#60F0F0]/95 leading-relaxed font-semibold">
                                            {item.impact}
                                        </p>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider 5 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Services Section */}
                <section id="services" className="py-20 bg-[#101b37] overflow-hidden" aria-label="Services and capabilities">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 animate-on-scroll">
                            <h2 className="text-4xl font-black uppercase tracking-[0.2em] mb-4">{t.services.title}</h2>
                            <div className="w-24 h-1 bg-[#02c8ed] mx-auto mb-6"></div>
                            <p className="text-white/70 font-bold tracking-widest uppercase text-xs">{t.services.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {t.services.items.map((service, idx) => (
                                <div key={idx} className={`p-6 md:p-10 rounded-sm glass-card border border-white/5 hover:border-[#02c8ed]/30 transition-all animate-on-scroll stagger-${idx + 1}`}>
                                    <div className="text-5xl mb-8 opacity-40 transition-opacity">{service.icon}</div>
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-4">{service.title}</h3>
                                    <p className="text-xs text-white/80 leading-relaxed font-medium uppercase tracking-wider opacity-80">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider 6 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Meet the Team Section */}
                <section id="team" className="py-20 md:py-32 px-6 bg-[#0f1326] overflow-hidden" aria-label="Meet the team">
                    <div className="container mx-auto">
                        <div className="text-center mb-20 animate-on-scroll">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4">{t.team.title}</h2>
                            <div className="w-20 h-1 bg-[#02c8ed] mx-auto mb-6"></div>
                            <p className="text-white/70 font-bold tracking-widest uppercase text-xs max-w-xl mx-auto">{t.team.subtitle}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                            {t.team.members.map((member, i) => (
                                <div key={i} className={`p-8 md:p-10 rounded-sm glass-card border border-white/5 hover:border-[#02c8ed]/30 transition-all text-center animate-on-scroll stagger-${i + 1}`}>
                                    {/* Placeholder avatar */}
                                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#02c8ed]/20 to-[#02c8ed]/5 border-2 border-[#02c8ed]/30 rounded-sm flex items-center justify-center">
                                        <svg className="w-10 h-10 text-[#02c8ed]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-black uppercase tracking-widest text-[#02c8ed] mb-1">{member.name}</h3>
                                    <p className="text-xs text-white/70 font-bold uppercase tracking-[0.3em] mb-5">{member.role}</p>
                                    <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">{member.bio}</p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {member.industries.map((ind, j) => (
                                            <span key={j} className="text-[9px] font-black uppercase tracking-[0.2em] text-[#02c8ed]/70 bg-[#02c8ed]/10 px-3 py-1 rounded-sm border border-[#02c8ed]/20">{ind}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider 7 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Cost of Inaction / Stakes Section */}
                <section id="stakes" className="py-20 md:py-32 px-6 bg-[#101b37] overflow-hidden" aria-label="Cost of inaction">
                    <div className="container mx-auto max-w-5xl">
                        <div className="text-center mb-20 animate-on-scroll">
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4">
                                {t.stakes.title.split(' ').slice(0, -1).join(' ')} <span className="text-[#e41476]/80">{t.stakes.title.split(' ').slice(-1)}</span>
                            </h2>
                            <div className="w-20 h-1 bg-[#e41476]/40 mx-auto"></div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {t.stakes.items.map((item, i) => (
                                <div key={i} className={`p-8 md:p-10 rounded-sm border border-[#e41476]/10 bg-[#e41476]/5 hover:border-[#e41476]/25 transition-all group animate-on-scroll stagger-${i + 1}`}>
                                    <div className="text-[#e41476]/30 font-black text-5xl mb-6 group-hover:text-[#e41476]/60 transition-colors">✕</div>
                                    <h3 className="text-base font-black uppercase tracking-wider mb-4">{item.title}</h3>
                                    <p className="text-sm text-white/80 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Divider 8 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Lead Magnet Section */}
                <section id="lead-magnet" className="py-20 md:py-28 px-6 bg-[#0f1326] relative overflow-hidden" aria-label="Free guide download">
                    <div className="container mx-auto max-w-4xl">
                        <div className="glass-card p-8 md:p-16 rounded-sm border border-[#02c8ed]/20 relative overflow-hidden bg-gradient-to-br from-[#101b37] to-[#101b37] animate-on-scroll" data-anim-class="animate-visible-scale">
                            <div className="relative z-10 text-center">
                                <div className="inline-block px-4 py-1 mb-6 rounded-sm bg-[#02c8ed]/10 text-[#02c8ed] text-[10px] font-black uppercase tracking-[0.3em] border border-[#02c8ed]/20">
                                    {t.leadMagnet.badge}
                                </div>
                                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4 leading-tight">{t.leadMagnet.title}</h2>
                                <p className="text-sm md:text-base text-white/80 font-medium max-w-xl mx-auto mb-10 leading-relaxed">{t.leadMagnet.desc}</p>
                                <div className="flex justify-center">
                                    <a
                                        href={lang === 'es' ? '/VibeFlow_Automation_Guide_ES.pdf' : '/VibeFlow_Automation_Guide_EN.pdf'}
                                        download
                                        className="inline-block bg-[#02c8ed] text-white px-8 py-4 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-lg shadow-[#02c8ed]/20"
                                    >
                                        {t.leadMagnet.cta}
                                    </a>
                                </div>
                            </div>
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#02c8ed]/5 blur-[100px] rounded-full"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#02c8ed]/5 blur-[100px] rounded-full"></div>
                        </div>
                    </div>
                </section>

                {/* Divider 9 */}
                <div className="h-px bg-transparent" aria-hidden="true" />

                {/* Contact / CTA Section */}
                <section id="contact" className="py-20 md:py-40 px-6" aria-label="Contact and call to action">
                    <div className="container mx-auto text-center max-w-5xl glass-card p-8 md:p-20 rounded-sm border border-[#02c8ed]/20 relative overflow-hidden bg-gradient-to-br from-[#101b37] to-[#101b37] animate-on-scroll" data-anim-class="animate-visible-scale">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">
                                {t.cta.title.split(' ').slice(0, -1).join(' ')} <span className="text-[#02c8ed]">{t.cta.title.split(' ').slice(-1)}</span>
                            </h2>
                            <p className="text-white/80 mb-10 text-xl font-medium max-w-2xl mx-auto">
                                {t.cta.desc}
                            </p>

                            <div className="flex flex-col gap-4 mb-14 items-center">
                                <a href={`tel:${contactInfo.phone}`} className="text-[#02c8ed] text-xl font-black tracking-widest hover:text-white transition-colors">{contactInfo.phone}</a>
                                <a href={`mailto:${contactInfo.email}`} className="text-white/80 text-lg font-bold tracking-widest hover:text-[#02c8ed] transition-colors">{contactInfo.email}</a>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <button
                                    onClick={handleEmailClick}
                                    className="bg-[#02c8ed] text-white px-8 py-5 md:px-12 md:py-6 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-[#02c8ed]/30 w-full sm:w-auto"
                                >
                                    {t.cta.btn}
                                </button>
                                <a
                                    href={contactInfo.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#e41476] text-white px-8 py-5 md:px-12 md:py-6 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-[#e41476]/30 flex items-center justify-center gap-3 w-full sm:w-auto"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.897-5.335 11.9-11.894a11.83 11.83 0 00-3.415-8.414" /></svg>
                                    {t.cta.whatsappBtn}
                                </a>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#02c8ed]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </section>

                {/* Divider 10 */}
                <div className="h-20 bg-[#0e0b15] border-t border-transparent" aria-hidden="true" />
            </main>

            <footer className="py-20 bg-[#0e0b15] border-t border-transparent text-center">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-12">
                        <BrandLogo className="h-20 w-auto" />
                    </div>
                    <p className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">{t.footer.tagline}</p>

                    <div className="flex flex-col gap-3 mb-10 text-[11px] font-black uppercase tracking-widest">
                        <a href={`tel:${contactInfo.phone}`} className="text-white/80 hover:text-[#02c8ed] transition-colors">{t.footer.call}: {contactInfo.phone}</a>
                        <a href={`mailto:${contactInfo.email}`} className="text-white/80 hover:text-[#02c8ed] transition-colors">{t.footer.email}: {contactInfo.email}</a>
                    </div>

                    <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">{t.footer.rights.replace('2025', '2026')}</p>
                </div>
            </footer>

            <ChatWidget lang={lang} />
        </div>
    );
};

export default App;








