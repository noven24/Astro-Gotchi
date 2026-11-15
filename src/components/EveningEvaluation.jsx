// EveningEvaluation - Authentic Fallout Shelter Style Daily Overseer Report

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SoundEngine } from '../audio/sound_effects.js';

export default function EveningEvaluation({ 
  currentSol, 
  resources, 
  previousResources, 
  scienceXp, 
  site, 
  onNextSol, 
  lang 
}) {
  const { power, oxygen, health } = resources;

  useEffect(() => {
    SoundEngine.playBottleCaps();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const handleNextSol = () => {
    SoundEngine.playClick();
    onNextSol();
  };

  return (
    <div className="w-full vault-panel rounded-xl p-5 sm:p-6 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500">
      {/* Top Hazard Caution Strip */}
      <div className="w-full h-1.5 hazard-stripes mb-3 rounded-sm" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-yellow-600/50 pb-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold shadow-[0_0_15px_rgba(250,204,21,0.6)]">
            📊
          </div>
          <div>
            <div className="text-[10px] text-yellow-400 uppercase tracking-widest font-black">
              {lang === "id" ? "LAPORAN EVALUASI HARIAN OVERSEER" : "VAULT-TEC DAILY OVERSEER DEBRIEF"}
            </div>
            <h2 className="text-base sm:text-lg font-black text-white font-vault tracking-wide uppercase">
              {lang === "id" ? `EVALUASI AKHIR SOL ${currentSol}` : `SOL ${currentSol} PERFORMANCE REPORT`}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-500/70">
          <div className="text-right">
            <div className="text-[9px] text-neutral-400 uppercase tracking-widest">TOTAL CAPS / XP:</div>
            <div className="text-sm font-black text-yellow-300">🧪 {scienceXp} XP</div>
          </div>
        </div>
      </div>

      {/* Night Conditions Banner */}
      <div className="bg-[#0b1329] p-3.5 rounded-xl border-2 border-neutral-700 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥶</span>
          <div>
            <div className="text-neutral-400 text-[10px] uppercase">{lang === "id" ? "Suhu Malam Luar (Mars Trek):" : "Exterior Night Temp:"}</div>
            <div className="text-cyan-300 font-bold">{site.weatherBaseline.nightTempC}°C {lang === 'id' ? '(Pemanas Habitat Aktif)' : '(Habitat Heaters Active)'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-bold text-[11px] uppercase tracking-wide">
            {lang === "id" ? "Kubah Kedap Udara & Perisai Stabil" : "Pressurized & Shielded"}
          </span>
        </div>
      </div>

      {/* Resource Ledger Summary (Fallout Shelter Daily Production Tally) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {/* Power */}
        <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-500/60 shadow-inner">
          <div className="text-xs text-neutral-300 flex items-center justify-between font-bold">
            <span>⚡ {lang === "id" ? "Daya Listrik" : "Power"}</span>
            <span className="text-yellow-300 text-sm font-black">{Math.round(power)}%</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-sans">
            {lang === "id" ? "Beban pemanas malam disuplai" : "Thermal grid sustained"}
          </div>
        </div>

        {/* Oxygen */}
        <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-cyan-500/60 shadow-inner">
          <div className="text-xs text-neutral-300 flex items-center justify-between font-bold">
            <span>💨 {lang === "id" ? "Oksigen" : "Oxygen"}</span>
            <span className="text-cyan-300 text-sm font-black">{Math.round(oxygen)}%</span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-1 font-sans">
            {lang === "id" ? "Sirkulasi ECLSS stabil" : "ECLSS cycle stable"}
          </div>
        </div>

        {/* Health */}
        <div className="bg-[#0f172a] p-3 rounded-xl border-2 border-emerald-500/60 shadow-inner">
          <div className="text-xs text-neutral-300 flex items-center justify-between font-bold">
            <span>❤️ {lang === "id" ? "Kesehatan Kru" : "Crew Health"}</span>
            <span className="text-emerald-300 text-sm font-black">{Math.round(health)}%</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 font-sans">
            {lang === "id" ? "Tanda vital kru prima" : "Vitals 100% nominal"}
          </div>
        </div>
      </div>

      {/* Pip-Boy Overseer Log Note */}
      <div className="pipboy-crt p-3.5 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 mb-5 relative overflow-hidden">
        <div className="text-xs font-black text-emerald-300 mb-1 flex items-center gap-1.5 pipboy-glow uppercase font-vault">
          <span>🌟</span>
          <span>{lang === "id" ? "LOG HARIAN KOMANDAN VAULT:" : "VAULT OVERSEER LOG ENTRY:"}</span>
        </div>
        <p className="font-sans leading-relaxed pipboy-glow text-[11px] relative z-30">
          {lang === "id"
            ? `Kamu berhasil memandu Pangkalan Mars melewati Sol ${currentSol} dengan penuh keberanian dan perhitungan cermat. Menyeimbangkan trade-off adalah keahlian nomor satu yang dipelajari astronot sungguhan di Pusat Kendali Misi NASA di Houston!`
            : `You successfully piloted our Mars Outpost through Sol ${currentSol} with bravery and sharp foresight. Balancing survival trade-offs is the number one skill taught to real NASA Mission Control flight directors in Houston!`}
        </p>
      </div>

      {/* Footer / Next Sol Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-yellow-600/50">
        <div className="text-xs text-neutral-400 font-sans">
          {lang === "id" ? `Target Misi: Bertahan hingga Sol 7 untuk Sertifikasi NASA` : `Mission Goal: Survive to Sol 7 for NASA Certification`}
        </div>

        <button
          onClick={handleNextSol}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 text-black font-vault font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_0_#854d0e,0_8px_20px_rgba(234,179,8,0.4)] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
        >
          <span>☀️</span>
          <span>{lang === "id" ? `SAMBUT FAJAR SOL ${currentSol + 1}` : `GREET DAWN OF SOL ${currentSol + 1}`}</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
}
