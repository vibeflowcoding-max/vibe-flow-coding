import React, { useState } from 'react';
import { translations } from './i18n/translations';
import { Language } from './types';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import BrandLogo from './components/BrandLogo';

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('es');
    const t = translations[lang];

    const contactInfo = {
        phone: "+50671266775",
        whatsappLink: "https://wa.me/50671266775",
        email: "vibeflowcoding@gmail.com"
    };

    const handleEmailClick = () => {
        const subject = lang === 'es' ? 'Solicitud de Auditoría Estratégica' : 'Strategic Audit Request';
        window.location.href = `mailto:${contactInfo.email}?subject=${encodeURIComponent(subject)}`;
    };

    return (
        <div className="min-h-screen gradient-bg selection:bg-[#C5A059] selection:text-black">
            <Navbar lang={lang} setLang={setLang} />

            <header className="pt-48 pb-32 px-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[50%] h-full bg-[#C5A059]/5 blur-[120px] -z-10 rounded-full translate-x-1/2"></div>
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-block px-5 py-2 mb-8 rounded-sm glass-border text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] border border-[#C5A059]/30 bg-[#C5A059]/5">
                        {t.hero.badge}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
                        {t.hero.title.split(' ').slice(0, -1).join(' ')} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E2B659] to-[#C5A059]">{t.hero.title.split(' ').slice(-1)}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-14 font-medium leading-relaxed tracking-wide">
                        {t.hero.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a
                            href={contactInfo.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-green-900/20 transition-all transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.897-5.335 11.9-11.894a11.83 11.83 0 00-3.415-8.414" /></svg>
                            {t.hero.cta1}
                        </a>
                        <button
                            onClick={handleEmailClick}
                            className="glass-card hover:bg-white/5 px-10 py-5 rounded-sm font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all transform hover:-translate-y-1"
                        >
                            {t.hero.cta2}
                        </button>
                    </div>
                </div>
            </header>

            {/* Pain Points Section */}
            <section id="pain-points" className="py-32 bg-[#080e14]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-20">
                        <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-center mb-4">{t.pains.title}</h2>
                        <div className="w-20 h-1 bg-[#C5A059]"></div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {t.pains.items.map((point, i) => (
                            <div key={i} className="p-10 rounded-sm glass-card text-left border border-[#C5A059]/10 group hover:border-[#C5A059]/40 transition-all">
                                <div className="text-[#C5A059] font-black text-4xl mb-8 opacity-20 group-hover:opacity-100 transition-opacity">
                                    0{i + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-5 uppercase tracking-wider">{point.title}</h3>
                                <p className="text-slate-400 mb-8 text-sm leading-relaxed">{point.description}</p>
                                <div className="pt-8 border-t border-white/5">
                                    <p className="text-[#C5A059] font-black text-[10px] uppercase tracking-widest">{t.pains.strategy}:</p>
                                    <p className="text-slate-200 text-sm mt-3 font-medium">{point.solution}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Restaurant Suite Section */}
            <section id="restaurant-suite" className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="inline-block px-4 py-1 mb-8 rounded-sm bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em] border border-[#C5A059]/20">
                                {t.restaurant.badge}
                            </div>
                            <h2 className="text-5xl font-black mb-8 leading-tight tracking-tighter uppercase">{t.restaurant.title.split(' ').slice(0, -1).join(' ')} <br /><span className="text-[#C5A059]">{t.restaurant.title.split(' ').slice(-1)}</span></h2>
                            <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                                {t.restaurant.desc}
                            </p>

                            <ul className="space-y-10">
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-sm flex items-center justify-center text-[#C5A059]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-[#C5A059]">{t.restaurant.whatsapp.title}</h4>
                                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.restaurant.whatsapp.desc}</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-sm flex items-center justify-center text-[#C5A059]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-[#C5A059]">{t.restaurant.menu.title}</h4>
                                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.restaurant.menu.desc}</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-sm flex items-center justify-center text-[#C5A059]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm uppercase tracking-widest text-[#C5A059]">{t.restaurant.dashboard.title}</h4>
                                        <p className="text-sm text-slate-400 mt-2 leading-relaxed">{t.restaurant.dashboard.desc}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:w-1/2 relative group">
                            <div className="relative z-10 p-2 bg-[#C5A059]/10 rounded-sm border border-[#C5A059]/30 shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bbb65182fedc?auto=format&fit=crop&q=80&w=800"
                                    alt="Elite Analytics Preview"
                                    className="rounded-sm grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100"
                                />
                                <div className="absolute -bottom-10 -right-10 p-6 bg-slate-900 rounded-sm border border-[#C5A059]/30 w-64 shadow-2xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></div>
                                        <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest">{t.restaurant.aiNote}</p>
                                    </div>
                                    <p className="text-xs font-medium text-slate-300">{t.restaurant.aiText}</p>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#C5A059]/5 blur-[120px] -z-10 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 bg-[#050a0f] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-black uppercase tracking-[0.2em] mb-4">{t.services.title}</h2>
                        <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-6"></div>
                        <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">{t.services.subtitle}</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.services.items.map((service, idx) => (
                            <div key={idx} className="p-10 rounded-sm glass-card border border-white/5 hover:border-[#C5A059]/30 transition-all hover:-translate-y-1">
                                <div className="text-5xl mb-8 opacity-40 transition-opacity">{service.icon}</div>
                                <h3 className="text-sm font-black uppercase tracking-widest mb-4">{service.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium uppercase tracking-wider opacity-80">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / CTA Section */}
            <section id="contact" className="py-40 px-6">
                <div className="container mx-auto text-center max-w-5xl glass-card p-20 rounded-sm border border-[#C5A059]/20 relative overflow-hidden bg-gradient-to-br from-slate-900 to-[#050a0f]">
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">
                            {lang === 'es' ? '¿Listo para Sistematizar su ' : 'Ready to Systematize Your '}
                            <span className="text-[#C5A059]">{lang === 'es' ? 'Éxito' : 'Success'}</span>?
                        </h2>
                        <p className="text-slate-400 mb-10 text-xl font-medium max-w-2xl mx-auto">
                            {t.cta.desc}
                        </p>

                        <div className="flex flex-col gap-4 mb-14 items-center">
                            <a href={`tel:${contactInfo.phone}`} className="text-[#C5A059] text-xl font-black tracking-widest hover:text-white transition-colors">{contactInfo.phone}</a>
                            <a href={`mailto:${contactInfo.email}`} className="text-slate-400 text-lg font-bold tracking-widest hover:text-[#C5A059] transition-colors">{contactInfo.email}</a>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={handleEmailClick}
                                className="bg-[#C5A059] text-black px-12 py-6 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-[#C5A059]/30"
                            >
                                {t.cta.btn}
                            </button>
                            <a
                                href={contactInfo.whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] text-white px-12 py-6 rounded-sm font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-2xl shadow-green-900/30 flex items-center justify-center gap-3"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.897-5.335 11.9-11.894a11.83 11.83 0 00-3.415-8.414" /></svg>
                                {t.cta.whatsappBtn}
                            </a>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </section>

            <footer className="py-20 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-12">
                        <BrandLogo className="w-24 h-16" textColor="text-slate-200" />
                    </div>
                    <p className="text-slate-600 text-[10px] font-bold tracking-[0.3em] uppercase mb-6">{t.footer.tagline}</p>

                    <div className="flex flex-col gap-3 mb-10 text-[11px] font-black uppercase tracking-widest">
                        <a href={`tel:${contactInfo.phone}`} className="text-slate-400 hover:text-[#C5A059] transition-colors">{t.footer.call}: {contactInfo.phone}</a>
                        <a href={`mailto:${contactInfo.email}`} className="text-slate-400 hover:text-[#C5A059] transition-colors">{t.footer.email}: {contactInfo.email}</a>
                    </div>

                    <p className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">{t.footer.rights}</p>
                </div>
            </footer>

            <ChatWidget lang={lang} />
        </div>
    );
};

export default App;
