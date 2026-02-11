import React from 'react';

interface BrandLogoProps {
    className?: string;
    showText?: boolean;
    textColor?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
    className = "w-12 h-12",
    showText = true,
    textColor = "text-[#C5A059]"
}) => {
    return (
        <div className={`flex flex-col items-center ${showText ? 'gap-2' : ''}`}>
            <svg viewBox="0 0 100 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Frame */}
                <rect x="2" y="2" width="96" height="61" rx="10" stroke="#C5A059" strokeWidth="3" />
                {/* Vertical Divider */}
                <line x1="50" y1="2" x2="50" y2="63" stroke="#C5A059" strokeWidth="2" />

                {/* Left Side: Brain / AI */}
                <path d="M42 22C42 18 38 14 32 14C26 14 22 18 22 22C18 22 15 26 15 30C15 34 18 38 22 38C22 44 26 48 32 48C38 48 42 44 42 38"
                    stroke="#C5A059" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M42 26C45 26 48 28 48 32C48 36 45 38 42 38" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" />
                <text x="31" y="38" fill="#C5A059" fontSize="12" fontWeight="900" fontFamily="Inter, sans-serif">A</text>

                {/* Right Side: Code / Circuits */}
                <path d="M62 20L57 25L62 30" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M78 20L83 25L78 30" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="73" y1="18" x2="67" y2="32" stroke="#C5A059" strokeWidth="3" strokeLinecap="round" />

                {/* Circuit Lines with knobs */}
                <line x1="55" y1="42" x2="72" y2="42" stroke="#C5A059" strokeWidth="2.5" />
                <circle cx="72" cy="42" r="3.5" fill="#C5A059" />
                <line x1="55" y1="50" x2="78" y2="50" stroke="#C5A059" strokeWidth="2.5" />
                <circle cx="78" cy="50" r="3.5" fill="#C5A059" />
                <path d="M55 58H75V60" stroke="#C5A059" strokeWidth="2.5" fill="none" />
            </svg>
            {showText && (
                <div className="flex flex-col items-center leading-none text-center">
                    <span className={`${textColor} text-base font-black tracking-[0.2em] uppercase`}>VIBE FLOW</span>
                    <span className="text-slate-400 text-[9px] font-bold tracking-[0.4em] uppercase mt-1">CODING</span>
                </div>
            )}
        </div>
    );
};

export default BrandLogo;
