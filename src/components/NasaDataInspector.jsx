// NasaDataInspector - Verified NASA Curated Data Terminal for Judges & Players

import React, { useState } from 'react';
import { NASA_DONKI_EVENTS } from '../data/nasa_donki.js';
import { NASA_OSDR_FACTS } from '../data/nasa_osdr.js';
import { MARS_TREK_SITES } from '../data/mars_trek.js';

export default function NasaDataInspector({ isOpen, onClose, lang }) {
  const [activeTab, setActiveTab] = useState("donki");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-3xl vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] flex flex-col max-h-[88vh] overflow-hidden border-4 border-yellow-500">
        {/* Top Caution Stripes */}
        <div className="w-full h-1.5 hazard-stripes" />

        {/* Header */}
        <div className="bg-[#0b1329] p-4 border-b-2 border-yellow-500/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🛰️</span>
            <div>
              <h2 className="text-xs sm:text-sm font-black font-vault text-yellow-300 tracking-wider uppercase">
                VAULT-TEC & NASA ARCHIVAL DATA TERMINAL
              </h2>
              <div className="text-[10px] text-neutral-400 font-sans">
                Curated Embedded Scientific Repositories: DONKI • OSDR & RadLab • Mars Trek
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg vault-btn text-yellow-300 font-vault text-xs font-bold transition-all"
          >
            [ {lang === 'id' ? 'ESC / TUTUP' : 'ESC / CLOSE'} ]
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-yellow-600/50 bg-[#070d1e] px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab("donki")}
            className={`px-4 py-2 text-xs font-vault font-black tracking-wider uppercase rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "donki"
                ? "bg-[#0f172a] text-yellow-300 border-yellow-500 border-b-transparent shadow-[0_-2px_8px_rgba(234,179,8,0.3)]"
                : "text-neutral-400 border-transparent hover:text-white"
            }`}
          >
            ☀️ NASA DONKI (SPACE WEATHER)
          </button>

          <button
            onClick={() => setActiveTab("osdr")}
            className={`px-4 py-2 text-xs font-vault font-black tracking-wider uppercase rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "osdr"
                ? "bg-[#0f172a] text-rose-300 border-rose-500 border-b-transparent shadow-[0_-2px_8px_rgba(244,63,94,0.3)]"
                : "text-neutral-400 border-transparent hover:text-white"
            }`}
          >
            🧬 NASA OSDR (SPACE BIOLOGY)
          </button>

          <button
            onClick={() => setActiveTab("mars_trek")}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-t-2 border-x-2 ${
              activeTab === "mars_trek"
                ? "bg-neutral-900 text-cyan-300 border-cyan-500 border-b-transparent"
                : "text-neutral-400 border-transparent hover:text-white"
            }`}
          >
            🪐 Mars Trek {lang === 'id' ? '(Kartografi)' : '(Cartography)'}
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-neutral-950/80">
          {/* TAB 1: DONKI */}
          {activeTab === "donki" && (
            <div className="space-y-4">
              <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-xl text-xs font-mono text-amber-200">
                <span className="font-bold">Database of Notifications, Knowledge, Information (DONKI): </span>
                {lang === 'id' 
                  ? 'Game ini menggunakan sampel catatan historis kejadian Coronal Mass Ejection (CME), Solar Flare, dan simulasi WSA-ENLIL asli dari NASA Goddard Space Flight Center sebagai pemicu bahaya (Hazard Events).' 
                  : 'This trainer uses authentic historical records of Coronal Mass Ejections (CME), Solar Flares, and real WSA-ENLIL simulations from NASA Goddard Space Flight Center as mission hazard events.'}
              </div>

              <div className="space-y-3">
                {NASA_DONKI_EVENTS.map((ev) => (
                  <div key={ev.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-black">
                          {ev.type}
                        </span>
                        <span className="text-xs font-bold text-white font-mono">{ev.classType}</span>
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400 font-bold">
                        {ev.officialId} • {ev.date}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 font-mono mb-2">
                      {ev.description}
                    </p>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200 mb-2">
                      <span className="font-bold text-amber-300">
                        {lang === 'id' ? '🤖 Terjemahan A.N.I.S.: ' : '🤖 A.N.I.S. Translation: '}
                      </span>
                      "{lang === 'id' ? ev.plainLanguageAnis : ev.plainLanguageEn}"
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>{lang === 'id' ? 'Sensor: ' : 'Sensors: '}{ev.detectingInstruments.join(", ")}</span>
                      <a 
                        href={ev.nasaLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-cyan-400 hover:text-cyan-300 underline font-bold"
                      >
                        {lang === 'id' ? 'Buka Arsip CCMC NASA ↗' : 'Open NASA CCMC Archive ↗'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: OSDR & RADLAB */}
          {activeTab === "osdr" && (
            <div className="space-y-4">
              <div className="bg-rose-950/30 border border-rose-500/40 p-3 rounded-xl text-xs font-mono text-rose-200">
                <span className="font-bold">NASA Open Science Data Repository (OSDR) & RadLab: </span>
                {lang === 'id' 
                  ? 'Metrik penurunan bar ❤️ Kesehatan, risiko atropi otot, anemia luar angkasa, dan dosis radiasi di Astro-Gotchi dihitung berdasarkan hasil riset fisiologi astronot NASA.' 
                  : 'Health metrics, muscle atrophy, spaceflight anemia, and cumulative radiation in Astro-Gotchi are modeled from peer-reviewed NASA astronaut space biology studies.'}
              </div>

              <div className="space-y-3">
                {NASA_OSDR_FACTS.map((fact) => (
                  <div key={fact.studyId} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-rose-400 font-mono">{fact.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                        {fact.studyId}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-amber-300 font-bold mb-2">
                      {lang === 'id' ? 'Metrik Riset: ' : 'Research Metric: '}{fact.metric}
                    </div>

                    <p className="text-xs text-neutral-300 font-mono mb-2">
                      {fact.summary}
                    </p>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200 mb-2">
                      <span className="font-bold text-cyan-300">
                        {lang === 'id' ? '🤖 Analogi Anak A.N.I.S.: ' : '🤖 A.N.I.S. Analogy: '}
                      </span>
                      "{lang === 'id' ? fact.plainLanguageAnis : (fact.plainLanguageEn || fact.plainLanguageAnis)}"
                    </div>

                    <div className="text-[10px] font-mono text-rose-300 bg-rose-950/40 p-1.5 rounded border border-rose-800/50">
                      ⚖️ {lang === 'id' ? 'Aturan Mekanik Game: ' : 'Game Mechanic Rule: '}{fact.healthImpactRule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MARS TREK */}
          {activeTab === "mars_trek" && (
            <div className="space-y-4">
              <div className="bg-cyan-950/30 border border-cyan-500/40 p-3 rounded-xl text-xs font-mono text-cyan-200">
                <span className="font-bold">NASA Mars Trek Portal: </span>
                {lang === 'id' 
                  ? 'Latar belakang visual pangkalan, elevasi topografi, dan data suhu harian di game diambil dari kawah pendaratan spesifik di Mars.' 
                  : 'Outpost terrain visuals, topographic elevation, and daily temperature baselines are sourced from official NASA Mars landing sites.'}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {Object.values(MARS_TREK_SITES).map((site) => (
                  <div key={site.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-amber-300 font-mono">
                        {lang === 'id' ? site.name : (site.nameEn || site.name)}
                      </h3>
                      <span className="text-xs font-mono text-cyan-400">{site.coordinates}</span>
                    </div>

                    <div className="text-xs font-mono text-neutral-300 mb-1">
                      {lang === 'id' ? site.missionAnchor : (site.missionAnchorEn || site.missionAnchor)}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 mb-2">
                      {lang === 'id' ? 'Elevasi: ' : 'Elevation: '}{site.elevation} • {lang === 'id' ? 'Suhu Siang: ' : 'Day Temp: '}{site.weatherBaseline.dayTempC}°C • {lang === 'id' ? 'Suhu Malam: ' : 'Night Temp: '}{site.weatherBaseline.nightTempC}°C
                    </div>

                    <p className="text-xs text-neutral-300 font-mono mb-2">
                      {lang === 'id' ? site.environmentSummary : (site.environmentSummaryEn || site.environmentSummary)}
                    </p>

                    <div className="bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200">
                      <span className="font-bold text-amber-300">
                        {lang === 'id' ? '🤖 Catatan A.N.I.S.: ' : '🤖 A.N.I.S. Note: '}
                      </span>
                      "{lang === 'id' ? site.plainLanguageAnis : (site.plainLanguageEn || site.plainLanguageAnis)}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>NASA Space Apps Challenge • Junior Astronaut Mission Trainer</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-all"
          >
            {lang === 'id' ? 'Tutup Terminal' : 'Close Terminal'}
          </button>
        </div>
      </div>
    </div>
  );
}
