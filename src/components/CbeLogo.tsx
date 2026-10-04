import React, { useState } from 'react';
import bundledWhiteLogo from '../assets/images/cbe_white_logo.png';
import bundledGoldLogo from '../assets/images/cbe_white_bg_logo.png';

// High-fidelity inline vector CBE emblem (Guaranteed never to 404 or disappear)
export const CbeVectorLogo: React.FC<{ isDarkBg?: boolean; className?: string }> = ({
  isDarkBg = false,
  className = "w-full h-full",
}) => {
  const goldColor = "#d4af37";
  const mainColor = isDarkBg ? "#ffffff" : "#c69214";
  const ringColor = isDarkBg ? "#e6ca65" : "#b8860b";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer concentric decorative guilloche circles */}
      <circle cx="50" cy="50" r="48" stroke={ringColor} strokeWidth="1.5" strokeDasharray="2.5 1.5" />
      <circle cx="50" cy="50" r="44" stroke={ringColor} strokeWidth="1" />
      <circle cx="50" cy="50" r="40" stroke={goldColor} strokeWidth="2" />
      <circle cx="50" cy="50" r="37" stroke={ringColor} strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      
      {/* Radiating sunburst rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="50"
          x2={50 + 36 * Math.cos((deg * Math.PI) / 180)}
          y2={50 + 36 * Math.sin((deg * Math.PI) / 180)}
          stroke={ringColor}
          strokeWidth="0.8"
          opacity="0.6"
        />
      ))}

      {/* Central Inner Shield */}
      <circle cx="50" cy="50" r="26" fill={isDarkBg ? "#1a0422" : "#ffffff"} stroke={goldColor} strokeWidth="2" />

      {/* Scales of Justice (CBE Official Symbol) */}
      {/* Pillar & Base */}
      <line x1="50" y1="31" x2="50" y2="65" stroke={mainColor} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 66 L58 66" stroke={mainColor} strokeWidth="2.8" strokeLinecap="round" />
      <circle cx="50" cy="30" r="2.2" fill={mainColor} />
      
      {/* Balance Beam */}
      <line x1="33" y1="39" x2="67" y2="39" stroke={mainColor} strokeWidth="2" strokeLinecap="round" />
      
      {/* Left scale strings & pan */}
      <line x1="35" y1="39" x2="31" y2="49" stroke={mainColor} strokeWidth="1" />
      <line x1="35" y1="39" x2="39" y2="49" stroke={mainColor} strokeWidth="1" />
      <path d="M29 49 Q35 53 41 49 Z" fill={mainColor} />

      {/* Right scale strings & pan */}
      <line x1="65" y1="39" x2="61" y2="49" stroke={mainColor} strokeWidth="1" />
      <line x1="65" y1="39" x2="69" y2="49" stroke={mainColor} strokeWidth="1" />
      <path d="M59 49 Q65 53 71 49 Z" fill={mainColor} />
    </svg>
  );
};

interface CbeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customUrl?: string;
  isDarkBg?: boolean;
  onClick?: () => void;
}

export const CbeLogo: React.FC<CbeLogoProps> = ({
  className = '',
  size = 'md',
  customUrl,
  isDarkBg = false,
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  // Bundled assets guaranteed to exist in Vercel production build
  const bundledFallback = isDarkBg ? bundledWhiteLogo : bundledGoldLogo;

  // Resolve best image URL
  const activeUrl = customUrl || bundledFallback;

  const sizeClass = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center shrink-0 select-none ${sizeClass} ${className} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      }`}
    >
      {!imgError ? (
        <img
          src={activeUrl}
          alt="Commercial Bank of Ethiopia Official Logo"
          className="w-full h-full object-contain filter drop-shadow-xs"
          style={{ backgroundColor: 'transparent' }}
          onError={() => {
            // If primary URL fails on Vercel, fall back to inline vector CBE logo
            setImgError(true);
          }}
        />
      ) : (
        <CbeVectorLogo isDarkBg={isDarkBg} />
      )}
    </div>
  );
};
