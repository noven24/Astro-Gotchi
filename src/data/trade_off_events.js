// Trade-Off Dilemma Events for Astro-Gotchi Sol Cycle
// Every decision involves realistic space survival sacrifices.

export const ASTRONAUT_RANKS = [
  {
    level: 1,
    minXp: 0,
    maxXp: 50,
    titleId: "Kadet Antariksa",
    titleEn: "Space Cadet",
    icon: "🚀",
    badgeColor: "#38bdf8",
    descriptionId: "Baru mendarat di Kawah Jezero Mars. Mempelajari operasi dasar pangkalan.",
    descriptionEn: "Newly landed in Jezero Crater. Learning basic habitat life support operations."
  },
  {
    level: 2,
    minXp: 50,
    maxXp: 120,
    titleId: "Spesialis Teknis",
    titleEn: "Junior Specialist",
    icon: "🔧",
    badgeColor: "#10b981",
    descriptionId: "Mampu mengoperasikan reaktor MOXIE dan Bio-Dome secara mandiri.",
    descriptionEn: "Proficient in operating MOXIE electrolysis and Bio-Dome hydroponics."
  },
  {
    level: 3,
    minXp: 120,
    maxXp: 210,
    titleId: "Insinyur Misi",
    titleEn: "Mission Engineer",
    icon: "⚡",
    badgeColor: "#f59e0b",
    descriptionId: "Ahli mengelola manajemen badai radiasi DONKI dan kalibrasi daya surya.",
    descriptionEn: "Expert in DONKI solar storm mitigation and power grid load-balancing."
  },
  {
    level: 4,
    minXp: 210,
    maxXp: 320,
    titleId: "Komandan Pangkalan",
    titleEn: "Base Commander",
    icon: "🎖️",
    badgeColor: "#8b5cf6",
    descriptionId: "Memimpin seluruh protokol keselamatan pangkalan dan program kebugaran kru NASA OSDR.",
    descriptionEn: "Leading all outpost safety protocols and NASA OSDR crew physiology regimens."
  },
  {
    level: 5,
    minXp: 320,
    maxXp: 9999,
    titleId: "Legenda Pelopor Mars",
    titleEn: "Mars Pioneer Legend",
    icon: "👑",
    badgeColor: "#ec4899",
    descriptionId: "Menyelesaikan seluruh sertifikasi misi 7 Sol Mars dengan keunggulan ilmiah!",
    descriptionEn: "Achieved full 7-Sol Mars mission survival certification with scientific excellence!"
  }
];

export function getAstronautRank(xp) {
  for (let i = ASTRONAUT_RANKS.length - 1; i >= 0; i--) {
    if (xp >= ASTRONAUT_RANKS[i].minXp) {
      return ASTRONAUT_RANKS[i];
    }
  }
  return ASTRONAUT_RANKS[0];
}

