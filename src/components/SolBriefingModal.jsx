// SolBriefingModal - Authentic Fallout Shelter Style Morning Space Weather Briefing

import React from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function SolBriefingModal({ 
  isOpen, 
  currentSol, 
  donkiEvent, 
  site, 
  onStartSol, 
  onOpenAnis, 
  lang 
}) {
  if (!isOpen || !donkiEvent) return null;

  const handleStart = () => {
    SoundEngine.playClick();
    onStartSol();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] overflow-hidden border-4 border-yellow-500 flex flex-col">
        {/* Top Caution Stripes */}
        <div className="w-full h-2 hazard-stripes" />

        {/* Header Ribbon */}
        <div className="bg-[#0b1329] p-4 text-center border-b-2 border-yellow-500/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🛰️</span>
            <div>
              <span className="font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-wider uppercase block">
                VAULT-TEC • NASA DONKI SPACE WEATHER ALERT
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">
                {lang === 'id' 
                  ? 'Transmisi Cuaca Luar Angkasa Real-Time dari Satelit NASA' 
                  : 'Real-Time Space Weather Satellite Transmission from NASA'}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-yellow-400 text-black font-vault text-xs font-black shadow-[0_0_10px_rgba(250,204,21,0.6)]">
            SOL {currentSol}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto no-scrollbar bg-[#070d1e]">
          {/* Landing Site & Mars Trek Baseline */}
          <div className="bg-[#0f172a] p-3.5 rounded-xl border-2 border-neutral-700 flex flex-wrap items-center justify-between gap-2 shadow-inner">
            <div>
              <div className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold">
                {lang === "id" ? "SEKTOR PANGKALAN MARS TREK" : "MARS TREK OUTPOST SECTOR"}
              </div>
              <div className="text-sm font-black text-white font-vault">
                {lang === "id" ? site.name : (site.nameEn || site.name)}
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <div>
                <span className="text-neutral-400">{lang === "id" ? "Suhu Siang: " : "Day Temp: "}</span>
                <span className="text-amber-300 font-bold">{site.weatherBaseline.dayTempC}°C</span>
              </div>
              <div>
                <span className="text-neutral-400">{lang === "id" ? "Suhu Malam: " : "Night Temp: "}</span>
                <span className="text-cyan-300 font-bold">{site.weatherBaseline.nightTempC}°C</span>
              </div>
              <div>
                <span className="text-neutral-400">{lang === "id" ? "Tekanan: " : "Pressure: "}</span>
                <span className="text-emerald-400 font-bold">{site.weatherBaseline.pressurePa} Pa</span>
              </div>
            </div>
          </div>

          {/* NASA DONKI Verified Space Weather Hazard Card */}
          <div className={`p-4 rounded-xl border-3 shadow-lg ${
            donkiEvent.hazardLevel === "CRITICAL" || donkiEvent.hazardLevel === "EXTREME"
              ? "bg-rose-950/60 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.3)]"
              : "bg-amber-950/50 border-yellow-500/80"
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-vault font-black bg-yellow-400 text-black">
                    {donkiEvent.type}
                  </span>
                  <span className={`text-[10px] font-vault font-black px-2 py-0.5 rounded ${
                    donkiEvent.hazardLevel === "EXTREME" ? "bg-rose-600 text-white animate-pulse" :
                    donkiEvent.hazardLevel === "CRITICAL" ? "bg-rose-700 text-white" :
                    "bg-amber-600 text-white"
                  }`}>
                    HAZARD: {donkiEvent.hazardLevel}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white font-vault tracking-wide">
                  {donkiEvent.name || donkiEvent.officialId}
                </h3>
              </div>
              <div className="text-right text-[10px] text-neutral-400 bg-black/60 px-2 py-1 rounded border border-neutral-700">
                <div>{lang === 'id' ? 'Tanggal Satelit:' : 'Satellite Date:'}</div>
                <div className="text-yellow-300 font-bold">{donkiEvent.date || donkiEvent.catalogDate}</div>
              </div>
            </div>

            <p className="text-xs text-neutral-200 mt-2.5 leading-relaxed font-sans">
              {donkiEvent.description}
            </p>

            {/* Impact Metrics Badges */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-bold">
              <div className="bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between">
                <span className="text-neutral-400">⚡ {lang === 'id' ? 'Listrik:' : 'Power:'}</span>
                <span className={donkiEvent.gameImpact.powerDrainMultiplier > 1 ? "text-rose-400" : "text-emerald-400"}>
                  {donkiEvent.gameImpact.powerDrainMultiplier > 1 ? `x${donkiEvent.gameImpact.powerDrainMultiplier}` : 'Nominal'}
                </span>
              </div>
              <div className="bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between">
                <span className="text-neutral-400">☢️ {lang === 'id' ? 'Radiasi:' : 'Radiation:'}</span>
                <span className="text-rose-400">
                  +{donkiEvent.gameImpact.radiationDoseMsv} mSv
                </span>
              </div>
              <div className="bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between col-span-2 sm:col-span-1">
                <span className="text-neutral-400">🛡️ {lang === 'id' ? 'Rekomendasi:' : 'Shielding:'}</span>
                <span className="text-cyan-300">
                  {donkiEvent.gameImpact.radiationDoseMsv > 15 
                    ? (lang === 'id' ? "Perisai Wajib!" : "Shield Required!") 
                    : (lang === 'id' ? "Perisai Opsional" : "Shield Optional")}
                </span>
              </div>
            </div>
          </div>

          {/* Plain Language Explainer by A.N.I.S. */}
          <div className="pipboy-crt p-4 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 shadow-inner relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5 pipboy-glow">
              <div className="flex items-center gap-1.5 font-vault font-black text-emerald-300 uppercase tracking-widest text-[11px]">
                <span>🤖</span>
                <span>A.N.I.S. • {lang === "id" ? "Penerjemah Bahasa Anak" : "Plain Language Translator"}</span>
              </div>
              <button 
                onClick={() => { SoundEngine.playPipBoyOpen(); onOpenAnis(donkiEvent.type); }}
                className="text-[10px] text-emerald-300 hover:text-white underline font-bold"
              >
                [ {lang === 'id' ? 'Tanya Lebih Lanjut' : 'Consult A.N.I.S.'} ]
              </button>
            </div>
            <p className="font-sans leading-relaxed pipboy-glow relative z-30">
              "{lang === 'id' ? donkiEvent.plainLanguageAnis : donkiEvent.plainLanguageEn}"
            </p>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-[#0b1329] p-4 border-t-2 border-yellow-500/70 flex justify-end gap-3">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-vault font-black text-sm tracking-wider uppercase shadow-[0_4px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
          >
            <span>🚀</span>
            <span>{lang === "id" ? "MULAI HARI (SOL) & AMBIL KEPUTUSAN" : "INITIATE SOL MISSION"}</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
