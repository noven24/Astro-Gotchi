// TradeOffCard - Authentic Fallout Shelter Style Overseer Emergency Directive

import React, { useState } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function TradeOffCard({ 
  event, 
  resources, 
  onSelectChoice, 
  lang 
}) {
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [confirmedOutcome, setConfirmedOutcome] = useState(null);

  if (!event) return null;

  const handleChoose = (choice) => {
    SoundEngine.playClick();
    setSelectedChoiceId(choice.id);
  };

  const handleConfirm = () => {
    const choice = event.choices.find(c => c.id === selectedChoiceId);
    if (!choice) return;

    if (choice.impact.power < -25) {
      SoundEngine.playPowerBuzz();
    } else if (choice.impact.oxygen > 0) {
      SoundEngine.playOxygenFlow();
    } else {
      SoundEngine.playBottleCaps();
    }

    setConfirmedOutcome(choice);
    setTimeout(() => {
      onSelectChoice(choice);
      setSelectedChoiceId(null);
      setConfirmedOutcome(null);
    }, 2800);
  };

  const activeChoice = event.choices.find(c => c.id === selectedChoiceId);

  return (
    <div className="w-full vault-panel rounded-xl p-4 sm:p-5 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500">
      {/* Top Hazard Caution Strip */}
      <div className="w-full h-1.5 hazard-stripes mb-3 rounded-sm" />

      {/* Header - Vault-Tec Overseer Incident Directive */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-600/50 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-yellow-400 text-black font-black text-xs font-vault">
            {lang === "id" ? event.tag : (event.tagEn || event.tag)}
          </span>
          <h2 className="text-sm sm:text-base font-black text-yellow-300 font-vault tracking-wide uppercase">
            {lang === "id" ? event.title : (event.titleEn || event.title)}
          </h2>
        </div>
        <div className="text-[10px] text-neutral-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-700">
          {lang === "id" ? "SIKLUS SIANG • KEPUTUSAN OVERSEER" : "MIDDAY INCIDENT • OVERSEER DIRECTIVE"}
        </div>
      </div>

      {/* Outpost Situation & Pip-Boy A.N.I.S. Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {/* Field Report */}
        <div className="bg-[#0b1329] p-3.5 rounded-lg border-2 border-neutral-700 shadow-inner">
          <div className="text-[9px] text-yellow-400 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5">
            <span>📋</span>
            <span>{lang === "id" ? "LAPORAN SITUASI PANGKALAN" : "OUTPOST STATUS LOG"}</span>
          </div>
          <p className="text-xs text-neutral-200 leading-relaxed font-sans">
            {lang === "id" ? event.description : (event.descriptionEn || event.description)}
          </p>
        </div>

        {/* Pip-Boy CRT Advice Box */}
        <div className="pipboy-crt p-3.5 rounded-lg border-2 border-emerald-500 shadow-inner relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 uppercase tracking-widest font-black mb-1 pipboy-glow">
            <span>🤖</span>
            <span>A.N.I.S. • {lang === "id" ? "TRANSLASI BAHASA ANAK" : "PLAIN LANGUAGE TIP"}</span>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed pipboy-glow font-sans relative z-30">
            "{lang === "id" ? event.plainLanguageAnis : (event.plainLanguageEn || event.plainLanguageAnis)}"
          </p>
        </div>
      </div>

      {/* Confirmed Outcome Banner (Shows during transition) */}
      {confirmedOutcome && (
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-3 border-emerald-400 rounded-xl p-4 mb-4 text-center animate-fadeIn shadow-[0_0_25px_rgba(34,197,94,0.4)]">
          <div className="text-3xl mb-1">👍</div>
          <h4 className="text-sm font-black text-emerald-300 font-vault tracking-wide mb-1 uppercase">
            {lang === "id" ? "DIREKTIF VAULT BERHASIL DIJALANKAN!" : "OVERSEER DIRECTIVE EXECUTED!"}
          </h4>
          <p className="text-xs text-neutral-200 mb-2 font-sans">
            {lang === "id" ? confirmedOutcome.outcomeSummary : (confirmedOutcome.outcomeSummaryEn || confirmedOutcome.outcomeSummary)}
          </p>
          <div className="text-[11px] text-emerald-200 font-mono bg-black/60 p-2.5 rounded-lg border border-emerald-500/40 text-left">
            <span className="font-bold text-yellow-300">
              {lang === "id" ? "💡 FAKTA SAINS NASA: " : "💡 NASA SCIENCE FACT: "}
            </span>
            {lang === "id" ? confirmedOutcome.scientificLesson : (confirmedOutcome.scientificLessonEn || confirmedOutcome.scientificLesson)}
          </div>
        </div>
      )}

      {/* Choice Cards (Fallout Shelter Decision Cards) */}
      {!confirmedOutcome && (
        <div className="space-y-3">
          <div className="text-xs font-black text-yellow-300 tracking-wider uppercase font-vault flex items-center gap-1.5">
            <span>⚖️</span>
            <span>{lang === "id" ? "PILIH STRATEGI BERTAHAN HIDUP (TRADE-OFF):" : "CHOOSE YOUR SURVIVAL DIRECTIVE:"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {event.choices.map((choice, idx) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <div
                  key={choice.id}
                  onClick={() => handleChoose(choice)}
                  className={`cursor-pointer rounded-xl p-3.5 border-3 transition-all ${
                    isSelected 
                      ? "bg-[#1e293b] border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5),0_4px_0_#ca8a04] -translate-y-1" 
                      : "bg-[#0b1329] border-neutral-700 hover:border-yellow-500/70 shadow-[0_3px_0_#1e293b]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xs sm:text-sm font-black text-white font-vault flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? "border-yellow-400 bg-yellow-400" : "border-neutral-500"
                      }`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </span>
                      <span>[ DIRECTIVE 0{idx + 1} ]: {lang === "id" ? choice.title : (choice.titleEn || choice.title)}</span>
                    </h3>
                    <span className="text-[10px] font-black text-yellow-300 px-2 py-0.5 rounded bg-yellow-950/80 border border-yellow-500/60 shrink-0">
                      +{choice.impact.scienceXp} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-300 mb-3 font-sans leading-relaxed">
                    {lang === "id" ? choice.description : (choice.descriptionEn || choice.description)}
                  </p>

                  {/* Impact Stat Badges */}
                  <div className="bg-black/70 rounded-lg p-2 border border-neutral-800 flex flex-wrap gap-2 text-[10px]">
                    <span className={`px-2 py-0.5 rounded font-black ${
                      choice.impact.power > 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-600" : 
                      choice.impact.power < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      ⚡ {lang === "id" ? "LISTRIK" : "POWER"}: {choice.impact.power > 0 ? `+${choice.impact.power}` : choice.impact.power}%
                    </span>

                    <span className={`px-2 py-0.5 rounded font-black ${
                      choice.impact.oxygen > 0 ? "bg-cyan-950 text-cyan-300 border border-cyan-600" : 
                      choice.impact.oxygen < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      💨 {lang === "id" ? "OKSIGEN" : "OXYGEN"}: {choice.impact.oxygen > 0 ? `+${choice.impact.oxygen}` : choice.impact.oxygen}%
                    </span>

                    <span className={`px-2 py-0.5 rounded font-black ${
                      choice.impact.health > 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-600" : 
                      choice.impact.health < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"
                    }`}>
                      ❤️ {lang === "id" ? "KESEHATAN" : "CREW HEALTH"}: {choice.impact.health > 0 ? `+${choice.impact.health}` : choice.impact.health}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chunky Confirmation Button */}
          {selectedChoiceId && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleConfirm}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-vault font-black text-sm tracking-wider uppercase shadow-[0_5px_0_#854d0e,0_10px_20px_rgba(234,179,8,0.4)] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
              >
                <span>⚙️</span>
                <span>{lang === "id" ? "JALANKAN KEPUTUSAN KOMANDAN" : "CONFIRM OVERSEER DIRECTIVE"}</span>
                <span>➔</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
