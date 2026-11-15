// Astro-Gotchi: Mars Outpost Survival - Main Application

import React, { useState, useEffect } from 'react';
import { NASA_DONKI_EVENTS } from './data/nasa_donki.js';
import { MARS_TREK_SITES } from './data/mars_trek.js';
import { TRADE_OFF_EVENTS, ASTRONAUT_RANKS, getAstronautRank } from './data/trade_off_events.js';
import { SoundEngine } from './audio/sound_effects.js';

import ThreeDOutpostView from './components/ThreeDOutpostView.jsx';
import ResourceBars from './components/ResourceBars.jsx';
import SolBriefingModal from './components/SolBriefingModal.jsx';
import TradeOffCard from './components/TradeOffCard.jsx';
import AfternoonActivities from './components/AfternoonActivities.jsx';
import EveningEvaluation from './components/EveningEvaluation.jsx';
import GameOverModal from './components/GameOverModal.jsx';
import VictoryModal from './components/VictoryModal.jsx';
import AnisAssistant from './components/AnisAssistant.jsx';
import NasaDataInspector from './components/NasaDataInspector.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import LevelUpModal from './components/LevelUpModal.jsx';
import TutorialModal from './components/TutorialModal.jsx';
import InteractivePracticeGuide from './components/InteractivePracticeGuide.jsx';

