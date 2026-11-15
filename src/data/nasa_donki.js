// NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
// Curated Authentic Space Weather Events verified from CCMC / NASA GSFC

export const NASA_DONKI_EVENTS = [
  {
    id: "DONKI-FLR-20140508",
    officialId: "2014-05-08T09:20:00-FLR-001",
    date: "2014-05-08",
    type: "Solar Flare (FLR)",
    classType: "M5.2 Class",
    hazardLevel: "HIGH",
    sourceRegion: "Active Region 12056 (N05E55)",
    detectingInstruments: ["SDO Imagery", "GOES-15"],
    description: "Significant M5.2 solar flare detected on solar surface. Sharp increase in energetic proton flux traveling through the interplanetary medium towards Mars orbit.",
    nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/Alert/5432/1",
    plainLanguageAnis: "Matahari baru saja menembakkan kilatan cahaya super kuat kelas M5.2! Bayangkan seperti senter raksasa alam semesta yang menyala tiba-tiba dan membanjiri jalur orbit dengan partikel berenergi tinggi.",
    plainLanguageEn: "The Sun just unleashed an intense M5.2 solar flash! Like a cosmic giant flashlight bursting with high-energy particles directed across our orbital path.",
    gameImpact: {
      powerDrainMultiplier: 1.4,
      radiationDoseMsv: 18.5,
      hazard: "SOLAR_RADIATION_SURGE"
    }
  },
  {
    id: "DONKI-CME-20170103",
    officialId: "2017-01-03T03:12:00-CME-001",
    date: "2017-01-03",
    type: "Coronal Mass Ejection (CME)",
    classType: "C-Type CME (Speed: 645 km/s)",
    hazardLevel: "CRITICAL",
    sourceRegion: "SE Limb Eruption, SDO AIA 171",
    detectingInstruments: ["SOHO LASCO C3", "STEREO A", "WSA-ENLIL Simulation"],
    marsArrivalTime: "2017-01-07T06:00Z (WSA-ENLIL Verified Impact)",
    description: "NASA GSFC space weather modeling confirmed a C-type Coronal Mass Ejection impacting Mars atmosphere. Billions of tons of magnetized plasma traveling at 645 km/s.",
    nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/WSA-ENLIL/12061/-1",
    plainLanguageAnis: "Waspada! Ini adalah Coronal Mass Ejection (CME), atau 'bersin raksasa' Matahari! Miliaran ton gas plasma panas meluncur dengan kecepatan 645 kilometer per detik menuju Mars. Kita butuh perisai aktif!",
    plainLanguageEn: "Alert! This is a Coronal Mass Ejection (CME), or the Sun's 'giant sneeze'! Billions of tons of hot plasma are rushing at 645 km/s toward Mars. We need active shields!",
    gameImpact: {
      powerDrainMultiplier: 1.8,
      radiationDoseMsv: 32.0,
      hazard: "CME_PLASMA_STORM"
    }
  },
  {
    id: "DONKI-SEP-20160102",
    officialId: "2016-01-02T02:48:00-SEP-001",
    date: "2016-01-02",
    type: "Solar Energetic Particle (SEP)",
    classType: "Proton Flux > 10 MeV (High Energy)",
    hazardLevel: "MEDIUM",
    sourceRegion: "Active Region 12473",
    detectingInstruments: ["SOHO COSTEP 15.8-39.8 MeV", "GOES-13"],
    description: "Intense stream of relativistic protons accelerated by solar magnetic reconnection. Subatomic particles can penetrate light habitat walls and disrupt unhardened microchips.",
    nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/SEP/9966/-1",
    plainLanguageAnis: "Ada 'hujan butiran proton peluru' berkecepatan tinggi di luar pangkalan kita! Butiran ini sangat kecil tapi berenergi tinggi, bisa bikin komputer eror dan tubuh kita lelah jika tidak bersembunyi.",
    plainLanguageEn: "A storm of energetic subatomic protons is showering outside our dome! They are tiny but pack a punch, risking habitat computer glitches and crew cell fatigue.",
    gameImpact: {
      powerDrainMultiplier: 1.2,
      radiationDoseMsv: 12.0,
      hazard: "PROTON_SHOWER"
    }
  },
  {
    id: "DONKI-HSS-20160121",
    officialId: "2016-01-21T10:00:00-HSS-001",
    date: "2016-01-21",
    type: "High Speed Solar Wind Stream (HSS)",
    classType: "Kp Index 6 (Moderate Storm)",
    hazardLevel: "MEDIUM",
    sourceRegion: "Solar Coronal Hole #44",
    detectingInstruments: ["ACE SWEPAM", "ACE MAG", "NOAA SWPC"],
    description: "High-speed solar wind gusts exceeding 700 km/s emanating from a coronal hole, causing magnetospheric compression and atmospheric ionization at Mars.",
    nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/HSS/10029/-1",
    plainLanguageAnis: "Angin matahari berkecepatan super tinggi (700 km/detik) sedang meniup Mars! Tidak seperti angin di Bumi yang menggerakkan pohon, angin ini terbuat dari medan magnetik.",
    plainLanguageEn: "A super-fast solar wind (700 km/s) is gusting past Mars! Unlike Earth wind that sways trees, this is a stream of charged particles and magnetic waves.",
    gameImpact: {
      powerDrainMultiplier: 1.15,
      radiationDoseMsv: 8.5,
      hazard: "MAGNETIC_GUST"
    }
  },
  {
    id: "DONKI-HIST-20240510",
    officialId: "2024-05-10T17:45:00-HIST-X58",
    date: "2024-05-10",
    type: "Historic Super-Flare & Geomagnetic Event",
    classType: "X5.8 Class Super Flare (Cycle 25)",
    hazardLevel: "EXTREME",
    sourceRegion: "Giant Active Region AR3664",
    detectingInstruments: ["Curiosity RAD on Mars", "SDO AIA", "GOES-16"],
    description: "The strongest solar storm of Solar Cycle 25. NASA's Curiosity rover on Mars recorded a massive radiation spike of 8,100 micrograys on the surface — equivalent to 30 chest X-rays at once!",
    nasaLink: "https://www.nasa.gov/solar-system/sun/historic-solar-storm-2024/",
    plainLanguageAnis: "BAHAYA MAKSIMAL! Ini adalah Badai Super kelas X5.8! Rover Curiosity di Mars mencatat radiasi sebesar 30 kali rontgen dada sekaligus! Kita harus memprioritaskan keselamatan astronot!",
    plainLanguageEn: "MAXIMUM HAZARD! This is an historic X5.8 Super Storm! Curiosity rover on Mars recorded radiation equal to 30 chest X-rays simultaneously! Survival protocols required!",
    gameImpact: {
      powerDrainMultiplier: 2.2,
      radiationDoseMsv: 45.0,
      hazard: "SUPER_SOLAR_TEMPEST"
    }
  },
  {
    id: "DONKI-CALM-20160128",
    officialId: "2016-01-28T11:48:00-FLR-001",
    date: "2016-01-28",
    type: "Quiet Solar Conditions",
    classType: "Minor C9.6 Flare (Non-Hazardous)",
    hazardLevel: "LOW",
    sourceRegion: "Active Region 12488",
    detectingInstruments: ["GOES15 SEM/XRS"],
    description: "Space weather conditions are nominal with baseline background galactic cosmic ray flux. Optimal Sol for surface EVA, solar array maintenance, and sample collection.",
    nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/FLR/10122/-1",
    plainLanguageAnis: "Langit antariksa hari ini tenang dan cerah! Cuaca antariksa sangat aman untuk merawat panel surya atau menjelajah keluar kawah bersama rover.",
    plainLanguageEn: "Space weather is calm and clear today! A great Martian Sol to maintain solar panels or explore outside with our rover.",
    gameImpact: {
      powerDrainMultiplier: 1.0,
      radiationDoseMsv: 0.7,
      hazard: "CLEAR_SOL"
    }
  }
];

