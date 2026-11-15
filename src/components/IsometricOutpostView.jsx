// IsometricOutpostView - 3D Diorama Mars Habitat (Low-Poly / Chibi Cutaway Style)
// Inspired by cute isometric room dioramas with clickable interactive life support stations

import React, { useState } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function IsometricOutpostView({
  resources,
  activeDonki,
  shieldActive,
  solPhase,
  currentSol,
  site,
  lang,
  onInteractStation,
  onOpenAnis
}) {
  const { power, oxygen, health } = resources;
  const [activeStationBubble, setActiveStationBubble] = useState(null);
  const [characterAction, setCharacterAction] = useState('idle'); // 'idle' | 'running' | 'farming' | 'fixing'
  const [characterPos, setCharacterPos] = useState({ x: 490, y: 340 });

  // Disaster / Storm alerts
  const isStorming = activeDonki?.hazardLevel === 'CRITICAL' || activeDonki?.hazardLevel === 'EXTREME';
  const isLowResource = power < 25 || oxygen < 25 || health < 25;

  const triggerStation = (stationKey, labelId, labelEn, effectImpact, actionType, targetPos) => {
    SoundEngine.playClick();
    setCharacterAction(actionType);
    if (targetPos) setCharacterPos(targetPos);

    setActiveStationBubble({
      title: lang === 'id' ? labelId : labelEn,
      key: stationKey
    });

    if (onInteractStation) {
      onInteractStation(stationKey, effectImpact);
    }

    setTimeout(() => {
      setActiveStationBubble(null);
      setCharacterAction('idle');
      setCharacterPos({ x: 490, y: 340 });
    }, 2500);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-600/50 bg-[#1e1c29] select-none">
      {/* Top Habitat HUD Overlay */}
      <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
        {/* Left: Location & Site badge */}
        <div className="flex items-center gap-2 bg-neutral-900/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 shadow-lg pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              {lang === 'id' ? 'Diorama Pangkalan Mars' : 'Mars Habitat Diorama'}
            </div>
            <div className="text-xs font-mono text-white font-bold">
              {site.name} • Sol {currentSol}
            </div>
          </div>
        </div>

        {/* Center: Interactive Tip for Kids */}
        <div className="hidden md:flex items-center gap-1.5 bg-cyan-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/40 text-[11px] font-mono text-cyan-200">
          <span>👆</span>
          <span>{lang === 'id' ? 'Klik stasiun di dalam ruangan untuk berinteraksi!' : 'Click any room station to interact!'}</span>
        </div>

        {/* Right: Weather Hazard Alert */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md shadow-lg pointer-events-auto ${
          isStorming 
            ? 'bg-rose-950/85 border-rose-500 text-rose-200 animate-pulse' 
            : 'bg-neutral-900/85 border-neutral-700 text-amber-200'
        }`}>
          <span className="text-lg">{isStorming ? '🚨' : '☀️'}</span>
          <div className="text-right">
            <div className="text-[9px] font-mono font-bold uppercase">
              {isStorming ? (lang === 'id' ? 'BAHAYA RADIASI' : 'RADIATION HAZARD') : (lang === 'id' ? 'CUACA NOMINAL' : 'NOMINAL WEATHER')}
            </div>
            <div className="text-xs font-mono font-bold">
              {activeDonki?.classType?.split(' ')[0] || 'C9.6'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Isometric SVG Canvas */}
      <div className="w-full flex items-center justify-center p-1 sm:p-2">
        <svg
          viewBox="0 0 1000 680"
          className="w-full h-auto max-h-[580px] drop-shadow-2xl"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          <defs>
            {/* Gradients for 3D walls & lighting */}
            <linearGradient id="wallTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient id="wallStripeTeal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isStorming ? "#f43f5e" : "#14b8a6"} />
              <stop offset="100%" stopColor={isStorming ? "#be123c" : "#0d9488"} />
            </linearGradient>

            <linearGradient id="wallNavyBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            <linearGradient id="floorTileLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <linearGradient id="floorTileTerracotta" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
            </linearGradient>

            {/* Drop Shadow filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.45" />
            </filter>
            <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* 1. OUTSIDE ENVIRONMENT (Mars Ground / Void Background) */}
          {/* ============================================================== */}
          <rect x="0" y="0" width="1000" height="680" fill="#1e1c2b" />
          
          {/* Isometric grid lines in the background for architectural feel */}
          <g opacity="0.08" stroke="#ffffff" strokeWidth="1">
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`g1-${i}`} x1="0" y1={100 + i * 40} x2="1000" y2={-400 + i * 40 + 1000 * 0.577} />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`g2-${i}`} x1="0" y1={-200 + i * 40 + 1000 * 0.577} x2="1000" y2={400 + i * 40} />
            ))}
          </g>

          {/* ============================================================== */}
          {/* 2. ISOMETRIC ROOM BASE & FLOOR TILES */}
          {/* ============================================================== */}
          {/* Main Room Base Slab Shadow */}
          <polygon
            points="500,120 890,345 500,570 110,345"
            fill="#0f172a"
            opacity="0.8"
            transform="translate(0, 16)"
          />

          {/* Main Interior Light Floor (Grey Tiles) */}
          <polygon
            points="500,120 890,345 500,570 110,345"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="3"
          />

          {/* Floor Tile Grid Lines (Isometric) */}
          <g stroke="#94a3b8" strokeWidth="1.5" opacity="0.65">
            <line x1="240" y1="270" x2="630" y2="495" />
            <line x1="370" y1="195" x2="760" y2="420" />
            <line x1="240" y1="420" x2="630" y2="195" />
            <line x1="370" y1="495" x2="760" y2="270" />
            <line x1="500" y1="120" x2="500" y2="570" />
            <line x1="110" y1="345" x2="890" y2="345" />
          </g>

          {/* Terracotta Martian Regolith Patio Tiles (Foreground Front-Left & Front-Right) */}
          {/* Just like in the reference image: terracotta pavers where astronauts step in */}
          <polygon points="410,435 500,385 590,435 500,488" fill="url(#floorTileTerracotta)" stroke="#9a3412" strokeWidth="2" />
          <polygon points="320,488 410,435 500,488 410,540" fill="url(#floorTileTerracotta)" stroke="#9a3412" strokeWidth="2" />
          <polygon points="500,488 590,435 680,488 590,540" fill="url(#floorTileTerracotta)" stroke="#9a3412" strokeWidth="2" />
          <polygon points="410,540 500,488 590,540 500,592" fill="url(#floorTileTerracotta)" stroke="#9a3412" strokeWidth="2" />
          <polygon points="630,515 700,475 760,510 690,550" fill="url(#floorTileTerracotta)" stroke="#9a3412" strokeWidth="2" opacity="0.9" />

          {/* Power Conduit Lines Glowing in Floor */}
          <polyline
            points="240,270 380,350 490,340 680,260"
            fill="none"
            stroke={isStorming ? "#f43f5e" : "#06b6d4"}
            strokeWidth="3.5"
            strokeDasharray="8 4"
            className="animate-pulse"
          />

          {/* ============================================================== */}
          {/* 3. ISOMETRIC WALLS (CHUNKY WITH ROUNDED CAPS & TEAL STRIPE) */}
          {/* Exactly matching the reference image room architecture! */}
          {/* ============================================================== */}
          {/* BACK LEFT WALL */}
          {/* Lower dark navy section */}
          <polygon points="110,345 500,120 500,170 110,395" fill="#1e293b" />
          {/* Middle Teal / Red-Alert Accent Stripe */}
          <polygon points="110,310 500,85 500,120 110,345" fill="url(#wallStripeTeal)" />
          {/* Upper Navy section */}
          <polygon points="110,275 500,50 500,85 110,310" fill="#334155" />
          {/* Wall Top Cap (Light Slate Grey with rounded ends) */}
          <polygon points="110,275 500,50 535,70 145,295" fill="url(#wallTop)" stroke="#475569" strokeWidth="2" />

          {/* BACK RIGHT WALL */}
          {/* Lower dark navy section */}
          <polygon points="500,120 890,345 890,395 500,170" fill="#0f172a" />
          {/* Middle Teal / Red-Alert Accent Stripe */}
          <polygon points="500,85 890,310 890,345 500,120" fill="url(#wallStripeTeal)" opacity="0.9" />
          {/* Upper Navy section */}
          <polygon points="500,50 890,275 890,310 500,85" fill="#1e293b" />
          {/* Wall Top Cap */}
          <polygon points="500,50 890,275 855,295 465,70" fill="url(#wallTop)" stroke="#334155" strokeWidth="2" />

          {/* FRONT-LEFT PARTIAL CUTAWAY WALL (Entrance frame from reference image) */}
          <polygon points="110,395 240,470 240,430 110,355" fill="#1e293b" />
          <polygon points="110,355 240,430 240,395 110,320" fill="url(#wallStripeTeal)" />
          <polygon points="110,320 240,395 240,360 110,285" fill="#334155" />
          <polygon points="110,285 240,360 265,345 135,270" fill="url(#wallTop)" />

          {/* FRONT-RIGHT PARTIAL CUTAWAY WALL */}
          <polygon points="890,395 760,470 760,430 890,355" fill="#0f172a" />
          <polygon points="890,355 760,430 760,395 890,320" fill="url(#wallStripeTeal)" opacity="0.9" />
          <polygon points="890,320 760,395 760,360 890,285" fill="#1e293b" />
          <polygon points="890,285 760,360 735,345 865,270" fill="url(#wallTop)" />

          {/* AIRLOCK DOORWAY (Back Left Wall - Exactly like reference image) */}
          <g>
            {/* Door Frame Inner Recess */}
            <polygon points="340,212 410,172 410,250 340,290" fill="#0f172a" />
            {/* Double Sliding Doors with Teal / Green Seals */}
            <polygon points="345,217 375,200 375,273 345,290" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <polygon points="378,198 408,181 408,254 378,271" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Illuminated Door Status Lamp */}
            <circle cx="376" cy="188" r="4" fill="#22c55e" filter="url(#softShadow)" />
          </g>

          {/* OBSERVATION WINDOW / DOOR (Back Right Wall) */}
          <g>
            <polygon points="610,183 675,221 675,296 610,258" fill="#0f172a" />
            {/* Glass panel showing Mars horizon */}
            <polygon points="615,190 670,222 670,290 615,258" fill="#1e3a8a" opacity="0.75" />
            <polygon points="615,225 670,257 670,290 615,258" fill="#ea580c" opacity="0.5" />
          </g>

          {/* ============================================================== */}
          {/* 4. INTERACTIVE 3D PROPS & STATIONS (CLICKABLE!) */}
          {/* ============================================================== */}

          {/* ------------------------------------------------------------ */}
          {/* STATION A: 💨 MOXIE OXYGEN GENERATOR (Green Machine on Left) */}
          {/* Matches the green arch recycler unit from the reference image! */}
          {/* ------------------------------------------------------------ */}
          <g
            className="cursor-pointer group transition-transform hover:scale-[1.03]"
            onClick={() => triggerStation('moxie', '💨 Katup MOXIE Dikalibrasi!', '💨 MOXIE Valves Calibrated!', { oxygen: 15, power: -5 }, 'fixing', { x: 340, y: 310 })}
          >
            {/* Station Floor Shadow */}
            <ellipse cx="270" cy="275" rx="35" ry="18" fill="#000000" opacity="0.35" />

            {/* Green Machine Body (Front & Left sides) */}
            <polygon points="250,230 290,207 290,265 250,288" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
            <polygon points="220,247 250,230 250,288 220,305" fill="#16a34a" stroke="#166534" strokeWidth="1.5" />
            {/* Top Cap */}
            <polygon points="250,230 220,247 260,224 290,207" fill="#4ade80" />

            {/* Recycler Arch Vent & Filter Port */}
            <ellipse cx="235" cy="270" rx="8" ry="12" fill="#0f172a" />
            <circle cx="235" cy="270" r="5" fill="#22d3ee" className="animate-pulse" />

            {/* O2 Glass Bubble Chimney / Tube on Top */}
            <rect x="245" y="180" width="12" height="35" rx="6" fill="#38bdf8" opacity="0.8" />
            <ellipse cx="251" cy="190" rx="3" ry="3" fill="#ffffff" className="animate-ping" />

            {/* Interactive Station Label Pill */}
            <g transform="translate(200, 150)">
              <rect width="90" height="22" rx="6" fill="#042f2e" stroke="#2dd4bf" strokeWidth="1.5" />
              <text x="45" y="15" textAnchor="middle" fill="#5eead4" fontSize="10" fontFamily="monospace" fontWeight="bold">
                💨 MOXIE O2
              </text>
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* STATION B: 🏃 ARED ASTRONAUT TREADMILL (Space Gym on Right)  */}
          {/* Matches the treadmill exercise station from reference image! */}
          {/* ------------------------------------------------------------ */}
          <g
            className="cursor-pointer group transition-transform hover:scale-[1.03]"
            onClick={() => triggerStation('treadmill', '🏃 Latihan Anti-Atropi Selesai!', '🏃 Anti-Atrophy Workout Completed!', { health: 15, oxygen: -5 }, 'running', { x: 670, y: 310 })}
          >
            {/* Base Shadow */}
            <ellipse cx="680" cy="300" rx="42" ry="22" fill="#000000" opacity="0.35" />

            {/* Treadmill Platform Base */}
            <polygon points="630,305 710,258 735,272 655,319" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            {/* Running Belt (Dark Grey) */}
            <polygon points="640,305 705,267 725,278 660,316" fill="#0f172a" />

            {/* Upright Handlebar Posts & Console */}
            <polygon points="705,240 715,234 715,265 705,271" fill="#64748b" />
            <polygon points="725,251 735,245 735,276 725,282" fill="#64748b" />
            {/* Control Console Monitor */}
            <polygon points="695,225 735,202 745,208 705,231" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="720" cy="216" r="3" fill="#38bdf8" className="animate-pulse" />

            {/* Interactive Station Label Pill */}
            <g transform="translate(660, 160)">
              <rect width="95" height="22" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="47" y="15" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontFamily="monospace" fontWeight="bold">
                🏃 TREADMILL
              </text>
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* STATION C: 🌱 BIO-DOME PLANTER CRATES (Fresh Space Crops)   */}
          {/* Matches the flower & vegetable crates from reference image!   */}
          {/* ------------------------------------------------------------ */}
          <g
            className="cursor-pointer group transition-transform hover:scale-[1.03]"
            onClick={() => triggerStation('greenhouse', '🌱 Sayur Disiram! +15% Health', '🌱 Microgreens Nurtured! +15% Health', { health: 15, power: -5 }, 'farming', { x: 420, y: 410 })}
          >
            {/* Floor Shadow */}
            <ellipse cx="370" cy="425" rx="38" ry="18" fill="#000000" opacity="0.35" />

            {/* Tiered Planter Stand 1 (Blue/Grey Box from image) */}
            <polygon points="340,390 380,367 380,410 340,433" fill="#1e3a8a" />
            <polygon points="310,407 340,390 340,433 310,450" fill="#2563eb" />
            <polygon points="340,390 310,407 350,384 380,367" fill="#3b82f6" />

            {/* Vibrant Martian Microgreens / Tomatoes in Planter */}
            <circle cx="330" cy="395" r="7" fill="#22c55e" />
            <circle cx="345" cy="385" r="6" fill="#16a34a" />
            <circle cx="360" cy="375" r="7" fill="#22c55e" />
            {/* Glowing Red Space Tomatoes */}
            <circle cx="333" cy="393" r="3.5" fill="#ef4444" />
            <circle cx="355" cy="378" r="3.5" fill="#ef4444" />

            {/* Wooden Harvest Crate in front with fresh harvest */}
            <polygon points="280,455 315,435 315,465 280,485" fill="#9a3412" stroke="#7c2d12" strokeWidth="1" />
            <polygon points="260,467 280,455 280,485 260,497" fill="#c2410c" stroke="#7c2d12" strokeWidth="1" />
            <polygon points="280,455 260,467 295,447 315,435" fill="#ea580c" />
            <circle cx="288" cy="452" r="5" fill="#f97316" />
            <circle cx="275" cy="460" r="4.5" fill="#22c55e" />

            {/* Interactive Station Label Pill */}
            <g transform="translate(285, 345)">
              <rect width="90" height="22" rx="6" fill="#052e16" stroke="#4ade80" strokeWidth="1.5" />
              <text x="45" y="15" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="monospace" fontWeight="bold">
                🌱 BIO-CROPS
              </text>
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* STATION D: 🤖 A.N.I.S. ROBOT DOCK (Cute Orb Robot Station)   */}
          {/* Matches the cute red pedestal dispenser robot in image!       */}
          {/* ------------------------------------------------------------ */}
          <g
            className="cursor-pointer group transition-transform hover:scale-[1.05]"
            onClick={() => onOpenAnis && onOpenAnis()}
          >
            {/* Dock Shadow */}
            <ellipse cx="520" cy="290" rx="20" ry="10" fill="#000000" opacity="0.35" />

            {/* Red & Grey Pedestal Base (from reference image) */}
            <g>
              <path d="M 510 270 Q 520 265 530 270 L 530 290 Q 520 295 510 290 Z" fill="#ef4444" />
              <ellipse cx="520" cy="270" rx="10" ry="5" fill="#f87171" />
            </g>

            {/* Floating A.N.I.S. Robot Body (Smooth White Sphere) */}
            <g className="animate-[bounce_2.5s_ease-in-out_infinite]">
              <circle cx="520" cy="235" r="19" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" filter="url(#softShadow)" />
              
              {/* Visor Screen with Expressive Cyan Digital Eyes */}
              <ellipse cx="520" cy="235" rx="14" ry="10" fill="#0f172a" />
              <circle cx="515" cy="234" r="3" fill="#22d3ee" className="animate-pulse" />
              <circle cx="525" cy="234" r="3" fill="#22d3ee" className="animate-pulse" />
              <circle cx="516" cy="233" r="1" fill="#ffffff" />
              <circle cx="526" cy="233" r="1" fill="#ffffff" />
              
              {/* Robot Antenna with Blinking Beacon */}
              <line x1="520" y1="216" x2="520" y2="204" stroke="#64748b" strokeWidth="2" />
              <circle cx="520" cy="202" r="3.5" fill={isStorming ? "#ef4444" : "#22c55e"} className="animate-ping" />
            </g>

            {/* Interactive Station Label Pill */}
            <g transform="translate(475, 170)">
              <rect width="90" height="22" rx="6" fill="#083344" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="45" y="15" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace" fontWeight="bold">
                🤖 A.N.I.S. AI
              </text>
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* STATION E: ⚡ POWER / BATTERY ARRAY & EVA SUIT RACK          */}
          {/* Matches the clothing suit rack & bottle shelf in the image!  */}
          {/* ------------------------------------------------------------ */}
          <g
            className="cursor-pointer group transition-transform hover:scale-[1.03]"
            onClick={() => triggerStation('power_grid', '⚡ Panel Surya Dibersihkan!', '⚡ Solar Dust Swept! +15% Power', { power: 15, oxygen: -5 }, 'fixing', { x: 570, y: 460 })}
          >
            {/* Shadow */}
            <ellipse cx="670" cy="485" rx="36" ry="18" fill="#000000" opacity="0.35" />

            {/* Suit Rack Frame (from reference image) */}
            <line x1="645" y1="465" x2="685" y2="442" stroke="#64748b" strokeWidth="4" />
            <line x1="645" y1="465" x2="645" y2="505" stroke="#475569" strokeWidth="3" />
            <line x1="685" y1="442" x2="685" y2="482" stroke="#475569" strokeWidth="3" />

            {/* Hanging Colorful EVA Suits (Orange, Green, Cyan from reference image) */}
            <rect x="648" y="458" width="10" height="26" rx="3" fill="#ea580c" />
            <rect x="662" y="450" width="10" height="26" rx="3" fill="#16a34a" />
            <rect x="674" y="442" width="10" height="26" rx="3" fill="#0284c7" />

            {/* High-Tech Battery Storage Rack with glowing charge bars */}
            <polygon points="560,520 600,497 600,535 560,558" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <polygon points="535,535 560,520 560,558 535,573" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <polygon points="560,520 535,535 575,512 600,497" fill="#475569" />
            {/* Glowing Battery charge segments */}
            <line x1="545" y1="540" x2="545" y2="560" stroke="#f59e0b" strokeWidth="4" className="animate-pulse" />
            <line x1="552" y1="536" x2="552" y2="556" stroke="#f59e0b" strokeWidth="4" className="animate-pulse" />

            {/* Interactive Station Label Pill */}
            <g transform="translate(595, 400)">
              <rect width="90" height="22" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="45" y="15" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ⚡ POWER GRID
              </text>
            </g>
          </g>

          {/* ------------------------------------------------------------ */}
          {/* STATION F: 🔬 SAMPLE PEDESTAL (Pyramid Cans from image)      */}
          {/* Matches the pyramid stacked cans / sample canisters!         */}
          {/* ------------------------------------------------------------ */}
          <g transform="translate(525, 410)">
            <ellipse cx="40" cy="35" rx="30" ry="15" fill="#000000" opacity="0.3" />
            {/* Wooden Base Platform */}
            <polygon points="20,25 60,2 60,18 20,41" fill="#78350f" />
            <polygon points="0,37 20,25 20,41 0,53" fill="#92400e" />
            <polygon points="20,25 0,37 40,14 60,2" fill="#b45309" />
            {/* Stacked White/Orange Sample Cans (Jezero Crater core samples) */}
            <circle cx="28" cy="20" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="38" cy="14" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="48" cy="8" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            <circle cx="33" cy="11" r="5" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
            <circle cx="43" cy="5" r="5" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
            <circle cx="38" cy="0" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          </g>

          {/* ============================================================== */}
          {/* 5. CHIBI ASTRONAUT CHARACTER (Commander Leo/Maya)             */}
          {/* Walking / Working inside the room (matches character in image) */}
          {/* ============================================================== */}
          <g
            transform={`translate(${characterPos.x}, ${characterPos.y})`}
            className="transition-all duration-700 ease-out"
          >
            {/* Character Floor Shadow */}
            <ellipse cx="0" cy="28" rx="20" ry="10" fill="#000000" opacity="0.4" />

            {/* Astronaut Backpack / Life Support */}
            <rect x="-14" y="-8" width="28" height="26" rx="6" fill="#475569" stroke="#1e293b" strokeWidth="2" />

            {/* Legs with green shoes/trim */}
            <rect x="-10" y="16" width="8" height="15" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="2" y="16" width="8" height="15" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="-11" y="27" width="10" height="6" rx="2" fill="#15803d" />
            <rect x="1" y="27" width="10" height="6" rx="2" fill="#15803d" />

            {/* Body / Torso (White suit with Green Apron/Stripe like reference image!) */}
            <rect x="-12" y="-4" width="24" height="22" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            {/* Green Vest / Strap from image */}
            <path d="M -8 -4 L -8 18 M 8 -4 L 8 18" stroke="#16a34a" strokeWidth="3" />
            <rect x="-6" y="6" width="12" height="6" rx="1.5" fill="#15803d" />

            {/* Cute Chibi Head (Cute face, dark hair buns, smiling eyes like image!) */}
            {/* Neck / Helmet collar */}
            <ellipse cx="0" cy="-6" rx="10" ry="4" fill="#cbd5e1" />

            {/* Face / Head */}
            <circle cx="0" cy="-22" r="17" fill="#d97706" />

            {/* Dark Hair with Cute Space Buns (Matching reference character!) */}
            <path d="M -16 -24 Q 0 -36 16 -24 Q 10 -38 -10 -38 Z" fill="#1e1b4b" />
            {/* Left Hair Bun */}
            <circle cx="-16" cy="-30" r="7" fill="#1e1b4b" />
            <circle cx="-16" cy="-30" r="4" fill="#16a34a" />
            {/* Right Hair Bun */}
            <circle cx="16" cy="-30" r="7" fill="#1e1b4b" />
            <circle cx="16" cy="-30" r="4" fill="#16a34a" />

            {/* Face Features: Big Happy Eyes & Cute Smile */}
            <circle cx="-6" cy="-20" r="2.5" fill="#0f172a" />
            <circle cx="6" cy="-20" r="2.5" fill="#0f172a" />
            <circle cx="-5" cy="-21" r="0.9" fill="#ffffff" />
            <circle cx="7" cy="-21" r="0.9" fill="#ffffff" />
            {/* Rosy Cheeks */}
            <circle cx="-10" cy="-16" r="2.5" fill="#f43f5e" opacity="0.6" />
            <circle cx="10" cy="-16" r="2.5" fill="#f43f5e" opacity="0.6" />
            {/* Happy Smile */}
            <path d="M -4 -15 Q 0 -11 4 -15" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Arms / Hands */}
            <rect x="-17" y="0" width="6" height="14" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="11" y="0" width="6" height="14" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="-14" cy="14" r="3.5" fill="#d97706" />
            <circle cx="14" cy="14" r="3.5" fill="#d97706" />

            {/* Speech / Action Bubble Above Character */}
            {activeStationBubble ? (
              <g transform="translate(-80, -78)">
                <rect width="160" height="34" rx="10" fill="#09090b" stroke="#38bdf8" strokeWidth="2" filter="url(#softShadow)" />
                <polygon points="80,34 74,42 86,34" fill="#09090b" />
                <text x="80" y="21" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  {activeStationBubble.title}
                </text>
              </g>
            ) : (
              <g transform="translate(-40, -56)">
                <rect width="80" height="20" rx="8" fill="#000000" stroke="#f59e0b" strokeWidth="1.2" opacity="0.9" />
                <text x="40" y="14" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace" fontWeight="bold">
                  CDR. LEO
                </text>
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* 6. ELECTROMAGNETIC FORCEFIELD DOME (ACTIVE SHIELD)           */}
          {/* Appears when shields are turned ON against CME/Solar Storms!  */}
          {/* ============================================================== */}
          {shieldActive && (
            <g>
              <ellipse
                cx="500"
                cy="320"
                rx="420"
                ry="260"
                fill="url(#shieldGradient)"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeDasharray="16 8"
                filter="url(#glowCyan)"
                className="animate-pulse"
              />
              {/* Shield Hexagonal Grid Overlay */}
              <ellipse
                cx="500"
                cy="320"
                rx="410"
                ry="250"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="1.5"
                strokeDasharray="6 12"
                opacity="0.75"
              />
              {/* Top Shield Status Banner */}
              <g transform="translate(370, 75)">
                <rect width="260" height="26" rx="8" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
                <text x="130" y="17" textAnchor="middle" fill="#a5f3fc" fontSize="11" fontFamily="monospace" fontWeight="black" letterSpacing="2">
                  🛡️ PERISAI MAGNETIK 100% AKTIF
                </text>
              </g>
            </g>
          )}

          {/* Solar Storm Plasma Spark Particles (when storm is active and shield is off) */}
          {isStorming && !shieldActive && (
            <g>
              <circle cx="300" cy="150" r="4" fill="#ef4444" className="animate-ping" />
              <circle cx="700" cy="200" r="5" fill="#f97316" className="animate-ping" />
              <circle cx="500" cy="280" r="4" fill="#ef4444" className="animate-ping" />
              <circle cx="420" cy="380" r="3.5" fill="#f43f5e" className="animate-ping" />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Station Quick-Action Bar for Touch/Click Ease */}
      <div className="bg-neutral-950/95 border-t border-neutral-800 p-2.5 sm:p-3 flex flex-wrap items-center justify-around gap-2">
        <button
          onClick={() => triggerStation('moxie', '💨 Katup MOXIE Dikalibrasi!', '💨 MOXIE Calibrated!', { oxygen: 15, power: -5 }, 'fixing', { x: 340, y: 310 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold transition-all transform active:scale-95"
        >
          <span>💨</span>
          <span>MOXIE (+O2)</span>
        </button>

        <button
          onClick={() => triggerStation('greenhouse', '🌱 Sayur Disiram! +15% Health', '🌱 Crops Nurtured! +15% Health', { health: 15, power: -5 }, 'farming', { x: 420, y: 410 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-950/80 hover:bg-green-900 border border-green-500/50 text-green-300 text-xs font-mono font-bold transition-all transform active:scale-95"
        >
          <span>🌱</span>
          <span>{lang === 'id' ? 'Bio-Dome (+Kru)' : 'Bio-Dome (+Health)'}</span>
        </button>

        <button
          onClick={() => triggerStation('treadmill', '🏃 Latihan Anti-Atropi Selesai!', '🏃 Workout Done! +15% Health', { health: 15, oxygen: -5 }, 'running', { x: 670, y: 310 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-300 text-xs font-mono font-bold transition-all transform active:scale-95"
        >
          <span>🏃</span>
          <span>{lang === 'id' ? 'Treadmill (OSDR)' : 'Treadmill (OSDR)'}</span>
        </button>

        <button
          onClick={() => triggerStation('power_grid', '⚡ Panel Surya Dibersihkan!', '⚡ Solar Swept! +15% Power', { power: 15, oxygen: -5 }, 'fixing', { x: 570, y: 460 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold transition-all transform active:scale-95"
        >
          <span>⚡</span>
          <span>{lang === 'id' ? 'Panel Surya (+Daya)' : 'Solar Array (+Power)'}</span>
        </button>

        <button
          onClick={() => onOpenAnis && onOpenAnis()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold transition-all transform active:scale-95 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
        >
          <span>🤖</span>
          <span>{lang === 'id' ? 'Tanya A.N.I.S.' : 'Ask A.N.I.S.'}</span>
        </button>
      </div>
    </div>
  );
}
