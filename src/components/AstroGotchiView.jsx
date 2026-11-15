// AstroGotchiView - Interactive Visual Mars Biodome & Commander Avatar

import React from 'react';

export default function AstroGotchiView({ 
  resources, 
  activeDonki, 
  shieldActive, 
  solPhase, 
  currentSol,
  site,
  lang 
}) {
  const { power, oxygen, health } = resources;

  // Determine Commander state
  const isCritical = power < 20 || oxygen < 20 || health < 20;
  const isHealthy = health >= 65 && oxygen >= 50 && power >= 40;

  // Sky background styling by Sol Phase
  const getSkyGradient = () => {
    switch (solPhase) {
      case "MORNING":
        return "from-orange-950 via-amber-900 to-rose-950";
      case "MIDDAY":
        return "from-amber-800 via-orange-900 to-red-950";
      case "AFTERNOON":
        return "from-orange-900 via-red-950 to-stone-950";
      case "NIGHT":
      case "EVALUATION":
        return "from-slate-950 via-indigo-950 to-neutral-950";
      default:
        return "from-amber-900 to-red-950";
    }
  };

  return (
    <div className={`relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-600/40 bg-gradient-to-b ${getSkyGradient()} transition-all duration-1000 select-none`}>
      {/* Sky Canvas Elements: Stars & Mars Moons */}
      {(solPhase === "NIGHT" || solPhase === "EVALUATION") && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
          <div className="absolute top-10 right-1/3 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse" />
          <div className="absolute top-16 left-12 w-1 h-1 bg-amber-100 rounded-full" />
          <div className="absolute top-8 right-16 w-2 h-2 bg-yellow-100 rounded-full opacity-80" />
          
          {/* Moon Phobos (Potato-shaped tiny moon) */}
          <div className="absolute top-6 left-16 flex items-center gap-1.5 bg-neutral-900/60 px-2 py-1 rounded-full border border-neutral-700/50 backdrop-blur-xs">
            <div className="w-3.5 h-3 bg-stone-300 rounded-sm rotate-12 shadow-inner" />
            <span className="text-[10px] font-mono text-stone-300">Phobos</span>
          </div>
          {/* Moon Deimos */}
          <div className="absolute top-12 right-24 flex items-center gap-1 bg-neutral-900/60 px-2 py-0.5 rounded-full border border-neutral-700/50 backdrop-blur-xs">
            <div className="w-2 h-2 bg-stone-400 rounded-full" />
            <span className="text-[9px] font-mono text-stone-400">Deimos</span>
          </div>
        </div>
      )}

      {/* Sun or Solar Hazard Visual */}
      {solPhase !== "NIGHT" && solPhase !== "EVALUATION" && (
        <div className="absolute top-6 right-10 flex flex-col items-center">
          <div className={`w-12 h-12 rounded-full shadow-lg ${
            activeDonki?.hazardLevel === "CRITICAL" || activeDonki?.hazardLevel === "EXTREME"
              ? "bg-red-500 shadow-red-500/80 animate-ping"
              : "bg-amber-300 shadow-amber-300/50"
          }`} />
          <span className="text-[10px] font-mono text-amber-200/80 mt-1">Sol Disk (0.5 AU)</span>
        </div>
      )}

      {/* Distant Mars Mountains / Crater Wall */}
      <svg className="absolute bottom-16 w-full h-32 opacity-70" preserveAspectRatio="none" viewBox="0 0 1000 300">
        <polygon points="0,300 0,160 120,130 250,190 420,110 580,180 750,90 890,170 1000,120 1000,300" fill="#7c2d12" />
        <polygon points="0,300 0,190 180,160 340,210 520,150 710,210 880,140 1000,190 1000,300" fill="#9a3412" />
      </svg>

      {/* Mars Ground Regolith Floor */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-stone-900 via-amber-950 to-orange-950 border-t border-amber-800/60 flex items-center justify-between px-4 sm:px-8">
        {/* Rover Perseverance Outside */}
        <div className="relative z-10 flex items-center gap-2 group cursor-pointer" title="NASA Perseverance Rover Station">
          <div className="text-2xl animate-bounce">🚜</div>
          <div className="hidden sm:block text-[11px] font-mono bg-black/60 px-2 py-0.5 rounded border border-amber-500/40 text-amber-300">
            Rover PERCY-01
          </div>
        </div>

        {/* Site Location Badge */}
        <div className="relative z-10 text-center">
          <div className="text-xs font-bold text-amber-300 font-mono tracking-wider flex items-center justify-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {site.name}
          </div>
          <div className="text-[10px] text-amber-400/70 font-mono">
            Elev: {site.elevation.split(' ')[0]} | {site.coordinates}
          </div>
        </div>

        {/* Solar Panel Array Outside */}
        <div className="relative z-10 flex items-center gap-1">
          <div className="text-xl">⚡</div>
          <div className="flex gap-0.5">
            <div className="w-4 h-6 bg-blue-900 border border-cyan-400 rounded-xs shadow-inner" />
            <div className="w-4 h-6 bg-blue-900 border border-cyan-400 rounded-xs shadow-inner" />
            <div className="w-4 h-6 bg-blue-900 border border-cyan-400 rounded-xs shadow-inner" />
          </div>
        </div>
      </div>

      {/* Main Biodome Habitat (Center) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-56 rounded-t-full border-4 border-cyan-400/60 bg-cyan-950/40 backdrop-blur-sm shadow-[0_0_40px_rgba(34,211,238,0.25)] flex flex-col items-center justify-end pb-3 overflow-hidden">
        
        {/* Active Electromagnetic Shield Bubble Effect */}
        {shieldActive && (
          <div className="absolute inset-0 rounded-t-full border-4 border-cyan-300 bg-cyan-400/15 animate-pulse shadow-[0_0_60px_rgba(6,182,212,0.6)] flex items-center justify-center">
            <div className="absolute top-3 px-2 py-0.5 rounded-full bg-cyan-500 text-[10px] font-mono text-black font-extrabold tracking-wider">
              SHIELD ACTIVE (100% DEFLECTION)
            </div>
          </div>
        )}

        {/* Bio-Dome Interior Architecture */}
        {/* Hydroponic Greenery Module on Left */}
        <div className="absolute bottom-2 left-4 flex flex-col items-center">
          <div className="text-xl">🌱</div>
          <div className="text-[9px] font-mono text-emerald-300 font-bold">Bio-Green</div>
        </div>

        {/* MOXIE Oxygen Generator on Right */}
        <div className="absolute bottom-2 right-4 flex flex-col items-center">
          <div className="text-xl animate-pulse">💨</div>
          <div className="text-[9px] font-mono text-cyan-300 font-bold">MOXIE O2</div>
        </div>

        {/* Commander Leo / Maya (Animated Astronaut Character) */}
        <div className="relative z-20 flex flex-col items-center mb-2 animate-[bounce_3s_ease-in-out_infinite]">
          {/* Speech bubble / status emotion */}
          <div className="mb-1 px-2.5 py-1 rounded-lg bg-black/80 border border-amber-400 text-[11px] font-mono text-white shadow-md flex items-center gap-1.5">
            <span>{isCritical ? "⚠️" : isHealthy ? "✨" : "🧐"}</span>
            <span className="font-semibold text-amber-200">
              {isCritical
                ? (lang === "id" ? "Pangkalan Waspada!" : "Critical Alert!")
                : isHealthy
                ? (lang === "id" ? "Semua Sistem Optimal!" : "Systems Nominal!")
                : (lang === "id" ? "Memantau Sol..." : "Monitoring Sol...")}
            </span>
          </div>

          {/* SVG Cute Astronaut Avatar */}
          <svg className="w-20 h-24" viewBox="0 0 100 120">
            {/* Astronaut Life Support Backpack */}
            <rect x="25" y="42" width="50" height="42" rx="8" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <rect x="30" y="48" width="10" height="20" rx="3" fill="#0284c7" />
            <rect x="60" y="48" width="10" height="20" rx="3" fill="#0284c7" />

            {/* Astronaut Legs */}
            <rect x="33" y="80" width="14" height="25" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="53" y="80" width="14" height="25" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="30" y="102" width="18" height="10" rx="4" fill="#334155" />
            <rect x="52" y="102" width="18" height="10" rx="4" fill="#334155" />

            {/* Astronaut Torso / Suit */}
            <rect x="30" y="44" width="40" height="40" rx="10" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            {/* NASA Mission Patch on Chest */}
            <circle cx="42" cy="55" r="4.5" fill="#1e3a8a" />
            <path d="M 39 56 Q 42 52 45 54" stroke="#dc2626" strokeWidth="1.2" fill="none" />
            {/* Suit Control Console */}
            <rect x="49" y="52" width="14" height="9" rx="2" fill="#0f172a" />
            <circle cx="53" cy="56" r="1.5" fill="#22c55e" />
            <circle cx="58" cy="56" r="1.5" fill={isCritical ? "#ef4444" : "#38bdf8"} />

            {/* Astronaut Helmet (Dome) */}
            <circle cx="50" cy="30" r="23" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
            {/* Helmet Visor */}
            <ellipse cx="50" cy="30" rx="17" ry="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Gold / Reflective Visor Gradient Reflection */}
            <path d="M 36 24 Q 50 18 64 24 Q 58 20 40 21 Z" fill="#fbbf24" opacity="0.8" />

            {/* Chibi Eyes inside Visor */}
            <circle cx="43" cy="31" r="3.2" fill="#38bdf8" />
            <circle cx="57" cy="31" r="3.2" fill="#38bdf8" />
            <circle cx="44.2" cy="29.8" r="1.2" fill="#ffffff" />
            <circle cx="58.2" cy="29.8" r="1.2" fill="#ffffff" />

            {/* Mouth / Expression */}
            {isCritical ? (
              <path d="M 46 38 Q 50 35 54 38" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : isHealthy ? (
              <path d="M 45 35 Q 50 40 55 35" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" fill="none" />
            ) : (
              <line x1="46" y1="36" x2="54" y2="36" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Astronaut Arms */}
            <rect x="20" y="47" width="12" height="24" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="68" y="47" width="12" height="24" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            {/* Glove Hands */}
            <circle cx="26" cy="73" r="5" fill="#475569" />
            <circle cx="74" cy="73" r="5" fill="#475569" />
          </svg>

          {/* Commander Leo Name Tag */}
          <div className="mt-0.5 text-[11px] font-mono font-bold text-amber-300 bg-neutral-900/80 px-2 py-0.5 rounded border border-amber-600/40">
            CDR. LEO • SOL {currentSol}
          </div>
        </div>

        {/* Habitat Base Rim */}
        <div className="w-full h-3 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-t border-neutral-600" />
      </div>

      {/* Floating Weather Indicator Top Left */}
      <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl border border-amber-500/30 flex items-center gap-3">
        <div className="text-xl">
          {activeDonki?.hazardLevel === "CRITICAL" || activeDonki?.hazardLevel === "EXTREME" ? "🚨" : "☀️"}
        </div>
        <div>
          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
            {lang === "id" ? "Kondisi Sol" : "Sol Conditions"}
          </div>
          <div className="text-xs font-mono text-white font-bold">
            {activeDonki?.type.split(' ')[0] || "Nominal"} • {site.weatherBaseline.dayTempC}°C
          </div>
        </div>
      </div>
    </div>
  );
}
