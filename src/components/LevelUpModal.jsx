// LevelUpModal - Celebratory Fallout Shelter Style Astronaut Rank Promotion

import React, { useEffect } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function LevelUpModal({ rank, onClose, lang }) {
  useEffect(() => {
    SoundEngine.playSuccessChime();
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, []);

  if (!rank) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-lg bg-[#0e1628] border-4 border-yellow-400 rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.5)] overflow-hidden flex flex-col">
        {/* Yellow Hazard Stripes */}
        <div className="w-full h-2.5 hazard-stripes" />

        {/* Header */}
        <div className="bg-[#18233c] p-4 text-center border-b-2 border-yellow-400/80">
          <div className="text-[10px] text-yellow-400 font-vault tracking-widest uppercase">
            NASA SPACE APPS • VAULT-TEC PROMOTION
          </div>
          <h2 className="text-lg sm:text-xl font-black font-vault text-yellow-300 tracking-wider uppercase mt-1">
            {lang === 'id' ? '🎉 PROMOSI PANGKAT ASTRONOT!' : '🎉 ASTRONAUT RANK PROMOTION!'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4 bg-gradient-to-b from-[#0e1628] to-[#070b14]">
          {/* Animated Medal Ring */}
          <div className="relative inline-block mx-auto">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 border-4 border-yellow-200 flex items-center justify-center shadow-[0_0_35px_rgba(234,179,8,0.7)] animate-bounce">
              <span className="text-5xl">{rank.icon}</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-950 border border-yellow-400 text-yellow-300 font-vault font-black text-xs tracking-wider">
              LVL {rank.level}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black font-vault text-white tracking-wide">
              {lang === 'id' ? rank.titleId : rank.titleEn}
            </h3>
            <p className="text-xs text-emerald-400 font-bold mt-1">
              {lang === 'id' ? 'Sertifikasi Keberhasilan Misi Mars NASA' : 'NASA Mars Mission Certification'}
            </p>
          </div>

          {/* Rank Description */}
          <div className="p-3.5 rounded-xl bg-neutral-950/80 border-2 border-yellow-500/60 text-left space-y-1.5 shadow-inner">
            <div className="text-[10px] text-yellow-400 font-vault uppercase tracking-wider">
              {lang === 'id' ? 'TANGGUNG JAWAB MISI BARU:' : 'NEW MISSION RESPONSIBILITIES:'}
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed font-sans">
              {lang === 'id' ? rank.descriptionId : rank.descriptionEn}
            </p>
          </div>

          <p className="text-[11px] text-neutral-400 font-sans italic">
            {lang === 'id' 
              ? 'Selamat, Commander Leo! Pengalaman bertahan hidup di Mars membuktikan kemampuan kepemimpinanmu.' 
              : 'Congratulations, Commander Leo! Your Mars survival experience proves your exceptional leadership.'}
          </p>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl vault-btn text-yellow-300 font-vault font-black text-sm tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all transform hover:scale-[1.02] active:scale-95"
          >
            {lang === 'id' ? 'SIAP BERTUGAS, OVERSEER! 🚀' : 'READY FOR DUTY, OVERSEER! 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}

