// AfternoonActivities - Authentic Fallout Shelter Style Outpost Maintenance & Room Jobs

import React, { useState } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function AfternoonActivities({ 
  resources, 
  onPerformActivity, 
  onProceedToNight, 
  lang 
}) {
  const [completedActivities, setCompletedActivities] = useState({});

  const activities = [
    {
      id: "wipe_panels",
      icon: "⚡",
      title: lang === "id" ? "Sikat Debu Panel Surya" : "Wipe Solar Dust",
      room: "ROOM 01: POWER GENERATOR",
      description: lang === "id" 
        ? "Bersihkan pasir merah Mars yang menempel di panel surya agar efisiensi foton maksimal." 
        : "Sweep red dust off the solar array to maximize photon intake.",
      tradeOff: lang === "id" ? "⚡ +15% Listrik | 💨 -5% O2 (EVA Kru)" : "⚡ +15% Power | 💨 -5% O2 (Crew EVA)",
      impact: { power: 15, oxygen: -5, health: 0 },
      sound: () => SoundEngine.playPowerBuzz()
    },
    {
      id: "water_crops",
      icon: "🌱",
      title: lang === "id" ? "Rawat Sayuran Bio-Dome" : "Nurture Bio-Greens",
      room: "ROOM 02: HYDROPONIC DINER",
      description: lang === "id"
        ? "Siram selada segar kaya zat besi untuk melawan anemia mikrogravitasi astronot."
        : "Water iron-rich microgreens to counter spaceflight anemia.",
      tradeOff: lang === "id" ? "❤️ +15% Kesehatan | ⚡ -5% Listrik" : "❤️ +15% Crew Health | ⚡ -5% Power",
      impact: { power: -5, oxygen: 5, health: 15 },
      sound: () => SoundEngine.playOxygenFlow()
    },
    {
      id: "treadmill_workout",
      icon: "🏃",
      title: lang === "id" ? "Latihan Treadmill Anti-Atrofi" : "Treadmill Workout",
      room: "ROOM 03: ATHLETIC T2 GYM",
      description: lang === "id"
        ? "Kru berlari melawan pegas gravitasi rendah (0.38g) untuk menjaga kepadatan tulang."
        : "Exercise on harness treadmill to prevent bone and muscle loss.",
      tradeOff: lang === "id" ? "❤️ +15% Kesehatan | 💨 -5% O2" : "❤️ +15% Crew Health | 💨 -5% O2",
      impact: { power: 0, oxygen: -5, health: 15 },
      sound: () => SoundEngine.playBottleCaps()
    },
    {
      id: "tune_moxie",
      icon: "💨",
      title: lang === "id" ? "Kalibrasi Katup MOXIE" : "Tune MOXIE Valves",
      room: "ROOM 04: MOXIE ISRU REFINERY",
      description: lang === "id"
        ? "Setel aliran intake karbon dioksida agar elektrolisis katalitik oksigen optimal."
        : "Optimize CO2 intake pressure for peak catalytic O2 output.",
      tradeOff: lang === "id" ? "💨 +15% Oksigen | ⚡ -5% Listrik" : "💨 +15% Oxygen | ⚡ -5% Power",
      impact: { power: -5, oxygen: 15, health: 0 },
      sound: () => SoundEngine.playOxygenFlow()
    }
  ];

  const handleExecute = (act) => {
    if (completedActivities[act.id]) return;

    SoundEngine.playClick();
    act.sound();
    onPerformActivity(act.impact);
    setCompletedActivities(prev => ({ ...prev, [act.id]: true }));
  };

  return (
    <div className="w-full vault-panel rounded-xl p-4 sm:p-5 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500">
      {/* Top Hazard Caution Strip */}
      <div className="w-full h-1.5 hazard-stripes mb-3 rounded-sm" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-600/50 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛠️</span>
            <h2 className="text-sm sm:text-base font-black text-yellow-300 font-vault tracking-wide uppercase">
              {lang === "id" ? "PERAWATAN RUANGAN PANGKALAN (ROOM MAINTENANCE)" : "VAULT ROOM MAINTENANCE & PRODUCTION"}
            </h2>
          </div>
          <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
            {lang === "id" 
              ? "Tugaskan Komandan Leo ke modul pangkalan untuk memulihkan sumber daya sebelum malam tiba!" 
              : "Assign Commander Leo to outpost modules to produce resources before nightfall!"}
          </p>
        </div>
        <button
          onClick={() => {
            SoundEngine.playClick();
            onProceedToNight();
          }}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_3px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-1.5 border border-yellow-200"
        >
          <span>🌙</span>
          <span>{lang === "id" ? "LANJUT KE EVALUASI MALAM" : "END SOL & EVALUATE"}</span>
          <span>➔</span>
        </button>
      </div>

      {/* Room Maintenance Cards Grid (Fallout Shelter Room Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {activities.map((act) => {
          const isDone = completedActivities[act.id];
          return (
            <div
              key={act.id}
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isDone 
                  ? "bg-[#062c12]/90 border-emerald-500/80 shadow-[0_0_15px_rgba(34,197,94,0.2)]" 
                  : "bg-[#0b1329] border-neutral-700 hover:border-yellow-400/80 shadow-[0_3px_0_#1e293b]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-yellow-400/90 font-black mb-1">
                  <span>[ {act.room} ]</span>
                  {isDone && <span className="text-emerald-400 pipboy-glow">● {lang === "id" ? "SELESAI" : "COMPLETE"}</span>}
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{act.icon}</span>
                  <h3 className="text-xs sm:text-sm font-black text-white font-vault tracking-wide">
                    {act.title}
                  </h3>
                </div>

                <p className="text-[11px] text-neutral-300 font-sans leading-relaxed mb-3">
                  {act.description}
                </p>
              </div>

              <div>
                <div className="bg-black/70 p-1.5 rounded border border-neutral-800 text-[10px] text-amber-300 font-bold mb-2.5">
                  {act.tradeOff}
                </div>

                <button
                  disabled={isDone}
                  onClick={() => handleExecute(act)}
                  className={`w-full py-2 px-3 rounded-lg font-vault font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isDone
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-600 cursor-not-allowed opacity-80"
                      : "vault-btn text-yellow-300 hover:text-white"
                  }`}
                >
                  <span>{isDone ? "👍" : "⚡"}</span>
                  <span>{isDone ? (lang === "id" ? "SUDAH DIKERJAKAN" : "JOB COMPLETED") : (lang === "id" ? "TUGASKAN LEO" : "ASSIGN LEO")}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