export const TRADE_OFF_EVENTS = [
  {
    id: "EVENT_SOLAR_FLARE_ALERT",
    solRequirement: 1,
    title: "Badai Matahari Mengarah ke Mars!",
    titleEn: "Solar Storm Heading Toward Mars!",
    tag: "DONKI Alert",
    tagEn: "DONKI Alert",
    associatedDonki: "DONKI-FLR-20140508",
    description: "Sensor DONKI mendeteksi kilatan radiasi kelas M5.2. Partikel proton berenergi tinggi akan menghujani kubah pangkalan dalam beberapa jam.",
    descriptionEn: "DONKI sensors detect an M5.2 class solar radiation flare. Energetic proton flux will bombard the outpost habitat within hours.",
    plainLanguageAnis: "Matahari baru saja menembakkan semburan radiasi panas! Kalau perisai medan magnet tidak dinyalakan, sel tubuh kru akan kelelahan terkena radiasi. Tapi kalau dinyalakan, baterai pangkalan akan tersedot banyak!",
    plainLanguageEn: "The Sun fired an intense burst of radiation! If we don't activate our magnetic shields, radiation will harm the crew. But if we turn it on, our habitat battery will drain heavily!",
    choices: [
      {
        id: "shield_max",
        title: "Nyalakan Perisai Magnetik Penuh (Shield MAX)",
        titleEn: "Activate Full Magnetic Shield (Shield MAX)",
        description: "Lindungi seluruh kubah dengan medan magnet buatan bertenaga tinggi.",
        descriptionEn: "Protect the entire dome with a high-powered artificial magnetic field.",
        tradeOffText: "⚡ Listrik -45% | ❤️ Kesehatan +10% (Aman dari radiasi)",
        tradeOffTextEn: "⚡ Power -45% | ❤️ Crew Health +10% (Shielded from radiation)",
        impact: { power: -45, oxygen: -5, health: 10, scienceXp: 20 },
        outcomeSummary: "Perisai bekerja sempurna membelokkan radiasi surya! Kesehatan kru aman terjaga, namun generator baterai terkuras drastis.",
        outcomeSummaryEn: "The magnetic shield successfully deflected the solar radiation storm! Crew health is preserved, but primary battery levels dropped sharply.",
        scientificLesson: "Sama seperti Bumi yang dilindungi medan magnet (magnetosfer), pangkalan Mars membutuhkan perisai medan elektromagnetik buatan untuk menangkis partikel bermuatan.",
        scientificLessonEn: "Just as Earth is shielded by its natural magnetosphere, a Mars outpost requires an artificial electromagnetic field to deflect incoming high-energy ions."
      },
      {
        id: "bunker_retreat",
        title: "Evakuasi Kru ke Bunker Tanah Regolith",
        titleEn: "Evacuate Crew to Regolith Underground Bunker",
        description: "Kru masuk ke bunker bawah tanah tebal berlapis tanah Mars. Matikan perisai untuk hemat listrik.",
        descriptionEn: "Crew retreats into a subterranean bunker under thick Martian regolith. Cut shield to save power.",
        tradeOffText: "⚡ Listrik Aman (-10%) | 💨 Oksigen -25% (Ruang tertutup) | ❤️ Kesehatan -15% (Kru sesak & lelah)",
        tradeOffTextEn: "⚡ Power Safe (-10%) | 💨 Oxygen -25% (Confined air) | ❤️ Crew Health -15% (Cramped fatigue)",
        impact: { power: -10, oxygen: -25, health: -15, scienceXp: 15 },
        outcomeSummary: "Bunker tanah regolith menyerap radiasi dengan baik tanpa listrik besar! Namun cadangan oksigen di ruang sempit terkuras cepat dan kru kelelahan.",
        outcomeSummaryEn: "Thick Martian regolith absorbed the solar radiation without draining power! However, oxygen reserves in the tight space dropped and the crew felt fatigued.",
        scientificLesson: "Tanah Mars (regolith) mengandung silika dan besi yang mampu menjadi tameng radiasi pasif yang baik jika ditimbun setebal 2 meter.",
        scientificLessonEn: "Martian soil (regolith) rich in iron and silicates acts as a formidable passive radiation shield when piled at least 2 meters thick."
      },
      {
        id: "shield_off",
        title: "Biarkan Perisai Mati & Hemat Listrik",
        titleEn: "Keep Shields Offline & Conserve Power",
        description: "Prioritaskan baterai untuk sistem pemanas malam. Kru tetap berada di kubah utama.",
        descriptionEn: "Conserve all battery power for habitat thermal heating. Crew remains in the main dome.",
        tradeOffText: "⚡ Listrik +0% (Hemat) | ❤️ Kesehatan -40% (Terpapar dosis radiasi tinggi!)",
        tradeOffTextEn: "⚡ Power +0% (Conserved) | ❤️ Crew Health -40% (Exposed to acute radiation dose!)",
        impact: { power: 0, oxygen: -5, health: -40, scienceXp: 5 },
        outcomeSummary: "Listrik pangkalan utuh, namun kru mengalami demam radiasi ringan dan penurunan sel darah merah!",
        outcomeSummaryEn: "Outpost power remained intact, but the crew suffered mild radiation sickness and acute red blood cell decline!",
        scientificLesson: "Data NASA OSDR menunjukkan bahwa dosis radiasi tanpa perisai merusak DNA dan mempercepat anemia luar angkasa.",
        scientificLessonEn: "NASA OSDR data demonstrates that unshielded solar radiation damages cellular DNA and accelerates spaceflight anemia."
      }
    ]
  },
  {
    id: "EVENT_DUST_STORM_APPROACH",
    solRequirement: 2,
    title: "Badai Debu Mars Menutupi Matahari!",
    titleEn: "Martian Dust Storm Blots Out the Sun!",
    tag: "Mars Trek Weather",
    tagEn: "Mars Trek Weather",
    associatedDonki: "DONKI-CALM-20160128",
    description: "Angin kencang menerbangkan pasir merah halus dari Kawah Jezero. Ketebalan debu di langit (Optical Depth Tau) melonjak drastis, memblokir sinar matahari ke panel surya.",
    descriptionEn: "Gale-force winds whip up fine red dust across Jezero Crater. Atmospheric dust optical depth (Tau) spikes dramatically, cutting sunlight to the solar array.",
    plainLanguageAnis: "Ada kabut debu merah raksasa yang menutupi langit! Matahari tidak kelihatan, jadi panel surya kita tidak bisa membuat listrik. Kita harus memilih: mematikan lampu dan sains, atau boros baterai cadangan?",
    plainLanguageEn: "A massive red dust cloud is blotting out the sky! No sunlight means solar panels can't generate power. Do we shut down lights and science, or drain our reserve batteries?",
    choices: [
      {
        id: "power_conservation",
        title: "Mode Hibernasi Darurat (Hemat Daya)",
        titleEn: "Emergency Hibernation Mode (Power Saver)",
        description: "Matikan laboratorium sains, lampu kubah, dan turunkan suhu pangkalan ke minimum.",
        descriptionEn: "Shut down the science labs, dim habitat lights, and dial thermal heating to bare minimum.",
        tradeOffText: "⚡ Listrik Hemat (-10%) | ❤️ Kesehatan -20% (Kedinginan & stres) | 🔬 Sains Tertunda",
        tradeOffTextEn: "⚡ Power Conserved (-10%) | ❤️ Crew Health -20% (Shivering & stress) | 🔬 Science Halted",
        impact: { power: -10, oxygen: -10, health: -20, scienceXp: 0 },
        outcomeSummary: "Pangkalan berhasil bertahan dari pemadaman listrik! Namun astronot menggigil kedinginan di dalam selimut termal.",
        outcomeSummaryEn: "The habitat avoided a blackout! But the astronauts shivered through the sub-zero chill inside their thermal flight suits.",
        scientificLesson: "Rover legendaris NASA Opportunity akhirnya berhenti beroperasi pada tahun 2018 setelah badai debu global menutupi panel suryanya selama berbulan-bulan.",
        scientificLessonEn: "NASA's legendary Opportunity rover ended operations in 2018 when a planet-encircling dust storm blocked all solar radiation for months."
      },
      {
        id: "run_moxie_burst",
        title: "Genjot Mesin MOXIE Sebelum Baterai Turun",
        titleEn: "Burst-Fire MOXIE Before Battery Levels Drop",
        description: "Jalankan pemecah CO2 MOXIE kapasitas maksimal sekarang agar oksigen melimpah.",
        descriptionEn: "Run the MOXIE CO2 cracker at maximum capacity now to stockpile breathable oxygen.",
        tradeOffText: "⚡ Listrik -40% | 💨 Oksigen +35% (Tangki penuh) | ❤️ Kesehatan -5%",
        tradeOffTextEn: "⚡ Power -40% | 💨 Oxygen +35% (Tanks full) | ❤️ Crew Health -5%",
        impact: { power: -40, oxygen: 35, health: -5, scienceXp: 25 },
        outcomeSummary: "Cadangan oksigen pangkalan terisi penuh hingga meluap! Namun baterai utama berkedip kuning tanda hampir habis.",
        outcomeSummaryEn: "Habitat oxygen reserves topped out! But the main battery array is blinking amber near exhaustion.",
        scientificLesson: "Instrumen MOXIE di rover Perseverance terbukti berhasil mengubah karbon dioksida atmosfer Mars menjadi oksigen murni dengan proses elektrolisis suhu tinggi (800°C) yang butuh banyak listrik.",
        scientificLessonEn: "NASA's MOXIE on the Perseverance rover successfully demonstrated converting Martian atmospheric CO2 into pure breathable oxygen using 800°C solid oxide electrolysis."
      }
    ]
  },
  {
    id: "EVENT_MOXIE_CO2_FILTER_CLOG",
    solRequirement: 3,
    title: "Filter Kompresor Oksigen Tersumbat Pasir",
    titleEn: "Oxygen Compressor Intake Clogged with Dust",
    tag: "Life Support Crisis",
    tagEn: "Life Support Crisis",
    associatedDonki: "DONKI-HSS-20160121",
    description: "Sensor sistem penyokong kehidupan (ECLSS) berbunyi bip nyaring! Partikel debu Mars menyumbat saluran penyaring udara mesin MOXIE. Produksi Oksigen menurun 60%.",
    descriptionEn: "ECLSS warning alarms sound! Fine Martian dust has clogged the intake filter of the MOXIE compressor. O2 generation has dropped by 60%.",
    plainLanguageAnis: "Hidung buatan pangkalan kita (mesin MOXIE) sedang pilek karena kemasukan pasir halus Mars! Kita harus segera membersihkannya. Tapi siapa yang keluar pangkalan?",
    plainLanguageEn: "Our habitat's artificial lung (the MOXIE unit) is congested with fine Martian sand! O2 production is failing. We must unclog the intake valve immediately!",
    choices: [
      {
        id: "eva_clean_filter",
        title: "Astronot Keluar Pangkalan (Misi EVA Darurat)",
        titleEn: "Extravehicular Activity (Emergency EVA Mission)",
        description: "Kru memakai pakaian antariksa bertekanan tinggi untuk membersihkan filter di luar pangkalan.",
        descriptionEn: "Astronaut dons a pressurized spacesuit to manually clear the exterior intake filter.",
        tradeOffText: "💨 Oksigen Pangkalan Pulih (+30%) | ⚡ Listrik -15% | ❤️ Kesehatan -20% (Kelelahan baju EVA)",
        tradeOffTextEn: "💨 Outpost Oxygen Restored (+30%) | ⚡ Power -15% | ❤️ Crew Health -20% (Suit exertion)",
        impact: { power: -15, oxygen: 30, health: -20, scienceXp: 30 },
        outcomeSummary: "Kru berhasil membersihkan filter luar! Aliran oksigen kembali lancar dan segar, namun kru kelelahan mendorong baju antariksa yang kaku dan berat.",
        outcomeSummaryEn: "Crew successfully cleared the exterior intake! Crisp oxygen flow resumed, though the astronaut was exhausted from working inside the rigid spacesuit.",
        scientificLesson: "Baju antariksa luar angkasa bekerja seperti pesawat mini pribadi bertekanan. Baju tersebut berat dan kaku, menuntut tenaga fisik besar dari astronot saat EVA.",
        scientificLessonEn: "Space suits function like personal miniature pressurized spacecraft; moving their joints against internal pressure requires heavy metabolic exertion."
      },
      {
        id: "reverse_air_blast",
        title: "Semburkan Balik Tekanan Udara Internal",
        titleEn: "High-Pressure Internal Reverse Air Blast",
        description: "Gunakan kompresor listrik tegangan tinggi dari dalam untuk meniup keluar debu dari corong.",
        descriptionEn: "Route high-voltage electrical compressors from inside to blow dust outward from the nozzle.",
        tradeOffText: "⚡ Listrik -35% (Tersengat beban daya) | 💨 Oksigen +15% | ❤️ Kesehatan Aman (+0%)",
        tradeOffTextEn: "⚡ Power -35% (Compressor surge) | 💨 Oxygen +15% | ❤️ Crew Health Safe (+0%)",
        impact: { power: -35, oxygen: 15, health: 0, scienceXp: 15 },
        outcomeSummary: "Debu terhempas keluar dari corong tanpa kru perlu keluar kubah! Sistem listrik sempat mengalami kelebihan beban sementara.",
        outcomeSummaryEn: "The dust was blown clear without an EVA! Electrical relays briefly tripped under the power spike.",
        scientificLesson: "Sistem pendukung kehidupan cerdas di masa depan dirancang memiliki mekanisme 'self-cleaning' otomatis untuk meminimalkan paparan bahaya bagi astronot.",
        scientificLessonEn: "Advanced space life support systems incorporate automated backwash and self-cleaning cycles to minimize hazardous crew EVAs."
      }
    ]
  },
  {
    id: "EVENT_HYDROPONIC_GREENHOUSE_BLIGHT",
    solRequirement: 4,
    title: "Tanaman Bio-Dome Menguning & Kehausan",
    titleEn: "Bio-Dome Hydroponic Crops Wilting",
    tag: "OSDR Space Botany",
    tagEn: "OSDR Space Botany",
    associatedDonki: "DONKI-CALM-20160128",
    description: "Koleksi tanaman selada dan lobak microgreen di kubah hidroponik mengalami kekurangan air daur ulang. Jika mati, sumber nutrisi dan vitamin alami kru akan hilang.",
    descriptionEn: "Fresh lettuce and microgreen radish trays in the hydroponics bay are suffering from recycled water shortage. Losing them means losing fresh crew nutrition.",
    plainLanguageAnis: "Kebun sayur mini kita sedang lemas dan daunnya layu! Sayuran ini sangat penting untuk memberi vitamin agar kru tidak terkena anemia antariksa. Haruskah kita mengalirkan air dan listrik ekstra untuk menyelamatkannya?",
    plainLanguageEn: "Our mini greenhouse microgreens are wilting! Fresh greens provide essential nutrients fighting space anemia. Should we divert precious power and water to save them?",
    choices: [
      {
        id: "save_crops",
        title: "Alirkan Air & Lampu LED Spektrum Penuh",
        titleEn: "Pump Recycled Water & Full-Spectrum LED Lighting",
        description: "Prioritaskan kelangsungan hidup tanaman hijau dengan menyalakan pemanas dan pompa nutrisi 24 jam.",
        descriptionEn: "Prioritize living green crops by powering 24/7 nutrient pumps and magenta growth lights.",
        tradeOffText: "⚡ Listrik -30% | 💨 Oksigen +20% | ❤️ Kesehatan Kru Naik (+25% Panen Segar!)",
        tradeOffTextEn: "⚡ Power -30% | 💨 Oxygen +20% | ❤️ Crew Health Boost (+25% Fresh Harvest!)",
        impact: { power: -30, oxygen: 20, health: 25, scienceXp: 35 },
        outcomeSummary: "Tanaman kembali hijau segar dan mekar! Kru menikmati panen salad segar bergizi tinggi yang meningkatkan kekebalan tubuh.",
        outcomeSummaryEn: "The green crops flourished! The crew enjoyed a fresh nutritious salad harvest that boosted immunity and morale.",
        scientificLesson: "Eksperimen Veggie di Stasiun Luar Angkasa ISS membuktikan bahwa memakan sayuran segar memberikan dampak psikologis bahagia yang sangat besar bagi mental astronot.",
        scientificLessonEn: "NASA's Veggie experiment aboard the ISS proved that cultivating and consuming fresh greens provides vital psychological wellness and essential folate for deep space crews."
      },
      {
        id: "ration_crops",
        title: "Ikhlaskan Sebagian Tanaman & Hemat Daya",
        titleEn: "Sacrifice Secondary Trays & Ration Power",
        description: "Matikan lampu kebun dan andalkan jatah makanan kemasan kering beku (freeze-dried paste).",
        descriptionEn: "Power down greenhouse grow lights and rely exclusively on freeze-dried emergency paste rations.",
        tradeOffText: "⚡ Listrik Hemat (+10%) | 💨 Oksigen -10% | ❤️ Kesehatan -15% (Kekurangan vitamin segar)",
        tradeOffTextEn: "⚡ Power Conserved (+10%) | 💨 Oxygen -10% | ❤️ Crew Health -15% (Nutritional fatigue)",
        impact: { power: 10, oxygen: -10, health: -15, scienceXp: 10 },
        outcomeSummary: "Baterai listrik tersimpan aman, namun makanan kemasan yang monoton membuat astronot cepat lelah dan rentan kekurangan vitamin.",
        outcomeSummaryEn: "Battery energy remained safe, but monotonous freeze-dried food left astronauts sluggish and at risk of vitamin deficiency.",
        scientificLesson: "Makanan kering beku kehilangan vitamin C dan folat seiring berjalannya waktu dalam misi berdurasi panjang, sehingga pertanian ruang angkasa adalah syarat mutlak untuk koloni Mars.",
        scientificLessonEn: "Freeze-dried foods degrade in Vitamin C and thiamine over multi-year journeys, making bio-regenerative agriculture essential for permanent Mars colonies."
      }
    ]
  },
  {
    id: "EVENT_PERMAFROST_ICE_DISCOVERY",
    solRequirement: 5,
    title: "Rover Menemukan Lapisan Es Bawah Tanah!",
    titleEn: "Rover Discovers Subsurface Permafrost Ice!",
    tag: "Scientific Discovery",
    tagEn: "Scientific Discovery",
    associatedDonki: "DONKI-CALM-20160128",
    description: "Radar penembus tanah rover Perseverance mendeteksi deposit es air murni 1 meter di bawah batuan Kawah Jezero! Peluang emas untuk cadangan oksigen abadi.",
    descriptionEn: "Perseverance ground-penetrating radar located pure water ice deposits 1 meter beneath the crater bedrock! A historic opportunity for renewable oxygen.",
    plainLanguageAnis: "KABAR GEMBIRA! Robot penjelajah kita menemukan es air beku di bawah tanah Mars! Air ini bisa kita lelehkan untuk minum dan dipecah jadi oksigen. Tapi bor pemanas butuh banyak tenaga listrik!",
    plainLanguageEn: "EXCITING NEWS! Our rover located subsurface water ice! We can melt it for drinking and split it into oxygen. But the thermal deep drill requires heavy battery power!",
    choices: [
      {
        id: "drill_ice",
        title: "Jalankan Pengebor Termal Berdaya Tinggi",
        titleEn: "Deploy High-Powered Thermal Melt Drill",
        description: "Nyalakan laser pemanas dan bor robot untuk mengekstrak 50 liter es air Mars.",
        descriptionEn: "Activate heated robotic coring drills to extract 50 liters of Martian water ice.",
        tradeOffText: "⚡ Listrik -40% | 💨 Oksigen Melimpah (+40%) | ❤️ Kesehatan +10% | 🔬 +50 XP Sains",
        tradeOffTextEn: "⚡ Power -40% | 💨 Plentiful Oxygen (+40%) | ❤️ Crew Health +10% | 🔬 +50 Science XP",
        impact: { power: -40, oxygen: 40, health: 10, scienceXp: 50 },
        outcomeSummary: "Pengeboran sukses spektakuler! Es purba Mars berhasil dicairkan, mengisi tangki cadangan oksigen dan air minum kru pangkalan.",
        outcomeSummaryEn: "The thermal drilling was a spectacular success! Ancient Martian ice melted into fresh water, refilling both drinking reserves and oxygen fuel cells.",
        scientificLesson: "Eksperimen radar SHARAD di wahana Mars Reconnaissance Orbiter (MRO) mendeteksi gletser es bawah tanah raksasa yang cukup untuk menenggelamkan Mars dalam kedalaman 1 meter jika mencair.",
        scientificLessonEn: "The SHARAD radar on NASA's Mars Reconnaissance Orbiter (MRO) mapped vast subterranean ice sheets containing enough water to cover Mars in a global 1-meter ocean if melted."
      },
      {
        id: "sample_only",
        title: "Ambil Sampel Inti Kecil Saja",
        titleEn: "Collect Small Sealed Core Sample Only",
        description: "Hemat daya baterai dengan hanya mengambil sampel 1 tabung untuk dianalisis di lab.",
        descriptionEn: "Conserve battery power by collecting only one small scientific core sample for lab analysis.",
        tradeOffText: "⚡ Listrik Hemat (-10%) | 💨 Oksigen +10% | 🔬 +25 XP Sains",
        tradeOffTextEn: "⚡ Power Conserved (-10%) | 💨 Oxygen +10% | 🔬 +25 Science XP",
        impact: { power: -10, oxygen: 10, health: 0, scienceXp: 25 },
        outcomeSummary: "Sampel es berhasil disimpan dengan aman di tabung kedap udara dengan penggunaan daya minimal.",
        outcomeSummaryEn: "The ice core sample was safely sealed in an airtight containment tube with minimal battery drain.",
        scientificLesson: "Sampel es Mars dapat mengungkapkan iklim masa lalu Mars miliaran tahun yang lalu saat planet merah tersebut masih hangat dan basah.",
        scientificLessonEn: "Martian ice cores preserve atmospheric gas bubbles and climate history dating back billions of years when Mars was warm and wet."
      }
    ]
  },
  {
    id: "EVENT_CORONAL_MASS_EJECTION_SHOCK",
    solRequirement: 6,
    title: "Gelombang Badai Plasma CME Tiba di Mars!",
    titleEn: "CME Plasma Shockwave Hits Mars!",
    tag: "DONKI Critical Alert",
    tagEn: "DONKI Critical Alert",
    associatedDonki: "DONKI-CME-20170103",
    description: "Simulasi WSA-ENLIL NASA Goddard terbukti akurat! Gelombang plasma CME bermuatan magnetik menabrak atmosfer Mars dengan kecepatan 645 km/detik.",
    descriptionEn: "NASA Goddard's WSA-ENLIL solar model was spot-on! A magnetised CME plasma shockwave traveling at 645 km/s has slammed into Mars' upper atmosphere.",
    plainLanguageAnis: "Gelombang plasma raksasa Matahari sudah sampai! Komputer pangkalan berdengung dan percikan listrik statis muncul di antena luar. Kita harus bertindak cepat!",
    plainLanguageEn: "The solar plasma shockwave has arrived! Habitat computers are humming with static discharge. We must act decisively to protect the base!",
    choices: [
      {
        id: "magnetic_deflector_surge",
        title: "Korsletkan Deflektor Magnetik ke Tingkat Darurat",
        titleEn: "Surge Magnetic Deflector Coils to Emergency Overdrive",
        description: "Gunakan seluruh kapasitor listrik untuk menciptakan gelombang kejut magnetik balasan.",
        descriptionEn: "Discharge all habitat capacitors to create a counter-magnetic shock barrier.",
        tradeOffText: "⚡ Listrik Kritis (-55%) | ❤️ Kesehatan Terlindungi (+15%) | 💨 Oksigen -10%",
        tradeOffTextEn: "⚡ Power Critical (-55%) | ❤️ Crew Health Shielded (+15%) | 💨 Oxygen -10%",
        impact: { power: -55, oxygen: -10, health: 15, scienceXp: 40 },
        outcomeSummary: "Deflektor magnetik menyala terang membelokkan awan plasma! Kru aman tanpa terkena radiasi, namun cadangan daya pangkalan berada di titik kritis.",
        outcomeSummaryEn: "The deflector pulse flared brightly, deflecting the energetic plasma wave! The crew was unharmed, but the power grid is in critical territory.",
        scientificLesson: "NASA mengkaji konsep menempatkan satelit pembuat medan magnet buatan di titik Lagrange L1 Mars untuk mengembalikan atmosfer Mars di masa depan.",
        scientificLessonEn: "NASA researchers have studied placing an artificial magnetic dipole satellite at Mars L1 Lagrange point to shield the entire planet and allow atmosphere restoration."
      },
      {
        id: "partial_shutdown",
        title: "Matikan Semua Sirkuit Elektronik (Faraday Cage)",
        titleEn: "Shutdown All Non-Essential Circuits (Faraday Lockdown)",
        description: "Lindungi komputer dari arus pendek dengan memutus daya, kru mengenakan rompi pelindung timbal OSDR.",
        descriptionEn: "Protect circuitry from EMP spikes by cutting power; crew dons OSDR heavy lead vests.",
        tradeOffText: "⚡ Listrik Hemat (-15%) | ❤️ Kesehatan -25% (Rompi timbal berat & radiasi rembesan) | 💨 Oksigen -15%",
        tradeOffTextEn: "⚡ Power Conserved (-15%) | ❤️ Crew Health -25% (Radiation seepage & heavy vests) | 💨 Oxygen -15%",
        impact: { power: -15, oxygen: -15, health: -25, scienceXp: 20 },
        outcomeSummary: "Sirkuit utama pangkalan selamat dari kerusakan permanen! Tetapi kru mengalami mual akibat sedikit paparan radiasi yang menembus.",
        outcomeSummaryEn: "The habitat computers were spared from permanent burnout! However, crew experienced radiation nausea from secondary ion scatter.",
        scientificLesson: "Kandang Faraday (Faraday cage) melindungi alat elektronik sensitif dari sengatan elektromagnetik eksternal.",
        scientificLessonEn: "Faraday cages prevent external electromagnetic radiation from disrupting sensitive computing microelectronics."
      }
    ]
  },
  {
    id: "EVENT_COMMUNICATION_BLACKOUT_SCIENCE",
    solRequirement: 7,
    title: "Blackout Komunikasi dengan Bumi & Dilema Sains",
    titleEn: "Earth Communication Blackout & Autonomous Sol",
    tag: "Mission Dilemma",
    tagEn: "Mission Dilemma",
    associatedDonki: "DONKI-SEP-20160102",
    description: "Interferensi badai partikel menyebabkan terputusnya sinyal radio ke NASA Deep Space Network di Bumi selama 24 jam. Komandan Junior harus memutuskan misi secara mandiri.",
    descriptionEn: "Solar storm particle interference has severed the radio carrier link to NASA's Deep Space Network for 24 hours. Junior Commander must decide mission priorities alone.",
    plainLanguageAnis: "Radio ke Bumi mati! Sinyal 'halo NASA' kita tidak bisa menembus badai antariksa. Selama 1 hari ini, kamu sebagai Komandan bertanggung jawab penuh atas semua keputusan!",
    plainLanguageEn: "Radio link to Earth is silent! Space weather blocked our signal to NASA Ground Control. For this Sol, you alone command the fate of this outpost!",
    choices: [
      {
        id: "autonomous_rover_survey",
        title: "Kirim Rover untuk Eksplorasi Gua Terowongan Lava",
        titleEn: "Deploy Rover to Survey Lava Tube Caves",
        description: "Gunakan energi listrik pemancar untuk mengendalikan rover mencari terowongan lava bawah tanah.",
        descriptionEn: "Channel transmitter power to navigate the rover into a newly detected volcanic lava tube cave.",
        tradeOffText: "⚡ Listrik -30% | 💨 Oksigen -5% | 🔬 +60 XP Sains (Peta Bunker Baru Terbuka!)",
        tradeOffTextEn: "⚡ Power -30% | 💨 Oxygen -5% | 🔬 +60 Science XP (Subterranean Bunker Unlocked!)",
        impact: { power: -30, oxygen: -5, health: 5, scienceXp: 60 },
        outcomeSummary: "Rover berhasil memetakan pintu masuk terowongan lava alami! Lokasi ini menjadi bunker teraman untuk koloni masa depan.",
        outcomeSummaryEn: "The rover successfully mapped the entrance to a natural volcanic lava tube! This cave offers the safest long-term radiation shield for future colonists.",
        scientificLesson: "Terowongan lava (lava tubes) di Mars tercipta saat lava gunung berapi mengalir jutaan tahun lalu, meninggalkan lorong gua bawah tanah raksasa yang terlindung dari radiasi dan meteorit.",
        scientificLessonEn: "Ancient lava tubes on Mars formed when outer volcanic crust cooled while molten rock drained out, leaving massive caverns shielded from solar rays and micrometeorites."
      },
      {
        id: "rigorous_maintenance",
        title: "Fokus Pemeriksaan Pipa Oksigen & Baterai Pangkalan",
        titleEn: "Conduct Habitat Seal & Battery Grid Inspection",
        description: "Tidak ada petualangan luar pangkalan hari ini. Kru mengencangkan baut dan memeriksa kebocoran pangkalan.",
        descriptionEn: "No exterior adventures today. Inspect all airlock seals, pressure valves, and electrical couplings.",
        tradeOffText: "⚡ Listrik +10% (Hemat) | 💨 Oksigen +25% (Kebocoran ditutup) | ❤️ Kesehatan +10%",
        tradeOffTextEn: "⚡ Power +10% (Conserved) | 💨 Oxygen +25% (Micro-leaks sealed) | ❤️ Crew Health +10%",
        impact: { power: 10, oxygen: 25, health: 10, scienceXp: 15 },
        outcomeSummary: "Pemeriksaan menemukan micro-leak pada katup oksigen sekunder! Berkat kehati-hatian Komandan, pangkalan jauh lebih aman.",
        outcomeSummaryEn: "The thorough inspection uncovered a micro-leak in the secondary oxygen regulator! Thanks to the Commander's vigilance, the base is far safer.",
        scientificLesson: "Di lingkungan hampa udara ekstrem seperti Mars, pemeliharaan preventif harian adalah kunci utama keselamatan misi.",
        scientificLessonEn: "In the hard vacuum and harsh cold of space, daily preventative maintenance and meticulous leak-checks are the true cornerstone of survival."
      }
    ]
  }
];