export default function App() {
  // Game Configuration & Language
  const [lang, setLang] = useState('en');
  const [selectedSiteKey, setSelectedSiteKey] = useState('jezero');
  const [soundMuted, setSoundMuted] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('astro_gemini_key') || '');

  // Sol Cycle State
  const [currentSol, setCurrentSol] = useState(1);
  const [solPhase, setSolPhase] = useState('BRIEFING'); // 'BRIEFING' | 'MIDDAY' | 'AFTERNOON' | 'EVALUATION' | 'GAME_OVER' | 'VICTORY'
  
  // 3 Core Resources (Child-Friendly Trade-Off Mechanic)
  const [resources, setResources] = useState({
    power: 85,
    oxygen: 90,
    health: 95
  });
  const [previousResources, setPreviousResources] = useState({ power: 85, oxygen: 90, health: 95 });
  
  // Radiation & Shield State
  const [radiationDose, setRadiationDose] = useState(1.4);
  const [shieldActive, setShieldActive] = useState(false);
  const [scienceXp, setScienceXp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levelUpData, setLevelUpData] = useState(null);

  // Daily Shift Limit (3 Action Points per Sol)
  const [dailyShiftsLeft, setDailyShiftsLeft] = useState(3);

  // Modals & Assistant
  const [tutorialOpen, setTutorialOpen] = useState(() => {
    try {
      return !localStorage.getItem('astro_tutorial_completed');
    } catch (e) {
      return true;
    }
  });
  const [briefingOpen, setBriefingOpen] = useState(true);
  const [failedResource, setFailedResource] = useState(null);
  const [anisModalOpen, setAnisModalOpen] = useState(false);
  const [anisInitialQuery, setAnisInitialQuery] = useState('');
  const [dataTerminalOpen, setDataTerminalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Interactive Hands-On Practice State
  const [practiceStep, setPracticeStep] = useState(null); // null | 'POWER_GRID' | 'MOXIE' | 'PIP_BOY' | 'GRADUATED'
  const [workerState, setWorkerState] = useState({ isWorking: false, activeStation: null });

  // Determine interactive highlighted target for practice guide
  const highlightedTarget = practiceStep === 'POWER_GRID'
    ? 'power_grid'
    : practiceStep === 'MOXIE'
    ? 'moxie'
    : practiceStep === 'PIP_BOY'
    ? 'anis_dock'
    : null;

  const handleStartPractice = () => {
    setTutorialOpen(false);
    setPracticeStep('POWER_GRID');
    setDailyShiftsLeft(3);
    setResources({ power: 75, oxygen: 80, health: 90 });
    SoundEngine.playPipBoyOpen();
  };

  const handleCompletePractice = () => {
    setPracticeStep(null);
    setDailyShiftsLeft(3);
    setResources({ power: 85, oxygen: 90, health: 95 });
    setBriefingOpen(true);
    try {
      localStorage.setItem('astro_tutorial_completed', 'true');
    } catch (e) {}
  };

  const handleSkipPractice = () => {
    setPracticeStep(null);
    setDailyShiftsLeft(3);
    setResources({ power: 85, oxygen: 90, health: 95 });
    setBriefingOpen(true);
    try {
      localStorage.setItem('astro_tutorial_completed', 'true');
    } catch (e) {}
  };

  const handleCloseTutorial = () => {
    try {
      localStorage.setItem('astro_tutorial_completed', 'true');
    } catch (e) {}
    setTutorialOpen(false);
  };

  // Current Astronaut Rank
  const rank = getAstronautRank(scienceXp);

  // Monitor Level-Up progression
  useEffect(() => {
    const newRank = getAstronautRank(scienceXp);
    if (newRank.level > currentLevel) {
      setCurrentLevel(newRank.level);
      setLevelUpData(newRank);
    }
  }, [scienceXp, currentLevel]);

  // Current Site Data
  const currentSite = MARS_TREK_SITES[selectedSiteKey] || MARS_TREK_SITES.jezero;

  // Select DONKI & Trade-Off Event based on Current Sol
  const donkiIndex = (currentSol - 1) % NASA_DONKI_EVENTS.length;
  const activeDonki = NASA_DONKI_EVENTS[donkiIndex];

  const tradeOffIndex = (currentSol - 1) % TRADE_OFF_EVENTS.length;
  const activeTradeOff = TRADE_OFF_EVENTS[tradeOffIndex];

  // Check Game Over Condition
  const checkGameOver = (newRes) => {
    if (newRes.power <= 0) {
      setFailedResource('power');
      setSolPhase('GAME_OVER');
      return true;
    }
    if (newRes.oxygen <= 0) {
      setFailedResource('oxygen');
      setSolPhase('GAME_OVER');
      return true;
    }
    if (newRes.health <= 0) {
      setFailedResource('health');
      setSolPhase('GAME_OVER');
      return true;
    }
    return false;
  };

  // Morning: Finish Briefing -> Proceed to Midday Dilemma
  const handleStartSol = () => {
    setBriefingOpen(false);
    setSolPhase('MIDDAY');
  };

  // Midday: Player executes a Trade-Off decision
  const handleSelectTradeOff = (choice) => {
    const newPower = Math.min(100, Math.max(0, resources.power + choice.impact.power));
    const newOxygen = Math.min(100, Math.max(0, resources.oxygen + choice.impact.oxygen));
    const newHealth = Math.min(100, Math.max(0, resources.health + choice.impact.health));
    const newXp = scienceXp + (choice.impact.scienceXp || 15);

    // Track shield active state
    if (choice.id === 'shield_max') {
      setShieldActive(true);
    } else {
      setShieldActive(false);
      // Radiation dose accumulation from DONKI
      setRadiationDose(prev => prev + (activeDonki.gameImpact.radiationDoseMsv || 5));
    }

    const updated = { power: newPower, oxygen: newOxygen, health: newHealth };
    setResources(updated);
    setScienceXp(newXp);

    if (checkGameOver(updated)) return;

    // Transition to Afternoon Activities
    setSolPhase('AFTERNOON');
  };

  // Afternoon: Astro-Gotchi hands-on maintenance action
  const handlePerformActivity = (impact) => {
    const updated = {
      power: Math.min(100, Math.max(0, resources.power + impact.power)),
      oxygen: Math.min(100, Math.max(0, resources.oxygen + impact.oxygen)),
      health: Math.min(100, Math.max(0, resources.health + impact.health))
    };
    setResources(updated);
    checkGameOver(updated);
  };

  // Direct 3D Isometric Station Click Interaction
  const handleInteractStation = (stationKey, impact) => {
    if (dailyShiftsLeft <= 0) return;
    if (impact) {
      const newPower = Math.min(100, Math.max(0, resources.power + (impact.power || 0)));
      const newOxygen = Math.min(100, Math.max(0, resources.oxygen + (impact.oxygen || 0)));
      const newHealth = Math.min(100, Math.max(0, resources.health + (impact.health || 0)));
      const updated = { power: newPower, oxygen: newOxygen, health: newHealth };

      setResources(updated);
      setDailyShiftsLeft(prev => Math.max(0, prev - 1));
      setScienceXp(prev => prev + 10);

      // Interactive practice step progression!
      if (practiceStep === 'POWER_GRID' && stationKey === 'power_grid') {
        setTimeout(() => setPracticeStep('MOXIE'), 2200);
      } else if (practiceStep === 'MOXIE' && stationKey === 'moxie') {
        setTimeout(() => setPracticeStep('PIP_BOY'), 2200);
      }

      // Real consequences: check Game Over immediately if trade-off depletes any vital resource!
      checkGameOver(updated);
    }
  };

  // Afternoon -> Proceed to Night Evaluation
  const handleProceedToNight = () => {
    // Night passive life support drain (heaters & air recycling)
    const nightDrain = {
      power: Math.max(0, resources.power - 10),
      oxygen: Math.max(0, resources.oxygen - 8),
      health: Math.max(0, resources.health - 2)
    };

    setPreviousResources(resources);
    setResources(nightDrain);

    if (checkGameOver(nightDrain)) return;

    setSolPhase('EVALUATION');
  };

  // Next Sol transition
  const handleNextSol = () => {
    const nextSolNum = currentSol + 1;
    
    // Check if player reaches certification milestone (Sol 7)
    if (currentSol === 7 && solPhase !== 'VICTORY') {
      setSolPhase('VICTORY');
      return;
    }

    // Sol Survival XP Reward & Reset Daily Shifts
    setScienceXp(prev => prev + 25);
    setDailyShiftsLeft(3);

    setCurrentSol(nextSolNum);
    setShieldActive(false);
    setSolPhase('BRIEFING');
    setBriefingOpen(true);
  };

  // Restart Game
  const handleRestart = () => {
    setCurrentSol(1);
    setSolPhase('BRIEFING');
    setResources({ power: 85, oxygen: 90, health: 95 });
    setRadiationDose(1.4);
    setShieldActive(false);
    setScienceXp(0);
    setCurrentLevel(1);
    setDailyShiftsLeft(3);
    setFailedResource(null);
    setBriefingOpen(true);
  };

  const handleOpenAnis = (customPrompt = '') => {
    SoundEngine.playClick();
    setAnisInitialQuery(customPrompt);
    setAnisModalOpen(true);

    if (practiceStep === 'PIP_BOY') {
      setPracticeStep('GRADUATED');
      try {
        if (typeof window !== 'undefined' && window.confetti) {
          window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
        }
      } catch (e) {}
    }
  };

  const toggleSound = () => {
    const active = SoundEngine.toggleMute();
    setSoundMuted(!active);
  };

  const saveApiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('astro_gemini_key', key);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center justify-start p-2 sm:p-4 select-none">
      {/* Fallout Shelter Iconic Overseer Top HUD */}
      <header className="w-full max-w-6xl vault-panel rounded-xl px-4 py-2.5 mb-3 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono">
        {/* Left: Vault Cog Emblem & Crew Status */}
        <div className="flex items-center gap-3">
          {/* Animated Vault-Tec Cog Gear */}
          <div className="relative w-11 h-11 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 rounded-full border-2 border-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)]">
            <div className="w-8 h-8 rounded-full bg-[#0a192f] border border-yellow-300 flex flex-col items-center justify-center text-center">
              <span className="text-[8px] font-black text-yellow-300 leading-none">VAULT</span>
              <span className="text-[11px] font-black text-white leading-none">703</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-vault font-black text-sm sm:text-base text-yellow-300 tracking-wider">
                MARS OUTPOST
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-950 border border-blue-400 text-blue-200 text-[8px] font-bold">
                NASA APPS
              </span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span>😄 100% {lang === 'id' ? 'SENANG' : 'HAPPINESS'}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-300">LEO: ONLINE</span>
            </div>
          </div>
        </div>

        {/* Center: Sol Cycle & Radiation Counter (OSDR RadLab) */}
        <div className="flex items-center gap-3">
          {/* Sol Time Tracker */}
          <div className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-600/70 shadow-inner">
            <div className="text-right">
              <div className="text-[9px] text-neutral-400 uppercase tracking-widest">
                {lang === 'id' ? 'SIKLUS WAKTU' : 'SOL CYCLE'}
              </div>
              <div className="text-xs font-black text-yellow-300">
                SOL {currentSol} • {solPhase}
              </div>
            </div>
            <span className="text-lg">
              {solPhase === 'BRIEFING' ? '🌅' : solPhase === 'MIDDAY' ? '☀️' : solPhase === 'AFTERNOON' ? '🌤️' : '🌙'}
            </span>
          </div>

          {/* Radiation Meter Badge */}
          <div 
            className="hidden md:flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-700 shadow-inner" 
            title={lang === 'id' ? 'Dosis Radiasi Kumulatif (NASA OSDR)' : 'Cumulative Radiation Dose (NASA OSDR)'}
          >
            <span className="text-base text-rose-400 animate-pulse">☢️</span>
            <div>
              <div className="text-[9px] text-neutral-400 uppercase tracking-widest">RADS</div>
              <div className="text-xs font-black text-rose-300">{radiationDose.toFixed(1)} mSv</div>
            </div>
          </div>

          {/* Astronaut Rank, Level Badge & Science XP Progress */}
          <div 
            className="flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-500/80 shadow-inner" 
            title={`Level ${rank.level}: ${lang === 'id' ? rank.titleId : rank.titleEn} (${scienceXp} XP)`}
          >
            <span className="text-lg">{rank.icon}</span>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] font-black text-yellow-300 font-vault uppercase tracking-wider">
                  LVL {rank.level} • {lang === 'id' ? rank.titleId : rank.titleEn}
                </span>
                <span className="text-[9px] text-amber-300 font-black">{scienceXp} XP</span>
              </div>
              {/* Mini Level XP Progress Bar */}
              <div className="w-24 sm:w-28 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-yellow-600/50 mt-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ 
                    width: `${Math.min(100, Math.max(5, ((scienceXp - rank.minXp) / ((rank.maxXp === 9999 ? 500 : rank.maxXp) - rank.minXp || 1)) * 100))}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tactile Vault Buttons */}
        <div className="flex items-center gap-2">
          {/* Field Manual / Tutorial Guide Button */}
          <button
            onClick={() => { SoundEngine.playClick(); setTutorialOpen(true); }}
            className="px-2.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all flex items-center gap-1.5"
            title={lang === 'id' ? 'Buka Panduan Manual Astronot (Tutorial)' : 'Junior Astronaut Field Manual (Tutorial)'}
          >
            <span>📖</span>
            <span className="hidden sm:inline font-vault text-[11px]">{lang === 'id' ? 'PANDUAN' : 'GUIDE'}</span>
          </button>

          {/* Pip-Boy A.N.I.S. Button */}
          <button
            onClick={() => {
              SoundEngine.playPipBoyOpen();
              handleOpenAnis();
            }}
            className="px-3 py-1.5 rounded-lg vault-btn-green text-emerald-300 text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
            title={lang === 'id' ? 'Buka Terminal Pip-Boy 3000 / A.N.I.S. AI' : 'Open Pip-Boy 3000 / A.N.I.S. AI Terminal'}
          >
            <span>📟</span>
            <span className="hidden sm:inline pipboy-glow text-[11px]">PIP-BOY</span>
          </button>

          {/* NASA Data Terminal Button */}
          <button
            onClick={() => { SoundEngine.playClick(); setDataTerminalOpen(true); }}
            className="px-2.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all flex items-center gap-1.5"
            title={lang === 'id' ? 'Data NASA Terverifikasi' : 'Verified NASA Data'}
          >
            <span>🛰️</span>
            <span className="hidden lg:inline text-[11px]">NASA DATA</span>
          </button>

          {/* Sound FX Button */}
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-lg vault-btn text-yellow-200 flex items-center justify-center text-xs font-bold transition-all"
            title={lang === 'id' ? 'Toggle Suara' : 'Toggle Audio'}
          >
            {soundMuted ? '🔇' : '🔊'}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => { SoundEngine.playClick(); setSettingsOpen(true); }}
            className="w-8 h-8 rounded-lg vault-btn text-yellow-200 flex items-center justify-center text-xs font-bold transition-all"
            title={lang === 'id' ? 'Pengaturan' : 'Settings'}
          >
            ⚙️
          </button>
        </div>
      </header>

      {/* Main Game Arena Container */}
      <main className="w-full max-w-6xl space-y-3">
        {/* Interactive Hands-On Practice Guide (Step-by-Step Training HUD) */}
        {practiceStep && (
          <InteractivePracticeGuide
            practiceStep={practiceStep}
            dailyShiftsLeft={dailyShiftsLeft}
            isWorking={workerState.isWorking}
            activeStation={workerState.activeStation}
            onCompletePractice={handleCompletePractice}
            onSkipPractice={handleSkipPractice}
            lang={lang}
          />
        )}

        {/* 1. Habitat Visualizer - Full Native 3D FBX WebGL Outpost */}
        <ThreeDOutpostView
          resources={resources}
          activeDonki={activeDonki}
          shieldActive={shieldActive}
          solPhase={solPhase}
          currentSol={currentSol}
          site={currentSite}
          lang={lang}
          dailyShiftsLeft={dailyShiftsLeft}
          maxDailyShifts={3}
          highlightedTarget={highlightedTarget}
          onWorkStateChange={setWorkerState}
          onInteractStation={handleInteractStation}
          onOpenAnis={handleOpenAnis}
          onOpenDataTerminal={() => setDataTerminalOpen(true)}
        />

        {/* 2. Child-Friendly 3 Core Resource Bars */}
        <ResourceBars
          resources={resources}
          radiationDose={radiationDose}
          lang={lang}
        />

        {/* 3. Core Phase Dynamic Workflow */}
        {solPhase === 'MIDDAY' && (
          <TradeOffCard
            event={activeTradeOff}
            resources={resources}
            onSelectChoice={handleSelectTradeOff}
            lang={lang}
          />
        )}

        {solPhase === 'AFTERNOON' && (
          <AfternoonActivities
            resources={resources}
            onPerformActivity={handlePerformActivity}
            onProceedToNight={handleProceedToNight}
            lang={lang}
          />
        )}

        {solPhase === 'EVALUATION' && (
          <EveningEvaluation
            currentSol={currentSol}
            resources={resources}
            previousResources={previousResources}
            scienceXp={scienceXp}
            site={currentSite}
            onNextSol={handleNextSol}
            lang={lang}
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="w-full max-w-6xl mt-4 py-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
        <div>
          NASA Space Apps Challenge • Topic: <span className="text-amber-400">Build a Junior Astronaut Mission Trainer</span>
        </div>
        <div className="flex gap-3">
          <span>DONKI Solar Database</span>
          <span>•</span>
          <span>OSDR Space Biology</span>
          <span>•</span>
          <span>Mars Trek Jezero</span>
        </div>
      </footer>

      {/* MODALS */}
      {/* Junior Astronaut Field Manual & Orientation Tutorial */}
      <TutorialModal
        isOpen={tutorialOpen}
        onClose={handleCloseTutorial}
        onStartPractice={handleStartPractice}
        lang={lang}
      />

      {/* Morning Sol Briefing Modal */}
      <SolBriefingModal
        isOpen={briefingOpen && solPhase === 'BRIEFING' && !tutorialOpen && !practiceStep}
        currentSol={currentSol}
        donkiEvent={activeDonki}
        site={currentSite}
        onStartSol={handleStartSol}
        onOpenAnis={handleOpenAnis}
        lang={lang}
      />

      {/* Educational Game Over Debrief Modal */}
      {solPhase === 'GAME_OVER' && (
        <GameOverModal
          failedResource={failedResource}
          solReached={currentSol}
          scienceXp={scienceXp}
          onRestart={handleRestart}
          onOpenAnis={handleOpenAnis}
          lang={lang}
        />
      )}

      {/* Victory Junior Astronaut Certification Modal */}
      {solPhase === 'VICTORY' && (
        <VictoryModal
          solReached={currentSol}
          scienceXp={scienceXp}
          site={currentSite}
          onContinueEndless={() => { setSolPhase('BRIEFING'); setBriefingOpen(true); setCurrentSol(prev => prev + 1); }}
          onRestart={handleRestart}
          lang={lang}
        />
      )}

      {/* A.N.I.S. Interactive AI Assistant Modal */}
      <AnisAssistant
        isOpen={anisModalOpen}
        onClose={() => setAnisModalOpen(false)}
        initialQuery={anisInitialQuery}
        apiKey={geminiApiKey}
        lang={lang}
      />

      {/* Verified NASA Curated Data Inspector Modal */}
      <NasaDataInspector
        isOpen={dataTerminalOpen}
        onClose={() => setDataTerminalOpen(false)}
        lang={lang}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        selectedSiteKey={selectedSiteKey}
        onSelectSite={(k) => setSelectedSiteKey(k)}
        apiKey={geminiApiKey}
        onSaveApiKey={saveApiKey}
        soundMuted={soundMuted}
        onToggleSound={toggleSound}
        lang={lang}
        onToggleLang={() => setLang(prev => prev === 'id' ? 'en' : 'id')}
        onResetGame={handleRestart}
        onOpenTutorial={() => setTutorialOpen(true)}
      />

      {/* Astronaut Level-Up Promotion Modal */}
      {levelUpData && (
        <LevelUpModal
          rank={levelUpData}
          onClose={() => setLevelUpData(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
