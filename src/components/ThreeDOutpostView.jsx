// ThreeDOutpostView - Expansive 3D Mars Base with Custom NASA Equipment & Low-Gravity Physics

import React, { useEffect, useRef, useState } from 'react';
import { SoundEngine } from '../audio/sound_effects.js';

export default function ThreeDOutpostView({
  resources,
  activeDonki,
  shieldActive,
  solPhase,
  currentSol,
  site,
  lang,
  dailyShiftsLeft = 3,
  maxDailyShifts = 3,
  highlightedTarget = null,
  onWorkStateChange = null,
  onInteractStation,
  onOpenAnis,
  onOpenDataTerminal
}) {
  const mountRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [characterStatusText, setCharacterStatusText] = useState(
    lang === 'id' ? 'Commander Leo Siap di Pangkalan' : 'Commander Leo Ready at Outpost Center'
  );
  const [isWorking, setIsWorking] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [workSecondsLeft, setWorkSecondsLeft] = useState(0);
  const [workProgress, setWorkProgress] = useState(0);

  useEffect(() => {
    if (!isWorking) {
      setCharacterStatusText(lang === 'id' ? 'Commander Leo Siap di Pangkalan' : 'Commander Leo Ready at Outpost Center');
    }
  }, [lang, isWorking]);

  useEffect(() => {
    if (onWorkStateChange) {
      onWorkStateChange({ isWorking, activeStation });
    }
  }, [isWorking, activeStation]);

  const triggerStationRef = useRef(null);
  const resetCameraRef = useRef(null);

  const isStorming = activeDonki?.hazardLevel === 'CRITICAL' || activeDonki?.hazardLevel === 'EXTREME';

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return;
    if (!window.THREE || !window.THREE.FBXLoader) {
      console.warn('Three.js or FBXLoader not ready yet.');
      return;
    }

    const THREE = window.THREE;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 480;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0d16);
    scene.fog = new THREE.FogExp2(0x0e0d16, 0.0035);

    // 2. Camera (Diorama Perspective Angle)
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 1500);
    camera.position.set(48, 44, 48);
    camera.lookAt(0, 2, 0);

    // 3. Renderer with ACES Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. OrbitControls
    let controls = null;
    if (window.THREE.OrbitControls) {
      controls = new window.THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.maxPolarAngle = Math.PI / 2.05;
      controls.minDistance = 20;
      controls.maxDistance = 140;
      controls.target.set(0, 2, 0);
    }

    resetCameraRef.current = () => {
      if (controls) {
        camera.position.set(48, 44, 48);
        controls.target.set(0, 2, 0);
        controls.update();
      }
    };

    // 5. GLARE-FREE STUDIO LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff1e5, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaf0, 1.05);
    dirLight.position.set(35, 65, 35);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 15;
    dirLight.shadow.camera.far = 160;
    dirLight.shadow.camera.left = -45;
    dirLight.shadow.camera.right = 45;
    dirLight.shadow.camera.top = 45;
    dirLight.shadow.camera.bottom = -45;
    dirLight.shadow.bias = 0.0008;
    dirLight.shadow.normalBias = 0.04;
    scene.add(dirLight);

    const marsBounceLight = new THREE.DirectionalLight(0x9a3412, 0.35);
    marsBounceLight.position.set(-25, -15, -25);
    scene.add(marsBounceLight);

    const interiorFill = new THREE.PointLight(0x38bdf8, 0.75, 45);
    interiorFill.position.set(0, 8, 0);
    scene.add(interiorFill);

    const alertLight = new THREE.PointLight(0xf43f5e, 0, 70);
    alertLight.position.set(0, 14, 0);
    scene.add(alertLight);

    // 6. Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const clickableObjects = [];

    // 7. Base Materials
    const materials = {
      tealWall: new THREE.MeshStandardMaterial({ color: 0x0d9488, roughness: 0.9, metalness: 0.0 }),
      navyWall: new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9, metalness: 0.0 }),
      whiteCap: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 }),
      columnMetal: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8, metalness: 0.05 }),
      windowGlass: new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.25, transparent: true, opacity: 0.55 }),
      floorLight: new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.85, metalness: 0.0 }),
      floorHallway: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8, metalness: 0.0 }),
      terracotta: new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.85 }),
      staircaseMetal: new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 }),
      doorCyan: new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.4 })
    };

    // 8. ARCHITECTURAL ROOM ASSETS (Floors & Perimeter Bulkheads only)
    const S = 0.04;
    const roomDefinitions = [
      // Central Corridor Floors
      { path: 'FBX/FloorTile_Double_Hallway.fbx', pos: [0, 0, -16], scale: S, rotY: 0, mat: materials.floorHallway, isFloor: true },
      { path: 'FBX/FloorTile_Double_Hallway.fbx', pos: [0, 0, -8], scale: S, rotY: 0, mat: materials.floorHallway, isFloor: true },
      { path: 'FBX/FloorTile_Double_Hallway.fbx', pos: [0, 0, 0], scale: S, rotY: 0, mat: materials.floorHallway, isFloor: true },
      { path: 'FBX/FloorTile_Double_Hallway.fbx', pos: [0, 0, 8], scale: S, rotY: 0, mat: materials.floorHallway, isFloor: true },
      { path: 'FBX/FloorTile_Double_Hallway.fbx', pos: [0, 0, 16], scale: S, rotY: 0, mat: materials.floorHallway, isFloor: true },

      // Left Wing Floors (MOXIE & Bio-Dome)
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [-8, 0, -16], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [-16, 0, -16], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [-24, 0, -16], scale: S, rotY: Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [-8, 0, -8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [-16, 0, -8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [-24, 0, -8], scale: S, rotY: Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [-8, 0, 0], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [-16, 0, 0], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [-24, 0, 0], scale: S, rotY: Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [-8, 0, 8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [-16, 0, 8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [-24, 0, 8], scale: S, rotY: Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Corner.fbx', pos: [-16, 0, 16], scale: S, rotY: -Math.PI / 2, mat: materials.terracotta, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [-8, 0, 16], scale: S, rotY: Math.PI, mat: materials.terracotta, isFloor: true },

      // Right Wing Floors (Treadmill & Solar Hub)
      { path: 'FBX/FloorTile_Basic.fbx', pos: [8, 0, -16], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [16, 0, -16], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [24, 0, -16], scale: S, rotY: -Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [8, 0, -8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [16, 0, -8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [24, 0, -8], scale: S, rotY: -Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [8, 0, 0], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [16, 0, 0], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [24, 0, 0], scale: S, rotY: -Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic2.fbx', pos: [8, 0, 8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Basic.fbx', pos: [16, 0, 8], scale: S, rotY: 0, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [24, 0, 8], scale: S, rotY: -Math.PI / 2, mat: materials.floorLight, isFloor: true },
      { path: 'FBX/FloorTile_Corner.fbx', pos: [16, 0, 16], scale: S, rotY: Math.PI / 2, mat: materials.terracotta, isFloor: true },
      { path: 'FBX/FloorTile_Side.fbx', pos: [8, 0, 16], scale: S, rotY: Math.PI, mat: materials.terracotta, isFloor: true },

      // Perimeter Walls (Precisely Spaced 16 Units Wide to Completely Eliminate Z-Fighting & Overlap!)
      // Back Wall (Z = -20, exactly 3 x 16 units = 48 units wide, spanning X: -24 to +24)
      { path: 'FBX/Walls/ThreeWindows_Wall_SideA.fbx', pos: [-16, 0, -20], scale: S, rotY: 0, mat: materials.tealWall, isWall: true },
      { path: 'FBX/Walls/DoorDoubleLong_Wall_SideA.fbx', pos: [0, 0, -20], scale: S, rotY: 0, mat: materials.navyWall, isWall: true },
      { path: 'FBX/Walls/ThreeWindows_Wall_SideB.fbx', pos: [16, 0, -20], scale: S, rotY: 0, mat: materials.tealWall, isWall: true },

      // Left Flank Wall (X = -28, exactly 2 x 16 units = 32 units long, spanning Z: -16 to +16)
      { path: 'FBX/Walls/DoorSingleLong_Wall_SideA.fbx', pos: [-28, 0, -8], scale: S, rotY: Math.PI / 2, mat: materials.navyWall, isWall: true },
      { path: 'FBX/Walls/Wall_3.fbx', pos: [-28, 0, 8], scale: S, rotY: Math.PI / 2, mat: materials.tealWall, isWall: true },

      // Right Flank Wall (X = 28, exactly 2 x 16 units = 32 units long, spanning Z: -16 to +16)
      { path: 'FBX/Walls/SmallWindows_Wall_SideB.fbx', pos: [28, 0, -8], scale: S, rotY: -Math.PI / 2, mat: materials.tealWall, isWall: true },
      { path: 'FBX/Walls/Wall_5.fbx', pos: [28, 0, 8], scale: S, rotY: -Math.PI / 2, mat: materials.navyWall, isWall: true },

      // Corner Columns & Center Staircase
      { path: 'FBX/Column_1.fbx', pos: [-24, 0, -20], scale: S, rotY: 0, mat: materials.columnMetal, isWall: true },
      { path: 'FBX/Column_1.fbx', pos: [24, 0, -20], scale: S, rotY: 0, mat: materials.columnMetal, isWall: true },
      { path: 'FBX/Column_2.fbx', pos: [-24, 0, 16], scale: S, rotY: 0, mat: materials.columnMetal, isWall: true },
      { path: 'FBX/Column_3.fbx', pos: [24, 0, 16], scale: S, rotY: 0, mat: materials.columnMetal, isWall: true },
      { path: 'FBX/Staircase.fbx', pos: [0, 0, 20], scale: S, rotY: Math.PI, mat: materials.staircaseMetal, isWall: true }
    ];

    // Load Base Room Architecture
    const loader = new window.THREE.FBXLoader();
    let loadedCount = 0;
    const totalCount = roomDefinitions.length;

    roomDefinitions.forEach((def) => {
      loader.load(
        def.path,
        (fbx) => {
          fbx.position.set(def.pos[0], def.pos[1], def.pos[2]);
          fbx.scale.set(def.scale, def.scale, def.scale);
          fbx.rotation.y = def.rotY || 0;

          fbx.traverse((child) => {
            if (child.isMesh) {
              if (def.isWall) {
                child.castShadow = false;
                child.receiveShadow = false;
              } else if (def.isFloor) {
                child.castShadow = false;
                child.receiveShadow = true;
              }
              if (def.mat) {
                child.material = def.mat;
              }
            }
          });

          scene.add(fbx);
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalCount) * 100));
          if (loadedCount >= totalCount) setIsLoaded(true);
        },
        undefined,
        () => {
          loadedCount++;
          if (loadedCount >= totalCount) setIsLoaded(true);
        }
      );
    });

    // ==============================================================
    // 9. DEDICATED AUTHENTIC 3D NASA EQUIPMENT STATIONS
    // ==============================================================

    // --------------------------------------------------------------
    // STATION 1: 💨 NASA MOXIE OXYGEN ISRU REACTOR
    // --------------------------------------------------------------
    const moxieGroup = new THREE.Group();
    moxieGroup.position.set(-16, 0, -10);

    const moxieSkid = new THREE.Mesh(
      new THREE.BoxGeometry(5.0, 0.35, 3.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 })
    );
    moxieSkid.position.y = 0.18;
    moxieSkid.receiveShadow = true;
    moxieSkid.castShadow = true;
    moxieGroup.add(moxieSkid);

    // Golden Thermal Insulation Reactor Box (Solid Oxide Core 800°C)
    const moxieGoldBox = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 2.8, 2.4),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.2, metalness: 0.85 })
    );
    moxieGoldBox.position.set(-0.8, 1.6, 0);
    moxieGoldBox.castShadow = true;
    moxieGroup.add(moxieGoldBox);

    // Glowing Ceramic SOXE Electrolyzer Cylinder
    const moxieCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 1.8, 16),
      new THREE.MeshStandardMaterial({ color: 0xff3b30, emissive: 0xff4500, emissiveIntensity: 0.9, roughness: 0.4 })
    );
    moxieCore.position.set(-0.8, 1.6, 1.0);
    moxieCore.rotation.x = Math.PI / 2;
    moxieGroup.add(moxieCore);

    // Twin High-Pressure Oxygen Buffer Tanks
    const tankWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
    const tankCyanMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.35, roughness: 0.3 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.8 });

    [-0.6, 0.6].forEach((zOffset) => {
      const tankBody = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 2.2, 16), tankWhiteMat);
      tankBody.position.set(1.2, 1.45, zOffset);
      tankBody.castShadow = true;
      moxieGroup.add(tankBody);

      const tankBand = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.5, 16), tankCyanMat);
      tankBand.position.set(1.2, 1.6, zOffset);
      moxieGroup.add(tankBand);

      const tankDome = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), tankCyanMat);
      tankDome.position.set(1.2, 2.55, zOffset);
      moxieGroup.add(tankDome);

      const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.35, 12), brassMat);
      valve.position.set(1.2, 2.85, zOffset);
      moxieGroup.add(valve);

      // Analog Pressure Gauge Dial
      const gauge = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 })
      );
      gauge.position.set(1.2, 1.9, zOffset + 0.42);
      gauge.rotation.x = Math.PI / 2;
      const needle = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.22, 0.02),
        new THREE.MeshBasicMaterial({ color: 0x22c55e })
      );
      needle.position.set(1.2, 1.94, zOffset + 0.48);
      moxieGroup.add(gauge);
      moxieGroup.add(needle);
    });

    // Digital O2 Flow Monitor
    const moxieScreen = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.6, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x06b6d4, emissiveIntensity: 0.8 })
    );
    moxieScreen.position.set(-0.8, 2.55, 1.25);
    moxieGroup.add(moxieScreen);

    const moxieHitData = {
      stationKey: 'moxie',
      destPos: [-12, -8],
      stationName: lang === 'id' ? '💨 Reaktor Elektrolisis Oksigen MOXIE' : '💨 NASA MOXIE Oxygen Plant',
      actionDesc: lang === 'id' ? '+15% Oksigen, -10% Daya [1 Shift]' : '+15% O2, -10% Power [1 Shift]',
      impact: { oxygen: 15, power: -10 },
      rootFbx: moxieGroup
    };

    moxieGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = moxieHitData;
        clickableObjects.push(child);
      }
    });

    scene.add(moxieGroup);

    // --------------------------------------------------------------
    // STATION 2: 🌱 BIO-DOME HYDROPONIC AGRICULTURE LAB (OSDR-311)
    // --------------------------------------------------------------
    const bioGroup = new THREE.Group();
    bioGroup.position.set(-16, 0, 7);

    const bioFrameMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
    const bioSoilMat = new THREE.MeshStandardMaterial({ color: 0x3f2e21, roughness: 0.9 });
    const bioLettuceMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5 });
    const bioLimeMat = new THREE.MeshStandardMaterial({ color: 0x84cc16, roughness: 0.5 });
    const bioTomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const bioLedMat = new THREE.MeshStandardMaterial({ color: 0xd946ef, emissive: 0xc026d3, emissiveIntensity: 0.95 });

    // Greenhouse Vertical Tower Frame
    const bioCabinet = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.2, 2.2), bioFrameMat);
    bioCabinet.position.y = 2.1;
    bioCabinet.castShadow = true;
    bioCabinet.receiveShadow = true;
    bioGroup.add(bioCabinet);

    const bioCavity = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 3.6, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })
    );
    bioCavity.position.set(0, 2.1, 0.15);
    bioGroup.add(bioCavity);

    // 3 Tiered Growing Trays with Crops & Magenta Grow Lights
    const tierYs = [0.9, 2.1, 3.3];
    tierYs.forEach((y, tierIdx) => {
      const soil = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.25, 1.8), bioSoilMat);
      soil.position.set(0, y, 0.15);
      bioGroup.add(soil);

      const lightBar = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.08, 0.3), bioLedMat);
      lightBar.position.set(0, y + 0.88, 0.15);
      bioGroup.add(lightBar);

      if (tierIdx === 0) {
        // Space wheat / micro-alfalfa grass blades
        for (let i = 0; i < 9; i++) {
          const crop = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.5, 6), bioLimeMat);
          crop.position.set(-1.6 + i * 0.4, y + 0.35, 0.15 + (i % 2 === 0 ? 0.3 : -0.3));
          bioGroup.add(crop);
        }
      } else if (tierIdx === 1) {
        // Microgreens & Martian cherry tomatoes
        for (let i = 0; i < 7; i++) {
          const lettuce = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), bioLettuceMat);
          lettuce.position.set(-1.5 + i * 0.5, y + 0.25, 0.05);
          bioGroup.add(lettuce);
          if (i % 2 === 1) {
            const tomato = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), bioTomatoMat);
            tomato.position.set(-1.5 + i * 0.5 + 0.15, y + 0.35, 0.4);
            bioGroup.add(tomato);
          }
        }
      } else {
        // Dwarf lettuces
        for (let i = 0; i < 8; i++) {
          const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), bioLettuceMat);
          head.position.set(-1.5 + i * 0.44, y + 0.26, 0.15 + (i % 2 === 0 ? 0.25 : -0.25));
          bioGroup.add(head);
        }
      }
    });

    const bioGrowLight = new THREE.PointLight(0xd946ef, 0.85, 10);
    bioGrowLight.position.set(0, 2.5, 1.4);
    bioGroup.add(bioGrowLight);

    // Clear Nutrient Water Reservoir Tank
    const waterTank = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 2.4, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65, roughness: 0.1 })
    );
    waterTank.position.set(2.8, 1.4, 0);
    waterTank.castShadow = true;
    bioGroup.add(waterTank);

    const waterFluid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.44, 0.44, 1.8, 16),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85, roughness: 0.1 })
    );
    waterFluid.position.set(2.8, 1.1, 0);
    bioGroup.add(waterFluid);

    const bioHitData = {
      stationKey: 'greenhouse',
      destPos: [-12, 6],
      stationName: lang === 'id' ? '🌱 Lab Hidroponik Bio-Dome OSDR-311' : '🌱 Bio-Dome Hydroponics Lab',
      actionDesc: lang === 'id' ? '+15% Kru, -10% Daya [1 Shift]' : '+15% Health, -10% Power [1 Shift]',
      impact: { health: 15, power: -10 },
      rootFbx: bioGroup
    };

    bioGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = bioHitData;
        clickableObjects.push(child);
      }
    });

    scene.add(bioGroup);

    // --------------------------------------------------------------
    // STATION 3: 🏃 NASA T2 COLBERT SPACE TREADMILL & GYM
    // --------------------------------------------------------------
    const gymGroup = new THREE.Group();
    gymGroup.position.set(16, 0, -10);

    const gymChassisMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.3 });
    const gymChromeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.2, metalness: 0.85 });

    // Heavy Treadmill Platform Deck
    const treadmillDeck = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.4, 2.2), gymChassisMat);
    treadmillDeck.position.y = 0.25;
    treadmillDeck.castShadow = true;
    treadmillDeck.receiveShadow = true;
    gymGroup.add(treadmillDeck);

    // Ribbed Running Belt
    const runningBelt = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.06, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.85 })
    );
    runningBelt.position.set(-0.2, 0.46, 0);
    gymGroup.add(runningBelt);

    // Yellow Hazard Edge Platforms
    const cautionMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
    const edgeL = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.05, 0.25), cautionMat);
    edgeL.position.set(-0.2, 0.46, 0.85);
    const edgeR = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.05, 0.25), cautionMat);
    edgeR.position.set(-0.2, 0.46, -0.85);
    gymGroup.add(edgeL);
    gymGroup.add(edgeR);

    // Front Cockpit Post & Digital Telemetry Screen
    const frontPost = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8, 12), gymChromeMat);
    frontPost.position.set(-2.1, 1.1, 0);
    gymGroup.add(frontPost);

    const gymScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.5, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x06b6d4, emissiveIntensity: 0.85 })
    );
    gymScreen.position.set(-2.05, 1.85, 0);
    gymScreen.rotation.y = Math.PI / 2;
    gymScreen.rotation.z = -0.35;
    gymGroup.add(gymScreen);

    // Overhead Bungee Harness Suspension Arch (Counteracting low gravity!)
    const archL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.2, 12), gymChromeMat);
    archL.position.set(0.2, 1.8, 1.1);
    const archR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.2, 12), gymChromeMat);
    archR.position.set(0.2, 1.8, -1.1);
    const archCross = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.3, 12), gymChromeMat);
    archCross.position.set(0.2, 3.4, 0);
    archCross.rotation.x = Math.PI / 2;
    gymGroup.add(archL);
    gymGroup.add(archR);
    gymGroup.add(archCross);

    // 2 Orange Bungee Cords
    const bungeeMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 });
    const bL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8), bungeeMat);
    bL.position.set(0.2, 2.6, 0.35);
    const bR = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8), bungeeMat);
    bR.position.set(0.2, 2.6, -0.35);
    gymGroup.add(bL);
    gymGroup.add(bR);

    const gymHitData = {
      stationKey: 'treadmill',
      destPos: [12, -8],
      stationName: lang === 'id' ? '🏃 Treadmill Luar Angkasa NASA T2 (OSDR)' : '🏃 NASA T2 Space Treadmill',
      actionDesc: lang === 'id' ? '+15% Kru, -10% Oksigen [1 Shift]' : '+15% Health, -10% O2 [1 Shift]',
      impact: { health: 15, oxygen: -10 },
      rootFbx: gymGroup
    };

    gymGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = gymHitData;
        clickableObjects.push(child);
      }
    });

    scene.add(gymGroup);

    // --------------------------------------------------------------
    // STATION 4: ⚡ PHOTOVOLTAIC SOLAR ARRAY & BATTERY POWER-WALL
    // --------------------------------------------------------------
    const powerGroup = new THREE.Group();
    powerGroup.position.set(16, 0, 7);

    const solarFrameMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4, metalness: 0.7 });
    const goldGridMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.9 });

    // Solar Gimbal Base
    const solarPost = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.4, 16), solarFrameMat);
    solarPost.position.set(-1.2, 0.7, 0);
    solarPost.castShadow = true;
    powerGroup.add(solarPost);

    // Tilted Dual Solar Wing Panel (Deep Blue Silicon Cells)
    const solarWing = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 0.1, 2.6),
      new THREE.MeshStandardMaterial({
        color: 0x1d4ed8,
        emissive: 0x1e40af,
        emissiveIntensity: 0.35,
        metalness: 0.85,
        roughness: 0.2
      })
    );
    solarWing.position.set(-1.2, 1.4, 0);
    solarWing.rotation.x = -0.62; // tilted 36 degrees towards sun
    solarWing.castShadow = true;
    powerGroup.add(solarWing);

    // Solar Frame Border
    const solarBorder = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.14, 2.75), solarFrameMat);
    solarBorder.position.set(-1.2, 1.4, 0);
    solarBorder.rotation.x = -0.62;
    powerGroup.add(solarBorder);

    // Busbar Cell Grid Dividers
    for (let i = 1; i <= 5; i++) {
      const divider = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 2.6), goldGridMat);
      divider.position.set(-1.2 - 2.3 + i * 0.76, 1.4, 0);
      divider.rotation.x = -0.62;
      powerGroup.add(divider);
    }

    // Heavy-Duty Battery Storage Power-Wall Cabinet
    const batteryCabinet = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 3.4, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 })
    );
    batteryCabinet.position.set(2.4, 1.7, 0);
    batteryCabinet.castShadow = true;
    batteryCabinet.receiveShadow = true;
    powerGroup.add(batteryCabinet);

    // 5 Glowing LED State-of-Charge Bars
    const ledBars = [];
    for (let i = 0; i < 5; i++) {
      const isGreen = i < 4;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.4, 0.05),
        new THREE.MeshStandardMaterial({
          color: isGreen ? 0x10b981 : 0xf59e0b,
          emissive: isGreen ? 0x059669 : 0xd97706,
          emissiveIntensity: 0.95
        })
      );
      bar.position.set(1.4, 0.7 + i * 0.55, 0.82);
      powerGroup.add(bar);
      ledBars.push(bar);
    }

    const powerHitData = {
      stationKey: 'power_grid',
      destPos: [12, 6],
      stationName: lang === 'id' ? '⚡ Matriks Baterai & Daya Surya Mars' : '⚡ Solar Panel & Battery Hub',
      actionDesc: lang === 'id' ? '+15% Daya, -10% Oksigen [1 Shift]' : '+15% Power, -10% O2 [1 Shift]',
      impact: { power: 15, oxygen: -10 },
      rootFbx: powerGroup
    };

    powerGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = powerHitData;
        clickableObjects.push(child);
      }
    });

    scene.add(powerGroup);

    // --------------------------------------------------------------
    // STATION 5: 🤖 A.N.I.S. AI HOLOGRAPHIC STATION (Central Stage)
    // --------------------------------------------------------------
    const anisGroup = new THREE.Group();
    anisGroup.position.set(0, 0, -4);

    // Elevated Holographic Platform Dais
    const anisDais = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.8, 0.4, 32),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.2 })
    );
    anisDais.position.y = 0.2;
    anisDais.receiveShadow = true;
    anisDais.castShadow = true;
    anisGroup.add(anisDais);

    // Concentric Blue Hologram Projection Lens
    const anisLens = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.05, 32),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0284c7, emissiveIntensity: 0.85 })
    );
    anisLens.position.y = 0.42;
    anisGroup.add(anisLens);

    // Floating Cute Robot Body (A.N.I.S.)
    const anisRobotBody = new THREE.Group();
    anisRobotBody.position.set(0, 2.2, 0);

    const robotHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, metalness: 0.1 })
    );
    robotHead.castShadow = true;
    anisRobotBody.add(robotHead);

    const robotRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.74, 0.06, 12, 24),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 0.4 })
    );
    robotRing.rotation.x = Math.PI / 2;
    anisRobotBody.add(robotRing);

    // Visor Screen with Glowing Cyan LED Eyes
    const robotVisor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.48, 0.28, 16, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.8 })
    );
    robotVisor.position.set(0, 0.05, 0.46);
    robotVisor.rotation.x = Math.PI / 2;
    anisRobotBody.add(robotVisor);

    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    eyeL.position.set(-0.2, 0.06, 0.72);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    eyeR.position.set(0.2, 0.06, 0.72);
    anisRobotBody.add(eyeL);
    anisRobotBody.add(eyeR);

    // Cute Top Antenna with Golden Beacon
    const antenna = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc })
    );
    antenna.position.set(0, 0.9, 0);
    const beacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xf59e0b, emissiveIntensity: 0.9 })
    );
    beacon.position.set(0, 1.15, 0);
    anisRobotBody.add(antenna);
    anisRobotBody.add(beacon);

    anisGroup.add(anisRobotBody);

    // Spinning Holographic Mars Globe with Orbit Ring
    const marsHolo = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.65, 2),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.75 })
    );
    marsHolo.position.set(0, 3.8, 0);
    anisGroup.add(marsHolo);

    const orbitGeo = new THREE.RingGeometry(0.9, 0.95, 32);
    orbitGeo.rotateX(Math.PI / 3);
    const orbitRing = new THREE.Line(
      new THREE.WireframeGeometry(orbitGeo),
      new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.6 })
    );
    marsHolo.add(orbitRing);

    const holoLight = new THREE.PointLight(0x06b6d4, 0.9, 10);
    holoLight.position.set(0, 3.2, 0);
    anisGroup.add(holoLight);

    const anisHitData = {
      stationKey: 'anis_dock',
      destPos: [0, -1.5],
      stationName: '🤖 Dok Pusat AI A.N.I.S.',
      actionDesc: lang === 'id' ? 'Buka Dialog Asisten AI (Penerjemah Sains)' : 'Open AI Assistant',
      isAnis: true,
      rootFbx: anisGroup
    };

    anisGroup.traverse(child => {
      if (child.isMesh) {
        child.userData = anisHitData;
        clickableObjects.push(child);
      }
    });

    scene.add(anisGroup);

    // ==============================================================
    // 10. ARTICULATED COMMANDER LEO WITH LOW-GRAVITY HOPPING
    // ==============================================================
    const astronautGroup = new THREE.Group();
    astronautGroup.position.set(0, 0, 4);
    astronautGroup.scale.set(1.25, 1.25, 1.25);

    const suitMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.4 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const goldVisorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9, emissive: 0x0284c7, emissiveIntensity: 0.45 });

    // Torso
    const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, 1.4, 16), suitMat);
    torsoMesh.position.y = 1.6;
    torsoMesh.castShadow = true;
    astronautGroup.add(torsoMesh);

    // Green Harness Strap
    const beltMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.28, 16), greenMat);
    beltMesh.position.y = 1.35;
    astronautGroup.add(beltMesh);

    // Head
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.88, 24, 24), suitMat);
    headMesh.position.y = 2.85;
    headMesh.castShadow = true;
    astronautGroup.add(headMesh);

    // Hair Buns
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x181224 });
    const bunL = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), hairMat);
    bunL.position.set(-0.9, 3.2, 0);
    const bunR = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), hairMat);
    bunR.position.set(0.9, 3.2, 0);
    astronautGroup.add(bunL);
    astronautGroup.add(bunR);

    // Visor
    const visorMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.68, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      goldVisorMat
    );
    visorMesh.rotation.x = Math.PI / 2;
    visorMesh.position.set(0, 2.85, 0.42);
    astronautGroup.add(visorMesh);

    // Life Support Backpack
    const packMesh = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.55), darkMat);
    packMesh.position.set(0, 1.8, -0.65);
    astronautGroup.add(packMesh);

    // Articulated Left Leg
    const legLeftPivot = new THREE.Group();
    legLeftPivot.position.set(-0.35, 1.0, 0);
    const legLeftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.0, 12), suitMat);
    legLeftMesh.position.y = -0.5;
    legLeftMesh.castShadow = true;
    const bootLeft = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.5), greenMat);
    bootLeft.position.set(0, -0.9, 0.1);
    legLeftPivot.add(legLeftMesh);
    legLeftPivot.add(bootLeft);
    astronautGroup.add(legLeftPivot);

    // Articulated Right Leg
    const legRightPivot = new THREE.Group();
    legRightPivot.position.set(0.35, 1.0, 0);
    const legRightMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 1.0, 12), suitMat);
    legRightMesh.position.y = -0.5;
    legRightMesh.castShadow = true;
    const bootRight = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.5), greenMat);
    bootRight.position.set(0, -0.9, 0.1);
    legRightPivot.add(legRightMesh);
    legRightPivot.add(bootRight);
    astronautGroup.add(legRightPivot);

    // Articulated Left Arm
    const armLeftPivot = new THREE.Group();
    armLeftPivot.position.set(-0.95, 2.1, 0);
    const armLeftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.9, 12), suitMat);
    armLeftMesh.position.y = -0.45;
    const gloveL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), darkMat);
    gloveL.position.y = -0.9;
    armLeftPivot.add(armLeftMesh);
    armLeftPivot.add(gloveL);
    astronautGroup.add(armLeftPivot);

    // Articulated Right Arm
    const armRightPivot = new THREE.Group();
    armRightPivot.position.set(0.95, 2.1, 0);
    const armRightMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 0.9, 12), suitMat);
    armRightMesh.position.y = -0.45;
    const gloveR = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), darkMat);
    gloveR.position.y = -0.9;
    armRightPivot.add(armRightMesh);
    armRightPivot.add(gloveR);
    astronautGroup.add(armRightPivot);

    scene.add(astronautGroup);

    // Center coordinate of the base
    const CENTER_X = 0;
    const CENTER_Z = 4;
    const WORK_DURATION = 3.5; // 3.5 seconds of authentic station maintenance

    // Floor Contact Projection Ring
    const ringGeo = new THREE.RingGeometry(0.95, 1.25, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const selectionRing = new THREE.Mesh(ringGeo, ringMat);
    selectionRing.position.set(CENTER_X, 0.04, CENTER_Z);
    scene.add(selectionRing);

    // Walking & Pathfinding & Work Lifecycle State Machine
    const charPos = new THREE.Vector3(CENTER_X, 0, CENTER_Z);
    const charTarget = new THREE.Vector3(CENTER_X, 0, CENTER_Z);
    let isMoving = false;
    let walkCycle = 0;
    let workPhase = 'IDLE'; // 'IDLE' | 'LEAPING_TO_STATION' | 'WORKING' | 'LEAPING_TO_CENTER'
    let currentStationKey = null;
    let currentStationMeta = null;
    let workTimer = 0;
    let lastReportedSec = -1;

    triggerStationRef.current = (stationKey, directImpact) => {
      // Prevent interrupting when Leo is already traveling, working, or returning!
      if (workPhase !== 'IDLE') return;

      // Check daily shift limit (except ANIS dialogue which is always accessible)
      if (stationKey !== 'anis_dock' && dailyShiftsLeft <= 0) {
        SoundEngine.playAlertSiren();
        setActiveTooltip({
          name: lang === 'id' ? '⚠️ SHIFT HARIAN HABIS (3/3)' : '⚠️ DAILY SHIFTS EXHAUSTED (3/3)',
          action: lang === 'id' ? 'Leo kelelahan! Lanjutkan ke siklus evaluasi malam 🌙' : 'Leo needs rest! Proceed to evening evaluation 🌙'
        });
        setTimeout(() => setActiveTooltip(null), 3500);
        return;
      }

      let dest = [CENTER_X, CENTER_Z];
      let meta = {};

      if (stationKey === 'moxie') {
        dest = [-12.5, -9];
        meta = moxieHitData;
      } else if (stationKey === 'greenhouse') {
        dest = [-12.5, 7];
        meta = bioHitData;
      } else if (stationKey === 'treadmill') {
        dest = [15.5, -10];
        meta = gymHitData;
      } else if (stationKey === 'power_grid') {
        dest = [12.5, 7];
        meta = powerHitData;
      } else if (stationKey === 'anis_dock') {
        dest = [0, -1.2];
        meta = anisHitData;
      }

      if (meta.stationName) {
        currentStationKey = stationKey;
        const finalImpact = directImpact || meta.impact;
        currentStationMeta = {
          ...meta,
          finalImpact: finalImpact
        };

        if (stationKey === 'anis_dock') {
          SoundEngine.playPipBoyOpen();
        } else {
          SoundEngine.playClick();
        }

        setIsWorking(true);
        setActiveStation(stationKey);
        setWorkProgress(0);
        setWorkSecondsLeft(Math.ceil(WORK_DURATION));

        workPhase = 'LEAPING_TO_STATION';
        charTarget.set(dest[0], 0, dest[1]);
        isMoving = true;

        setCharacterStatusText(
          lang === 'id' 
            ? `Leo melayang melompat menuju ${meta.stationName}... (Gravitasi Mars 0.38g)` 
            : `Leo low-G floating & leaping to ${meta.stationName}... (0.38g Mars)`
        );
      }
    };

    // 11. Massive Forcefield Dome
    const shieldGeo = new THREE.SphereGeometry(46, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    scene.add(shieldMesh);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.4 });
    const shieldWire = new THREE.LineSegments(new THREE.WireframeGeometry(shieldGeo), wireMat);
    shieldMesh.add(shieldWire);

    // 12. Pointer Raycasting with Drag Protection
    let pointerDownPos = { x: 0, y: 0 };
    let pointerDownTime = 0;

    const onPointerDown = (event) => {
      pointerDownPos = { x: event.clientX, y: event.clientY };
      pointerDownTime = performance.now();
    };

    const onPointerUp = (event) => {
      const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
      const elapsed = performance.now() - pointerDownTime;
      if (dist > 8 || elapsed > 550) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;

        if (data && data.stationKey && triggerStationRef.current) {
          triggerStationRef.current(data.stationKey);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // 13. Render Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      if (controls) controls.update();

      // STATION ANIMATIONS
      // 1. A.N.I.S. Mars Globe Rotation & Robot Floating Bob
      marsHolo.rotation.y += 0.015;
      anisRobotBody.position.y = 2.2 + Math.sin(time * 2.5) * 0.12;
      beacon.scale.setScalar(1.0 + Math.sin(time * 6) * 0.2);

      // 2. Solar Hub Battery LED Bar Pulsation
      ledBars.forEach((bar, idx) => {
        bar.material.emissiveIntensity = 0.6 + Math.sin(time * 4 + idx * 0.8) * 0.4;
      });

      // 3. Bio-Dome Grow Light Breathing
      bioGrowLight.intensity = 0.75 + Math.sin(time * 3) * 0.2;

      // 4. MOXIE Core Heat Pulsing
      moxieCore.material.emissiveIntensity = 0.75 + Math.sin(time * 5) * 0.35;

      // WALKING & LOW-GRAVITY HOPPING ENGINE
      if (isMoving) {
        const dx = charTarget.x - charPos.x;
        const dz = charTarget.z - charPos.z;
        const dist = Math.hypot(dx, dz);

        if (dist > 0.45) {
          const targetAngle = Math.atan2(dx, dz);
          let diff = targetAngle - astronautGroup.rotation.y;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          astronautGroup.rotation.y += diff * 0.22;

          const walkSpeed = 9.2 * delta;
          charPos.x += (dx / dist) * Math.min(dist, walkSpeed);
          charPos.z += (dz / dist) * Math.min(dist, walkSpeed);

          walkCycle += delta * 5.6;
          const hopPhase = walkCycle % Math.PI;
          const isLeftLead = Math.floor(walkCycle / Math.PI) % 2 === 0;

          // Parabolic jump arc with atmospheric hangtime at apex (power of 0.72)
          const hopHeight = Math.pow(Math.sin(hopPhase), 0.72) * 1.5;
          astronautGroup.position.set(charPos.x, hopHeight, charPos.z);

          selectionRing.position.set(charPos.x, 0.04, charPos.z);
          const ringScale = Math.max(0.65, 1.25 - (hopHeight / 1.5) * 0.45);
          selectionRing.scale.set(ringScale, ringScale, ringScale);
          selectionRing.material.opacity = Math.max(0.2, 0.65 - (hopHeight / 1.5) * 0.38);

          torsoMesh.rotation.x = 0.22 + Math.sin(hopPhase) * 0.08;
          astronautGroup.rotation.z = Math.sin(walkCycle) * 0.07;

          // Arms spread outward for balance in low gravity
          const armFlap = Math.sin(hopPhase);
          armLeftPivot.rotation.z = -0.6 - armFlap * 0.35;
          armRightPivot.rotation.z = 0.6 + armFlap * 0.35;
          armLeftPivot.rotation.x = isLeftLead ? (-0.4 - armFlap * 0.3) : (-0.2 + armFlap * 0.4);
          armRightPivot.rotation.x = isLeftLead ? (-0.2 + armFlap * 0.4) : (-0.4 - armFlap * 0.3);

          if (isLeftLead) {
            legLeftPivot.rotation.x = 0.45 - Math.sin(hopPhase) * 0.75;
            legRightPivot.rotation.x = -0.7 + Math.sin(hopPhase) * 0.45;
          } else {
            legRightPivot.rotation.x = 0.45 - Math.sin(hopPhase) * 0.75;
            legLeftPivot.rotation.x = -0.7 + Math.sin(hopPhase) * 0.45;
          }
        } else {
          // ARRIVED AT DESTINATION!
          isMoving = false;
          charPos.set(charTarget.x, 0, charTarget.z);
          astronautGroup.position.set(charPos.x, 0, charPos.z);

          legLeftPivot.rotation.set(0, 0, 0);
          legRightPivot.rotation.set(0, 0, 0);
          armLeftPivot.rotation.set(0, 0, 0);
          armRightPivot.rotation.set(0, 0, 0);
          torsoMesh.rotation.set(0, 0, 0);
          astronautGroup.rotation.z = 0;

          selectionRing.position.set(charPos.x, 0.04, charPos.z);
          selectionRing.scale.set(1.15, 1.15, 1.15);
          selectionRing.material.opacity = 0.55;

          if (workPhase === 'LEAPING_TO_STATION') {
            if (currentStationKey === 'anis_dock') {
              workPhase = 'WORKING';
              astronautGroup.rotation.y = 0;
              SoundEngine.playPipBoyOpen();
              onOpenAnis && onOpenAnis();
              setCharacterStatusText(lang === 'id' ? 'Leo sedang berkonsultasi dengan A.N.I.S. AI' : 'Leo consulting A.N.I.S. AI');
              setTimeout(() => {
                if (workPhase === 'WORKING' && currentStationKey === 'anis_dock') {
                  workPhase = 'LEAPING_TO_CENTER';
                  charTarget.set(CENTER_X, 0, CENTER_Z);
                  isMoving = true;
                  setCharacterStatusText(lang === 'id' ? 'Leo kembali ke pos tengah pangkalan... 🚀' : 'Leo returning to base center... 🚀');
                }
              }, 4500);
            } else {
              // Start working at station!
              workPhase = 'WORKING';
              workTimer = WORK_DURATION;
              lastReportedSec = -1;

              if (currentStationKey === 'moxie') {
                SoundEngine.playOxygenFlow();
                astronautGroup.rotation.y = -Math.PI / 2;
              } else if (currentStationKey === 'greenhouse') {
                SoundEngine.playOxygenFlow();
                astronautGroup.rotation.y = -Math.PI / 2;
              } else if (currentStationKey === 'treadmill') {
                SoundEngine.playBottleCaps();
                astronautGroup.rotation.y = -Math.PI / 2;
              } else if (currentStationKey === 'power_grid') {
                SoundEngine.playPowerBuzz();
                astronautGroup.rotation.y = Math.PI / 2;
              }
            }
          } else if (workPhase === 'LEAPING_TO_CENTER') {
            // Arrived back at center!
            workPhase = 'IDLE';
            currentStationKey = null;
            currentStationMeta = null;
            lastReportedSec = -1;

            astronautGroup.rotation.set(0, 0, 0);
            selectionRing.position.set(CENTER_X, 0.04, CENTER_Z);
            try {
              if (SoundEngine && typeof SoundEngine.playRadioBeep === 'function') {
                SoundEngine.playRadioBeep();
              } else if (SoundEngine && typeof SoundEngine.playClick === 'function') {
                SoundEngine.playClick();
              }
            } catch (e) {}

            setIsWorking(false);
            setActiveStation(null);
            setWorkProgress(0);
            setWorkSecondsLeft(0);
            setCharacterStatusText(lang === 'id' ? 'Commander Leo Siap di Pangkalan' : 'Commander Leo Ready at Outpost Center');
          }
        }
      } else {
        // NOT IN TRANSIT: EITHER WORKING AT STATION OR IDLE AT CENTER
        if (workPhase === 'WORKING') {
          if (currentStationKey !== 'anis_dock') {
            workTimer -= delta;
            const currentSec = Math.max(0, Math.ceil(workTimer));
            const progressPct = Math.min(100, Math.max(0, Math.round(((WORK_DURATION - workTimer) / WORK_DURATION) * 100)));

            if (currentSec !== lastReportedSec) {
              lastReportedSec = currentSec;
              setWorkSecondsLeft(currentSec);
              setWorkProgress(progressPct);

              let workingMsg = '';
              if (currentStationKey === 'moxie') {
                workingMsg = lang === 'id' 
                  ? `⚙️ Leo sedang melakukan elektrolisis di MOXIE... [⏱️ ${currentSec}s]` 
                  : `⚙️ Leo operating MOXIE O2 electrolysis... [⏱️ ${currentSec}s]`;
              } else if (currentStationKey === 'greenhouse') {
                workingMsg = lang === 'id' 
                  ? `🌱 Leo sedang memanen & merawat Bio-Dome... [⏱️ ${currentSec}s]` 
                  : `🌱 Leo tending Bio-Dome hydroponics... [⏱️ ${currentSec}s]`;
              } else if (currentStationKey === 'treadmill') {
                workingMsg = lang === 'id' 
                  ? `🏃 Leo sedang berlari anti-atrofi di Treadmill OSDR... [⏱️ ${currentSec}s]` 
                  : `🏃 Leo running on OSDR Treadmill... [⏱️ ${currentSec}s]`;
              } else if (currentStationKey === 'power_grid') {
                workingMsg = lang === 'id' 
                  ? `⚡ Leo sedang membersihkan panel surya & baterai... [⏱️ ${currentSec}s]` 
                  : `⚡ Leo cleaning solar panels & battery grid... [⏱️ ${currentSec}s]`;
              }
              setCharacterStatusText(workingMsg);
            }

            // Authentic working poses
            if (currentStationKey === 'treadmill') {
              walkCycle += delta * 15;
              astronautGroup.position.set(charPos.x, 0.46 + Math.abs(Math.sin(walkCycle)) * 0.12, charPos.z);
              astronautGroup.rotation.y = -Math.PI / 2;
              legLeftPivot.rotation.x = Math.sin(walkCycle) * 0.55;
              legRightPivot.rotation.x = -Math.sin(walkCycle) * 0.55;
              armLeftPivot.rotation.x = -Math.sin(walkCycle) * 0.65;
              armRightPivot.rotation.x = Math.sin(walkCycle) * 0.65;
              torsoMesh.rotation.x = 0.2;
              selectionRing.position.set(charPos.x, 0.5, charPos.z);
            } else if (currentStationKey === 'moxie') {
              astronautGroup.rotation.y = -Math.PI / 2;
              torsoMesh.rotation.x = 0.15;
              armLeftPivot.rotation.x = -1.3 + Math.sin(time * 5) * 0.25;
              armRightPivot.rotation.x = -1.1 + Math.sin(time * 5 + 1.2) * 0.3;
              astronautGroup.position.y = 0;
              selectionRing.position.set(charPos.x, 0.04, charPos.z);
            } else if (currentStationKey === 'greenhouse') {
              astronautGroup.rotation.y = -Math.PI / 2;
              torsoMesh.rotation.x = 0.28;
              armLeftPivot.rotation.x = -0.9 + Math.sin(time * 4) * 0.2;
              armRightPivot.rotation.x = -0.9 + Math.sin(time * 4 + 0.8) * 0.2;
              astronautGroup.position.y = 0;
              selectionRing.position.set(charPos.x, 0.04, charPos.z);
            } else if (currentStationKey === 'power_grid') {
              astronautGroup.rotation.y = Math.PI / 2;
              torsoMesh.rotation.x = 0.18;
              armRightPivot.rotation.x = -0.8;
              armRightPivot.rotation.z = 0.4 + Math.sin(time * 6) * 0.45;
              armLeftPivot.rotation.x = -0.3;
              astronautGroup.position.y = 0;
              selectionRing.position.set(charPos.x, 0.04, charPos.z);
            }

            // Work Completed!
            if (workTimer <= 0) {
              const activeDef = currentStationMeta;
              if (activeDef && activeDef.finalImpact && onInteractStation) {
                onInteractStation(currentStationKey, activeDef.finalImpact);
              }

              SoundEngine.playSuccessChime();
              SoundEngine.playBottleCaps();

              if (activeDef) {
                setActiveTooltip({
                  name: activeDef.name || activeDef.stationName,
                  action: `✅ ${lang === 'id' ? 'Pemeliharaan Selesai!' : 'Maintenance Complete!'} (${activeDef.action || activeDef.actionDesc})`
                });
                setTimeout(() => setActiveTooltip(null), 3500);

                if (activeDef.rootFbx) {
                  const startY = activeDef.rootFbx.position.y;
                  activeDef.rootFbx.position.y += 0.5;
                  setTimeout(() => {
                    if (activeDef.rootFbx) activeDef.rootFbx.position.y = startY;
                  }, 300);
                }
              }

              // Return to center!
              workPhase = 'LEAPING_TO_CENTER';
              isMoving = true;
              charTarget.set(CENTER_X, 0, CENTER_Z);
              setWorkProgress(100);
              setWorkSecondsLeft(0);
              setCharacterStatusText(
                lang === 'id'
                  ? '🎉 Tugas selesai! Leo melompat kembali ke pos tengah pangkalan... 🚀'
                  : '🎉 Task complete! Leo hopping back to base center... 🚀'
              );
            }
          } else {
            // ANIS dock idle talking pose
            armRightPivot.rotation.x = -1.8;
            armRightPivot.rotation.z = Math.sin(time * 7) * 0.35;
            astronautGroup.position.y = 0;
            selectionRing.position.set(charPos.x, 0.04, charPos.z);
          }
        } else {
          // IDLE AT CENTER - Low gravity hovering float
          torsoMesh.rotation.x = 0;
          astronautGroup.rotation.z = 0;
          armLeftPivot.rotation.z = 0;
          armRightPivot.rotation.z = 0;
          armLeftPivot.rotation.x = Math.sin(time * 1.5) * 0.08;
          armRightPivot.rotation.x = -Math.sin(time * 1.5) * 0.08;
          legLeftPivot.rotation.set(0, 0, 0);
          legRightPivot.rotation.set(0, 0, 0);

          astronautGroup.position.y = Math.sin(time * 2.2) * 0.12 + 0.08;
          astronautGroup.rotation.y = Math.sin(time * 0.6) * 0.12;

          selectionRing.position.set(charPos.x, 0.04, charPos.z);
          selectionRing.scale.set(1.1, 1.1, 1.1);
          selectionRing.material.opacity = 0.45 + Math.sin(time * 3.0) * 0.2;
        }
      }

      // Shield Pulsation
      shieldMesh.visible = shieldActive;
      if (shieldActive) {
        shieldMesh.rotation.y = time * 0.08;
        shieldMat.opacity = 0.20 + Math.sin(time * 3.5) * 0.07;
      }

      // Emergency Storm Siren
      if (isStorming) {
        alertLight.intensity = Math.sin(time * 8) > 0 ? 3.0 : 0.2;
      } else {
        alertLight.intensity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Responsive Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointerup', onPointerUp);
      }
      renderer.dispose();
    };
  }, [lang, shieldActive, isStorming]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.9)] border-4 border-yellow-500 bg-[#070b14] select-none flex flex-col font-mono">
      {/* Top Hazard Warning Stripe Trim */}
      <div className="w-full h-2 hazard-stripes border-b border-yellow-600" />

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[450px] sm:h-[520px]">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Loading Screen - Vault-Tec Boot Sequence */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
            <div className="text-base font-black font-vault text-yellow-300 tracking-wider">
              {lang === 'id' ? 'MEMUAT PANGKALAN VAULT-TEC MARS & SISTEM NASA...' : 'INITIALIZING VAULT-TEC MARS OUTPOST...'}
            </div>
            <div className="w-80 h-4 bg-neutral-900 rounded-full overflow-hidden mt-3 border-2 border-yellow-500/70 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-xs text-yellow-200/80 mt-2">
              Loading: MOXIE Reactor, Bio-Dome, T2 Gym, Solar Grid, A.N.I.S. AI ({loadingProgress}%)
            </div>
          </div>
        )}

        {/* Floating 3D Interaction Notification Tooltip */}
        {activeTooltip && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-neutral-950/95 border-2 border-yellow-400 px-6 py-2.5 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.5)] backdrop-blur-md animate-fadeIn text-center">
            <div className="text-xs font-black text-yellow-300 tracking-wider uppercase">{activeTooltip.name}</div>
            <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{activeTooltip.action}</div>
          </div>
        )}

        {/* Top Left Facility Map & Status Pill (Fallout Shelter Camera Overlay) */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2.5 bg-neutral-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border-2 border-yellow-500/80 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <div>
            <div className="text-[9px] text-yellow-400 font-black tracking-widest uppercase">
              ● REC • CAM-01 • {lang === 'id' ? 'HABITAT UTAMA' : 'PRIMARY HABITAT'}
            </div>
            <div className="text-xs text-white font-bold">
              VAULT 703 • {lang === 'id' ? site.name : (site.nameEn || site.name)} • Sol {currentSol}
            </div>
          </div>
        </div>

        {/* Top Right Camera Reset Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          <button 
            onClick={() => resetCameraRef.current && resetCameraRef.current()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border-2 border-yellow-500/70 text-xs font-bold text-yellow-300 transition-all shadow-md active:scale-95"
            title={lang === 'id' ? 'Kembalikan sudut kamera awal' : 'Reset Camera Angle'}
          >
            <span>🎥</span>
            <span>{lang === 'id' ? 'Reset Kamera' : 'Reset Camera'}</span>
          </button>
        </div>

        {/* Camera Navigation Tip */}
        <div className="absolute bottom-3 right-3 z-20 hidden sm:flex items-center gap-2 bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700 text-[10px] text-neutral-300 shadow-md">
          <span>🎮</span>
          <span>{lang === 'id' ? 'Klik & geser untuk rotasi 360° • Scroll untuk zoom' : 'Drag to rotate 360° • Scroll to zoom'}</span>
        </div>
      </div>

      {/* DOCKED BOTTOM CONTROL PANEL (Fallout Shelter Overseer Ribbon) */}
      <div className="w-full bg-[#0a0f1d] border-t-2 border-yellow-500 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 z-20">
        {/* Live Status text with Pip-Boy green glow & Work Timer */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            {isWorking ? (
              <span className="text-yellow-400 font-bold animate-spin text-sm">⚙️</span>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            )}
            <span className={`font-bold tracking-wide ${isWorking ? 'text-yellow-300' : 'text-emerald-300 pipboy-glow'}`}>
              [LEO-01]: {dailyShiftsLeft <= 0 && !isWorking 
                ? (lang === 'id' ? 'Shift hari ini selesai (3/3). Leo beristirahat untuk evaluasi malam 🌙' : 'All 3/3 shifts completed. Leo resting for night evaluation 🌙') 
                : characterStatusText}
            </span>
          </div>

          {/* Work Countdown & Progress indicator when active */}
          {isWorking && workSecondsLeft > 0 && (
            <div className="flex items-center gap-2 px-2.5 py-1 bg-yellow-950/80 border border-yellow-400 rounded-md shadow-[0_0_10px_rgba(234,179,8,0.4)]">
              <span className="text-[10px] font-black text-yellow-300 font-vault tracking-widest uppercase">
                {lang === 'id' ? 'PROSES' : 'BUSY'}: {workSecondsLeft}s
              </span>
              <div className="w-16 h-2 bg-neutral-900 rounded-full overflow-hidden border border-yellow-500/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${workProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Daily Work Shifts Indicator (Energy Capsules) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-950/90 rounded-lg border border-yellow-500/70 shadow-inner" title={lang === 'id' ? 'Batas Shift Tugas Harian Astronot' : 'Daily Astronaut Shift Limit'}>
            <span className="text-[10px] font-black text-yellow-300 tracking-wider font-vault uppercase">
              {lang === 'id' ? 'SHIFT' : 'SHIFTS'}:
            </span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((idx) => {
                const isReady = idx < dailyShiftsLeft;
                return (
                  <div 
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all ${
                      isReady 
                        ? 'bg-emerald-500 border border-emerald-300 shadow-[0_0_8px_rgba(34,197,94,0.8)]' 
                        : 'bg-neutral-800 border border-neutral-700 opacity-40'
                    }`}
                    title={isReady 
                      ? (lang === 'id' ? `Shift ${idx + 1} Siap` : `Shift ${idx + 1} Ready`) 
                      : (lang === 'id' ? `Shift ${idx + 1} Terpakai` : `Shift ${idx + 1} Used`)}
                  >
                    {isReady && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </div>
                );
              })}
            </div>
            <span className={`text-[10px] font-black font-vault ${dailyShiftsLeft > 0 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
              {dailyShiftsLeft}/3
            </span>
          </div>
        </div>

        {/* Station Buttons with Low-G Jump Trigger */}
        <div className="flex flex-wrap items-center gap-2">
          {/* POWER GRID BUTTON */}
          <div className="relative">
            {highlightedTarget === 'power_grid' && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce">
                <span className="px-2 py-0.5 rounded bg-yellow-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#facc15] whitespace-nowrap">
                  {lang === 'id' ? '👆 KLIK INI' : '👆 CLICK HERE'}
                </span>
                <span className="w-1.5 h-1.5 bg-yellow-400 rotate-45 -mt-1" />
              </div>
            )}
            <button
              onClick={() => triggerStationRef.current && triggerStationRef.current('power_grid')}
              disabled={isWorking || dailyShiftsLeft <= 0}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all transform ${
                highlightedTarget === 'power_grid'
                  ? 'ring-4 ring-yellow-400 bg-yellow-500/40 shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-pulse scale-105'
                  : isWorking 
                    ? activeStation === 'power_grid' 
                      ? 'ring-2 ring-yellow-400 bg-yellow-500/20 animate-pulse' 
                      : 'opacity-40 cursor-not-allowed' 
                    : dailyShiftsLeft <= 0 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'active:scale-95'
              }`}
              title={isWorking 
                ? (lang === 'id' ? 'Leo sedang sibuk bekerja...' : 'Leo is busy working...') 
                : dailyShiftsLeft <= 0 
                  ? (lang === 'id' ? 'Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!' : 'Daily shifts depleted (3/3). Proceed to night evaluation!') 
                  : (lang === 'id' ? 'Kirim Leo ke Hub Panel Surya & Baterai (+15% Daya, -10% O2)' : 'Send Leo to Solar Panel & Battery Hub (+15% Power, -10% O2)')}
            >
              <span>⚡</span>
              <span>{lang === 'id' ? 'PANEL SURYA' : 'POWER GRID'}</span>
            </button>
          </div>

          {/* MOXIE BUTTON */}
          <div className="relative">
            {highlightedTarget === 'moxie' && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce">
                <span className="px-2 py-0.5 rounded bg-cyan-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#22d3ee] whitespace-nowrap">
                  {lang === 'id' ? '👆 KLIK INI' : '👆 CLICK HERE'}
                </span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rotate-45 -mt-1" />
              </div>
            )}
            <button
              onClick={() => triggerStationRef.current && triggerStationRef.current('moxie')}
              disabled={isWorking || dailyShiftsLeft <= 0}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-cyan-300 text-xs font-bold transition-all transform ${
                highlightedTarget === 'moxie'
                  ? 'ring-4 ring-cyan-400 bg-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.9)] animate-pulse scale-105'
                  : isWorking 
                    ? activeStation === 'moxie' 
                      ? 'ring-2 ring-cyan-400 bg-cyan-500/20 animate-pulse' 
                      : 'opacity-40 cursor-not-allowed' 
                    : dailyShiftsLeft <= 0 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'active:scale-95'
              }`}
              title={isWorking 
                ? (lang === 'id' ? 'Leo sedang sibuk bekerja...' : 'Leo is busy working...') 
                : dailyShiftsLeft <= 0 
                  ? (lang === 'id' ? 'Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!' : 'Daily shifts depleted (3/3). Proceed to night evaluation!') 
                  : (lang === 'id' ? 'Kirim Leo ke Reaktor MOXIE (+15% O2, -10% Daya)' : 'Send Leo to MOXIE Reactor (+15% O2, -10% Power)')}
            >
              <span>💨</span>
              <span>MOXIE (+O2)</span>
            </button>
          </div>

          {/* BIO-DOME BUTTON */}
          <button
            onClick={() => triggerStationRef.current && triggerStationRef.current('greenhouse')}
            disabled={isWorking || dailyShiftsLeft <= 0}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-emerald-300 text-xs font-bold transition-all transform ${
              isWorking 
                ? activeStation === 'greenhouse' 
                  ? 'ring-2 ring-emerald-400 bg-emerald-500/20 animate-pulse' 
                  : 'opacity-40 cursor-not-allowed' 
                : dailyShiftsLeft <= 0 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'active:scale-95'
            }`}
            title={isWorking 
              ? (lang === 'id' ? 'Leo sedang sibuk bekerja...' : 'Leo is busy working...') 
              : dailyShiftsLeft <= 0 
                ? (lang === 'id' ? 'Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!' : 'Daily shifts depleted (3/3). Proceed to night evaluation!') 
                : (lang === 'id' ? 'Kirim Leo ke Bio-Dome (+15% Kru, -10% Daya)' : 'Send Leo to Bio-Dome (+15% Crew, -10% Power)')}
          >
            <span>🌱</span>
            <span>{lang === 'id' ? 'BIO-DOME (+KRU)' : 'BIO-DOME (+CREW)'}</span>
          </button>

          {/* TREADMILL BUTTON */}
          <button
            onClick={() => triggerStationRef.current && triggerStationRef.current('treadmill')}
            disabled={isWorking || dailyShiftsLeft <= 0}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-indigo-300 text-xs font-bold transition-all transform ${
              isWorking 
                ? activeStation === 'treadmill' 
                  ? 'ring-2 ring-indigo-400 bg-indigo-500/20 animate-pulse' 
                  : 'opacity-40 cursor-not-allowed' 
                : dailyShiftsLeft <= 0 
                  ? 'opacity-40 cursor-not-allowed' 
                  : 'active:scale-95'
            }`}
            title={isWorking 
              ? (lang === 'id' ? 'Leo sedang sibuk bekerja...' : 'Leo is busy working...') 
              : dailyShiftsLeft <= 0 
                ? (lang === 'id' ? 'Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!' : 'Daily shifts depleted (3/3). Proceed to night evaluation!') 
                : (lang === 'id' ? 'Kirim Leo ke Treadmill NASA T2 (+15% Kru, -10% O2)' : 'Send Leo to NASA T2 Treadmill (+15% Crew, -10% O2)')}
          >
            <span>🏃</span>
            <span>TREADMILL (OSDR)</span>
          </button>

          {/* THE FAMOUS PIP-BOY 3000 / A.N.I.S. BUTTON */}
          <div className="relative">
            {highlightedTarget === 'anis_dock' && (
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce">
                <span className="px-2 py-0.5 rounded bg-emerald-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#34d399] whitespace-nowrap">
                  {lang === 'id' ? '👆 KLIK INI' : '👆 CLICK HERE'}
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rotate-45 -mt-1" />
              </div>
            )}
            <button
              onClick={() => {
                SoundEngine.playPipBoyOpen();
                triggerStationRef.current && triggerStationRef.current('anis_dock');
              }}
              disabled={isWorking && activeStation !== 'anis_dock'}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg vault-btn-green text-emerald-300 text-xs font-black transition-all transform shadow-[0_0_15px_rgba(34,197,94,0.5)] border-2 border-emerald-400 ${
                highlightedTarget === 'anis_dock'
                  ? 'ring-4 ring-emerald-400 bg-emerald-500/40 shadow-[0_0_25px_rgba(34,197,94,0.9)] animate-pulse scale-105'
                  : isWorking && activeStation !== 'anis_dock' 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'active:scale-95'
              }`}
              title={lang === 'id' ? 'Buka Terminal Pip-Boy 3000 / A.N.I.S. AI' : 'Open Pip-Boy 3000 / A.N.I.S. AI Terminal'}
            >
              <span className="text-sm">📟</span>
              <span className="pipboy-glow tracking-wider">PIP-BOY • A.N.I.S.</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
