// TutorialModal - Vault-Tec & NASA Junior Astronaut Orientation & Field Manual

import React, { useState, useEffect } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function TutorialModal({ isOpen, onClose, onStartPractice, lang = 'en' }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      SoundEngine.playPipBoyOpen();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      id: 'mission_goal',
      stepNum: 1,
      badge: lang === 'id' ? 'MISI UTAMA' : 'MISSION DIRECTIVE',
      title: lang === 'id' ? 'Selamat Datang di Vault 703: Kawah Jezero Mars!' : 'Welcome to Vault 703: Jezero Crater, Mars!',
      icon: '🚀',
      subtitle: lang === 'id' 
        ? 'Peranmu sebagai Komandan Junior Pangkalan Mars' 
        : 'Your Role as Junior Outpost Commander',
      content: lang === 'id' ? (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Selamat, Komandan! Kamu baru saja ditunjuk oleh <strong className="text-yellow-300">NASA Space Apps & Vault-Tec</strong> untuk memimpin <strong className="text-white">Mars Outpost Vault 703</strong> di Kawah Jezero Mars.
          </p>
          <div className="bg-[#0b1329] p-3 rounded-xl border border-yellow-500/60 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-yellow-300 font-bold font-vault text-xs uppercase">
              <span>🎯</span>
              <span>Target Kelulusan Sertifikasi:</span>
            </div>
            <p className="text-neutral-300">
              Pertahankan pangkalan dan kru astronotmu (<strong className="text-emerald-400">Commander Leo</strong>) selama <strong className="text-yellow-300">7 Sol (Hari Mars)</strong> berturut-turut untuk meraih <strong className="text-emerald-300">Junior Astronaut Mission Certification</strong> resmi dari NASA!
            </p>
          </div>
          <p className="text-neutral-400 italic">
            💡 Lingkungan Mars sangat ekstrem: malam bersuhu -82°C, tidak ada oksigen alami, dan radiasi kosmik mengancam setiap saat. Keberhasilan misi bergantung pada keputusan cerdasmu!
          </p>
        </div>
      ) : (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Greetings, Commander! You have been appointed by <strong className="text-yellow-300">NASA Space Apps & Vault-Tec</strong> to oversee <strong className="text-white">Mars Outpost Vault 703</strong> in the historic Jezero Crater.
          </p>
          <div className="bg-[#0b1329] p-3 rounded-xl border border-yellow-500/60 shadow-inner space-y-2">
            <div className="flex items-center gap-2 text-yellow-300 font-bold font-vault text-xs uppercase">
              <span>🎯</span>
              <span>Primary Mission Goal:</span>
            </div>
            <p className="text-neutral-300">
              Guide your outpost and brave astronaut (<strong className="text-emerald-400">Commander Leo</strong>) through <strong className="text-yellow-300">7 Sols (Martian Days)</strong> of space weather hazards to achieve official <strong className="text-emerald-300">NASA Junior Astronaut Certification</strong>!
            </p>
          </div>
          <p className="text-neutral-400 italic">
            💡 Mars is an unforgiving world: freezing nights at -82°C, zero breathable air, and cosmic radiation storms. Survival depends entirely on your strategic leadership!
          </p>
        </div>
      )
    },
    {
      id: 'resources_rule',
      stepNum: 2,
      badge: lang === 'id' ? '3 SUMBER DAYA UTAMA' : '3 VITAL LIFELINES',
      title: lang === 'id' ? 'Keseimbangan Bertahan Hidup (Aturan Trade-Off)' : 'The Golden Rule of Trade-Offs',
      icon: '⚖️',
      subtitle: lang === 'id' 
        ? 'Jangan Biarkan Sumber Daya Mencapai 0%!' 
        : 'Never Let Any Resource Drop to 0%!',
      content: lang === 'id' ? (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Sebagai komandan, kamu mengelola 3 pilar penopang kehidupan. <strong className="text-rose-400">Jika salah satu pilar mencapai 0%, simulasi berakhir (Game Over)!</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-950/40 border-2 border-amber-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-amber-300 mb-1">
                <span>⚡</span>
                <span>DAYA LISTRIK</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Menyalakan pemanas habitat (-82°C) dan mengisi medan perisai magnetik dari badai matahari.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-cyan-300 mb-1">
                <span>💨</span>
                <span>OKSIGEN</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Diekstrak dari atmosfer CO2 Mars oleh mesin MOXIE dan dibantu fotosintesis Bio-Dome.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-emerald-300 mb-1">
                <span>❤️</span>
                <span>KESEHATAN KRU</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Dijaga lewat nutrisi segar hidroponik dan olahraga treadmill anti-atrofi otot (gravitasi 0.38g).
              </p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] text-yellow-200">
            <strong>Prinsip Trade-Off:</strong> Setiap peningkatan sumber daya membutuhkan pengorbanan sumber daya lain. Belajarlah menyeimbangkan kebutuhan pangkalan!
          </div>
        </div>
      ) : (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            You command 3 critical survival lifelines. <strong className="text-rose-400">If any gauge drops to 0%, the mission suffers a critical casualty (Game Over)!</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-950/40 border-2 border-amber-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-amber-300 mb-1">
                <span>⚡</span>
                <span>POWER GRID</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Runs thermal heaters (-82°C nights) and charges electromagnetic shields against solar radiation.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-cyan-300 mb-1">
                <span>💨</span>
                <span>OXYGEN (O2)</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Cracked from toxic Martian CO2 air by MOXIE and refreshed by hydroponic greens.
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/80">
              <div className="flex items-center gap-1.5 font-bold font-vault text-emerald-300 mb-1">
                <span>❤️</span>
                <span>CREW HEALTH</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Protected by radiation shields, fresh microgreens, and treadmill workouts (fighting 0.38g atrophy).
              </p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] text-yellow-200">
            <strong>The Trade-Off Rule:</strong> Boosting one system often drains another. A great Commander always anticipates tomorrow's bottlenecks!
          </div>
        </div>
      )
    },
    {
      id: 'shifts_system',
      stepNum: 3,
      badge: lang === 'id' ? 'INTERAKSI 3D & SHIFT' : '3D ROOM & SHIFTS',
      title: lang === 'id' ? 'Tugaskan Leo: 3 Shift Tugas per Sol' : 'Deploy Commander Leo: 3 Shifts per Sol',
      icon: '⚙️',
      subtitle: lang === 'id' 
        ? 'Klik Langsung Stasiun 3D atau Tombol Bawah' 
        : 'Click 3D Stations or Bottom Control Buttons',
      content: lang === 'id' ? (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Kamu memiliki <strong className="text-emerald-400">3 Kapsul Shift per Sol</strong>. Kamu bisa mengarahkan kamera 3D (drag untuk rotasi, scroll untuk zoom), lalu klik stasiun kerja atau tombol di bawah:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-[#0f172a] border border-yellow-500/50">
              <span className="font-bold text-yellow-300 block">⚡ PANEL SURYA:</span>
              <span className="text-emerald-300">+15% Daya</span>, <span className="text-rose-300">-10% O2</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-cyan-500/50">
              <span className="font-bold text-cyan-300 block">💨 MOXIE REAKTOR:</span>
              <span className="text-emerald-300">+15% Oksigen</span>, <span className="text-rose-300">-10% Daya</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-emerald-500/50">
              <span className="font-bold text-emerald-300 block">🌱 BIO-DOME:</span>
              <span className="text-emerald-300">+15% Kru</span>, <span className="text-rose-300">-10% Daya</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-indigo-500/50">
              <span className="font-bold text-indigo-300 block">🏃 TREADMILL (OSDR):</span>
              <span className="text-emerald-300">+15% Kru</span>, <span className="text-rose-300">-10% O2</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center justify-between gap-2">
            <span><strong>Fisika Gravitasi Mars (0.38g):</strong> Leo melompat parabolik melayang, bekerja 3.5s, dan kembali ke tengah!</span>
            {onStartPractice && (
              <button
                onClick={() => { SoundEngine.playClick(); onStartPractice(); }}
                className="px-2.5 py-1 rounded-lg bg-yellow-400 text-black font-vault font-black text-[10px] tracking-wider uppercase shrink-0 hover:bg-yellow-300 shadow"
              >
                ⚡ COBA PRAKTEK
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            You are granted <strong className="text-emerald-400">3 Work Shifts (Action Points) per Sol</strong>. You can navigate the 3D room (drag to rotate 360°, scroll to zoom) and dispatch Leo by clicking the station or buttons below:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-lg bg-[#0f172a] border border-yellow-500/50">
              <span className="font-bold text-yellow-300 block">⚡ POWER GRID:</span>
              <span className="text-emerald-300">+15% Power</span>, <span className="text-rose-300">-10% O2</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-cyan-500/50">
              <span className="font-bold text-cyan-300 block">💨 MOXIE REACTOR:</span>
              <span className="text-emerald-300">+15% Oxygen</span>, <span className="text-rose-300">-10% Power</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-emerald-500/50">
              <span className="font-bold text-emerald-300 block">🌱 BIO-DOME:</span>
              <span className="text-emerald-300">+15% Crew</span>, <span className="text-rose-300">-10% Power</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0f172a] border border-indigo-500/50">
              <span className="font-bold text-indigo-300 block">🏃 TREADMILL (OSDR):</span>
              <span className="text-emerald-300">+15% Crew</span>, <span className="text-rose-300">-10% O2</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center justify-between gap-2">
            <span><strong>Low-G Martian Physics (0.38g):</strong> Leo floats in a parabolic arc, works 3.5s, and hops back!</span>
            {onStartPractice && (
              <button
                onClick={() => { SoundEngine.playClick(); onStartPractice(); }}
                className="px-2.5 py-1 rounded-lg bg-yellow-400 text-black font-vault font-black text-[10px] tracking-wider uppercase shrink-0 hover:bg-yellow-300 shadow"
              >
                ⚡ TRY PRACTICE
              </button>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'sol_lifecycle',
      stepNum: 4,
      badge: lang === 'id' ? 'SIKLUS MISI SOL' : 'SOL MISSION CYCLE',
      title: lang === 'id' ? '4 Fase Setiap Hari di Mars' : 'The 4 Phases of Every Martian Sol',
      icon: '🌅',
      subtitle: lang === 'id' 
        ? 'Dari Peringatan Satelit hingga Malam Dingin' 
        : 'From Morning Satellite Briefings to Freezing Nights',
      content: lang === 'id' ? (
        <div className="space-y-2.5 font-sans text-xs leading-relaxed text-neutral-200">
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌅</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">1. PAGI: BRIEFING DONKI NASA</span>
              <p className="text-[11px] text-neutral-300">Menerima data satelit NASA tentang badai radiasi (CME / Solar Flare) dan kondisi cuaca Mars Trek.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">☀️</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">2. SIANG: KEPUTUSAN OVERSEER</span>
              <p className="text-[11px] text-neutral-300">Hadapi dilema darurat: nyalakan perisai penuh, evakuasi bunker regolith, atau hemat daya baterai.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌤️</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">3. SORE: PERAWATAN MODUL RUANGAN</span>
              <p className="text-[11px] text-neutral-300">Tugaskan kru ke modul stasiun untuk memulihkan sumber daya sebelum matahari terbenam.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌙</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">4. MALAM: EVALUASI OVERSEER</span>
              <p className="text-[11px] text-neutral-300">Pemanas habitat bekerja (-10 Daya, -8 O2, -2 Kru). Bertahan dari malam memberi +25 XP dan mengisi ulang 3 Shift!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5 font-sans text-xs leading-relaxed text-neutral-200">
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌅</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">1. MORNING: NASA DONKI SATELLITE BRIEFING</span>
              <p className="text-[11px] text-neutral-300">Inspect real-time telemetry on incoming solar flares, CME plasma, and Mars Trek local weather.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">☀️</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">2. MIDDAY: OVERSEER TRADE-OFF DIRECTIVE</span>
              <p className="text-[11px] text-neutral-300">Resolve emergency dilemmas: power maximum shields, evacuate to regolith bunkers, or ration life support.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌤️</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">3. AFTERNOON: HABITAT ROOM JOBS</span>
              <p className="text-[11px] text-neutral-300">Assign Leo to station upkeep to restore vital reserves before the sun sets.</p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5">
            <span className="text-lg">🌙</span>
            <div>
              <span className="font-bold text-yellow-300 font-vault block">4. NIGHT: OVERSEER PERFORMANCE DEBRIEF</span>
              <p className="text-[11px] text-neutral-300">Life support sustains the freeze (-10 Power, -8 O2, -2 Health). Surviving awards +25 XP & refreshes all 3 shifts!</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ranks_pipboy',
      stepNum: 5,
      badge: lang === 'id' ? 'PROMOSI & ASISTEN AI' : 'RANKS & PIP-BOY AI',
      title: lang === 'id' ? 'Kenaikan Pangkat & Terminal Pip-Boy' : 'Rank Progression & Pip-Boy AI Companion',
      icon: '🏆',
      subtitle: lang === 'id' 
        ? 'Dapatkan XP Sains & Konsultasikan A.N.I.S.' 
        : 'Earn Science XP & Consult A.N.I.S.',
      content: lang === 'id' ? (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Setiap keputusan ilmiah yang kamu ambil memberi <strong className="text-yellow-300">Science XP</strong>. Capai level baru untuk membuka promosi pangkat astronot:
          </p>
          <div className="p-2.5 rounded-xl bg-[#0b1329] border border-yellow-500/70 space-y-1 text-[11px]">
            <div className="flex justify-between items-center text-white">
              <span>🚀 <strong>Level 1:</strong> Kadet Antariksa (Space Cadet)</span>
              <span className="text-amber-300 font-bold">0-50 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>🔧 <strong>Level 2:</strong> Spesialis Teknis (Junior Specialist)</span>
              <span className="text-emerald-300 font-bold">50-120 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>⚡ <strong>Level 3:</strong> Insinyur Misi (Mission Engineer)</span>
              <span className="text-yellow-300 font-bold">120-210 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>🎖️ <strong>Level 4:</strong> Komandan Pangkalan (Base Commander)</span>
              <span className="text-indigo-300 font-bold">210-320 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>👑 <strong>Level 5:</strong> Legenda Pelopor Mars (Mars Pioneer Legend)</span>
              <span className="text-rose-300 font-bold">320+ XP</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#062c12] border-2 border-emerald-500 text-[11px] text-emerald-200 flex items-start gap-2.5">
            <span className="text-2xl">📟</span>
            <div>
              <span className="font-bold text-emerald-300 font-vault block uppercase">Terminal Pip-Boy 3000 / A.N.I.S. AI:</span>
              <p>
                Kapan pun kamu penasaran dengan sains antariksa NASA, klik tombol hijau <strong className="text-white">PIP-BOY</strong> untuk bertanya langsung pada A.N.I.S.!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 font-sans text-xs leading-relaxed text-neutral-200">
          <p>
            Every strategic decision awards <strong className="text-yellow-300">Science XP</strong>. Reach XP milestones to unlock official astronaut rank promotions:
          </p>
          <div className="p-2.5 rounded-xl bg-[#0b1329] border border-yellow-500/70 space-y-1 text-[11px]">
            <div className="flex justify-between items-center text-white">
              <span>🚀 <strong>Level 1:</strong> Space Cadet</span>
              <span className="text-amber-300 font-bold">0-50 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>🔧 <strong>Level 2:</strong> Junior Specialist</span>
              <span className="text-emerald-300 font-bold">50-120 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>⚡ <strong>Level 3:</strong> Mission Engineer</span>
              <span className="text-yellow-300 font-bold">120-210 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>🎖️ <strong>Level 4:</strong> Base Commander</span>
              <span className="text-indigo-300 font-bold">210-320 XP</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>👑 <strong>Level 5:</strong> Mars Pioneer Legend</span>
              <span className="text-rose-300 font-bold">320+ XP</span>
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-[#062c12] border-2 border-emerald-500 text-[11px] text-emerald-200 flex items-start gap-2.5">
            <span className="text-2xl">📟</span>
            <div>
              <span className="font-bold text-emerald-300 font-vault block uppercase">Pip-Boy 3000 / A.N.I.S. AI Assistant:</span>
              <p>
                Whenever you want to learn about NASA space science or ask for survival advice, click the green <strong className="text-white">PIP-BOY</strong> button anytime!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    SoundEngine.playClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      SoundEngine.playSuccessChime();
      onClose();
    }
  };

  const handlePrev = () => {
    SoundEngine.playClick();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none">
      <div className="w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_80px_rgba(234,179,8,0.5)] overflow-hidden border-4 border-yellow-500 flex flex-col">
        {/* Top Caution Stripes */}
        <div className="w-full h-2 hazard-stripes" />

        {/* Header Ribbon */}
        <div className="bg-[#0b1329] p-4 text-center border-b-2 border-yellow-500/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            <div className="text-left">
              <span className="font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-wider uppercase block">
                VAULT-TEC & NASA • JUNIOR ASTRONAUT FIELD MANUAL
              </span>
              <span className="text-[10px] text-neutral-400 font-sans">
                {lang === 'id' ? 'Panduan Orientasi Komandan Baru Pangkalan Mars' : 'New Commander Outpost Survival Orientation'}
              </span>
            </div>
          </div>
          <button
            onClick={() => { SoundEngine.playClick(); onClose(); }}
            className="text-[11px] font-vault font-black text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700"
            title={lang === 'id' ? 'Lewati Tutorial' : 'Skip Tutorial'}
          >
            {lang === 'id' ? '[ LEWATI ]' : '[ SKIP ]'}
          </button>
        </div>

        {/* Step Indicator Navigation Tabs */}
        <div className="bg-[#070d1e] px-3 py-2 border-b border-yellow-600/40 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { SoundEngine.playClick(); setCurrentStep(idx); }}
              className={`px-2.5 py-1 rounded text-[10px] font-vault font-black uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentStep === idx
                  ? 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.6)]'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              <span>{s.icon}</span>
              <span className="hidden sm:inline">STEP {idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar bg-gradient-to-b from-[#0b1329] to-[#060a14]">
          {/* Active Step Badge & Title */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-yellow-200 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(234,179,8,0.5)] shrink-0">
              {current.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded text-[9px] font-vault font-black bg-yellow-400/20 text-yellow-300 border border-yellow-500/40">
                  {current.badge}
                </span>
                <span className="text-[10px] text-neutral-500 font-bold">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white font-vault tracking-wide">
                {current.title}
              </h3>
              <p className="text-[11px] text-amber-300 font-bold mt-0.5">
                {current.subtitle}
              </p>
            </div>
          </div>

          {/* Step Content */}
          <div className="pt-2">
            {current.content}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="bg-[#0b1329] p-3.5 sm:p-4 border-t-2 border-yellow-500/70 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-xl vault-btn text-yellow-300 font-vault text-xs font-bold transition-all ${
              currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            ← {lang === 'id' ? 'SEBELUMNYA' : 'BACK'}
          </button>

          <div className="hidden sm:flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep === i ? 'w-5 bg-yellow-400 shadow-[0_0_6px_#facc15]' : 'bg-neutral-700'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {onStartPractice && (
              <button
                onClick={() => {
                  SoundEngine.playClick();
                  onStartPractice();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-vault font-black text-xs uppercase tracking-wider shadow-md transition-all border border-emerald-300 flex items-center gap-1.5 active:scale-95"
              >
                <span>⚡</span>
                <span>{lang === 'id' ? 'PRAKTEK LANGSUNG' : 'HANDS-ON PRACTICE'}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_3px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-1.5 border border-yellow-200"
            >
              <span>{currentStep === steps.length - 1 ? '🚀' : '➔'}</span>
              <span>
                {currentStep === steps.length - 1
                  ? (lang === 'id' ? 'MULAI MISI SOL 1' : 'START SOL 1')
                  : (lang === 'id' ? 'LANJUT' : 'NEXT')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
