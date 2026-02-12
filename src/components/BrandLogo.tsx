import React from 'react';

interface BrandLogoProps {
    className?: string;
    showText?: boolean;
    textColor?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
    className = "h-12",
    showText = false,
    textColor = "text-[#C5A059]"
}) => {
    return (
        <div className={`flex items-center ${showText ? 'gap-3' : ''}`}>
            <img
                src="/vibe-flow-coding-logo.png"
                alt="Vibe Flow Coding – AI-Powered Business Automation"
                className={className}
            />
            {showText && (
                <div className="flex flex-col leading-none">
                    <span className={`${textColor} text-base font-black tracking-[0.2em] uppercase`}>VIBE FLOW</span>
                    <span className="text-slate-400 text-[9px] font-bold tracking-[0.4em] uppercase mt-1">CODING</span>
                </div>
            )}
        </div>
    );
};

export default BrandLogo;
