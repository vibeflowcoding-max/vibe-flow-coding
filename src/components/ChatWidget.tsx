import React, { useState, useEffect, useRef } from 'react';
import { chatWithGemini } from '../services/geminiService';
import { translations } from '../i18n/translations';
import { Message, Language } from '../types';

interface ChatWidgetProps {
    lang: Language;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ lang }) => {
    const t = translations[lang].chat;
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages([{ role: 'model', text: t.welcome }]);
    }, [lang, t.welcome]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setInput('');
        const userMessageObj: Message = { role: 'user', text: userMsg };
        const newHistory = [...messages, userMessageObj];
        setMessages(newHistory);
        setIsTyping(true);

        try {
            const response = await chatWithGemini(newHistory, userMsg);
            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'model', text: lang === 'es' ? "Lo siento, tuve problemas para procesar eso." : "Sorry, I had trouble processing that." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            {isOpen ? (
                <div className="glass-card w-[350px] h-[550px] rounded-sm flex flex-col shadow-2xl overflow-hidden border border-[#C5A059]/30">
                    <div className="bg-[#C5A059] p-5 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black/10 rounded-sm flex items-center justify-center text-black font-black text-xs">VF</div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-black">Vibe Flow Assistant</h3>
                                <p className="text-[9px] text-black/60 font-bold uppercase">{t.status}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-black/5 p-1 rounded text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#0a1118]">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-sm text-xs leading-relaxed ${m.role === 'user' ? 'bg-[#C5A059] text-black font-medium' : 'bg-white/5 text-slate-300 border border-white/10'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 p-4 rounded-sm text-[10px] text-slate-500 font-bold tracking-widest animate-pulse uppercase">
                                    {t.typing}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 border-t border-white/5 bg-[#050a0f] flex gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t.placeholder}
                            className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-[#C5A059] transition-colors"
                        />
                        <button onClick={handleSend} className="bg-[#C5A059] p-3 rounded-sm hover:bg-[#D4B069] text-black shadow-lg shadow-amber-900/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#C5A059] w-16 h-16 rounded-sm flex items-center justify-center shadow-2xl shadow-amber-900/40 hover:scale-105 transition-transform cursor-pointer border border-white/20"
                >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ChatWidget;
