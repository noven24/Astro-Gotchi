// GameOverModal - Authentic Fallout Shelter Style Incident Report

import React, { useEffect } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function GameOverModal({ 
  failedResource, 
  solReached, 
  scienceXp, 
  onRestart, 
  onOpenAnis, 
  lang 
}) {
  useEffect(() => {
    SoundEngine.playGameOverTone();
  }, []);

  const getFailureExplanation = () => {
    switch (failedResource) {
      case "power":
        return {
          title: lang === "id" ? "⚡ DAYA LISTRIK PANGKALAN HABIS (0%)" : "⚡ OUTPOST POWER DEPLETED (0%)",
          icon: "❄️",
          color: "border-amber-500",
          lesson: lang === "id"
            ? "Pangkalan Mars membutuhkan listrik untuk pemanas internal. Di malam Mars yang suhunya mencapai -80°C hingga -100°C, tanpa pemanas pipa-pipa air membeku dan sirkuit komputer retak. Pada tahun 2018, robot penjelajah legendaris NASA 'Opportunity' berhenti beroperasi karena badai debu raksasa menutupi panel suryanya selama berbulan-bulan."
            : "Mars habitats need continuous electric heaters. At night temperatures dropping to -80°C to -100°C, without power the water lines freeze solid and computer solder cracks. In 2018, NASA's rover 'Opportunity' ended its 14-year mission when a planet-encircling dust storm blocked all solar power.",
          anisTip: lang === "id"
            ? "Untuk misi berikutnya, jangan menyalakan perisai radiasi terlalu lama jika tidak ada badai, dan sering-sering bersihkan debu panel surya di sore hari!"
            : "Next time, avoid running heavy shields when space weather is calm, and sweep solar panel dust frequently during afternoon hours!"
        };
      case "oxygen":
        return {
          title: lang === "id" ? "💨 CADANGAN OKSIGEN HABIS (0%)" : "💨 OXYGEN RESERVES DEPLETED (0%)",
          icon: "🫁",
          color: "border-cyan-500",
          lesson: lang === "id"
            ? "Atmosfer Mars mengandung 95% Karbon Dioksida yang beracun dan hanya 0.13% Oksigen (Bumi memiliki 21% Oksigen). Tanpa mesin MOXIE atau tanaman Bio-Dome yang memproduksi O2 segar, astronot tidak bisa bernapas. Oleh karena itu, NASA selalu merancang sistem pendukung kehidupan (ECLSS) dengan tiga lapis tangki cadangan."
            : "Mars atmosphere is 95% poisonous carbon dioxide with merely 0.13% oxygen (Earth has 21%). Without the MOXIE generator or Bio-Dome plants, astronauts cannot breathe. NASA designs human space habitats with closed-loop recycling and multiple redundant storage tanks.",
          anisTip: lang === "id"
            ? "Gali es bawah tanah atau rawat tanaman hidroponik lebih sering agar pangkalan selalu memiliki persediaan oksigen cadangan!"
            : "Drill for subsurface ice or nurture greenhouse crops to ensure your base always has reserve breathing oxygen!"
        };
      case "health":
      default:
        return {
          title: lang === "id" ? "❤️ KESEHATAN ASTRONOT KRITIS (0%)" : "❤️ CREW HEALTH COLLAPSED (0%)",
          icon: "🏥",
          color: "border-rose-500",
          lesson: lang === "id"
            ? "Mars tidak memiliki lapisan ozon dan medan magnet pelindung seperti Bumi. Data penelitian NASA OSDR & RadLab menunjukkan bahwa radiasi matahari (CME) dan sinar kosmik galaksi merusak sel DNA dan mempercepat anemia luar angkasa. Astronot harus berlindung di bunker regolith tebal atau menyalakan perisai magnetik saat badai matahari melanda."
            : "Mars lacks a global protective magnetic field and ozone layer. NASA OSDR & RadLab research reveals that solar flares and cosmic rays damage cellular DNA and cause space anemia. Crew members must retreat into thick Martian soil bunkers or power electromagnetic shields during solar storms.",
          anisTip: lang === "id"
            ? "Saat sensor DONKI memberi peringatan badai matahari (CME/Flare), utamakan evakuasi kru atau perisai radiasi, dan jangan lupa latihan treadmill!"
            : "When DONKI sensors warn of a solar storm, prioritize radiation shields or bunker retreat, and maintain daily treadmill workouts!"
        };
    }
  };

  const info = getFailureExplanation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-2xl bg-[#140b0f] border-4 border-rose-600 rounded-2xl shadow-[0_0_60px_rgba(244,63,94,0.4)] overflow-hidden flex flex-col">
        {/* Red Hazard Stripes */}
        <div className="w-full h-2 hazard-stripes-danger" />

        {/* Header */}
        <div className="bg-[#240c12] p-4 text-center border-b-2 border-rose-600 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">💀</span>
            <div>
              <span className="font-vault font-black text-xs sm:text-sm text-rose-300 tracking-wider uppercase block">
                VAULT-TEC CRITICAL INCIDENT REPORT • MISSION OVER
              </span>
              <span className="text-[10px] text-rose-400 font-sans">
                {lang === 'id' ? 'Kegagalan Sistem Pangkalan Mars • Evaluasi Sains NASA' : 'Mars Habitat Critical Casualty • NASA Scientific Post-Mortem'}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-rose-600 text-white font-vault text-xs font-black">
            SOL {solReached}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto no-scrollbar bg-[#0d070a]">
          {/* Failure Alert Box */}
          <div className="p-4 rounded-xl bg-rose-950/60 border-2 border-rose-500 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{info.icon}</span>
              <div>
                <h3 className="text-sm sm:text-base font-black text-rose-300 font-vault tracking-wide">
                  {info.title}
                </h3>
                <div className="text-[11px] text-neutral-400 font-sans">
                  {lang === "id" ? `Misi bertahan hingga Sol ${solReached} dengan perolehan ${scienceXp} XP Sains.` : `Survived to Sol ${solReached} with ${scienceXp} Science XP.`}
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-200 mt-3 leading-relaxed font-sans bg-black/70 p-3 rounded-lg border border-rose-900">
              <span className="font-bold text-yellow-300">
                {lang === 'id' ? '💡 FAKTA SAINS & KEGAGALAN MISI: ' : '💡 NASA SCIENCE & CASUALTY LESSON: '}
              </span>
              {info.lesson}
            </div>
          </div>

          {/* Pip-Boy Recommendation from A.N.I.S. */}
          <div className="pipboy-crt p-4 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 shadow-inner relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5 font-vault font-black text-emerald-300 uppercase tracking-widest text-[11px] pipboy-glow">
              <span>🤖</span>
              <span>{lang === 'id' ? 'SARAN A.N.I.S. UNTUK MISI BERIKUTNYA:' : 'A.N.I.S. MISSION ADVISORY FOR NEXT RUN:'}</span>
            </div>
            <p className="font-sans leading-relaxed pipboy-glow relative z-30">
              "{info.anisTip}"
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#180a0f] p-4 border-t-2 border-rose-800 flex justify-end gap-3">
          <button
            onClick={() => {
              SoundEngine.playClick();
              onRestart();
            }}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 text-white font-vault font-black text-sm tracking-wider uppercase shadow-[0_4px_0_#881337] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-rose-300"
          >
            <span>🔄</span>
            <span>{lang === "id" ? "MULAI ULANG SIMULASI PANGKALAN" : "RE-BOOT OUTPOST SIMULATION"}</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
