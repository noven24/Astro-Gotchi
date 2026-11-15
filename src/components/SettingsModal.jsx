// SettingsModal - Outpost Configuration, Site Selector & Gemini API Key

import React, { useState } from 'react';
import { MARS_TREK_SITES } from '../data/mars_trek.js';
import { SoundEngine } from '../audio/sound_effects.js';

export default function SettingsModal({
  isOpen,
  onClose,
  selectedSiteKey,
  onSelectSite,
  apiKey,
  onSaveApiKey,
  soundMuted,
  onToggleSound,
  lang,
  onToggleLang,
  onResetGame,
  onOpenTutorial
}) {
  const [tempKey, setTempKey] = useState(apiKey || "");

  if (!isOpen) return null;

  const handleSave = () => {
    SoundEngine.playClick();
    onSaveApiKey(tempKey);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-lg vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] flex flex-col max-h-[85vh] overflow-hidden border-4 border-yellow-500">
        {/* Top Caution Stripes */}
        <div className="w-full h-1.5 hazard-stripes" />

        {/* Header */}
        <div className="bg-[#0b1329] p-4 border-b-2 border-yellow-500/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-xs sm:text-sm font-black font-vault text-yellow-300 tracking-wider uppercase">
              {lang === "id" ? "PENGATURAN SIMULASI VAULT" : "VAULT SIMULATION SETTINGS"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg vault-btn text-yellow-300 font-vault text-xs font-bold transition-all"
          >
            [ ESC ]
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Landing Site Selection (Mars Trek) */}
          <div>
            <label className="block text-xs font-mono font-bold text-amber-300 uppercase mb-2">
              🪐 {lang === "id" ? "Pilih Lokasi Pendaratan Mars Trek:" : "Choose Mars Trek Landing Site:"}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(MARS_TREK_SITES).map(([key, site]) => (
                <div
                  key={key}
                  onClick={() => onSelectSite(key)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedSiteKey === key
                      ? "bg-amber-950/40 border-amber-400"
                      : "bg-neutral-950 border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{site.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{site.coordinates}</span>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    {site.missionAnchor}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sound & Language Toggles */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-white">
                  {lang === "id" ? "Efek Suara" : "Sound FX"}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  {soundMuted ? (lang === "id" ? "Bisu" : "Muted") : (lang === "id" ? "Aktif" : "Active")}
                </div>
              </div>
              <button
                onClick={onToggleSound}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  soundMuted ? "bg-neutral-800 text-neutral-400" : "bg-amber-500 text-black"
                }`}
              >
                {soundMuted ? "🔇 OFF" : "🔊 ON"}
              </button>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-white">
                  {lang === "id" ? "Bahasa" : "Language"}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">
                  {lang === "id" ? "Indonesia" : "English"}
                </div>
              </div>
              <button
                onClick={onToggleLang}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all"
              >
                {lang === "id" ? "🇮🇩 ID" : "🇺🇸 EN"}
              </button>
            </div>
          </div>

          {/* Optional Gemini API Key for Live AI */}
          <div className="bg-neutral-950 p-3.5 rounded-xl border border-cyan-500/40">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 mb-1">
              <span>🤖</span>
              <span>{lang === "id" ? "Gemini API Key (Opsional untuk Live AI A.N.I.S.)" : "Gemini API Key (Optional for Live AI A.N.I.S.)"}</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mb-2">
              {lang === "id"
                ? "Game ini sudah memiliki 50+ database pengetahuan sains anak secara bawaan (100% offline). Jika ingin A.N.I.S. menjawab pertanyaan bebas dengan LLM live, masukkan Gemini API Key di bawah:"
                : "This trainer has 50+ built-in space science facts (100% offline). If you want A.N.I.S. to answer free-form science questions with a live Gemini model, enter your API key below:"}
            </p>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          {/* Replay Tutorial Button */}
          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={() => { onClose(); onOpenTutorial && onOpenTutorial(); }}
              className="w-full py-2 rounded-lg bg-yellow-950/60 hover:bg-yellow-900/60 text-yellow-300 border border-yellow-500/60 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>📖</span>
              <span>{lang === "id" ? "Buka Kembali Panduan Tutorial Astronot" : "Replay Junior Astronaut Field Manual"}</span>
            </button>
          </div>

          {/* Reset Mission Button */}
          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={onResetGame}
              className="w-full py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-mono text-xs font-bold transition-all"
            >
              ⚠️ {lang === "id" ? "Reset Ulang Misi ke Sol 1" : "Reset Mission to Sol 1"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs font-bold transition-all"
          >
            {lang === "id" ? "Batal" : "Cancel"}
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all"
          >
            {lang === "id" ? "Simpan Pengaturan" : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
