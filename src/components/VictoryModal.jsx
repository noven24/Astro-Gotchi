// VictoryModal - Authentic Fallout Shelter Style Overseer Commendation Award

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SoundEngine } from '../audio/sound_effects.js';

export default function VictoryModal({ 
  solReached, 
  scienceXp, 
  site, 
  onContinueEndless, 
  onRestart, 
  lang 
}) {
  useEffect(() => {
    SoundEngine.playBottleCaps();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_80px_rgba(250,204,21,0.6)] overflow-hidden border-4 border-yellow-400 flex flex-col">
        {/* Top Gold Hazard Stripes */}
        <div className="w-full h-2 hazard-stripes" />

        {/* Certificate Header Banner */}
        <div className="bg-[#0b1329] p-5 text-center border-b-2 border-yellow-400">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-3xl">🏆</span>
            <span className="font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-widest uppercase">
              VAULT-TEC & NASA SPACE APPS • OVERSEER COMMENDATION
            </span>
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-vault tracking-wider uppercase">
            {lang === "id" ? "SERTIFIKASI KOMANDAN ASTRONOT JUNIOR" : "JUNIOR ASTRONAUT MISSION CERTIFICATION"}
          </h1>
          <p className="text-xs text-yellow-200 font-sans mt-1">
            {lang === "id" ? "Pangkalan Mars: Astro-Gotchi Outpost Survival (Sol 7 Tercapai)" : "Mars Outpost: Astro-Gotchi Survival Trainer (Sol 7 Achieved)"}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-5 sm:p-6 space-y-5 text-center bg-[#070d1e]">
          <p className="text-xs sm:text-sm text-yellow-100 font-sans max-w-lg mx-auto leading-relaxed">
            {lang === "id"
              ? "Dengan ini dianugerahkan kepada Komandan Junior atas keberhasilan luar biasa dalam mengelola trade-off sumber daya pangkalan, menangkis radiasi badai matahari DONKI, dan menjaga kelangsungan hidup kru di Planet Merah!"
              : "Hereby awarded to Junior Commander for exemplary mastery in balancing survival trade-offs, deflecting DONKI space radiation, and sustaining human life on the Red Planet!"}
          </p>

          {/* Badges Grid (Fallout Vault Boy Style Achievements) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-500/70 flex flex-col items-center shadow-inner">
              <span className="text-3xl mb-1">🛡️</span>
              <div className="text-[11px] font-vault font-black text-yellow-300 uppercase">DONKI MASTER</div>
              <div className="text-[9px] text-neutral-400 font-sans mt-0.5">{lang === 'id' ? 'Penangkis CME' : 'CME Deflector'}</div>
            </div>

            <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-cyan-500/70 flex flex-col items-center shadow-inner">
              <span className="text-3xl mb-1">💨</span>
              <div className="text-[11px] font-vault font-black text-cyan-300 uppercase">MOXIE CHIEF</div>
              <div className="text-[9px] text-neutral-400 font-sans mt-0.5">{lang === 'id' ? 'Oksigen 100%' : '100% O2 Flow'}</div>
            </div>

            <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-emerald-500/70 flex flex-col items-center shadow-inner">
              <span className="text-3xl mb-1">🌱</span>
              <div className="text-[11px] font-vault font-black text-emerald-300 uppercase">BIO-FARMER</div>
              <div className="text-[9px] text-neutral-400 font-sans mt-0.5">{lang === 'id' ? 'Nutrisi Kru' : 'Crew Nutrition'}</div>
            </div>

            <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-400 flex flex-col items-center shadow-inner">
              <span className="text-3xl mb-1">⭐</span>
              <div className="text-[11px] font-vault font-black text-yellow-300 uppercase">SOL {solReached} VET</div>
              <div className="text-[9px] text-neutral-400 font-sans mt-0.5">{scienceXp} Total XP</div>
            </div>
          </div>
        </div>

        {/* Certificate Actions */}
        <div className="bg-[#0b1329] p-4 border-t-2 border-yellow-500 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              SoundEngine.playClick();
              onContinueEndless();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-vault font-black text-xs uppercase tracking-wider shadow-md transition-all border border-emerald-300"
          >
            🚀 {lang === 'id' ? 'LANJUTKAN MISI TANPA BATAS (ENDLESS SOL)' : 'CONTINUE ENDLESS MISSION (FREE PLAY)'}
          </button>
          
          <button
            onClick={() => {
              SoundEngine.playClick();
              onRestart();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl vault-btn text-yellow-300 font-vault font-black text-xs uppercase tracking-wider transition-all"
          >
            🔄 {lang === 'id' ? 'MULAI EKSPEDISI BARU' : 'START NEW EXPEDITION'}
          </button>
        </div>
      </div>
    </div>
  );
}
