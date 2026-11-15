// InteractivePracticeGuide - Interactive Hands-On Practice Training Protocol

import React from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function InteractivePracticeGuide({
  practiceStep,
  dailyShiftsLeft,
  isWorking,
  activeStation,
  onCompletePractice,
  onSkipPractice,
  lang = 'en'
}) {
  if (!practiceStep) return null;

  const handleFinish = () => {
    SoundEngine.playSuccessChime();
    onCompletePractice();
  };

  const handleSkip = () => {
    SoundEngine.playClick();
    onSkipPractice();
  };

  return (
    <div className="w-full max-w-6xl mb-3 animate-fadeIn select-none font-mono">
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0b1329] via-[#111c3a] to-[#0b1329] border-3 border-yellow-400 p-4 shadow-[0_0_35px_rgba(234,179,8,0.4)] overflow-hidden">
        {/* Animated Top Caution Trim */}
        <div className="absolute top-0 left-0 right-0 h-1.5 hazard-stripes" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          {/* Left: Step Badge & Instructions */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-vault font-black bg-yellow-400 text-black tracking-wider uppercase shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse">
                {practiceStep === 'GRADUATED'
                  ? (lang === 'id' ? '🎉 PRAKTEK SELESAI' : '🎉 PRACTICE COMPLETE')
                  : (lang === 'id' 
                      ? `⚡ PRAKTEK LANGSUNG • TAHAP ${practiceStep === 'POWER_GRID' ? '1/3' : practiceStep === 'MOXIE' ? '2/3' : '3/3'}`
                      : `⚡ HANDS-ON PRACTICE • STEP ${practiceStep === 'POWER_GRID' ? '1/3' : practiceStep === 'MOXIE' ? '2/3' : '3/3'}`
                    )}
              </span>

              <span className="text-[11px] font-bold text-yellow-300 font-vault uppercase tracking-wide">
                {practiceStep === 'POWER_GRID'
                  ? (lang === 'id' ? 'PENGURANGAN SHIFT & PEMULIHAN DAYA' : 'SHIFT DEDUCTION & POWER RESTORATION')
                  : practiceStep === 'MOXIE'
                    ? (lang === 'id' ? 'EKSTRAKSI OKSIGEN MOXIE' : 'MOXIE OXYGEN EXTRACTION')
                    : practiceStep === 'PIP_BOY'
                      ? (lang === 'id' ? 'KONSULTASI AI PIP-BOY 3000' : 'PIP-BOY 3000 AI CONSULTATION')
                      : (lang === 'id' ? 'AKADEMI ASTRONOT LULUS!' : 'TRAINING ACADEMY GRADUATION!')}
              </span>
            </div>

            {/* Instruction Body */}
            <div className="text-xs font-sans text-neutral-200 leading-relaxed max-w-3xl">
              {practiceStep === 'POWER_GRID' && (
                <div>
                  {isWorking && activeStation === 'power_grid' ? (
                    <span className="text-emerald-300 font-bold animate-pulse">
                      {lang === 'id'
                        ? '⚙️ Bagus sekali! Perhatikan: Shift berkurang dari 3 menjadi 2. Leo sedang membersihkan panel surya (3.5 detik)...'
                        : '⚙️ Excellent! Notice that your Shifts dropped from 3 to 2. Commander Leo is servicing the Solar Grid (3.5s)...'}
                    </span>
                  ) : (
                    <span>
                      {lang === 'id' ? (
                        <>
                          Klik tombol <strong className="text-yellow-300 underline font-vault">[⚡ PANEL SURYA]</strong> yang berkedip di bilah bawah (atau klik panel surya di ruangan 3D). Perhatikan bahwa <strong className="text-emerald-400">Shift harianmu akan berkurang 1</strong>!
                        </>
                      ) : (
                        <>
                          Click the highlighted <strong className="text-yellow-300 underline font-vault">[⚡ POWER GRID]</strong> button below (or click the solar array in the 3D room). Notice how your <strong className="text-emerald-400">Daily Shifts will visibly deduct by 1</strong>!
                        </>
                      )}
                    </span>
                  )}
                </div>
              )}

              {practiceStep === 'MOXIE' && (
                <div>
                  {isWorking && activeStation === 'moxie' ? (
                    <span className="text-cyan-300 font-bold animate-pulse">
                      {lang === 'id'
                        ? '💨 Hebat! Shift berkurang lagi menjadi 1/3. Oksigen naik (+15%) dan Daya turun (-10%) sebagai trade-off!'
                        : '💨 Fantastic! Shift deducted to 1/3. Oxygen rises (+15%) and Power dips (-10%) as a true survival trade-off!'}
                    </span>
                  ) : (
                    <span>
                      {lang === 'id' ? (
                        <>
                          Bagus! Daya bertambah, tapi oksigen sedikit berkurang. Sekarang klik tombol <strong className="text-cyan-300 underline font-vault">[💨 MOXIE (+O2)]</strong> untuk mengisi ulang oksigen!
                        </>
                      ) : (
                        <>
                          Great! Power was boosted, but O2 dipped slightly. Now click the highlighted <strong className="text-cyan-300 underline font-vault">[💨 MOXIE (+O2)]</strong> button to recover fresh breathing oxygen!
                        </>
                      )}
                    </span>
                  )}
                </div>
              )}

              {practiceStep === 'PIP_BOY' && (
                <div>
                  <span>
                    {lang === 'id' ? (
                      <>
                        Tahap terakhir! Klik tombol hijau <strong className="text-emerald-300 underline font-vault">[📟 PIP-BOY • A.N.I.S.]</strong> di sebelah kanan untuk mencoba konsultasi sains antariksa dengan asisten AI!
                      </>
                    ) : (
                      <>
                        Final practice step! Click the glowing green <strong className="text-emerald-300 underline font-vault">[📟 PIP-BOY • A.N.I.S.]</strong> button on the right to test your companion AI science terminal!
                      </>
                    )}
                  </span>
                </div>
              )}

              {practiceStep === 'GRADUATED' && (
                <div className="text-emerald-300 font-bold">
                  {lang === 'id' ? (
                    <>
                      🎉 Selamat! Kamu telah memahami sistem Pengurangan Shift Harian dan Keseimbangan Trade-Off. Seluruh shift (3/3) dan sumber daya telah disegarkan kembali untuk Misi Sol 1 sesungguhnya!
                    </>
                  ) : (
                    <>
                      🎉 Congratulations! You have mastered Daily Shift Limits and Resource Trade-Offs. All shifts (3/3) and outpost resources have been refreshed to 100% nominal condition for your real Sol 1 Mission!
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {practiceStep === 'GRADUATED' ? (
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.7)] transition-all transform hover:scale-105 active:scale-95 border-2 border-yellow-200 flex items-center gap-2"
              >
                <span>🚀</span>
                <span>{lang === 'id' ? 'MULAI MISI SOL 1' : 'START SOL 1 MISSION'}</span>
                <span>➔</span>
              </button>
            ) : (
              <button
                onClick={handleSkip}
                className="px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 text-[11px] font-vault font-black uppercase transition-all"
                title={lang === 'id' ? 'Lewati mode latihan' : 'Skip practice training'}
              >
                {lang === 'id' ? '[ LEWATI PRAKTEK ]' : '[ SKIP PRACTICE ]'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

