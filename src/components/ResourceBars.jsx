// ResourceBars - Authentic Fallout Shelter Style Capsule Resource Meters

import React from 'react';

export default function ResourceBars({ resources, radiationDose, lang }) {
  const { power, oxygen, health } = resources;

  const meters = [
    {
      id: 'power',
      icon: '⚡',
      label: lang === 'id' ? 'DAYA LISTRIK' : 'POWER',
      sublabel: lang === 'id' ? 'Panel Surya & Baterai' : 'Solar & Power Core',
      value: Math.round(power),
      color: 'bg-amber-400',
      glow: 'shadow-[0_0_12px_rgba(250,204,21,0.8)]',
      border: 'border-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
      isDanger: power <= 25,
      desc: lang === 'id' ? 'Menyalakan pemanas (-80°C) & perisai radiasi.' : 'Powers habitat thermal grid and storm shielding.'
    },
    {
      id: 'oxygen',
      icon: '💨',
      label: lang === 'id' ? 'OKSIGEN' : 'OXYGEN',
      sublabel: lang === 'id' ? 'Mesin MOXIE (ISRU)' : 'MOXIE ISRU Extractor',
      value: Math.round(oxygen),
      color: 'bg-cyan-400',
      glow: 'shadow-[0_0_12px_rgba(34,211,238,0.8)]',
      border: 'border-cyan-500',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
      isDanger: oxygen <= 25,
      desc: lang === 'id' ? 'Ekstraksi oksigen dari atmosfer CO2 Mars.' : 'Electrolyzed from thin Martian CO2 air.'
    },
    {
      id: 'health',
      icon: '❤️',
      label: lang === 'id' ? 'KESEHATAN KRU' : 'CREW HEALTH',
      sublabel: lang === 'id' ? 'Bio-Dome & Treadmill' : 'Bio-Dome & OSDR Gym',
      value: Math.round(health),
      color: 'bg-emerald-400',
      glow: 'shadow-[0_0_12px_rgba(52,211,153,0.8)]',
      border: 'border-emerald-500',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
      isDanger: health <= 25,
      desc: lang === 'id' ? 'Nutrisi sayuran & pencegahan atrofi gravitasi 0.38g.' : 'Microgreen nutrition & low-G exercise.'
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 my-2 font-mono">
      {meters.map(m => (
        <div 
          key={m.id}
          className={`relative p-3 rounded-xl border-2 transition-all ${
            m.isDanger 
              ? 'bg-rose-950/70 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse' 
              : 'bg-neutral-900/95 border-yellow-500/70 shadow-[0_4px_0_#713f12,0_8px_16px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Header Line */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border ${m.badgeBg} shadow-inner`}>
                {m.icon}
              </div>
              <div>
                <div className="text-xs font-black text-amber-300 font-sans tracking-wider uppercase">
                  {m.label}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {m.sublabel}
                </div>
              </div>
            </div>

            {/* Numeric Gauge reading with Vault-Tec Pip-Boy aesthetic */}
            <div className="text-right">
              <div className={`text-base font-black ${m.isDanger ? 'text-rose-400 font-pipboy' : 'text-amber-200'}`}>
                {m.value}<span className="text-[11px] text-neutral-400 font-normal"> / 100</span>
              </div>
              <div className={`text-[9px] font-bold tracking-widest ${m.isDanger ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {m.isDanger ? (lang === 'id' ? 'KRITIS!' : 'DANGER!') : (lang === 'id' ? 'STABIL' : 'OPTIMAL')}
              </div>
            </div>
          </div>

          {/* Fallout Shelter Iconic Capsule Meter with Threshold Tick */}
          <div className="relative w-full h-4 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-700 shadow-inner">
            {/* 25% Safe Threshold Tick Marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20 shadow-[0_0_6px_#f43f5e]" 
              style={{ left: '25%' }}
              title={lang === 'id' ? 'Garis Batas Bahaya (25%)' : 'Critical Hazard Threshold (25%)'}
            >
              <div className="absolute -top-1 -left-1 w-2.5 h-1.5 bg-rose-500 rounded-b-sm" />
              <div className="absolute -bottom-1 -left-1 w-2.5 h-1.5 bg-rose-500 rounded-t-sm" />
            </div>

            {/* 50% Mid Notch */}
            <div className="absolute top-0 bottom-0 w-px bg-neutral-800 z-10" style={{ left: '50%' }} />
            {/* 75% Mid Notch */}
            <div className="absolute top-0 bottom-0 w-px bg-neutral-800 z-10" style={{ left: '75%' }} />

            {/* Filled Bar */}
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                m.isDanger 
                  ? 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-pulse' 
                  : `${m.color} ${m.glow}`
              }`}
              style={{ width: `${Math.max(0, Math.min(100, m.value))}%` }}
            />
          </div>

          {/* Educational Note */}
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-400">
            <span>{m.desc}</span>
            <span className="text-[9px] text-neutral-500 font-bold shrink-0 ml-1">MIN: 25%</span>
          </div>
        </div>
      ))}
    </div>
  );
}
