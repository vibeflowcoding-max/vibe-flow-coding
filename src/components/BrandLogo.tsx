import React from 'react';
import agentyzeLogo from '../../assets/Agentyze_logo.png';

interface BrandLogoProps {
    className?: string;
    showText?: boolean;
    textColor?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
    className = "h-12",
    showText = false,
    textColor = "text-[#02c8ed]"
}) => {
    return (
        <div className={`flex items-center ${showText ? 'gap-3' : ''}`}>
            <img
                src={agentyzeLogo}
                alt="Agentyze - AI-Powered Business Automation"
                className={className}
            />
            {showText && (
                <div className="flex flex-col leading-none">
                    <span className={`${textColor} text-base font-black tracking-[0.2em] uppercase`}>AGENTYZE</span>
                </div>
            )}
        </div>
    );
};

export default BrandLogo;

