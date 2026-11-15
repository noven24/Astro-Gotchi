// Astro-Gotchi: Mars Outpost Survival - Consolidated Bundle
// Built for instant browser execution without build dependencies
const { useState, useEffect, useRef } = React;
const confetti = typeof window !== "undefined" && window.confetti ? window.confetti : () => {};
// --- src/data/nasa_donki.js ---
// NASA DONKI (Space Weather Database Of Notifications, Knowledge, Information)
// Curated Authentic Space Weather Events verified from CCMC / NASA GSFC
const NASA_DONKI_EVENTS = [
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
		detectingInstruments: [
			"SOHO LASCO C3",
			"STEREO A",
			"WSA-ENLIL Simulation"
		],
		marsArrivalTime: "2017-01-07T06:00Z (WSA-ENLIL Verified Impact)",
		description: "NASA GSFC space weather modeling confirmed a C-type Coronal Mass Ejection impacting Mars atmosphere. Billions of tons of magnetized plasma traveling at 645 km/s.",
		nasaLink: "https://ccmc.gsfc.nasa.gov/DONKI/view/WSA-ENLIL/12061/-1",
		plainLanguageAnis: "Waspada! Ini adalah Coronal Mass Ejection (CME), atau 'bersin raksasa' Matahari! Miliaran ton gas plasma panas meluncur dengan kecepatan 645 kilometer per detik menuju Mars. Kita butuh perisai aktif!",
		plainLanguageEn: "Alert! This is a Coronal Mass Ejection (CME), or the Sun's 'giant sneeze'! Billions of tons of hot plasma are rushing at 645 km/s toward Mars. We need active shields!",
		gameImpact: {
			powerDrainMultiplier: 1.8,
			radiationDoseMsv: 32,
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
			radiationDoseMsv: 12,
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
		detectingInstruments: [
			"ACE SWEPAM",
			"ACE MAG",
			"NOAA SWPC"
		],
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
		detectingInstruments: [
			"Curiosity RAD on Mars",
			"SDO AIA",
			"GOES-16"
		],
		description: "The strongest solar storm of Solar Cycle 25. NASA's Curiosity rover on Mars recorded a massive radiation spike of 8,100 micrograys on the surface — equivalent to 30 chest X-rays at once!",
		nasaLink: "https://www.nasa.gov/solar-system/sun/historic-solar-storm-2024/",
		plainLanguageAnis: "BAHAYA MAKSIMAL! Ini adalah Badai Super kelas X5.8! Rover Curiosity di Mars mencatat radiasi sebesar 30 kali rontgen dada sekaligus! Kita harus memprioritaskan keselamatan astronot!",
		plainLanguageEn: "MAXIMUM HAZARD! This is an historic X5.8 Super Storm! Curiosity rover on Mars recorded radiation equal to 30 chest X-rays simultaneously! Survival protocols required!",
		gameImpact: {
			powerDrainMultiplier: 2.2,
			radiationDoseMsv: 45,
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
			powerDrainMultiplier: 1,
			radiationDoseMsv: .7,
			hazard: "CLEAR_SOL"
		}
	}
];
// --- src/data/nasa_osdr.js ---
// NASA Open Science Data Repository (OSDR) & RadLab
// Curated Space Biology & Astronaut Physiology Research Metrics
const NASA_OSDR_FACTS = [
	{
		studyId: "OSDR-RADLAB-01",
		title: "Martian Surface Radiation Dose (RadLab)",
		metric: "0.7 mSv / Sol (Baseline) vs up to 45 mSv during CME",
		icon: "ShieldAlert",
		category: "Radiasi & DNA",
		summary: "Radiasi di permukaan Mars sekitar 90 kali lebih tinggi dari Bumi karena Mars tidak memiliki medan magnet pelindung dan atmosfernya tipis.",
		plainLanguageAnis: "Bumi kita punya perisai magnet raksasa tak terlihat yang melindungi kita. Tapi di Mars, perisainya sudah hilang jutaan tahun lalu! Jadi kita harus membangun bunker pelindung dari tanah Mars (regolith) atau memakai perisai medan elektromagnetik.",
		plainLanguageEn: "Earth has an invisible giant magnetic shield protecting us. But Mars lost its shield billions of years ago! So we must build shelters with Martian dirt (regolith) or use electromagnetic shields.",
		healthImpactRule: "Paparan radiasi di atas 20 mSv/Sol menurunkan bar Kesehatan ❤️ sebesar 20-40% jika perisai tidak dinyalakan."
	},
	{
		studyId: "OSDR-137-MUSCLE",
		title: "Microgravity Musculoskeletal Atrophy",
		metric: "Kehilangan massa otot 1.5% per bulan tanpa latihan",
		icon: "Activity",
		category: "Kesehatan Fisik",
		summary: "Gravitasi Mars hanya 38% dari gravitasi Bumi. Otot dan tulang astronot menjadi malas bekerja karena tubuh terasa jauh lebih ringan.",
		plainLanguageAnis: "Di Mars, tubuhmu terasa seperti bulu yang ringan! Melompat sangat mudah! Tapi kalau astronot tidak berolahraga setiap hari di treadmill khusus pangkalan, otot dan tulang akan cepat lemas dan menyusut.",
		plainLanguageEn: "On Mars you feel light as a feather! Jumping is super easy! But if junior astronauts don't exercise every day, muscles and bones get lazy and shrink.",
		healthImpactRule: "Latihan treadmill di sore hari mengembalikan +15% Kesehatan ❤️ dan mencegah penurunan performa kru."
	},
	{
		studyId: "OSDR-248-ANEMIA",
		title: "Space Anemia & Red Blood Cell Hemolysis",
		metric: "Pelepasan sel darah merah 3 juta sel/detik di ruang angkasa",
		icon: "HeartPulse",
		category: "Sirkulasi Darah",
		summary: "Penelitian NASA OSDR menemukan bahwa lingkungan luar angkasa mempercepat penghancuran sel darah merah, menyebabkan astronot mudah pusing dan lelah.",
		plainLanguageAnis: "Sel darah merah kita adalah truk kecil pengangkut oksigen di dalam tubuh. Di luar angkasa, tubuh menghancurkan truk ini lebih cepat dari biasanya. Makanya astronot butuh makanan bernutrisi tinggi dari kebun hidroponik!",
		plainLanguageEn: "Red blood cells are tiny delivery trucks carrying oxygen inside your body. In space, our body breaks them down faster, so astronauts need fresh hydroponic greens to stay energized!",
		healthImpactRule: "Memanen sayuran hidroponik pangkalan memberi dorongan nutrisi +20% Kesehatan ❤️."
	},
	{
		studyId: "OSDR-311-PLANTS",
		title: "Martian Regolith Agriculture & Bio-Regenerative Life Support",
		metric: "Simulated Jezero Regolith Germination Rate 82%",
		icon: "Sprout",
		category: "Botani & Oksigen",
		summary: "Tanah Mars mengandung zat perchlorate beracun, tetapi setelah disaring dan dicampur kompos mikroba, tanaman lobak dan selada dapat tumbuh dan memproduksi oksigen segar.",
		plainLanguageAnis: "Tanah Mars tidak bisa langsung ditanami tanaman karena beracun seperti garam pahit. Kita harus mencuci tanahnya dulu di Bio-Dome agar tanaman bisa tumbuh menghasilkan salad segar dan oksigen!",
		plainLanguageEn: "Martian soil has bitter salty chemicals called perchlorates. We have to filter it in our Bio-Dome so plants can grow fresh crunchy greens and oxygen!",
		healthImpactRule: "Bio-Dome yang dirawat menghasilkan +10% Oksigen 💨 dan +10% Kesehatan ❤️ setiap Sol."
	}
];
// --- src/data/mars_trek.js ---
// NASA Mars Trek - Planetary Cartography & Landing Site Environments
const MARS_TREK_SITES = {
	jezero: {
		id: "jezero",
		name: "Kawah Jezero (Jezero Crater)",
		nameEn: "Jezero Crater (Delta & Lake Bed)",
		missionAnchor: "Lokasi Rover NASA Perseverance & Helikopter Ingenuity",
		missionAnchorEn: "Landing Site of NASA Perseverance Rover & Ingenuity Helicopter",
		coordinates: "18.38° N, 77.58° E",
		elevation: "-2.5 km (Kawah Purba Danau & Delta Sungai)",
		environmentSummary: "Bekas danau miliaran tahun lalu dengan endapan lumpur tanah liat kaya mineral.",
		environmentSummaryEn: "Ancient lake basin with dried river delta and clay minerals preserving biosignature traces.",
		plainLanguageAnis: "Kawah Jezero dulunya adalah danau yang sangat indah dengan air jernih! Sekarang sudah kering, tapi batuannya menyimpan rahasia mikroba purba Mars. Di sini juga tempat tinggal sahabat robot kita, Perseverance!",
		plainLanguageEn: "Jezero Crater used to be a pristine ancient lake with flowing rivers! It is now dry, but its rocks hold ancient secrets. Home to our robot pal, the Perseverance rover!",
		weatherBaseline: {
			dayTempC: -22,
			nightTempC: -82,
			pressurePa: 620,
			dustTau: .45,
			solarEfficiency: .9
		},
		accentColor: "from-amber-600 to-red-800"
	},
	gale: {
		id: "gale",
		name: "Kawah Gale (Gale Crater)",
		nameEn: "Gale Crater (Mount Sharp Basin)",
		missionAnchor: "Lokasi Rover NASA Curiosity & Gunung Aeolis Mons",
		missionAnchorEn: "Landing Site of NASA Curiosity Rover & Mount Sharp",
		coordinates: "5.4° S, 137.8° E",
		elevation: "-4.5 km (Cekungan Terdalam dengan Atmosfer Lebih Tebal)",
		environmentSummary: "Cekungan kawah raksasa sedalam 4.5 km. Tekanan udara sedikit lebih tinggi, melindungi dari mikrometeorit.",
		environmentSummaryEn: "Deep 4.5 km impact basin with Mount Sharp in the center. Higher atmospheric pressure shields against micrometeorites.",
		plainLanguageAnis: "Kawah Gale itu seperti mangkuk raksasa yang sangat dalam! Di tengah mangkuk ada gunung tinggi bernama Gunung Sharp. Karena letaknya di dasar kawah, udaranya sedikit lebih tebal.",
		plainLanguageEn: "Gale Crater is like an enormous deep bowl with a huge mountain in the middle! Being low at the basin floor, the Martian air is slightly thicker here.",
		weatherBaseline: {
			dayTempC: -15,
			nightTempC: -76,
			pressurePa: 740,
			dustTau: .38,
			solarEfficiency: .95
		},
		accentColor: "from-orange-600 to-amber-900"
	},
	olympus: {
		id: "olympus",
		name: "Pangkalan Lereng Olympus Mons",
		nameEn: "Olympus Mons Volcanic Slopes",
		missionAnchor: "Gunung Berapi Terbesar di Tata Surya (Tinggi 22 km)",
		missionAnchorEn: "Largest Shield Volcano in the Solar System (22 km Altitude)",
		coordinates: "18.65° N, 226.2° E",
		elevation: "+1.2 km (Lereng Basal Lava Tube)",
		environmentSummary: "Lereng gunung berapi raksasa dengan terowongan lava alami (lava tubes) sebagai bunker anti-radiasi terbaik.",
		environmentSummaryEn: "Basalt volcanic slopes harboring colossal underground lava tubes that provide natural, impregnable radiation bunkers.",
		plainLanguageAnis: "Kita berada di kaki gunung tertinggi di seluruh tata surya! Tingginya 3 kali lipat Gunung Everest di Bumi! Di sini dingin sekali, tapi banyak gua lava raksasa untuk tempat persembunyian astronot.",
		plainLanguageEn: "We are at the foot of the tallest volcano in the whole solar system! Three times higher than Mount Everest! It is bitterly cold, but full of natural lava caves for radiation shelters.",
		weatherBaseline: {
			dayTempC: -32,
			nightTempC: -94,
			pressurePa: 460,
			dustTau: .55,
			solarEfficiency: .82
		},
		accentColor: "from-rose-700 to-slate-900"
	}
};
// --- src/data/trade_off_events.js ---
// Trade-Off Dilemma Events for Astro-Gotchi Sol Cycle
// Every decision involves realistic space survival sacrifices.
const ASTRONAUT_RANKS = [
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
function getAstronautRank(xp) {
	for (let i = ASTRONAUT_RANKS.length - 1; i >= 0; i--) {
		if (xp >= ASTRONAUT_RANKS[i].minXp) {
			return ASTRONAUT_RANKS[i];
		}
	}
	return ASTRONAUT_RANKS[0];
}
const TRADE_OFF_EVENTS = [
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
				impact: {
					power: -45,
					oxygen: -5,
					health: 10,
					scienceXp: 20
				},
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
				impact: {
					power: -10,
					oxygen: -25,
					health: -15,
					scienceXp: 15
				},
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
				impact: {
					power: 0,
					oxygen: -5,
					health: -40,
					scienceXp: 5
				},
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
		choices: [{
			id: "power_conservation",
			title: "Mode Hibernasi Darurat (Hemat Daya)",
			titleEn: "Emergency Hibernation Mode (Power Saver)",
			description: "Matikan laboratorium sains, lampu kubah, dan turunkan suhu pangkalan ke minimum.",
			descriptionEn: "Shut down the science labs, dim habitat lights, and dial thermal heating to bare minimum.",
			tradeOffText: "⚡ Listrik Hemat (-10%) | ❤️ Kesehatan -20% (Kedinginan & stres) | 🔬 Sains Tertunda",
			tradeOffTextEn: "⚡ Power Conserved (-10%) | ❤️ Crew Health -20% (Shivering & stress) | 🔬 Science Halted",
			impact: {
				power: -10,
				oxygen: -10,
				health: -20,
				scienceXp: 0
			},
			outcomeSummary: "Pangkalan berhasil bertahan dari pemadaman listrik! Namun astronot menggigil kedinginan di dalam selimut termal.",
			outcomeSummaryEn: "The habitat avoided a blackout! But the astronauts shivered through the sub-zero chill inside their thermal flight suits.",
			scientificLesson: "Rover legendaris NASA Opportunity akhirnya berhenti beroperasi pada tahun 2018 setelah badai debu global menutupi panel suryanya selama berbulan-bulan.",
			scientificLessonEn: "NASA's legendary Opportunity rover ended operations in 2018 when a planet-encircling dust storm blocked all solar radiation for months."
		}, {
			id: "run_moxie_burst",
			title: "Genjot Mesin MOXIE Sebelum Baterai Turun",
			titleEn: "Burst-Fire MOXIE Before Battery Levels Drop",
			description: "Jalankan pemecah CO2 MOXIE kapasitas maksimal sekarang agar oksigen melimpah.",
			descriptionEn: "Run the MOXIE CO2 cracker at maximum capacity now to stockpile breathable oxygen.",
			tradeOffText: "⚡ Listrik -40% | 💨 Oksigen +35% (Tangki penuh) | ❤️ Kesehatan -5%",
			tradeOffTextEn: "⚡ Power -40% | 💨 Oxygen +35% (Tanks full) | ❤️ Crew Health -5%",
			impact: {
				power: -40,
				oxygen: 35,
				health: -5,
				scienceXp: 25
			},
			outcomeSummary: "Cadangan oksigen pangkalan terisi penuh hingga meluap! Namun baterai utama berkedip kuning tanda hampir habis.",
			outcomeSummaryEn: "Habitat oxygen reserves topped out! But the main battery array is blinking amber near exhaustion.",
			scientificLesson: "Instrumen MOXIE di rover Perseverance terbukti berhasil mengubah karbon dioksida atmosfer Mars menjadi oksigen murni dengan proses elektrolisis suhu tinggi (800°C) yang butuh banyak listrik.",
			scientificLessonEn: "NASA's MOXIE on the Perseverance rover successfully demonstrated converting Martian atmospheric CO2 into pure breathable oxygen using 800°C solid oxide electrolysis."
		}]
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
		choices: [{
			id: "eva_clean_filter",
			title: "Astronot Keluar Pangkalan (Misi EVA Darurat)",
			titleEn: "Extravehicular Activity (Emergency EVA Mission)",
			description: "Kru memakai pakaian antariksa bertekanan tinggi untuk membersihkan filter di luar pangkalan.",
			descriptionEn: "Astronaut dons a pressurized spacesuit to manually clear the exterior intake filter.",
			tradeOffText: "💨 Oksigen Pangkalan Pulih (+30%) | ⚡ Listrik -15% | ❤️ Kesehatan -20% (Kelelahan baju EVA)",
			tradeOffTextEn: "💨 Outpost Oxygen Restored (+30%) | ⚡ Power -15% | ❤️ Crew Health -20% (Suit exertion)",
			impact: {
				power: -15,
				oxygen: 30,
				health: -20,
				scienceXp: 30
			},
			outcomeSummary: "Kru berhasil membersihkan filter luar! Aliran oksigen kembali lancar dan segar, namun kru kelelahan mendorong baju antariksa yang kaku dan berat.",
			outcomeSummaryEn: "Crew successfully cleared the exterior intake! Crisp oxygen flow resumed, though the astronaut was exhausted from working inside the rigid spacesuit.",
			scientificLesson: "Baju antariksa luar angkasa bekerja seperti pesawat mini pribadi bertekanan. Baju tersebut berat dan kaku, menuntut tenaga fisik besar dari astronot saat EVA.",
			scientificLessonEn: "Space suits function like personal miniature pressurized spacecraft; moving their joints against internal pressure requires heavy metabolic exertion."
		}, {
			id: "reverse_air_blast",
			title: "Semburkan Balik Tekanan Udara Internal",
			titleEn: "High-Pressure Internal Reverse Air Blast",
			description: "Gunakan kompresor listrik tegangan tinggi dari dalam untuk meniup keluar debu dari corong.",
			descriptionEn: "Route high-voltage electrical compressors from inside to blow dust outward from the nozzle.",
			tradeOffText: "⚡ Listrik -35% (Tersengat beban daya) | 💨 Oksigen +15% | ❤️ Kesehatan Aman (+0%)",
			tradeOffTextEn: "⚡ Power -35% (Compressor surge) | 💨 Oxygen +15% | ❤️ Crew Health Safe (+0%)",
			impact: {
				power: -35,
				oxygen: 15,
				health: 0,
				scienceXp: 15
			},
			outcomeSummary: "Debu terhempas keluar dari corong tanpa kru perlu keluar kubah! Sistem listrik sempat mengalami kelebihan beban sementara.",
			outcomeSummaryEn: "The dust was blown clear without an EVA! Electrical relays briefly tripped under the power spike.",
			scientificLesson: "Sistem pendukung kehidupan cerdas di masa depan dirancang memiliki mekanisme 'self-cleaning' otomatis untuk meminimalkan paparan bahaya bagi astronot.",
			scientificLessonEn: "Advanced space life support systems incorporate automated backwash and self-cleaning cycles to minimize hazardous crew EVAs."
		}]
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
		choices: [{
			id: "save_crops",
			title: "Alirkan Air & Lampu LED Spektrum Penuh",
			titleEn: "Pump Recycled Water & Full-Spectrum LED Lighting",
			description: "Prioritaskan kelangsungan hidup tanaman hijau dengan menyalakan pemanas dan pompa nutrisi 24 jam.",
			descriptionEn: "Prioritize living green crops by powering 24/7 nutrient pumps and magenta growth lights.",
			tradeOffText: "⚡ Listrik -30% | 💨 Oksigen +20% | ❤️ Kesehatan Kru Naik (+25% Panen Segar!)",
			tradeOffTextEn: "⚡ Power -30% | 💨 Oxygen +20% | ❤️ Crew Health Boost (+25% Fresh Harvest!)",
			impact: {
				power: -30,
				oxygen: 20,
				health: 25,
				scienceXp: 35
			},
			outcomeSummary: "Tanaman kembali hijau segar dan mekar! Kru menikmati panen salad segar bergizi tinggi yang meningkatkan kekebalan tubuh.",
			outcomeSummaryEn: "The green crops flourished! The crew enjoyed a fresh nutritious salad harvest that boosted immunity and morale.",
			scientificLesson: "Eksperimen Veggie di Stasiun Luar Angkasa ISS membuktikan bahwa memakan sayuran segar memberikan dampak psikologis bahagia yang sangat besar bagi mental astronot.",
			scientificLessonEn: "NASA's Veggie experiment aboard the ISS proved that cultivating and consuming fresh greens provides vital psychological wellness and essential folate for deep space crews."
		}, {
			id: "ration_crops",
			title: "Ikhlaskan Sebagian Tanaman & Hemat Daya",
			titleEn: "Sacrifice Secondary Trays & Ration Power",
			description: "Matikan lampu kebun dan andalkan jatah makanan kemasan kering beku (freeze-dried paste).",
			descriptionEn: "Power down greenhouse grow lights and rely exclusively on freeze-dried emergency paste rations.",
			tradeOffText: "⚡ Listrik Hemat (+10%) | 💨 Oksigen -10% | ❤️ Kesehatan -15% (Kekurangan vitamin segar)",
			tradeOffTextEn: "⚡ Power Conserved (+10%) | 💨 Oxygen -10% | ❤️ Crew Health -15% (Nutritional fatigue)",
			impact: {
				power: 10,
				oxygen: -10,
				health: -15,
				scienceXp: 10
			},
			outcomeSummary: "Baterai listrik tersimpan aman, namun makanan kemasan yang monoton membuat astronot cepat lelah dan rentan kekurangan vitamin.",
			outcomeSummaryEn: "Battery energy remained safe, but monotonous freeze-dried food left astronauts sluggish and at risk of vitamin deficiency.",
			scientificLesson: "Makanan kering beku kehilangan vitamin C dan folat seiring berjalannya waktu dalam misi berdurasi panjang, sehingga pertanian ruang angkasa adalah syarat mutlak untuk koloni Mars.",
			scientificLessonEn: "Freeze-dried foods degrade in Vitamin C and thiamine over multi-year journeys, making bio-regenerative agriculture essential for permanent Mars colonies."
		}]
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
		choices: [{
			id: "drill_ice",
			title: "Jalankan Pengebor Termal Berdaya Tinggi",
			titleEn: "Deploy High-Powered Thermal Melt Drill",
			description: "Nyalakan laser pemanas dan bor robot untuk mengekstrak 50 liter es air Mars.",
			descriptionEn: "Activate heated robotic coring drills to extract 50 liters of Martian water ice.",
			tradeOffText: "⚡ Listrik -40% | 💨 Oksigen Melimpah (+40%) | ❤️ Kesehatan +10% | 🔬 +50 XP Sains",
			tradeOffTextEn: "⚡ Power -40% | 💨 Plentiful Oxygen (+40%) | ❤️ Crew Health +10% | 🔬 +50 Science XP",
			impact: {
				power: -40,
				oxygen: 40,
				health: 10,
				scienceXp: 50
			},
			outcomeSummary: "Pengeboran sukses spektakuler! Es purba Mars berhasil dicairkan, mengisi tangki cadangan oksigen dan air minum kru pangkalan.",
			outcomeSummaryEn: "The thermal drilling was a spectacular success! Ancient Martian ice melted into fresh water, refilling both drinking reserves and oxygen fuel cells.",
			scientificLesson: "Eksperimen radar SHARAD di wahana Mars Reconnaissance Orbiter (MRO) mendeteksi gletser es bawah tanah raksasa yang cukup untuk menenggelamkan Mars dalam kedalaman 1 meter jika mencair.",
			scientificLessonEn: "The SHARAD radar on NASA's Mars Reconnaissance Orbiter (MRO) mapped vast subterranean ice sheets containing enough water to cover Mars in a global 1-meter ocean if melted."
		}, {
			id: "sample_only",
			title: "Ambil Sampel Inti Kecil Saja",
			titleEn: "Collect Small Sealed Core Sample Only",
			description: "Hemat daya baterai dengan hanya mengambil sampel 1 tabung untuk dianalisis di lab.",
			descriptionEn: "Conserve battery power by collecting only one small scientific core sample for lab analysis.",
			tradeOffText: "⚡ Listrik Hemat (-10%) | 💨 Oksigen +10% | 🔬 +25 XP Sains",
			tradeOffTextEn: "⚡ Power Conserved (-10%) | 💨 Oxygen +10% | 🔬 +25 Science XP",
			impact: {
				power: -10,
				oxygen: 10,
				health: 0,
				scienceXp: 25
			},
			outcomeSummary: "Sampel es berhasil disimpan dengan aman di tabung kedap udara dengan penggunaan daya minimal.",
			outcomeSummaryEn: "The ice core sample was safely sealed in an airtight containment tube with minimal battery drain.",
			scientificLesson: "Sampel es Mars dapat mengungkapkan iklim masa lalu Mars miliaran tahun yang lalu saat planet merah tersebut masih hangat dan basah.",
			scientificLessonEn: "Martian ice cores preserve atmospheric gas bubbles and climate history dating back billions of years when Mars was warm and wet."
		}]
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
		choices: [{
			id: "magnetic_deflector_surge",
			title: "Korsletkan Deflektor Magnetik ke Tingkat Darurat",
			titleEn: "Surge Magnetic Deflector Coils to Emergency Overdrive",
			description: "Gunakan seluruh kapasitor listrik untuk menciptakan gelombang kejut magnetik balasan.",
			descriptionEn: "Discharge all habitat capacitors to create a counter-magnetic shock barrier.",
			tradeOffText: "⚡ Listrik Kritis (-55%) | ❤️ Kesehatan Terlindungi (+15%) | 💨 Oksigen -10%",
			tradeOffTextEn: "⚡ Power Critical (-55%) | ❤️ Crew Health Shielded (+15%) | 💨 Oxygen -10%",
			impact: {
				power: -55,
				oxygen: -10,
				health: 15,
				scienceXp: 40
			},
			outcomeSummary: "Deflektor magnetik menyala terang membelokkan awan plasma! Kru aman tanpa terkena radiasi, namun cadangan daya pangkalan berada di titik kritis.",
			outcomeSummaryEn: "The deflector pulse flared brightly, deflecting the energetic plasma wave! The crew was unharmed, but the power grid is in critical territory.",
			scientificLesson: "NASA mengkaji konsep menempatkan satelit pembuat medan magnet buatan di titik Lagrange L1 Mars untuk mengembalikan atmosfer Mars di masa depan.",
			scientificLessonEn: "NASA researchers have studied placing an artificial magnetic dipole satellite at Mars L1 Lagrange point to shield the entire planet and allow atmosphere restoration."
		}, {
			id: "partial_shutdown",
			title: "Matikan Semua Sirkuit Elektronik (Faraday Cage)",
			titleEn: "Shutdown All Non-Essential Circuits (Faraday Lockdown)",
			description: "Lindungi komputer dari arus pendek dengan memutus daya, kru mengenakan rompi pelindung timbal OSDR.",
			descriptionEn: "Protect circuitry from EMP spikes by cutting power; crew dons OSDR heavy lead vests.",
			tradeOffText: "⚡ Listrik Hemat (-15%) | ❤️ Kesehatan -25% (Rompi timbal berat & radiasi rembesan) | 💨 Oksigen -15%",
			tradeOffTextEn: "⚡ Power Conserved (-15%) | ❤️ Crew Health -25% (Radiation seepage & heavy vests) | 💨 Oxygen -15%",
			impact: {
				power: -15,
				oxygen: -15,
				health: -25,
				scienceXp: 20
			},
			outcomeSummary: "Sirkuit utama pangkalan selamat dari kerusakan permanen! Tetapi kru mengalami mual akibat sedikit paparan radiasi yang menembus.",
			outcomeSummaryEn: "The habitat computers were spared from permanent burnout! However, crew experienced radiation nausea from secondary ion scatter.",
			scientificLesson: "Kandang Faraday (Faraday cage) melindungi alat elektronik sensitif dari sengatan elektromagnetik eksternal.",
			scientificLessonEn: "Faraday cages prevent external electromagnetic radiation from disrupting sensitive computing microelectronics."
		}]
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
		choices: [{
			id: "autonomous_rover_survey",
			title: "Kirim Rover untuk Eksplorasi Gua Terowongan Lava",
			titleEn: "Deploy Rover to Survey Lava Tube Caves",
			description: "Gunakan energi listrik pemancar untuk mengendalikan rover mencari terowongan lava bawah tanah.",
			descriptionEn: "Channel transmitter power to navigate the rover into a newly detected volcanic lava tube cave.",
			tradeOffText: "⚡ Listrik -30% | 💨 Oksigen -5% | 🔬 +60 XP Sains (Peta Bunker Baru Terbuka!)",
			tradeOffTextEn: "⚡ Power -30% | 💨 Oxygen -5% | 🔬 +60 Science XP (Subterranean Bunker Unlocked!)",
			impact: {
				power: -30,
				oxygen: -5,
				health: 5,
				scienceXp: 60
			},
			outcomeSummary: "Rover berhasil memetakan pintu masuk terowongan lava alami! Lokasi ini menjadi bunker teraman untuk koloni masa depan.",
			outcomeSummaryEn: "The rover successfully mapped the entrance to a natural volcanic lava tube! This cave offers the safest long-term radiation shield for future colonists.",
			scientificLesson: "Terowongan lava (lava tubes) di Mars tercipta saat lava gunung berapi mengalir jutaan tahun lalu, meninggalkan lorong gua bawah tanah raksasa yang terlindung dari radiasi dan meteorit.",
			scientificLessonEn: "Ancient lava tubes on Mars formed when outer volcanic crust cooled while molten rock drained out, leaving massive caverns shielded from solar rays and micrometeorites."
		}, {
			id: "rigorous_maintenance",
			title: "Fokus Pemeriksaan Pipa Oksigen & Baterai Pangkalan",
			titleEn: "Conduct Habitat Seal & Battery Grid Inspection",
			description: "Tidak ada petualangan luar pangkalan hari ini. Kru mengencangkan baut dan memeriksa kebocoran pangkalan.",
			descriptionEn: "No exterior adventures today. Inspect all airlock seals, pressure valves, and electrical couplings.",
			tradeOffText: "⚡ Listrik +10% (Hemat) | 💨 Oksigen +25% (Kebocoran ditutup) | ❤️ Kesehatan +10%",
			tradeOffTextEn: "⚡ Power +10% (Conserved) | 💨 Oxygen +25% (Micro-leaks sealed) | ❤️ Crew Health +10%",
			impact: {
				power: 10,
				oxygen: 25,
				health: 10,
				scienceXp: 15
			},
			outcomeSummary: "Pemeriksaan menemukan micro-leak pada katup oksigen sekunder! Berkat kehati-hatian Komandan, pangkalan jauh lebih aman.",
			outcomeSummaryEn: "The thorough inspection uncovered a micro-leak in the secondary oxygen regulator! Thanks to the Commander's vigilance, the base is far safer.",
			scientificLesson: "Di lingkungan hampa udara ekstrem seperti Mars, pemeliharaan preventif harian adalah kunci utama keselamatan misi.",
			scientificLessonEn: "In the hard vacuum and harsh cold of space, daily preventative maintenance and meticulous leak-checks are the true cornerstone of survival."
		}]
	}
];
// --- src/data/anis_knowledge.js ---
// A.N.I.S. (Astronaut Neural Intelligent System)
// Plain Language Science Explainer & Dual-Engine AI (Embedded Knowledge + Live Gemini API)
const ANIS_CONCEPTS = {
	cme: {
		title: "CME (Coronal Mass Ejection)",
		plainId: "CME itu seperti bersin raksasa dari Matahari! Bayangkan Matahari sedang pilek, lalu bersin mengeluarkan miliaran ton gelembung gas panas dan magnet ke luar angkasa dengan kecepatan ribuan kilometer per detik. Karena membawa radiasi tinggi, kita harus menyalakan perisai pangkalan agar sel tubuh kita tidak sakit!",
		plainEn: "A CME is like a giant sneeze from the Sun! Imagine the Sun catching a cosmic cold and sneezing billions of tons of hot magnetic gas into space at incredible speeds. Since it carries intense radiation, our Mars habitat must turn on radiation shields so our body cells stay healthy!",
		analogy: "🤧 Bersin raksasa Matahari",
		keywords: [
			"cme",
			"coronal",
			"mass ejection",
			"plasma",
			"bersin matahari"
		]
	},
	solar_flare: {
		title: "Solar Flare (Kilatan Matahari)",
		plainId: "Solar Flare itu seperti kilatan lampu blitz kamera atau kembang api raksasa yang meledak tiba-tiba di permukaan Matahari! Kilatan ini bergerak secepat cahaya dan bisa mengganggu sinyal radio serta memanaskan bagian luar pangkalan kita.",
		plainEn: "A Solar Flare is like an enormous camera flash or giant cosmic firework exploding on the Sun's surface! It travels at the speed of light, disrupting radio signals and bathing our habitat in light energy.",
		analogy: "📸 Blitz kamera raksasa di Matahari",
		keywords: [
			"flare",
			"solar flare",
			"kilatan",
			"flr",
			"badai matahari"
		]
	},
	moxie: {
		title: "MOXIE (Pembuat Oksigen Mars)",
		plainId: "MOXIE adalah 'pohon mekanik' ajaib buatan insinyur NASA! Udara di Mars 95% isinya racun karbon dioksida. Mesin MOXIE menghirup udara beracun itu, memasaknya dengan suhu panas 800°C seperti oven listrik, lalu menghembuskan oksigen segar murni yang bisa kita hirup dengan paru-paru kita!",
		plainEn: "MOXIE is like a magical mechanical tree built by NASA engineers! Martian air is 95% carbon dioxide. MOXIE sucks in that poisonous air, bakes it at 800°C like a high-tech oven, and breathes out fresh, pure oxygen for our junior astronauts!",
		analogy: "🌲 Pohon mekanik pembuat napas",
		keywords: [
			"moxie",
			"oksigen",
			"oxygen",
			"nafas",
			"life support",
			"udara"
		]
	},
	radiation: {
		title: "Radiasi & Data RadLab",
		plainId: "Radiasi kosmik itu seperti 'hujan gerimis butiran energi tak kasat mata'. Di Bumi kita punya payung pelindung raksasa (medan magnet dan udara tebal Bumi). Tapi di Mars, payungnya bolong! Kalau kita kehujanan radiasi terlalu lama, tubuh kita bisa cepat lemas seperti saat kita demam.",
		plainEn: "Cosmic radiation is like invisible energetic drizzle falling from deep space. Earth gives us an enormous natural umbrella (magnetic field and thick sky). But Mars has no umbrella! If we stay out too long, our body feels sluggish and tired like having a fever.",
		analogy: "☔ Hujan gerimis energi tanpa payung",
		keywords: [
			"radiasi",
			"radiation",
			"radlab",
			"msv",
			"millisievert",
			"sinar kosmik"
		]
	},
	muscle_atrophy: {
		title: "Penyusutan Otot & Tulang (OSDR)",
		plainId: "Karena gravitasi Mars hanya sepertiga Bumi, melompat di Mars terasa sangat ringan! Menyenangkan, bukan? Tapi awas: jika otot dan tulangmu tidak diajak bekerja keras setiap hari, tubuhmu mengira kamu tidak butuh otot lagi, sehingga ototmu mengecil. Makanya astronot wajib lari di treadmill 2 jam sehari!",
		plainEn: "Because Mars gravity is only one-third of Earth, you feel super light! Fun, right? But watch out: if muscles and bones don't work hard daily, your body thinks you don't need them and starts shrinking them. That's why astronauts must jog on treadmills every day!",
		analogy: "🏃 Otot yang menjadi malas",
		keywords: [
			"otot",
			"tulang",
			"atropi",
			"atrophy",
			"treadmill",
			"gravitasi",
			"olahraga"
		]
	},
	space_anemia: {
		title: "Anemia Luar Angkasa (OSDR)",
		plainId: "Di dalam darah kita ada jutaan 'truk pengantar makanan' bernama sel darah merah. Di antariksa, tubuh membongkar truk-truk ini lebih cepat dari biasanya. Makanya kita menanam sayuran selada segar di kubah hidroponik untuk membuat truk darah baru!",
		plainEn: "Inside our blood are millions of tiny red delivery trucks carrying oxygen. In space, our body scraps these trucks faster than usual. That's why our hydroponic greenhouse grows fresh crunchy greens to build brand new trucks!",
		analogy: "🚚 Truk pengantar oksigen di dalam darah",
		keywords: [
			"anemia",
			"darah",
			"red blood cell",
			"selada",
			"sayur",
			"hidroponik"
		]
	},
	sol: {
		title: "Sol (Hari di Mars)",
		plainId: "Satu hari di Bumi adalah 24 jam. Di Mars, satu putaran hari disebut 'Sol', lamanya 24 jam 39 menit dan 35 detik. Jadi anak-anak di Mars punya waktu bermain ekstra hampir 40 menit lebih lama setiap hari!",
		plainEn: "One day on Earth lasts 24 hours. On Mars, one day is called a 'Sol', lasting 24 hours 39 minutes and 35 seconds. That means junior astronauts get nearly 40 extra minutes to play every single day!",
		analogy: "⏰ Hari Mars yang punya bonus 40 menit",
		keywords: [
			"sol",
			"hari mars",
			"jam",
			"waktu",
			"day",
			"martian sol"
		]
	},
	dust_storm: {
		title: "Badai Debu Mars & Panel Surya",
		plainId: "Debu di Mars sangat halus seperti bedak bayi atau tepung terigu, tapi warnanya merah karena berkarat (besi oksida). Saat badai bertiup, debu menempel di kaca panel surya kita seperti selimut tebal yang menutupi jendela kamar, menghalangi cahaya matahari membuat listrik.",
		plainEn: "Martian dust is as fine as baby powder, but rusty red. When dust storms swirl, dust coats our solar panels like a thick dusty blanket over a bedroom window, blocking sunlight from making electricity.",
		analogy: "🧣 Selimut bedak merah penutup panel",
		keywords: [
			"debu",
			"dust",
			"badai",
			"storm",
			"panel surya",
			"solar panel",
			"tau"
		]
	},
	jezero_crater: {
		title: "Kawah Jezero & Rover Perseverance",
		plainId: "Kawah Jezero adalah bekas danau purba raksasa berdiameter 45 kilometer! Miliaran tahun lalu ada sungai yang mengalir deras ke sini. Sekarang robot penjelajah NASA, Perseverance, sedang mencari batu-batu purba untuk mencari tahu apakah dulu pernah ada ikan atau lumut kecil di Mars!",
		plainEn: "Jezero Crater is an ancient dried-up lake 45 kilometers wide! Billions of years ago, mighty rivers rushed into it. Now NASA's Perseverance rover is collecting rock cores to see if tiny microbes once swam in ancient Martian waters!",
		analogy: "🏞️ Danau purba yang mengering",
		keywords: [
			"jezero",
			"perseverance",
			"kawah",
			"danau",
			"rover",
			"ingenuity"
		]
	},
	trade_off: {
		title: "Trade-Off (Kompromi Bertahan Hidup)",
		plainId: "Trade-off itu seperti saat kamu punya uang saku terbatas di toko mainan: kalau kamu membeli robot mainan, kamu tidak bisa membeli es krim. Di pangkalan Mars, semua sumber daya terbatas! Kalau kamu menyalakan perisai radiasi, listrikmu berkurang. Menjadi komandan berarti belajar memilih hal yang paling penting!",
		plainEn: "A trade-off is like having pocket money at a toy shop: if you buy a toy rocket, you might not have enough left for ice cream. On Mars, everything is limited! If you turn on protective shields, your batteries drain. Being a commander means making smart balancing choices!",
		analogy: "⚖️ Menimbang timbangan pilihan",
		keywords: [
			"trade off",
			"trade-off",
			"kompromi",
			"pilihan",
			"dilema",
			"strategi"
		]
	}
};
// Smart Local Fallback Answer Engine
function getAnisAnswerLocal(query, lang = "id") {
	const q = query.toLowerCase().trim();
	// Direct greeting
	if (q.includes("halo") || q.includes("hai") || q.includes("siapa kamu") || q.includes("hello") || q.includes("who are you")) {
		return lang === "id" ? "Halo Komandan Junior! Namaku A.N.I.S. (Astronaut Neural Intelligent System). Aku adalah robot asisten pangkalanmu. Tugasku menerjemahkan semua sains luar angkasa yang rumit menjadi cerita yang seru dan mudah dipahami! Ada yang ingin kamu tanyakan tentang Mars atau cuaca antariksa hari ini?" : "Hello Junior Commander! I am A.N.I.S. (Astronaut Neural Intelligent System), your friendly outpost robot assistant! I translate complex NASA rocket science into fun, easy stories! What would you like to explore about Mars or space weather today?";
	}
	// Find concept matches
	for (const [key, concept] of Object.entries(ANIS_CONCEPTS)) {
		if (concept.keywords.some((kw) => q.includes(kw))) {
			return lang === "id" ? `${concept.analogy}\n\n${concept.plainId}` : `${concept.analogy}\n\n${concept.plainEn}`;
		}
	}
	// General helpful space answer
	return lang === "id" ? `Pertanyaan yang bagus sekali, Komandan! Di Mars, kita hidup di lingkungan yang sangat ekstrem: tidak ada udara untuk bernapas, suhu malam mencapai -80°C (jauh lebih dingin dari freezer es krim!), dan radiasi matahari selalu mengintai. Kunci pangkalan kita adalah menjaga keseimbangan ⚡ Listrik, 💨 Oksigen, dan ❤️ Kesehatan astronot. Jangan biarkan salah satunya habis, ya!` : `What a wonderful question, Commander! Mars is an extreme world: no breathable air, freezing nights dropping to -80°C (colder than an ice cream freezer!), and space radiation lurking above. The secret to our base is balancing ⚡ Power, 💨 Oxygen, and ❤️ Crew Health. Never let any bar drop to zero!`;
}
// Live Gemini API Calling Engine (with plain language system prompt)
async function queryGeminiApi(prompt, apiKey, lang = "id") {
	if (!apiKey || apiKey.trim() === "") {
		return getAnisAnswerLocal(prompt, lang);
	}
	const systemInstruction = `
You are A.N.I.S. (Astronaut Neural Intelligent System), an enthusiastic, warm, friendly robotic AI co-pilot in the "Astro-Gotchi" Mars survival mission trainer for junior astronauts aged 7 to 12.
RULES:
1. Always explain NASA space science concepts in "PLAIN LANGUAGE" without complicated academic jargon.
2. Use clear, vivid, child-friendly analogies (like cosmic flashlights, giant sneezes, tiny blood delivery trucks, mechanical trees).
3. Connect your answer directly to the game's core trade-offs: ⚡ Power (Listrik), 💨 Oxygen (Oksigen), ❤️ Health (Kesehatan), and Mars survival.
4. Keep the tone inspiring, fun, and encouraging for a child explorer.
5. Answer in ${lang === "id" ? "Bahasa Indonesia yang ceria dan santun" : "enthusiastic English"}. Maximum 2-3 short, engaging paragraphs.
  `;
	try {
		const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{
					role: "user",
					parts: [{ text: `${systemInstruction}\n\nChild's Question: "${prompt}"` }]
				}],
				generationConfig: {
					temperature: .7,
					maxOutputTokens: 350
				}
			})
		});
		if (!response.ok) {
			console.warn("Gemini API call failed, falling back to local engine:", response.statusText);
			return getAnisAnswerLocal(prompt, lang);
		}
		const data = await response.json();
		const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
		if (candidateText && candidateText.trim().length > 0) {
			return candidateText.trim();
		}
		return getAnisAnswerLocal(prompt, lang);
	} catch (err) {
		console.warn("Gemini network error, using local fallback:", err);
		return getAnisAnswerLocal(prompt, lang);
	}
}
// --- src/audio/sound_effects.js ---
// Web Audio API Synthesizer for Astro-Gotchi (No external mp3 assets needed)
let audioCtx = null;
let soundEnabled = true;
function getAudioContext() {
	if (!audioCtx && typeof window !== "undefined") {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (AudioContextClass) {
			audioCtx = new AudioContextClass();
		}
	}
	if (audioCtx && audioCtx.state === "suspended") {
		audioCtx.resume();
	}
	return audioCtx;
}
const SoundEngine = {
	toggleMute: () => {
		soundEnabled = !soundEnabled;
		return soundEnabled;
	},
	isMuted: () => !soundEnabled,
	playClick: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// High-tactile Pip-Boy mechanical relay click
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(1400, ctx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + .04);
			gain.gain.setValueAtTime(.2, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.01, ctx.currentTime + .04);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .04);
		} catch (e) {}
	},
	playPipBoyOpen: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// Pip-Boy phosphor CRT power-up whine and bleep
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(220, ctx.currentTime);
			osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + .12);
			gain.gain.setValueAtTime(.08, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.01, ctx.currentTime + .15);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .15);
		} catch (e) {}
	},
	playRadioBeep: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// High sci-fi radio communication chirp / ready chime
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(880, ctx.currentTime);
			osc.frequency.setValueAtTime(1320, ctx.currentTime + .05);
			gain.gain.setValueAtTime(.12, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.001, ctx.currentTime + .12);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .12);
		} catch (e) {}
	},
	playBottleCaps: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// Metallic bottle caps jingling sound for XP / rewards
			[
				1800,
				2400,
				3200,
				2900,
				3600
			].forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * .035);
				gain.gain.setValueAtTime(.12, ctx.currentTime + idx * .035);
				gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + idx * .035 + .06);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + idx * .035);
				osc.stop(ctx.currentTime + idx * .035 + .06);
			});
		} catch (e) {}
	},
	playGeigerCounter: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// Authentic Geiger counter click bursts
			for (let i = 0; i < 4; i++) {
				const delay = Math.random() * .15;
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "square";
				osc.frequency.setValueAtTime(100 + Math.random() * 800, ctx.currentTime + delay);
				gain.gain.setValueAtTime(.15, ctx.currentTime + delay);
				gain.gain.linearRampToValueAtTime(.001, ctx.currentTime + delay + .008);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + delay);
				osc.stop(ctx.currentTime + delay + .008);
			}
		} catch (e) {}
	},
	playAlertSiren: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(440, ctx.currentTime);
			osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + .2);
			osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + .4);
			gain.gain.setValueAtTime(.2, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.01, ctx.currentTime + .45);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .45);
		} catch (e) {}
	},
	playSuccessChime: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			const notes = [
				523.25,
				659.25,
				783.99,
				1046.5
			];
			notes.forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "triangle";
				osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * .08);
				gain.gain.setValueAtTime(.18, ctx.currentTime + idx * .08);
				gain.exponentialRampToValueAtTime ? gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + idx * .08 + .25) : null;
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + idx * .08);
				osc.stop(ctx.currentTime + idx * .08 + .25);
			});
		} catch (e) {}
	},
	playSuccess: function() {
		this.playSuccessChime();
	},
	playOxygenFlow: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			// White noise buffer for gentle air hiss
			const bufferSize = ctx.sampleRate * .3;
			const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
			const output = buffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				output[i] = Math.random() * 2 - 1;
			}
			const whiteNoise = ctx.createBufferSource();
			whiteNoise.buffer = buffer;
			const filter = ctx.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.setValueAtTime(1e3, ctx.currentTime);
			const gain = ctx.createGain();
			gain.gain.setValueAtTime(.1, ctx.currentTime);
			gain.gain.exponentialRampToValueAtTime(.01, ctx.currentTime + .3);
			whiteNoise.connect(filter);
			filter.connect(gain);
			gain.connect(ctx.destination);
			whiteNoise.start();
		} catch (e) {}
	},
	playPowerBuzz: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "square";
			osc.frequency.setValueAtTime(120, ctx.currentTime);
			osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + .2);
			gain.gain.setValueAtTime(.15, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.01, ctx.currentTime + .25);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start();
			osc.stop(ctx.currentTime + .25);
		} catch (e) {}
	},
	playGameOverTone: () => {
		if (!soundEnabled) return;
		try {
			const ctx = getAudioContext();
			if (!ctx) return;
			const notes = [
				400,
				350,
				300,
				220,
				160
			];
			notes.forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * .15);
				gain.gain.setValueAtTime(.2, ctx.currentTime + idx * .15);
				gain.gain.linearRampToValueAtTime(.01, ctx.currentTime + idx * .15 + .3);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(ctx.currentTime + idx * .15);
				osc.stop(ctx.currentTime + idx * .15 + .3);
			});
		} catch (e) {}
	}
};
// --- src/components/ThreeDOutpostView.jsx ---
// ThreeDOutpostView - Expansive 3D Mars Base with Custom NASA Equipment & Low-Gravity Physics
function ThreeDOutpostView({ resources, activeDonki, shieldActive, solPhase, currentSol, site, lang, dailyShiftsLeft = 3, maxDailyShifts = 3, highlightedTarget = null, onWorkStateChange = null, onInteractStation, onOpenAnis, onOpenDataTerminal }) {
	const mountRef = useRef(null);
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const [activeTooltip, setActiveTooltip] = useState(null);
	const [characterStatusText, setCharacterStatusText] = useState(lang === "id" ? "Commander Leo Siap di Pangkalan" : "Commander Leo Ready at Outpost Center");
	const [isWorking, setIsWorking] = useState(false);
	const [activeStation, setActiveStation] = useState(null);
	const [workSecondsLeft, setWorkSecondsLeft] = useState(0);
	const [workProgress, setWorkProgress] = useState(0);
	useEffect(() => {
		if (!isWorking) {
			setCharacterStatusText(lang === "id" ? "Commander Leo Siap di Pangkalan" : "Commander Leo Ready at Outpost Center");
		}
	}, [lang, isWorking]);
	useEffect(() => {
		if (onWorkStateChange) {
			onWorkStateChange({
				isWorking,
				activeStation
			});
		}
	}, [isWorking, activeStation]);
	const triggerStationRef = useRef(null);
	const resetCameraRef = useRef(null);
	const isStorming = activeDonki?.hazardLevel === "CRITICAL" || activeDonki?.hazardLevel === "EXTREME";
	useEffect(() => {
		if (!mountRef.current || typeof window === "undefined") return;
		if (!window.THREE || !window.THREE.FBXLoader) {
			console.warn("Three.js or FBXLoader not ready yet.");
			return;
		}
		const THREE = window.THREE;
		const width = mountRef.current.clientWidth;
		const height = mountRef.current.clientHeight || 480;
		// 1. Scene & Atmosphere
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(920854);
		scene.fog = new THREE.FogExp2(920854, .0035);
		// 2. Camera (Diorama Perspective Angle)
		const aspect = width / height;
		const camera = new THREE.PerspectiveCamera(36, aspect, .1, 1500);
		camera.position.set(48, 44, 48);
		camera.lookAt(0, 2, 0);
		// 3. Renderer with ACES Tone Mapping
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance"
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.15;
		mountRef.current.innerHTML = "";
		mountRef.current.appendChild(renderer.domElement);
		// 4. OrbitControls
		let controls = null;
		if (window.THREE.OrbitControls) {
			controls = new window.THREE.OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = .06;
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
		const ambientLight = new THREE.AmbientLight(16773605, .95);
		scene.add(ambientLight);
		const dirLight = new THREE.DirectionalLight(16775920, 1.05);
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
		dirLight.shadow.bias = 8e-4;
		dirLight.shadow.normalBias = .04;
		scene.add(dirLight);
		const marsBounceLight = new THREE.DirectionalLight(10105874, .35);
		marsBounceLight.position.set(-25, -15, -25);
		scene.add(marsBounceLight);
		const interiorFill = new THREE.PointLight(3718648, .75, 45);
		interiorFill.position.set(0, 8, 0);
		scene.add(interiorFill);
		const alertLight = new THREE.PointLight(16007006, 0, 70);
		alertLight.position.set(0, 14, 0);
		scene.add(alertLight);
		// 6. Raycasting Setup
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		const clickableObjects = [];
		// 7. Base Materials
		const materials = {
			tealWall: new THREE.MeshStandardMaterial({
				color: 889992,
				roughness: .9,
				metalness: 0
			}),
			navyWall: new THREE.MeshStandardMaterial({
				color: 1976635,
				roughness: .9,
				metalness: 0
			}),
			whiteCap: new THREE.MeshStandardMaterial({
				color: 9741240,
				roughness: .8
			}),
			columnMetal: new THREE.MeshStandardMaterial({
				color: 4674921,
				roughness: .8,
				metalness: .05
			}),
			windowGlass: new THREE.MeshStandardMaterial({
				color: 3718648,
				roughness: .25,
				transparent: true,
				opacity: .55
			}),
			floorLight: new THREE.MeshStandardMaterial({
				color: 13358561,
				roughness: .85,
				metalness: 0
			}),
			floorHallway: new THREE.MeshStandardMaterial({
				color: 9741240,
				roughness: .8,
				metalness: 0
			}),
			terracotta: new THREE.MeshStandardMaterial({
				color: 12730636,
				roughness: .85
			}),
			staircaseMetal: new THREE.MeshStandardMaterial({
				color: 3359061,
				roughness: .8
			}),
			doorCyan: new THREE.MeshStandardMaterial({
				color: 440020,
				emissive: 561586,
				emissiveIntensity: .4
			})
		};
		// 8. ARCHITECTURAL ROOM ASSETS (Floors & Perimeter Bulkheads only)
		const S = .04;
		const roomDefinitions = [
			(
			// Central Corridor Floors
			{
				path: "FBX/FloorTile_Double_Hallway.fbx",
				pos: [
					0,
					0,
					-16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorHallway,
				isFloor: true
			}),
			{
				path: "FBX/FloorTile_Double_Hallway.fbx",
				pos: [
					0,
					0,
					-8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorHallway,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Double_Hallway.fbx",
				pos: [
					0,
					0,
					0
				],
				scale: S,
				rotY: 0,
				mat: materials.floorHallway,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Double_Hallway.fbx",
				pos: [
					0,
					0,
					8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorHallway,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Double_Hallway.fbx",
				pos: [
					0,
					0,
					16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorHallway,
				isFloor: true
			},
			(
			// Left Wing Floors (MOXIE & Bio-Dome)
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					-8,
					0,
					-16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			}),
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					-16,
					0,
					-16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					-24,
					0,
					-16
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					-8,
					0,
					-8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					-16,
					0,
					-8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					-24,
					0,
					-8
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					-8,
					0,
					0
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					-16,
					0,
					0
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					-24,
					0,
					0
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					-8,
					0,
					8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					-16,
					0,
					8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					-24,
					0,
					8
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Corner.fbx",
				pos: [
					-16,
					0,
					16
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.terracotta,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					-8,
					0,
					16
				],
				scale: S,
				rotY: Math.PI,
				mat: materials.terracotta,
				isFloor: true
			},
			(
			// Right Wing Floors (Treadmill & Solar Hub)
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					8,
					0,
					-16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			}),
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					16,
					0,
					-16
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					24,
					0,
					-16
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					8,
					0,
					-8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					16,
					0,
					-8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					24,
					0,
					-8
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					8,
					0,
					0
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					16,
					0,
					0
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					24,
					0,
					0
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic2.fbx",
				pos: [
					8,
					0,
					8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Basic.fbx",
				pos: [
					16,
					0,
					8
				],
				scale: S,
				rotY: 0,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					24,
					0,
					8
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.floorLight,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Corner.fbx",
				pos: [
					16,
					0,
					16
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.terracotta,
				isFloor: true
			},
			{
				path: "FBX/FloorTile_Side.fbx",
				pos: [
					8,
					0,
					16
				],
				scale: S,
				rotY: Math.PI,
				mat: materials.terracotta,
				isFloor: true
			},
			(
			// Perimeter Walls (Precisely Spaced 16 Units Wide to Completely Eliminate Z-Fighting & Overlap!)
			// Back Wall (Z = -20, exactly 3 x 16 units = 48 units wide, spanning X: -24 to +24)
			{
				path: "FBX/Walls/ThreeWindows_Wall_SideA.fbx",
				pos: [
					-16,
					0,
					-20
				],
				scale: S,
				rotY: 0,
				mat: materials.tealWall,
				isWall: true
			}),
			{
				path: "FBX/Walls/DoorDoubleLong_Wall_SideA.fbx",
				pos: [
					0,
					0,
					-20
				],
				scale: S,
				rotY: 0,
				mat: materials.navyWall,
				isWall: true
			},
			{
				path: "FBX/Walls/ThreeWindows_Wall_SideB.fbx",
				pos: [
					16,
					0,
					-20
				],
				scale: S,
				rotY: 0,
				mat: materials.tealWall,
				isWall: true
			},
			(
			// Left Flank Wall (X = -28, exactly 2 x 16 units = 32 units long, spanning Z: -16 to +16)
			{
				path: "FBX/Walls/DoorSingleLong_Wall_SideA.fbx",
				pos: [
					-28,
					0,
					-8
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.navyWall,
				isWall: true
			}),
			{
				path: "FBX/Walls/Wall_3.fbx",
				pos: [
					-28,
					0,
					8
				],
				scale: S,
				rotY: Math.PI / 2,
				mat: materials.tealWall,
				isWall: true
			},
			(
			// Right Flank Wall (X = 28, exactly 2 x 16 units = 32 units long, spanning Z: -16 to +16)
			{
				path: "FBX/Walls/SmallWindows_Wall_SideB.fbx",
				pos: [
					28,
					0,
					-8
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.tealWall,
				isWall: true
			}),
			{
				path: "FBX/Walls/Wall_5.fbx",
				pos: [
					28,
					0,
					8
				],
				scale: S,
				rotY: -Math.PI / 2,
				mat: materials.navyWall,
				isWall: true
			},
			(
			// Corner Columns & Center Staircase
			{
				path: "FBX/Column_1.fbx",
				pos: [
					-24,
					0,
					-20
				],
				scale: S,
				rotY: 0,
				mat: materials.columnMetal,
				isWall: true
			}),
			{
				path: "FBX/Column_1.fbx",
				pos: [
					24,
					0,
					-20
				],
				scale: S,
				rotY: 0,
				mat: materials.columnMetal,
				isWall: true
			},
			{
				path: "FBX/Column_2.fbx",
				pos: [
					-24,
					0,
					16
				],
				scale: S,
				rotY: 0,
				mat: materials.columnMetal,
				isWall: true
			},
			{
				path: "FBX/Column_3.fbx",
				pos: [
					24,
					0,
					16
				],
				scale: S,
				rotY: 0,
				mat: materials.columnMetal,
				isWall: true
			},
			{
				path: "FBX/Staircase.fbx",
				pos: [
					0,
					0,
					20
				],
				scale: S,
				rotY: Math.PI,
				mat: materials.staircaseMetal,
				isWall: true
			}
		];
		// Load Base Room Architecture
		const loader = new window.THREE.FBXLoader();
		let loadedCount = 0;
		const totalCount = roomDefinitions.length;
		roomDefinitions.forEach((def) => {
			loader.load(def.path, (fbx) => {
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
				setLoadingProgress(Math.round(loadedCount / totalCount * 100));
				if (loadedCount >= totalCount) setIsLoaded(true);
			}, undefined, () => {
				loadedCount++;
				if (loadedCount >= totalCount) setIsLoaded(true);
			});
		});
		// ==============================================================
		// 9. DEDICATED AUTHENTIC 3D NASA EQUIPMENT STATIONS
		// ==============================================================
		// --------------------------------------------------------------
		// STATION 1: 💨 NASA MOXIE OXYGEN ISRU REACTOR
		// --------------------------------------------------------------
		const moxieGroup = new THREE.Group();
		moxieGroup.position.set(-16, 0, -10);
		const moxieSkid = new THREE.Mesh(new THREE.BoxGeometry(5, .35, 3.6), new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .6,
			metalness: .2
		}));
		moxieSkid.position.y = .18;
		moxieSkid.receiveShadow = true;
		moxieSkid.castShadow = true;
		moxieGroup.add(moxieSkid);
		// Golden Thermal Insulation Reactor Box (Solid Oxide Core 800°C)
		const moxieGoldBox = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 2.4), new THREE.MeshStandardMaterial({
			color: 16096779,
			roughness: .2,
			metalness: .85
		}));
		moxieGoldBox.position.set(-.8, 1.6, 0);
		moxieGoldBox.castShadow = true;
		moxieGroup.add(moxieGoldBox);
		// Glowing Ceramic SOXE Electrolyzer Cylinder
		const moxieCore = new THREE.Mesh(new THREE.CylinderGeometry(.55, .55, 1.8, 16), new THREE.MeshStandardMaterial({
			color: 16726832,
			emissive: 16729344,
			emissiveIntensity: .9,
			roughness: .4
		}));
		moxieCore.position.set(-.8, 1.6, 1);
		moxieCore.rotation.x = Math.PI / 2;
		moxieGroup.add(moxieCore);
		// Twin High-Pressure Oxygen Buffer Tanks
		const tankWhiteMat = new THREE.MeshStandardMaterial({
			color: 16317180,
			roughness: .35
		});
		const tankCyanMat = new THREE.MeshStandardMaterial({
			color: 440020,
			emissive: 561586,
			emissiveIntensity: .35,
			roughness: .3
		});
		const brassMat = new THREE.MeshStandardMaterial({
			color: 14251782,
			roughness: .3,
			metalness: .8
		});
		[-.6, .6].forEach((zOffset) => {
			const tankBody = new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, 2.2, 16), tankWhiteMat);
			tankBody.position.set(1.2, 1.45, zOffset);
			tankBody.castShadow = true;
			moxieGroup.add(tankBody);
			const tankBand = new THREE.Mesh(new THREE.CylinderGeometry(.44, .44, .5, 16), tankCyanMat);
			tankBand.position.set(1.2, 1.6, zOffset);
			moxieGroup.add(tankBand);
			const tankDome = new THREE.Mesh(new THREE.SphereGeometry(.42, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), tankCyanMat);
			tankDome.position.set(1.2, 2.55, zOffset);
			moxieGroup.add(tankDome);
			const valve = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .35, 12), brassMat);
			valve.position.set(1.2, 2.85, zOffset);
			moxieGroup.add(valve);
			// Analog Pressure Gauge Dial
			const gauge = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .08, 16), new THREE.MeshStandardMaterial({
				color: 988970,
				roughness: .2
			}));
			gauge.position.set(1.2, 1.9, zOffset + .42);
			gauge.rotation.x = Math.PI / 2;
			const needle = new THREE.Mesh(new THREE.BoxGeometry(.04, .22, .02), new THREE.MeshBasicMaterial({ color: 2278750 }));
			needle.position.set(1.2, 1.94, zOffset + .48);
			moxieGroup.add(gauge);
			moxieGroup.add(needle);
		});
		// Digital O2 Flow Monitor
		const moxieScreen = new THREE.Mesh(new THREE.BoxGeometry(1.2, .6, .05), new THREE.MeshStandardMaterial({
			color: 165063,
			emissive: 440020,
			emissiveIntensity: .8
		}));
		moxieScreen.position.set(-.8, 2.55, 1.25);
		moxieGroup.add(moxieScreen);
		const moxieHitData = {
			stationKey: "moxie",
			destPos: [-12, -8],
			stationName: lang === "id" ? "💨 Reaktor Elektrolisis Oksigen MOXIE" : "💨 NASA MOXIE Oxygen Plant",
			actionDesc: lang === "id" ? "+15% Oksigen, -10% Daya [1 Shift]" : "+15% O2, -10% Power [1 Shift]",
			impact: {
				oxygen: 15,
				power: -10
			},
			rootFbx: moxieGroup
		};
		moxieGroup.traverse((child) => {
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
		const bioFrameMat = new THREE.MeshStandardMaterial({
			color: 15857145,
			roughness: .3
		});
		const bioSoilMat = new THREE.MeshStandardMaterial({
			color: 4140577,
			roughness: .9
		});
		const bioLettuceMat = new THREE.MeshStandardMaterial({
			color: 2278750,
			roughness: .5
		});
		const bioLimeMat = new THREE.MeshStandardMaterial({
			color: 8702998,
			roughness: .5
		});
		const bioTomatoMat = new THREE.MeshStandardMaterial({
			color: 15680580,
			roughness: .3
		});
		const bioLedMat = new THREE.MeshStandardMaterial({
			color: 14239471,
			emissive: 12592851,
			emissiveIntensity: .95
		});
		// Greenhouse Vertical Tower Frame
		const bioCabinet = new THREE.Mesh(new THREE.BoxGeometry(4.8, 4.2, 2.2), bioFrameMat);
		bioCabinet.position.y = 2.1;
		bioCabinet.castShadow = true;
		bioCabinet.receiveShadow = true;
		bioGroup.add(bioCabinet);
		const bioCavity = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.6, 2), new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .8
		}));
		bioCavity.position.set(0, 2.1, .15);
		bioGroup.add(bioCavity);
		// 3 Tiered Growing Trays with Crops & Magenta Grow Lights
		const tierYs = [
			.9,
			2.1,
			3.3
		];
		tierYs.forEach((y, tierIdx) => {
			const soil = new THREE.Mesh(new THREE.BoxGeometry(4, .25, 1.8), bioSoilMat);
			soil.position.set(0, y, .15);
			bioGroup.add(soil);
			const lightBar = new THREE.Mesh(new THREE.BoxGeometry(4, .08, .3), bioLedMat);
			lightBar.position.set(0, y + .88, .15);
			bioGroup.add(lightBar);
			if (tierIdx === 0) {
				// Space wheat / micro-alfalfa grass blades
				for (let i = 0; i < 9; i++) {
					const crop = new THREE.Mesh(new THREE.ConeGeometry(.2, .5, 6), bioLimeMat);
					crop.position.set(-1.6 + i * .4, y + .35, .15 + (i % 2 === 0 ? .3 : -.3));
					bioGroup.add(crop);
				}
			} else if (tierIdx === 1) {
				// Microgreens & Martian cherry tomatoes
				for (let i = 0; i < 7; i++) {
					const lettuce = new THREE.Mesh(new THREE.SphereGeometry(.25, 8, 8), bioLettuceMat);
					lettuce.position.set(-1.5 + i * .5, y + .25, .05);
					bioGroup.add(lettuce);
					if (i % 2 === 1) {
						const tomato = new THREE.Mesh(new THREE.SphereGeometry(.12, 8, 8), bioTomatoMat);
						tomato.position.set(-1.5 + i * .5 + .15, y + .35, .4);
						bioGroup.add(tomato);
					}
				}
			} else {
				// Dwarf lettuces
				for (let i = 0; i < 8; i++) {
					const head = new THREE.Mesh(new THREE.DodecahedronGeometry(.28, 0), bioLettuceMat);
					head.position.set(-1.5 + i * .44, y + .26, .15 + (i % 2 === 0 ? .25 : -.25));
					bioGroup.add(head);
				}
			}
		});
		const bioGrowLight = new THREE.PointLight(14239471, .85, 10);
		bioGrowLight.position.set(0, 2.5, 1.4);
		bioGroup.add(bioGrowLight);
		// Clear Nutrient Water Reservoir Tank
		const waterTank = new THREE.Mesh(new THREE.CylinderGeometry(.48, .48, 2.4, 16), new THREE.MeshStandardMaterial({
			color: 3718648,
			transparent: true,
			opacity: .65,
			roughness: .1
		}));
		waterTank.position.set(2.8, 1.4, 0);
		waterTank.castShadow = true;
		bioGroup.add(waterTank);
		const waterFluid = new THREE.Mesh(new THREE.CylinderGeometry(.44, .44, 1.8, 16), new THREE.MeshStandardMaterial({
			color: 165063,
			transparent: true,
			opacity: .85,
			roughness: .1
		}));
		waterFluid.position.set(2.8, 1.1, 0);
		bioGroup.add(waterFluid);
		const bioHitData = {
			stationKey: "greenhouse",
			destPos: [-12, 6],
			stationName: lang === "id" ? "🌱 Lab Hidroponik Bio-Dome OSDR-311" : "🌱 Bio-Dome Hydroponics Lab",
			actionDesc: lang === "id" ? "+15% Kru, -10% Daya [1 Shift]" : "+15% Health, -10% Power [1 Shift]",
			impact: {
				health: 15,
				power: -10
			},
			rootFbx: bioGroup
		};
		bioGroup.traverse((child) => {
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
		const gymChassisMat = new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .6,
			metalness: .3
		});
		const gymChromeMat = new THREE.MeshStandardMaterial({
			color: 9741240,
			roughness: .2,
			metalness: .85
		});
		// Heavy Treadmill Platform Deck
		const treadmillDeck = new THREE.Mesh(new THREE.BoxGeometry(4.8, .4, 2.2), gymChassisMat);
		treadmillDeck.position.y = .25;
		treadmillDeck.castShadow = true;
		treadmillDeck.receiveShadow = true;
		gymGroup.add(treadmillDeck);
		// Ribbed Running Belt
		const runningBelt = new THREE.Mesh(new THREE.BoxGeometry(3.6, .06, 1.4), new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .85
		}));
		runningBelt.position.set(-.2, .46, 0);
		gymGroup.add(runningBelt);
		// Yellow Hazard Edge Platforms
		const cautionMat = new THREE.MeshStandardMaterial({
			color: 15381256,
			roughness: .4
		});
		const edgeL = new THREE.Mesh(new THREE.BoxGeometry(4, .05, .25), cautionMat);
		edgeL.position.set(-.2, .46, .85);
		const edgeR = new THREE.Mesh(new THREE.BoxGeometry(4, .05, .25), cautionMat);
		edgeR.position.set(-.2, .46, -.85);
		gymGroup.add(edgeL);
		gymGroup.add(edgeR);
		// Front Cockpit Post & Digital Telemetry Screen
		const frontPost = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, 1.8, 12), gymChromeMat);
		frontPost.position.set(-2.1, 1.1, 0);
		gymGroup.add(frontPost);
		const gymScreen = new THREE.Mesh(new THREE.BoxGeometry(.8, .5, .1), new THREE.MeshStandardMaterial({
			color: 165063,
			emissive: 440020,
			emissiveIntensity: .85
		}));
		gymScreen.position.set(-2.05, 1.85, 0);
		gymScreen.rotation.y = Math.PI / 2;
		gymScreen.rotation.z = -.35;
		gymGroup.add(gymScreen);
		// Overhead Bungee Harness Suspension Arch (Counteracting low gravity!)
		const archL = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 3.2, 12), gymChromeMat);
		archL.position.set(.2, 1.8, 1.1);
		const archR = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 3.2, 12), gymChromeMat);
		archR.position.set(.2, 1.8, -1.1);
		const archCross = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 2.3, 12), gymChromeMat);
		archCross.position.set(.2, 3.4, 0);
		archCross.rotation.x = Math.PI / 2;
		gymGroup.add(archL);
		gymGroup.add(archR);
		gymGroup.add(archCross);
		// 2 Orange Bungee Cords
		const bungeeMat = new THREE.MeshStandardMaterial({
			color: 16347926,
			roughness: .5
		});
		const bL = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1.4, 8), bungeeMat);
		bL.position.set(.2, 2.6, .35);
		const bR = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 1.4, 8), bungeeMat);
		bR.position.set(.2, 2.6, -.35);
		gymGroup.add(bL);
		gymGroup.add(bR);
		const gymHitData = {
			stationKey: "treadmill",
			destPos: [12, -8],
			stationName: lang === "id" ? "🏃 Treadmill Luar Angkasa NASA T2 (OSDR)" : "🏃 NASA T2 Space Treadmill",
			actionDesc: lang === "id" ? "+15% Kru, -10% Oksigen [1 Shift]" : "+15% Health, -10% O2 [1 Shift]",
			impact: {
				health: 15,
				oxygen: -10
			},
			rootFbx: gymGroup
		};
		gymGroup.traverse((child) => {
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
		const solarFrameMat = new THREE.MeshStandardMaterial({
			color: 3359061,
			roughness: .4,
			metalness: .7
		});
		const goldGridMat = new THREE.MeshStandardMaterial({
			color: 16096779,
			roughness: .3,
			metalness: .9
		});
		// Solar Gimbal Base
		const solarPost = new THREE.Mesh(new THREE.CylinderGeometry(.2, .25, 1.4, 16), solarFrameMat);
		solarPost.position.set(-1.2, .7, 0);
		solarPost.castShadow = true;
		powerGroup.add(solarPost);
		// Tilted Dual Solar Wing Panel (Deep Blue Silicon Cells)
		const solarWing = new THREE.Mesh(new THREE.BoxGeometry(4.6, .1, 2.6), new THREE.MeshStandardMaterial({
			color: 1920728,
			emissive: 1982639,
			emissiveIntensity: .35,
			metalness: .85,
			roughness: .2
		}));
		solarWing.position.set(-1.2, 1.4, 0);
		solarWing.rotation.x = -.62;
		solarWing.castShadow = true;
		powerGroup.add(solarWing);
		// Solar Frame Border
		const solarBorder = new THREE.Mesh(new THREE.BoxGeometry(4.75, .14, 2.75), solarFrameMat);
		solarBorder.position.set(-1.2, 1.4, 0);
		solarBorder.rotation.x = -.62;
		powerGroup.add(solarBorder);
		// Busbar Cell Grid Dividers
		for (let i = 1; i <= 5; i++) {
			const divider = new THREE.Mesh(new THREE.BoxGeometry(.04, .12, 2.6), goldGridMat);
			divider.position.set(-1.2 - 2.3 + i * .76, 1.4, 0);
			divider.rotation.x = -.62;
			powerGroup.add(divider);
		}
		// Heavy-Duty Battery Storage Power-Wall Cabinet
		const batteryCabinet = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.4, 1.6), new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .6,
			metalness: .2
		}));
		batteryCabinet.position.set(2.4, 1.7, 0);
		batteryCabinet.castShadow = true;
		batteryCabinet.receiveShadow = true;
		powerGroup.add(batteryCabinet);
		// 5 Glowing LED State-of-Charge Bars
		const ledBars = [];
		for (let i = 0; i < 5; i++) {
			const isGreen = i < 4;
			const bar = new THREE.Mesh(new THREE.BoxGeometry(.25, .4, .05), new THREE.MeshStandardMaterial({
				color: isGreen ? 1096065 : 16096779,
				emissive: isGreen ? 366185 : 14251782,
				emissiveIntensity: .95
			}));
			bar.position.set(1.4, .7 + i * .55, .82);
			powerGroup.add(bar);
			ledBars.push(bar);
		}
		const powerHitData = {
			stationKey: "power_grid",
			destPos: [12, 6],
			stationName: lang === "id" ? "⚡ Matriks Baterai & Daya Surya Mars" : "⚡ Solar Panel & Battery Hub",
			actionDesc: lang === "id" ? "+15% Daya, -10% Oksigen [1 Shift]" : "+15% Power, -10% O2 [1 Shift]",
			impact: {
				power: 15,
				oxygen: -10
			},
			rootFbx: powerGroup
		};
		powerGroup.traverse((child) => {
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
		const anisDais = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, .4, 32), new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .5,
			metalness: .2
		}));
		anisDais.position.y = .2;
		anisDais.receiveShadow = true;
		anisDais.castShadow = true;
		anisGroup.add(anisDais);
		// Concentric Blue Hologram Projection Lens
		const anisLens = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, .05, 32), new THREE.MeshStandardMaterial({
			color: 440020,
			emissive: 165063,
			emissiveIntensity: .85
		}));
		anisLens.position.y = .42;
		anisGroup.add(anisLens);
		// Floating Cute Robot Body (A.N.I.S.)
		const anisRobotBody = new THREE.Group();
		anisRobotBody.position.set(0, 2.2, 0);
		const robotHead = new THREE.Mesh(new THREE.SphereGeometry(.72, 24, 24), new THREE.MeshStandardMaterial({
			color: 16317180,
			roughness: .25,
			metalness: .1
		}));
		robotHead.castShadow = true;
		anisRobotBody.add(robotHead);
		const robotRing = new THREE.Mesh(new THREE.TorusGeometry(.74, .06, 12, 24), new THREE.MeshStandardMaterial({
			color: 440020,
			emissive: 561586,
			emissiveIntensity: .4
		}));
		robotRing.rotation.x = Math.PI / 2;
		anisRobotBody.add(robotRing);
		// Visor Screen with Glowing Cyan LED Eyes
		const robotVisor = new THREE.Mesh(new THREE.CylinderGeometry(.48, .48, .28, 16, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .1,
			metalness: .8
		}));
		robotVisor.position.set(0, .05, .46);
		robotVisor.rotation.x = Math.PI / 2;
		anisRobotBody.add(robotVisor);
		const eyeL = new THREE.Mesh(new THREE.BoxGeometry(.14, .08, .02), new THREE.MeshBasicMaterial({ color: 3718648 }));
		eyeL.position.set(-.2, .06, .72);
		const eyeR = new THREE.Mesh(new THREE.BoxGeometry(.14, .08, .02), new THREE.MeshBasicMaterial({ color: 3718648 }));
		eyeR.position.set(.2, .06, .72);
		anisRobotBody.add(eyeL);
		anisRobotBody.add(eyeR);
		// Cute Top Antenna with Golden Beacon
		const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, .45, 8), new THREE.MeshStandardMaterial({ color: 16317180 }));
		antenna.position.set(0, .9, 0);
		const beacon = new THREE.Mesh(new THREE.SphereGeometry(.12, 12, 12), new THREE.MeshStandardMaterial({
			color: 16096779,
			emissive: 16096779,
			emissiveIntensity: .9
		}));
		beacon.position.set(0, 1.15, 0);
		anisRobotBody.add(antenna);
		anisRobotBody.add(beacon);
		anisGroup.add(anisRobotBody);
		// Spinning Holographic Mars Globe with Orbit Ring
		const marsHolo = new THREE.Mesh(new THREE.IcosahedronGeometry(.65, 2), new THREE.MeshBasicMaterial({
			color: 2282478,
			wireframe: true,
			transparent: true,
			opacity: .75
		}));
		marsHolo.position.set(0, 3.8, 0);
		anisGroup.add(marsHolo);
		const orbitGeo = new THREE.RingGeometry(.9, .95, 32);
		orbitGeo.rotateX(Math.PI / 3);
		const orbitRing = new THREE.Line(new THREE.WireframeGeometry(orbitGeo), new THREE.LineBasicMaterial({
			color: 6809849,
			transparent: true,
			opacity: .6
		}));
		marsHolo.add(orbitRing);
		const holoLight = new THREE.PointLight(440020, .9, 10);
		holoLight.position.set(0, 3.2, 0);
		anisGroup.add(holoLight);
		const anisHitData = {
			stationKey: "anis_dock",
			destPos: [0, -1.5],
			stationName: "🤖 Dok Pusat AI A.N.I.S.",
			actionDesc: lang === "id" ? "Buka Dialog Asisten AI (Penerjemah Sains)" : "Open AI Assistant",
			isAnis: true,
			rootFbx: anisGroup
		};
		anisGroup.traverse((child) => {
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
		const suitMat = new THREE.MeshStandardMaterial({
			color: 16777215,
			roughness: .35
		});
		const greenMat = new THREE.MeshStandardMaterial({
			color: 1483594,
			roughness: .4
		});
		const darkMat = new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .5
		});
		const goldVisorMat = new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .1,
			metalness: .9,
			emissive: 165063,
			emissiveIntensity: .45
		});
		// Torso
		const torsoMesh = new THREE.Mesh(new THREE.CylinderGeometry(.75, .85, 1.4, 16), suitMat);
		torsoMesh.position.y = 1.6;
		torsoMesh.castShadow = true;
		astronautGroup.add(torsoMesh);
		// Green Harness Strap
		const beltMesh = new THREE.Mesh(new THREE.CylinderGeometry(.88, .88, .28, 16), greenMat);
		beltMesh.position.y = 1.35;
		astronautGroup.add(beltMesh);
		// Head
		const headMesh = new THREE.Mesh(new THREE.SphereGeometry(.88, 24, 24), suitMat);
		headMesh.position.y = 2.85;
		headMesh.castShadow = true;
		astronautGroup.add(headMesh);
		// Hair Buns
		const hairMat = new THREE.MeshStandardMaterial({ color: 1577508 });
		const bunL = new THREE.Mesh(new THREE.SphereGeometry(.35, 12, 12), hairMat);
		bunL.position.set(-.9, 3.2, 0);
		const bunR = new THREE.Mesh(new THREE.SphereGeometry(.35, 12, 12), hairMat);
		bunR.position.set(.9, 3.2, 0);
		astronautGroup.add(bunL);
		astronautGroup.add(bunR);
		// Visor
		const visorMesh = new THREE.Mesh(new THREE.SphereGeometry(.68, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), goldVisorMat);
		visorMesh.rotation.x = Math.PI / 2;
		visorMesh.position.set(0, 2.85, .42);
		astronautGroup.add(visorMesh);
		// Life Support Backpack
		const packMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1.2, .55), darkMat);
		packMesh.position.set(0, 1.8, -.65);
		astronautGroup.add(packMesh);
		// Articulated Left Leg
		const legLeftPivot = new THREE.Group();
		legLeftPivot.position.set(-.35, 1, 0);
		const legLeftMesh = new THREE.Mesh(new THREE.CylinderGeometry(.24, .22, 1, 12), suitMat);
		legLeftMesh.position.y = -.5;
		legLeftMesh.castShadow = true;
		const bootLeft = new THREE.Mesh(new THREE.BoxGeometry(.35, .25, .5), greenMat);
		bootLeft.position.set(0, -.9, .1);
		legLeftPivot.add(legLeftMesh);
		legLeftPivot.add(bootLeft);
		astronautGroup.add(legLeftPivot);
		// Articulated Right Leg
		const legRightPivot = new THREE.Group();
		legRightPivot.position.set(.35, 1, 0);
		const legRightMesh = new THREE.Mesh(new THREE.CylinderGeometry(.24, .22, 1, 12), suitMat);
		legRightMesh.position.y = -.5;
		legRightMesh.castShadow = true;
		const bootRight = new THREE.Mesh(new THREE.BoxGeometry(.35, .25, .5), greenMat);
		bootRight.position.set(0, -.9, .1);
		legRightPivot.add(legRightMesh);
		legRightPivot.add(bootRight);
		astronautGroup.add(legRightPivot);
		// Articulated Left Arm
		const armLeftPivot = new THREE.Group();
		armLeftPivot.position.set(-.95, 2.1, 0);
		const armLeftMesh = new THREE.Mesh(new THREE.CylinderGeometry(.18, .16, .9, 12), suitMat);
		armLeftMesh.position.y = -.45;
		const gloveL = new THREE.Mesh(new THREE.SphereGeometry(.22, 8, 8), darkMat);
		gloveL.position.y = -.9;
		armLeftPivot.add(armLeftMesh);
		armLeftPivot.add(gloveL);
		astronautGroup.add(armLeftPivot);
		// Articulated Right Arm
		const armRightPivot = new THREE.Group();
		armRightPivot.position.set(.95, 2.1, 0);
		const armRightMesh = new THREE.Mesh(new THREE.CylinderGeometry(.18, .16, .9, 12), suitMat);
		armRightMesh.position.y = -.45;
		const gloveR = new THREE.Mesh(new THREE.SphereGeometry(.22, 8, 8), darkMat);
		gloveR.position.y = -.9;
		armRightPivot.add(armRightMesh);
		armRightPivot.add(gloveR);
		astronautGroup.add(armRightPivot);
		scene.add(astronautGroup);
		// Center coordinate of the base
		const CENTER_X = 0;
		const CENTER_Z = 4;
		const WORK_DURATION = 3.5;
		// Floor Contact Projection Ring
		const ringGeo = new THREE.RingGeometry(.95, 1.25, 32);
		ringGeo.rotateX(-Math.PI / 2);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 3718648,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: .5
		});
		const selectionRing = new THREE.Mesh(ringGeo, ringMat);
		selectionRing.position.set(CENTER_X, .04, CENTER_Z);
		scene.add(selectionRing);
		// Walking & Pathfinding & Work Lifecycle State Machine
		const charPos = new THREE.Vector3(CENTER_X, 0, CENTER_Z);
		const charTarget = new THREE.Vector3(CENTER_X, 0, CENTER_Z);
		let isMoving = false;
		let walkCycle = 0;
		let workPhase = "IDLE";
		let currentStationKey = null;
		let currentStationMeta = null;
		let workTimer = 0;
		let lastReportedSec = -1;
		triggerStationRef.current = (stationKey, directImpact) => {
			// Prevent interrupting when Leo is already traveling, working, or returning!
			if (workPhase !== "IDLE") return;
			// Check daily shift limit (except ANIS dialogue which is always accessible)
			if (stationKey !== "anis_dock" && dailyShiftsLeft <= 0) {
				SoundEngine.playAlertSiren();
				setActiveTooltip({
					name: lang === "id" ? "⚠️ SHIFT HARIAN HABIS (3/3)" : "⚠️ DAILY SHIFTS EXHAUSTED (3/3)",
					action: lang === "id" ? "Leo kelelahan! Lanjutkan ke siklus evaluasi malam 🌙" : "Leo needs rest! Proceed to evening evaluation 🌙"
				});
				setTimeout(() => setActiveTooltip(null), 3500);
				return;
			}
			let dest = [CENTER_X, CENTER_Z];
			let meta = {};
			if (stationKey === "moxie") {
				dest = [-12.5, -9];
				meta = moxieHitData;
			} else if (stationKey === "greenhouse") {
				dest = [-12.5, 7];
				meta = bioHitData;
			} else if (stationKey === "treadmill") {
				dest = [15.5, -10];
				meta = gymHitData;
			} else if (stationKey === "power_grid") {
				dest = [12.5, 7];
				meta = powerHitData;
			} else if (stationKey === "anis_dock") {
				dest = [0, -1.2];
				meta = anisHitData;
			}
			if (meta.stationName) {
				currentStationKey = stationKey;
				const finalImpact = directImpact || meta.impact;
				currentStationMeta = {
					...meta,
					finalImpact
				};
				if (stationKey === "anis_dock") {
					SoundEngine.playPipBoyOpen();
				} else {
					SoundEngine.playClick();
				}
				setIsWorking(true);
				setActiveStation(stationKey);
				setWorkProgress(0);
				setWorkSecondsLeft(Math.ceil(WORK_DURATION));
				workPhase = "LEAPING_TO_STATION";
				charTarget.set(dest[0], 0, dest[1]);
				isMoving = true;
				setCharacterStatusText(lang === "id" ? `Leo melayang melompat menuju ${meta.stationName}... (Gravitasi Mars 0.38g)` : `Leo low-G floating & leaping to ${meta.stationName}... (0.38g Mars)`);
			}
		};
		// 11. Massive Forcefield Dome
		const shieldGeo = new THREE.SphereGeometry(46, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2);
		const shieldMat = new THREE.MeshStandardMaterial({
			color: 2282478,
			emissive: 561586,
			emissiveIntensity: .35,
			transparent: true,
			opacity: .25,
			side: THREE.DoubleSide
		});
		const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
		scene.add(shieldMesh);
		const wireMat = new THREE.LineBasicMaterial({
			color: 6809849,
			transparent: true,
			opacity: .4
		});
		const shieldWire = new THREE.LineSegments(new THREE.WireframeGeometry(shieldGeo), wireMat);
		shieldMesh.add(shieldWire);
		// 12. Pointer Raycasting with Drag Protection
		let pointerDownPos = {
			x: 0,
			y: 0
		};
		let pointerDownTime = 0;
		const onPointerDown = (event) => {
			pointerDownPos = {
				x: event.clientX,
				y: event.clientY
			};
			pointerDownTime = performance.now();
		};
		const onPointerUp = (event) => {
			const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
			const elapsed = performance.now() - pointerDownTime;
			if (dist > 8 || elapsed > 550) return;
			const rect = renderer.domElement.getBoundingClientRect();
			mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
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
		renderer.domElement.addEventListener("pointerdown", onPointerDown);
		renderer.domElement.addEventListener("pointerup", onPointerUp);
		// 13. Render Animation Loop
		let animationFrameId;
		let clock = new THREE.Clock();
		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);
			const delta = Math.min(clock.getDelta(), .1);
			const time = clock.getElapsedTime();
			if (controls) controls.update();
			// STATION ANIMATIONS
			// 1. A.N.I.S. Mars Globe Rotation & Robot Floating Bob
			marsHolo.rotation.y += .015;
			anisRobotBody.position.y = 2.2 + Math.sin(time * 2.5) * .12;
			beacon.scale.setScalar(1 + Math.sin(time * 6) * .2);
			// 2. Solar Hub Battery LED Bar Pulsation
			ledBars.forEach((bar, idx) => {
				bar.material.emissiveIntensity = .6 + Math.sin(time * 4 + idx * .8) * .4;
			});
			// 3. Bio-Dome Grow Light Breathing
			bioGrowLight.intensity = .75 + Math.sin(time * 3) * .2;
			// 4. MOXIE Core Heat Pulsing
			moxieCore.material.emissiveIntensity = .75 + Math.sin(time * 5) * .35;
			// WALKING & LOW-GRAVITY HOPPING ENGINE
			if (isMoving) {
				const dx = charTarget.x - charPos.x;
				const dz = charTarget.z - charPos.z;
				const dist = Math.hypot(dx, dz);
				if (dist > .45) {
					const targetAngle = Math.atan2(dx, dz);
					let diff = targetAngle - astronautGroup.rotation.y;
					while (diff < -Math.PI) diff += Math.PI * 2;
					while (diff > Math.PI) diff -= Math.PI * 2;
					astronautGroup.rotation.y += diff * .22;
					const walkSpeed = 9.2 * delta;
					charPos.x += dx / dist * Math.min(dist, walkSpeed);
					charPos.z += dz / dist * Math.min(dist, walkSpeed);
					walkCycle += delta * 5.6;
					const hopPhase = walkCycle % Math.PI;
					const isLeftLead = Math.floor(walkCycle / Math.PI) % 2 === 0;
					// Parabolic jump arc with atmospheric hangtime at apex (power of 0.72)
					const hopHeight = Math.pow(Math.sin(hopPhase), .72) * 1.5;
					astronautGroup.position.set(charPos.x, hopHeight, charPos.z);
					selectionRing.position.set(charPos.x, .04, charPos.z);
					const ringScale = Math.max(.65, 1.25 - hopHeight / 1.5 * .45);
					selectionRing.scale.set(ringScale, ringScale, ringScale);
					selectionRing.material.opacity = Math.max(.2, .65 - hopHeight / 1.5 * .38);
					torsoMesh.rotation.x = .22 + Math.sin(hopPhase) * .08;
					astronautGroup.rotation.z = Math.sin(walkCycle) * .07;
					// Arms spread outward for balance in low gravity
					const armFlap = Math.sin(hopPhase);
					armLeftPivot.rotation.z = -.6 - armFlap * .35;
					armRightPivot.rotation.z = .6 + armFlap * .35;
					armLeftPivot.rotation.x = isLeftLead ? -.4 - armFlap * .3 : -.2 + armFlap * .4;
					armRightPivot.rotation.x = isLeftLead ? -.2 + armFlap * .4 : -.4 - armFlap * .3;
					if (isLeftLead) {
						legLeftPivot.rotation.x = .45 - Math.sin(hopPhase) * .75;
						legRightPivot.rotation.x = -.7 + Math.sin(hopPhase) * .45;
					} else {
						legRightPivot.rotation.x = .45 - Math.sin(hopPhase) * .75;
						legLeftPivot.rotation.x = -.7 + Math.sin(hopPhase) * .45;
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
					selectionRing.position.set(charPos.x, .04, charPos.z);
					selectionRing.scale.set(1.15, 1.15, 1.15);
					selectionRing.material.opacity = .55;
					if (workPhase === "LEAPING_TO_STATION") {
						if (currentStationKey === "anis_dock") {
							workPhase = "WORKING";
							astronautGroup.rotation.y = 0;
							SoundEngine.playPipBoyOpen();
							onOpenAnis && onOpenAnis();
							setCharacterStatusText(lang === "id" ? "Leo sedang berkonsultasi dengan A.N.I.S. AI" : "Leo consulting A.N.I.S. AI");
							setTimeout(() => {
								if (workPhase === "WORKING" && currentStationKey === "anis_dock") {
									workPhase = "LEAPING_TO_CENTER";
									charTarget.set(CENTER_X, 0, CENTER_Z);
									isMoving = true;
									setCharacterStatusText(lang === "id" ? "Leo kembali ke pos tengah pangkalan... 🚀" : "Leo returning to base center... 🚀");
								}
							}, 4500);
						} else {
							// Start working at station!
							workPhase = "WORKING";
							workTimer = WORK_DURATION;
							lastReportedSec = -1;
							if (currentStationKey === "moxie") {
								SoundEngine.playOxygenFlow();
								astronautGroup.rotation.y = -Math.PI / 2;
							} else if (currentStationKey === "greenhouse") {
								SoundEngine.playOxygenFlow();
								astronautGroup.rotation.y = -Math.PI / 2;
							} else if (currentStationKey === "treadmill") {
								SoundEngine.playBottleCaps();
								astronautGroup.rotation.y = -Math.PI / 2;
							} else if (currentStationKey === "power_grid") {
								SoundEngine.playPowerBuzz();
								astronautGroup.rotation.y = Math.PI / 2;
							}
						}
					} else if (workPhase === "LEAPING_TO_CENTER") {
						// Arrived back at center!
						workPhase = "IDLE";
						currentStationKey = null;
						currentStationMeta = null;
						lastReportedSec = -1;
						astronautGroup.rotation.set(0, 0, 0);
						selectionRing.position.set(CENTER_X, .04, CENTER_Z);
						try {
							if (SoundEngine && typeof SoundEngine.playRadioBeep === "function") {
								SoundEngine.playRadioBeep();
							} else if (SoundEngine && typeof SoundEngine.playClick === "function") {
								SoundEngine.playClick();
							}
						} catch (e) {}
						setIsWorking(false);
						setActiveStation(null);
						setWorkProgress(0);
						setWorkSecondsLeft(0);
						setCharacterStatusText(lang === "id" ? "Commander Leo Siap di Pangkalan" : "Commander Leo Ready at Outpost Center");
					}
				}
			} else {
				// NOT IN TRANSIT: EITHER WORKING AT STATION OR IDLE AT CENTER
				if (workPhase === "WORKING") {
					if (currentStationKey !== "anis_dock") {
						workTimer -= delta;
						const currentSec = Math.max(0, Math.ceil(workTimer));
						const progressPct = Math.min(100, Math.max(0, Math.round((WORK_DURATION - workTimer) / WORK_DURATION * 100)));
						if (currentSec !== lastReportedSec) {
							lastReportedSec = currentSec;
							setWorkSecondsLeft(currentSec);
							setWorkProgress(progressPct);
							let workingMsg = "";
							if (currentStationKey === "moxie") {
								workingMsg = lang === "id" ? `⚙️ Leo sedang melakukan elektrolisis di MOXIE... [⏱️ ${currentSec}s]` : `⚙️ Leo operating MOXIE O2 electrolysis... [⏱️ ${currentSec}s]`;
							} else if (currentStationKey === "greenhouse") {
								workingMsg = lang === "id" ? `🌱 Leo sedang memanen & merawat Bio-Dome... [⏱️ ${currentSec}s]` : `🌱 Leo tending Bio-Dome hydroponics... [⏱️ ${currentSec}s]`;
							} else if (currentStationKey === "treadmill") {
								workingMsg = lang === "id" ? `🏃 Leo sedang berlari anti-atrofi di Treadmill OSDR... [⏱️ ${currentSec}s]` : `🏃 Leo running on OSDR Treadmill... [⏱️ ${currentSec}s]`;
							} else if (currentStationKey === "power_grid") {
								workingMsg = lang === "id" ? `⚡ Leo sedang membersihkan panel surya & baterai... [⏱️ ${currentSec}s]` : `⚡ Leo cleaning solar panels & battery grid... [⏱️ ${currentSec}s]`;
							}
							setCharacterStatusText(workingMsg);
						}
						// Authentic working poses
						if (currentStationKey === "treadmill") {
							walkCycle += delta * 15;
							astronautGroup.position.set(charPos.x, .46 + Math.abs(Math.sin(walkCycle)) * .12, charPos.z);
							astronautGroup.rotation.y = -Math.PI / 2;
							legLeftPivot.rotation.x = Math.sin(walkCycle) * .55;
							legRightPivot.rotation.x = -Math.sin(walkCycle) * .55;
							armLeftPivot.rotation.x = -Math.sin(walkCycle) * .65;
							armRightPivot.rotation.x = Math.sin(walkCycle) * .65;
							torsoMesh.rotation.x = .2;
							selectionRing.position.set(charPos.x, .5, charPos.z);
						} else if (currentStationKey === "moxie") {
							astronautGroup.rotation.y = -Math.PI / 2;
							torsoMesh.rotation.x = .15;
							armLeftPivot.rotation.x = -1.3 + Math.sin(time * 5) * .25;
							armRightPivot.rotation.x = -1.1 + Math.sin(time * 5 + 1.2) * .3;
							astronautGroup.position.y = 0;
							selectionRing.position.set(charPos.x, .04, charPos.z);
						} else if (currentStationKey === "greenhouse") {
							astronautGroup.rotation.y = -Math.PI / 2;
							torsoMesh.rotation.x = .28;
							armLeftPivot.rotation.x = -.9 + Math.sin(time * 4) * .2;
							armRightPivot.rotation.x = -.9 + Math.sin(time * 4 + .8) * .2;
							astronautGroup.position.y = 0;
							selectionRing.position.set(charPos.x, .04, charPos.z);
						} else if (currentStationKey === "power_grid") {
							astronautGroup.rotation.y = Math.PI / 2;
							torsoMesh.rotation.x = .18;
							armRightPivot.rotation.x = -.8;
							armRightPivot.rotation.z = .4 + Math.sin(time * 6) * .45;
							armLeftPivot.rotation.x = -.3;
							astronautGroup.position.y = 0;
							selectionRing.position.set(charPos.x, .04, charPos.z);
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
									action: `✅ ${lang === "id" ? "Pemeliharaan Selesai!" : "Maintenance Complete!"} (${activeDef.action || activeDef.actionDesc})`
								});
								setTimeout(() => setActiveTooltip(null), 3500);
								if (activeDef.rootFbx) {
									const startY = activeDef.rootFbx.position.y;
									activeDef.rootFbx.position.y += .5;
									setTimeout(() => {
										if (activeDef.rootFbx) activeDef.rootFbx.position.y = startY;
									}, 300);
								}
							}
							// Return to center!
							workPhase = "LEAPING_TO_CENTER";
							isMoving = true;
							charTarget.set(CENTER_X, 0, CENTER_Z);
							setWorkProgress(100);
							setWorkSecondsLeft(0);
							setCharacterStatusText(lang === "id" ? "🎉 Tugas selesai! Leo melompat kembali ke pos tengah pangkalan... 🚀" : "🎉 Task complete! Leo hopping back to base center... 🚀");
						}
					} else {
						// ANIS dock idle talking pose
						armRightPivot.rotation.x = -1.8;
						armRightPivot.rotation.z = Math.sin(time * 7) * .35;
						astronautGroup.position.y = 0;
						selectionRing.position.set(charPos.x, .04, charPos.z);
					}
				} else {
					// IDLE AT CENTER - Low gravity hovering float
					torsoMesh.rotation.x = 0;
					astronautGroup.rotation.z = 0;
					armLeftPivot.rotation.z = 0;
					armRightPivot.rotation.z = 0;
					armLeftPivot.rotation.x = Math.sin(time * 1.5) * .08;
					armRightPivot.rotation.x = -Math.sin(time * 1.5) * .08;
					legLeftPivot.rotation.set(0, 0, 0);
					legRightPivot.rotation.set(0, 0, 0);
					astronautGroup.position.y = Math.sin(time * 2.2) * .12 + .08;
					astronautGroup.rotation.y = Math.sin(time * .6) * .12;
					selectionRing.position.set(charPos.x, .04, charPos.z);
					selectionRing.scale.set(1.1, 1.1, 1.1);
					selectionRing.material.opacity = .45 + Math.sin(time * 3) * .2;
				}
			}
			// Shield Pulsation
			shieldMesh.visible = shieldActive;
			if (shieldActive) {
				shieldMesh.rotation.y = time * .08;
				shieldMat.opacity = .2 + Math.sin(time * 3.5) * .07;
			}
			// Emergency Storm Siren
			if (isStorming) {
				alertLight.intensity = Math.sin(time * 8) > 0 ? 3 : .2;
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
		window.addEventListener("resize", handleResize);
		return () => {
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener("resize", handleResize);
			if (renderer.domElement) {
				renderer.domElement.removeEventListener("pointerdown", onPointerDown);
				renderer.domElement.removeEventListener("pointerup", onPointerUp);
			}
			renderer.dispose();
		};
	}, [
		lang,
		shieldActive,
		isStorming
	]);
	return /* @__PURE__ */ React.createElement("div", { className: "relative w-full rounded-2xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.9)] border-4 border-yellow-500 bg-[#070b14] select-none flex flex-col font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2 hazard-stripes border-b border-yellow-600" }), /* @__PURE__ */ React.createElement("div", { className: "relative w-full h-[450px] sm:h-[520px]" }, /* @__PURE__ */ React.createElement("div", {
		ref: mountRef,
		className: "w-full h-full cursor-grab active:cursor-grabbing"
	}), !isLoaded && /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 z-40 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" }), /* @__PURE__ */ React.createElement("div", { className: "text-base font-black font-vault text-yellow-300 tracking-wider" }, lang === "id" ? "MEMUAT PANGKALAN VAULT-TEC MARS & SISTEM NASA..." : "INITIALIZING VAULT-TEC MARS OUTPOST..."), /* @__PURE__ */ React.createElement("div", { className: "w-80 h-4 bg-neutral-900 rounded-full overflow-hidden mt-3 border-2 border-yellow-500/70 p-0.5" }, /* @__PURE__ */ React.createElement("div", {
		className: "h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full",
		style: { width: `${loadingProgress}%` }
	})), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-yellow-200/80 mt-2" }, "Loading: MOXIE Reactor, Bio-Dome, T2 Gym, Solar Grid, A.N.I.S. AI (", loadingProgress, "%)")), activeTooltip && /* @__PURE__ */ React.createElement("div", { className: "absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-neutral-950/95 border-2 border-yellow-400 px-6 py-2.5 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.5)] backdrop-blur-md animate-fadeIn text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-yellow-300 tracking-wider uppercase" }, activeTooltip.name), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-emerald-400 font-bold mt-0.5" }, activeTooltip.action)), /* @__PURE__ */ React.createElement("div", { className: "absolute top-3 left-3 z-20 flex items-center gap-2.5 bg-neutral-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border-2 border-yellow-500/80 shadow-lg" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-yellow-400 font-black tracking-widest uppercase" }, "● REC • CAM-01 • ", lang === "id" ? "HABITAT UTAMA" : "PRIMARY HABITAT"), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-white font-bold" }, "VAULT 703 • ", lang === "id" ? site.name : site.nameEn || site.name, " • Sol ", currentSol))), /* @__PURE__ */ React.createElement("div", { className: "absolute top-3 right-3 z-20 flex items-center gap-2" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => resetCameraRef.current && resetCameraRef.current(),
		className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border-2 border-yellow-500/70 text-xs font-bold text-yellow-300 transition-all shadow-md active:scale-95",
		title: lang === "id" ? "Kembalikan sudut kamera awal" : "Reset Camera Angle"
	}, /* @__PURE__ */ React.createElement("span", null, "🎥"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "Reset Kamera" : "Reset Camera"))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-3 right-3 z-20 hidden sm:flex items-center gap-2 bg-neutral-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-neutral-700 text-[10px] text-neutral-300 shadow-md" }, /* @__PURE__ */ React.createElement("span", null, "🎮"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "Klik & geser untuk rotasi 360° • Scroll untuk zoom" : "Drag to rotate 360° • Scroll to zoom"))), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-[#0a0f1d] border-t-2 border-yellow-500 p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2.5 z-20" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 text-xs flex-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, isWorking ? /* @__PURE__ */ React.createElement("span", { className: "text-yellow-400 font-bold animate-spin text-sm" }, "⚙️") : /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }), /* @__PURE__ */ React.createElement("span", { className: `font-bold tracking-wide ${isWorking ? "text-yellow-300" : "text-emerald-300 pipboy-glow"}` }, "[LEO-01]: ", dailyShiftsLeft <= 0 && !isWorking ? lang === "id" ? "Shift hari ini selesai (3/3). Leo beristirahat untuk evaluasi malam 🌙" : "All 3/3 shifts completed. Leo resting for night evaluation 🌙" : characterStatusText)), isWorking && workSecondsLeft > 0 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 px-2.5 py-1 bg-yellow-950/80 border border-yellow-400 rounded-md shadow-[0_0_10px_rgba(234,179,8,0.4)]" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-black text-yellow-300 font-vault tracking-widest uppercase" }, lang === "id" ? "PROSES" : "BUSY", ": ", workSecondsLeft, "s"), /* @__PURE__ */ React.createElement("div", { className: "w-16 h-2 bg-neutral-900 rounded-full overflow-hidden border border-yellow-500/60 p-0.5" }, /* @__PURE__ */ React.createElement("div", {
		className: "h-full bg-gradient-to-r from-yellow-500 to-emerald-400 transition-all duration-300 rounded-full",
		style: { width: `${workProgress}%` }
	}))), /* @__PURE__ */ React.createElement("div", {
		className: "flex items-center gap-1.5 px-2.5 py-1 bg-neutral-950/90 rounded-lg border border-yellow-500/70 shadow-inner",
		title: lang === "id" ? "Batas Shift Tugas Harian Astronot" : "Daily Astronaut Shift Limit"
	}, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-black text-yellow-300 tracking-wider font-vault uppercase" }, lang === "id" ? "SHIFT" : "SHIFTS", ":"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, [
		0,
		1,
		2
	].map((idx) => {
		const isReady = idx < dailyShiftsLeft;
		return /* @__PURE__ */ React.createElement("div", {
			key: idx,
			className: `w-3.5 h-3.5 rounded-sm flex items-center justify-center transition-all ${isReady ? "bg-emerald-500 border border-emerald-300 shadow-[0_0_8px_rgba(34,197,94,0.8)]" : "bg-neutral-800 border border-neutral-700 opacity-40"}`,
			title: isReady ? lang === "id" ? `Shift ${idx + 1} Siap` : `Shift ${idx + 1} Ready` : lang === "id" ? `Shift ${idx + 1} Terpakai` : `Shift ${idx + 1} Used`
		}, isReady && /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse" }));
	})), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-black font-vault ${dailyShiftsLeft > 0 ? "text-emerald-400" : "text-rose-400 animate-pulse"}` }, dailyShiftsLeft, "/3"))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "relative" }, highlightedTarget === "power_grid" && /* @__PURE__ */ React.createElement("div", { className: "absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-yellow-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#facc15] whitespace-nowrap" }, lang === "id" ? "👆 KLIK INI" : "👆 CLICK HERE"), /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 bg-yellow-400 rotate-45 -mt-1" })), /* @__PURE__ */ React.createElement("button", {
		onClick: () => triggerStationRef.current && triggerStationRef.current("power_grid"),
		disabled: isWorking || dailyShiftsLeft <= 0,
		className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all transform ${highlightedTarget === "power_grid" ? "ring-4 ring-yellow-400 bg-yellow-500/40 shadow-[0_0_25px_rgba(250,204,21,0.9)] animate-pulse scale-105" : isWorking ? activeStation === "power_grid" ? "ring-2 ring-yellow-400 bg-yellow-500/20 animate-pulse" : "opacity-40 cursor-not-allowed" : dailyShiftsLeft <= 0 ? "opacity-40 cursor-not-allowed" : "active:scale-95"}`,
		title: isWorking ? lang === "id" ? "Leo sedang sibuk bekerja..." : "Leo is busy working..." : dailyShiftsLeft <= 0 ? lang === "id" ? "Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!" : "Daily shifts depleted (3/3). Proceed to night evaluation!" : lang === "id" ? "Kirim Leo ke Hub Panel Surya & Baterai (+15% Daya, -10% O2)" : "Send Leo to Solar Panel & Battery Hub (+15% Power, -10% O2)"
	}, /* @__PURE__ */ React.createElement("span", null, "⚡"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "PANEL SURYA" : "POWER GRID"))), /* @__PURE__ */ React.createElement("div", { className: "relative" }, highlightedTarget === "moxie" && /* @__PURE__ */ React.createElement("div", { className: "absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-cyan-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#22d3ee] whitespace-nowrap" }, lang === "id" ? "👆 KLIK INI" : "👆 CLICK HERE"), /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 bg-cyan-400 rotate-45 -mt-1" })), /* @__PURE__ */ React.createElement("button", {
		onClick: () => triggerStationRef.current && triggerStationRef.current("moxie"),
		disabled: isWorking || dailyShiftsLeft <= 0,
		className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-cyan-300 text-xs font-bold transition-all transform ${highlightedTarget === "moxie" ? "ring-4 ring-cyan-400 bg-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.9)] animate-pulse scale-105" : isWorking ? activeStation === "moxie" ? "ring-2 ring-cyan-400 bg-cyan-500/20 animate-pulse" : "opacity-40 cursor-not-allowed" : dailyShiftsLeft <= 0 ? "opacity-40 cursor-not-allowed" : "active:scale-95"}`,
		title: isWorking ? lang === "id" ? "Leo sedang sibuk bekerja..." : "Leo is busy working..." : dailyShiftsLeft <= 0 ? lang === "id" ? "Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!" : "Daily shifts depleted (3/3). Proceed to night evaluation!" : lang === "id" ? "Kirim Leo ke Reaktor MOXIE (+15% O2, -10% Daya)" : "Send Leo to MOXIE Reactor (+15% O2, -10% Power)"
	}, /* @__PURE__ */ React.createElement("span", null, "💨"), /* @__PURE__ */ React.createElement("span", null, "MOXIE (+O2)"))), /* @__PURE__ */ React.createElement("button", {
		onClick: () => triggerStationRef.current && triggerStationRef.current("greenhouse"),
		disabled: isWorking || dailyShiftsLeft <= 0,
		className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-emerald-300 text-xs font-bold transition-all transform ${isWorking ? activeStation === "greenhouse" ? "ring-2 ring-emerald-400 bg-emerald-500/20 animate-pulse" : "opacity-40 cursor-not-allowed" : dailyShiftsLeft <= 0 ? "opacity-40 cursor-not-allowed" : "active:scale-95"}`,
		title: isWorking ? lang === "id" ? "Leo sedang sibuk bekerja..." : "Leo is busy working..." : dailyShiftsLeft <= 0 ? lang === "id" ? "Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!" : "Daily shifts depleted (3/3). Proceed to night evaluation!" : lang === "id" ? "Kirim Leo ke Bio-Dome (+15% Kru, -10% Daya)" : "Send Leo to Bio-Dome (+15% Crew, -10% Power)"
	}, /* @__PURE__ */ React.createElement("span", null, "🌱"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "BIO-DOME (+KRU)" : "BIO-DOME (+CREW)")), /* @__PURE__ */ React.createElement("button", {
		onClick: () => triggerStationRef.current && triggerStationRef.current("treadmill"),
		disabled: isWorking || dailyShiftsLeft <= 0,
		className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg vault-btn text-indigo-300 text-xs font-bold transition-all transform ${isWorking ? activeStation === "treadmill" ? "ring-2 ring-indigo-400 bg-indigo-500/20 animate-pulse" : "opacity-40 cursor-not-allowed" : dailyShiftsLeft <= 0 ? "opacity-40 cursor-not-allowed" : "active:scale-95"}`,
		title: isWorking ? lang === "id" ? "Leo sedang sibuk bekerja..." : "Leo is busy working..." : dailyShiftsLeft <= 0 ? lang === "id" ? "Shift hari ini telah habis (3/3). Lanjutkan ke evaluasi malam!" : "Daily shifts depleted (3/3). Proceed to night evaluation!" : lang === "id" ? "Kirim Leo ke Treadmill NASA T2 (+15% Kru, -10% O2)" : "Send Leo to NASA T2 Treadmill (+15% Crew, -10% O2)"
	}, /* @__PURE__ */ React.createElement("span", null, "🏃"), /* @__PURE__ */ React.createElement("span", null, "TREADMILL (OSDR)")), /* @__PURE__ */ React.createElement("div", { className: "relative" }, highlightedTarget === "anis_dock" && /* @__PURE__ */ React.createElement("div", { className: "absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center animate-bounce" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-emerald-400 text-black text-[9px] font-vault font-black tracking-wider uppercase shadow-[0_0_10px_#34d399] whitespace-nowrap" }, lang === "id" ? "👆 KLIK INI" : "👆 CLICK HERE"), /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 bg-emerald-400 rotate-45 -mt-1" })), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playPipBoyOpen();
			triggerStationRef.current && triggerStationRef.current("anis_dock");
		},
		disabled: isWorking && activeStation !== "anis_dock",
		className: `flex items-center gap-1.5 px-4 py-1.5 rounded-lg vault-btn-green text-emerald-300 text-xs font-black transition-all transform shadow-[0_0_15px_rgba(34,197,94,0.5)] border-2 border-emerald-400 ${highlightedTarget === "anis_dock" ? "ring-4 ring-emerald-400 bg-emerald-500/40 shadow-[0_0_25px_rgba(34,197,94,0.9)] animate-pulse scale-105" : isWorking && activeStation !== "anis_dock" ? "opacity-40 cursor-not-allowed" : "active:scale-95"}`,
		title: lang === "id" ? "Buka Terminal Pip-Boy 3000 / A.N.I.S. AI" : "Open Pip-Boy 3000 / A.N.I.S. AI Terminal"
	}, /* @__PURE__ */ React.createElement("span", { className: "text-sm" }, "📟"), /* @__PURE__ */ React.createElement("span", { className: "pipboy-glow tracking-wider" }, "PIP-BOY • A.N.I.S."), /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }))))));
}
// --- src/components/ResourceBars.jsx ---
// ResourceBars - Authentic Fallout Shelter Style Capsule Resource Meters
function ResourceBars({ resources, radiationDose, lang }) {
	const { power, oxygen, health } = resources;
	const meters = [
		{
			id: "power",
			icon: "⚡",
			label: lang === "id" ? "DAYA LISTRIK" : "POWER",
			sublabel: lang === "id" ? "Panel Surya & Baterai" : "Solar & Power Core",
			value: Math.round(power),
			color: "bg-amber-400",
			glow: "shadow-[0_0_12px_rgba(250,204,21,0.8)]",
			border: "border-amber-500",
			badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/50",
			isDanger: power <= 25,
			desc: lang === "id" ? "Menyalakan pemanas (-80°C) & perisai radiasi." : "Powers habitat thermal grid and storm shielding."
		},
		{
			id: "oxygen",
			icon: "💨",
			label: lang === "id" ? "OKSIGEN" : "OXYGEN",
			sublabel: lang === "id" ? "Mesin MOXIE (ISRU)" : "MOXIE ISRU Extractor",
			value: Math.round(oxygen),
			color: "bg-cyan-400",
			glow: "shadow-[0_0_12px_rgba(34,211,238,0.8)]",
			border: "border-cyan-500",
			badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
			isDanger: oxygen <= 25,
			desc: lang === "id" ? "Ekstraksi oksigen dari atmosfer CO2 Mars." : "Electrolyzed from thin Martian CO2 air."
		},
		{
			id: "health",
			icon: "❤️",
			label: lang === "id" ? "KESEHATAN KRU" : "CREW HEALTH",
			sublabel: lang === "id" ? "Bio-Dome & Treadmill" : "Bio-Dome & OSDR Gym",
			value: Math.round(health),
			color: "bg-emerald-400",
			glow: "shadow-[0_0_12px_rgba(52,211,153,0.8)]",
			border: "border-emerald-500",
			badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
			isDanger: health <= 25,
			desc: lang === "id" ? "Nutrisi sayuran & pencegahan atrofi gravitasi 0.38g." : "Microgreen nutrition & low-G exercise."
		}
	];
	return /* @__PURE__ */ React.createElement("div", { className: "w-full grid grid-cols-1 md:grid-cols-3 gap-3 my-2 font-mono" }, meters.map((m) => /* @__PURE__ */ React.createElement("div", {
		key: m.id,
		className: `relative p-3 rounded-xl border-2 transition-all ${m.isDanger ? "bg-rose-950/70 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse" : "bg-neutral-900/95 border-yellow-500/70 shadow-[0_4px_0_#713f12,0_8px_16px_rgba(0,0,0,0.6)]"}`
	}, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("div", { className: `w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border ${m.badgeBg} shadow-inner` }, m.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-amber-300 font-sans tracking-wider uppercase" }, m.label), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400" }, m.sublabel))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: `text-base font-black ${m.isDanger ? "text-rose-400 font-pipboy" : "text-amber-200"}` }, m.value, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-neutral-400 font-normal" }, " / 100")), /* @__PURE__ */ React.createElement("div", { className: `text-[9px] font-bold tracking-widest ${m.isDanger ? "text-rose-400 animate-pulse" : "text-emerald-400"}` }, m.isDanger ? lang === "id" ? "KRITIS!" : "DANGER!" : lang === "id" ? "STABIL" : "OPTIMAL"))), /* @__PURE__ */ React.createElement("div", { className: "relative w-full h-4 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-700 shadow-inner" }, /* @__PURE__ */ React.createElement("div", {
		className: "absolute top-0 bottom-0 w-0.5 bg-rose-500 z-20 shadow-[0_0_6px_#f43f5e]",
		style: { left: "25%" },
		title: lang === "id" ? "Garis Batas Bahaya (25%)" : "Critical Hazard Threshold (25%)"
	}, /* @__PURE__ */ React.createElement("div", { className: "absolute -top-1 -left-1 w-2.5 h-1.5 bg-rose-500 rounded-b-sm" }), /* @__PURE__ */ React.createElement("div", { className: "absolute -bottom-1 -left-1 w-2.5 h-1.5 bg-rose-500 rounded-t-sm" })), /* @__PURE__ */ React.createElement("div", {
		className: "absolute top-0 bottom-0 w-px bg-neutral-800 z-10",
		style: { left: "50%" }
	}), /* @__PURE__ */ React.createElement("div", {
		className: "absolute top-0 bottom-0 w-px bg-neutral-800 z-10",
		style: { left: "75%" }
	}), /* @__PURE__ */ React.createElement("div", {
		className: `h-full rounded-full transition-all duration-500 ${m.isDanger ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-pulse" : `${m.color} ${m.glow}`}`,
		style: { width: `${Math.max(0, Math.min(100, m.value))}%` }
	})), /* @__PURE__ */ React.createElement("div", { className: "mt-1.5 flex items-center justify-between text-[10px] text-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, m.desc), /* @__PURE__ */ React.createElement("span", { className: "text-[9px] text-neutral-500 font-bold shrink-0 ml-1" }, "MIN: 25%")))));
}
// --- src/components/SolBriefingModal.jsx ---
// SolBriefingModal - Authentic Fallout Shelter Style Morning Space Weather Briefing
function SolBriefingModal({ isOpen, currentSol, donkiEvent, site, onStartSol, onOpenAnis, lang }) {
	if (!isOpen || !donkiEvent) return null;
	const handleStart = () => {
		SoundEngine.playClick();
		onStartSol();
	};
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] overflow-hidden border-4 border-yellow-500 flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 text-center border-b-2 border-yellow-500/70 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "🛰️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-wider uppercase block" }, "VAULT-TEC • NASA DONKI SPACE WEATHER ALERT"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-neutral-400 font-sans" }, lang === "id" ? "Transmisi Cuaca Luar Angkasa Real-Time dari Satelit NASA" : "Real-Time Space Weather Satellite Transmission from NASA"))), /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 rounded-lg bg-yellow-400 text-black font-vault text-xs font-black shadow-[0_0_10px_rgba(250,204,21,0.6)]" }, "SOL ", currentSol)), /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto no-scrollbar bg-[#070d1e]" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3.5 rounded-xl border-2 border-neutral-700 flex flex-wrap items-center justify-between gap-2 shadow-inner" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-yellow-400 uppercase tracking-widest font-bold" }, lang === "id" ? "SEKTOR PANGKALAN MARS TREK" : "MARS TREK OUTPOST SECTOR"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-black text-white font-vault" }, lang === "id" ? site.name : site.nameEn || site.name)), /* @__PURE__ */ React.createElement("div", { className: "flex gap-4 text-xs" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, lang === "id" ? "Suhu Siang: " : "Day Temp: "), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300 font-bold" }, site.weatherBaseline.dayTempC, "°C")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, lang === "id" ? "Suhu Malam: " : "Night Temp: "), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300 font-bold" }, site.weatherBaseline.nightTempC, "°C")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, lang === "id" ? "Tekanan: " : "Pressure: "), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold" }, site.weatherBaseline.pressurePa, " Pa")))), /* @__PURE__ */ React.createElement("div", { className: `p-4 rounded-xl border-3 shadow-lg ${donkiEvent.hazardLevel === "CRITICAL" || donkiEvent.hazardLevel === "EXTREME" ? "bg-rose-950/60 border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.3)]" : "bg-amber-950/50 border-yellow-500/80"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded text-[10px] font-vault font-black bg-yellow-400 text-black" }, donkiEvent.type), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-vault font-black px-2 py-0.5 rounded ${donkiEvent.hazardLevel === "EXTREME" ? "bg-rose-600 text-white animate-pulse" : donkiEvent.hazardLevel === "CRITICAL" ? "bg-rose-700 text-white" : "bg-amber-600 text-white"}` }, "HAZARD: ", donkiEvent.hazardLevel)), /* @__PURE__ */ React.createElement("h3", { className: "text-sm sm:text-base font-black text-white font-vault tracking-wide" }, donkiEvent.name || donkiEvent.officialId)), /* @__PURE__ */ React.createElement("div", { className: "text-right text-[10px] text-neutral-400 bg-black/60 px-2 py-1 rounded border border-neutral-700" }, /* @__PURE__ */ React.createElement("div", null, lang === "id" ? "Tanggal Satelit:" : "Satellite Date:"), /* @__PURE__ */ React.createElement("div", { className: "text-yellow-300 font-bold" }, donkiEvent.date || donkiEvent.catalogDate))), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-200 mt-2.5 leading-relaxed font-sans" }, donkiEvent.description), /* @__PURE__ */ React.createElement("div", { className: "mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-bold" }, /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, "⚡ ", lang === "id" ? "Listrik:" : "Power:"), /* @__PURE__ */ React.createElement("span", { className: donkiEvent.gameImpact.powerDrainMultiplier > 1 ? "text-rose-400" : "text-emerald-400" }, donkiEvent.gameImpact.powerDrainMultiplier > 1 ? `x${donkiEvent.gameImpact.powerDrainMultiplier}` : "Nominal")), /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, "☢️ ", lang === "id" ? "Radiasi:" : "Radiation:"), /* @__PURE__ */ React.createElement("span", { className: "text-rose-400" }, "+", donkiEvent.gameImpact.radiationDoseMsv, " mSv")), /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2 rounded-lg border border-neutral-700 flex items-center justify-between col-span-2 sm:col-span-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-neutral-400" }, "🛡️ ", lang === "id" ? "Rekomendasi:" : "Shielding:"), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300" }, donkiEvent.gameImpact.radiationDoseMsv > 15 ? lang === "id" ? "Perisai Wajib!" : "Shield Required!" : lang === "id" ? "Perisai Opsional" : "Shield Optional")))), /* @__PURE__ */ React.createElement("div", { className: "pipboy-crt p-4 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 shadow-inner relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1.5 pipboy-glow" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-vault font-black text-emerald-300 uppercase tracking-widest text-[11px]" }, /* @__PURE__ */ React.createElement("span", null, "🤖"), /* @__PURE__ */ React.createElement("span", null, "A.N.I.S. • ", lang === "id" ? "Penerjemah Bahasa Anak" : "Plain Language Translator")), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playPipBoyOpen();
			onOpenAnis(donkiEvent.type);
		},
		className: "text-[10px] text-emerald-300 hover:text-white underline font-bold"
	}, "[ ", lang === "id" ? "Tanya Lebih Lanjut" : "Consult A.N.I.S.", " ]")), /* @__PURE__ */ React.createElement("p", { className: "font-sans leading-relaxed pipboy-glow relative z-30" }, "\"", lang === "id" ? donkiEvent.plainLanguageAnis : donkiEvent.plainLanguageEn, "\""))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 border-t-2 border-yellow-500/70 flex justify-end gap-3" }, /* @__PURE__ */ React.createElement("button", {
		onClick: handleStart,
		className: "w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-vault font-black text-sm tracking-wider uppercase shadow-[0_4px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
	}, /* @__PURE__ */ React.createElement("span", null, "🚀"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "MULAI HARI (SOL) & AMBIL KEPUTUSAN" : "INITIATE SOL MISSION"), /* @__PURE__ */ React.createElement("span", null, "➔")))));
}
// --- src/components/TradeOffCard.jsx ---
// TradeOffCard - Authentic Fallout Shelter Style Overseer Emergency Directive
function TradeOffCard({ event, resources, onSelectChoice, lang }) {
	const [selectedChoiceId, setSelectedChoiceId] = useState(null);
	const [confirmedOutcome, setConfirmedOutcome] = useState(null);
	if (!event) return null;
	const handleChoose = (choice) => {
		SoundEngine.playClick();
		setSelectedChoiceId(choice.id);
	};
	const handleConfirm = () => {
		const choice = event.choices.find((c) => c.id === selectedChoiceId);
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
	const activeChoice = event.choices.find((c) => c.id === selectedChoiceId);
	return /* @__PURE__ */ React.createElement("div", { className: "w-full vault-panel rounded-xl p-4 sm:p-5 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 hazard-stripes mb-3 rounded-sm" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-600/50 pb-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded bg-yellow-400 text-black font-black text-xs font-vault" }, lang === "id" ? event.tag : event.tagEn || event.tag), /* @__PURE__ */ React.createElement("h2", { className: "text-sm sm:text-base font-black text-yellow-300 font-vault tracking-wide uppercase" }, lang === "id" ? event.title : event.titleEn || event.title)), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-700" }, lang === "id" ? "SIKLUS SIANG • KEPUTUSAN OVERSEER" : "MIDDAY INCIDENT • OVERSEER DIRECTIVE")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-3.5 rounded-lg border-2 border-neutral-700 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-yellow-400 uppercase tracking-widest font-black mb-1 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", null, "📋"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "LAPORAN SITUASI PANGKALAN" : "OUTPOST STATUS LOG")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-200 leading-relaxed font-sans" }, lang === "id" ? event.description : event.descriptionEn || event.description)), /* @__PURE__ */ React.createElement("div", { className: "pipboy-crt p-3.5 rounded-lg border-2 border-emerald-500 shadow-inner relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-[9px] text-emerald-400 uppercase tracking-widest font-black mb-1 pipboy-glow" }, /* @__PURE__ */ React.createElement("span", null, "🤖"), /* @__PURE__ */ React.createElement("span", null, "A.N.I.S. • ", lang === "id" ? "TRANSLASI BAHASA ANAK" : "PLAIN LANGUAGE TIP")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-200 leading-relaxed pipboy-glow font-sans relative z-30" }, "\"", lang === "id" ? event.plainLanguageAnis : event.plainLanguageEn || event.plainLanguageAnis, "\""))), confirmedOutcome && /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-3 border-emerald-400 rounded-xl p-4 mb-4 text-center animate-fadeIn shadow-[0_0_25px_rgba(34,197,94,0.4)]" }, /* @__PURE__ */ React.createElement("div", { className: "text-3xl mb-1" }, "👍"), /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-black text-emerald-300 font-vault tracking-wide mb-1 uppercase" }, lang === "id" ? "DIREKTIF VAULT BERHASIL DIJALANKAN!" : "OVERSEER DIRECTIVE EXECUTED!"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-200 mb-2 font-sans" }, lang === "id" ? confirmedOutcome.outcomeSummary : confirmedOutcome.outcomeSummaryEn || confirmedOutcome.outcomeSummary), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-emerald-200 font-mono bg-black/60 p-2.5 rounded-lg border border-emerald-500/40 text-left" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300" }, lang === "id" ? "💡 FAKTA SAINS NASA: " : "💡 NASA SCIENCE FACT: "), lang === "id" ? confirmedOutcome.scientificLesson : confirmedOutcome.scientificLessonEn || confirmedOutcome.scientificLesson)), !confirmedOutcome && /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-yellow-300 tracking-wider uppercase font-vault flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", null, "⚖️"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "PILIH STRATEGI BERTAHAN HIDUP (TRADE-OFF):" : "CHOOSE YOUR SURVIVAL DIRECTIVE:")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, event.choices.map((choice, idx) => {
		const isSelected = selectedChoiceId === choice.id;
		return /* @__PURE__ */ React.createElement("div", {
			key: choice.id,
			onClick: () => handleChoose(choice),
			className: `cursor-pointer rounded-xl p-3.5 border-3 transition-all ${isSelected ? "bg-[#1e293b] border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5),0_4px_0_#ca8a04] -translate-y-1" : "bg-[#0b1329] border-neutral-700 hover:border-yellow-500/70 shadow-[0_3px_0_#1e293b]"}`
		}, /* @__PURE__ */ React.createElement("div", { className: "flex items-start justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-xs sm:text-sm font-black text-white font-vault flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: `w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? "border-yellow-400 bg-yellow-400" : "border-neutral-500"}` }, isSelected && /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-black" })), /* @__PURE__ */ React.createElement("span", null, "[ DIRECTIVE 0", idx + 1, " ]: ", lang === "id" ? choice.title : choice.titleEn || choice.title)), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-black text-yellow-300 px-2 py-0.5 rounded bg-yellow-950/80 border border-yellow-500/60 shrink-0" }, "+", choice.impact.scienceXp, " XP")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300 mb-3 font-sans leading-relaxed" }, lang === "id" ? choice.description : choice.descriptionEn || choice.description), /* @__PURE__ */ React.createElement("div", { className: "bg-black/70 rounded-lg p-2 border border-neutral-800 flex flex-wrap gap-2 text-[10px]" }, /* @__PURE__ */ React.createElement("span", { className: `px-2 py-0.5 rounded font-black ${choice.impact.power > 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-600" : choice.impact.power < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"}` }, "⚡ ", lang === "id" ? "LISTRIK" : "POWER", ": ", choice.impact.power > 0 ? `+${choice.impact.power}` : choice.impact.power, "%"), /* @__PURE__ */ React.createElement("span", { className: `px-2 py-0.5 rounded font-black ${choice.impact.oxygen > 0 ? "bg-cyan-950 text-cyan-300 border border-cyan-600" : choice.impact.oxygen < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"}` }, "💨 ", lang === "id" ? "OKSIGEN" : "OXYGEN", ": ", choice.impact.oxygen > 0 ? `+${choice.impact.oxygen}` : choice.impact.oxygen, "%"), /* @__PURE__ */ React.createElement("span", { className: `px-2 py-0.5 rounded font-black ${choice.impact.health > 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-600" : choice.impact.health < 0 ? "bg-rose-950 text-rose-300 border border-rose-600" : "bg-neutral-800 text-neutral-400"}` }, "❤️ ", lang === "id" ? "KESEHATAN" : "CREW HEALTH", ": ", choice.impact.health > 0 ? `+${choice.impact.health}` : choice.impact.health, "%")));
	})), selectedChoiceId && /* @__PURE__ */ React.createElement("div", { className: "pt-2 flex justify-end" }, /* @__PURE__ */ React.createElement("button", {
		onClick: handleConfirm,
		className: "w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-vault font-black text-sm tracking-wider uppercase shadow-[0_5px_0_#854d0e,0_10px_20px_rgba(234,179,8,0.4)] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
	}, /* @__PURE__ */ React.createElement("span", null, "⚙️"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "JALANKAN KEPUTUSAN KOMANDAN" : "CONFIRM OVERSEER DIRECTIVE"), /* @__PURE__ */ React.createElement("span", null, "➔")))));
}
// --- src/components/AfternoonActivities.jsx ---
// AfternoonActivities - Authentic Fallout Shelter Style Outpost Maintenance & Room Jobs
function AfternoonActivities({ resources, onPerformActivity, onProceedToNight, lang }) {
	const [completedActivities, setCompletedActivities] = useState({});
	const activities = [
		{
			id: "wipe_panels",
			icon: "⚡",
			title: lang === "id" ? "Sikat Debu Panel Surya" : "Wipe Solar Dust",
			room: "ROOM 01: POWER GENERATOR",
			description: lang === "id" ? "Bersihkan pasir merah Mars yang menempel di panel surya agar efisiensi foton maksimal." : "Sweep red dust off the solar array to maximize photon intake.",
			tradeOff: lang === "id" ? "⚡ +15% Listrik | 💨 -5% O2 (EVA Kru)" : "⚡ +15% Power | 💨 -5% O2 (Crew EVA)",
			impact: {
				power: 15,
				oxygen: -5,
				health: 0
			},
			sound: () => SoundEngine.playPowerBuzz()
		},
		{
			id: "water_crops",
			icon: "🌱",
			title: lang === "id" ? "Rawat Sayuran Bio-Dome" : "Nurture Bio-Greens",
			room: "ROOM 02: HYDROPONIC DINER",
			description: lang === "id" ? "Siram selada segar kaya zat besi untuk melawan anemia mikrogravitasi astronot." : "Water iron-rich microgreens to counter spaceflight anemia.",
			tradeOff: lang === "id" ? "❤️ +15% Kesehatan | ⚡ -5% Listrik" : "❤️ +15% Crew Health | ⚡ -5% Power",
			impact: {
				power: -5,
				oxygen: 5,
				health: 15
			},
			sound: () => SoundEngine.playOxygenFlow()
		},
		{
			id: "treadmill_workout",
			icon: "🏃",
			title: lang === "id" ? "Latihan Treadmill Anti-Atrofi" : "Treadmill Workout",
			room: "ROOM 03: ATHLETIC T2 GYM",
			description: lang === "id" ? "Kru berlari melawan pegas gravitasi rendah (0.38g) untuk menjaga kepadatan tulang." : "Exercise on harness treadmill to prevent bone and muscle loss.",
			tradeOff: lang === "id" ? "❤️ +15% Kesehatan | 💨 -5% O2" : "❤️ +15% Crew Health | 💨 -5% O2",
			impact: {
				power: 0,
				oxygen: -5,
				health: 15
			},
			sound: () => SoundEngine.playBottleCaps()
		},
		{
			id: "tune_moxie",
			icon: "💨",
			title: lang === "id" ? "Kalibrasi Katup MOXIE" : "Tune MOXIE Valves",
			room: "ROOM 04: MOXIE ISRU REFINERY",
			description: lang === "id" ? "Setel aliran intake karbon dioksida agar elektrolisis katalitik oksigen optimal." : "Optimize CO2 intake pressure for peak catalytic O2 output.",
			tradeOff: lang === "id" ? "💨 +15% Oksigen | ⚡ -5% Listrik" : "💨 +15% Oxygen | ⚡ -5% Power",
			impact: {
				power: -5,
				oxygen: 15,
				health: 0
			},
			sound: () => SoundEngine.playOxygenFlow()
		}
	];
	const handleExecute = (act) => {
		if (completedActivities[act.id]) return;
		SoundEngine.playClick();
		act.sound();
		onPerformActivity(act.impact);
		setCompletedActivities((prev) => ({
			...prev,
			[act.id]: true
		}));
	};
	return /* @__PURE__ */ React.createElement("div", { className: "w-full vault-panel rounded-xl p-4 sm:p-5 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 hazard-stripes mb-3 rounded-sm" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b-2 border-yellow-600/50 pb-3 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "🛠️"), /* @__PURE__ */ React.createElement("h2", { className: "text-sm sm:text-base font-black text-yellow-300 font-vault tracking-wide uppercase" }, lang === "id" ? "PERAWATAN RUANGAN PANGKALAN (ROOM MAINTENANCE)" : "VAULT ROOM MAINTENANCE & PRODUCTION")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-400 font-sans mt-0.5" }, lang === "id" ? "Tugaskan Komandan Leo ke modul pangkalan untuk memulihkan sumber daya sebelum malam tiba!" : "Assign Commander Leo to outpost modules to produce resources before nightfall!")), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onProceedToNight();
		},
		className: "px-5 py-2.5 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_3px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-1.5 border border-yellow-200"
	}, /* @__PURE__ */ React.createElement("span", null, "🌙"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "LANJUT KE EVALUASI MALAM" : "END SOL & EVALUATE"), /* @__PURE__ */ React.createElement("span", null, "➔"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, activities.map((act) => {
		const isDone = completedActivities[act.id];
		return /* @__PURE__ */ React.createElement("div", {
			key: act.id,
			className: `p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${isDone ? "bg-[#062c12]/90 border-emerald-500/80 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "bg-[#0b1329] border-neutral-700 hover:border-yellow-400/80 shadow-[0_3px_0_#1e293b]"}`
		}, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px] text-yellow-400/90 font-black mb-1" }, /* @__PURE__ */ React.createElement("span", null, "[ ", act.room, " ]"), isDone && /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 pipboy-glow" }, "● ", lang === "id" ? "SELESAI" : "COMPLETE")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, act.icon), /* @__PURE__ */ React.createElement("h3", { className: "text-xs sm:text-sm font-black text-white font-vault tracking-wide" }, act.title)), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300 font-sans leading-relaxed mb-3" }, act.description)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "bg-black/70 p-1.5 rounded border border-neutral-800 text-[10px] text-amber-300 font-bold mb-2.5" }, act.tradeOff), /* @__PURE__ */ React.createElement("button", {
			disabled: isDone,
			onClick: () => handleExecute(act),
			className: `w-full py-2 px-3 rounded-lg font-vault font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${isDone ? "bg-emerald-950 text-emerald-400 border border-emerald-600 cursor-not-allowed opacity-80" : "vault-btn text-yellow-300 hover:text-white"}`
		}, /* @__PURE__ */ React.createElement("span", null, isDone ? "👍" : "⚡"), /* @__PURE__ */ React.createElement("span", null, isDone ? lang === "id" ? "SUDAH DIKERJAKAN" : "JOB COMPLETED" : lang === "id" ? "TUGASKAN LEO" : "ASSIGN LEO"))));
	})));
}
// --- src/components/EveningEvaluation.jsx ---
// EveningEvaluation - Authentic Fallout Shelter Style Daily Overseer Report
function EveningEvaluation({ currentSol, resources, previousResources, scienceXp, site, onNextSol, lang }) {
	const { power, oxygen, health } = resources;
	useEffect(() => {
		SoundEngine.playBottleCaps();
		try {
			confetti({
				particleCount: 50,
				spread: 70,
				origin: { y: .6 }
			});
		} catch (e) {}
	}, []);
	const handleNextSol = () => {
		SoundEngine.playClick();
		onNextSol();
	};
	return /* @__PURE__ */ React.createElement("div", { className: "w-full vault-panel rounded-xl p-5 sm:p-6 font-mono shadow-[0_8px_25px_rgba(0,0,0,0.8)] border-3 border-yellow-500" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 hazard-stripes mb-3 rounded-sm" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b-2 border-yellow-600/50 pb-3 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-lg bg-yellow-400 text-black flex items-center justify-center text-2xl font-bold shadow-[0_0_15px_rgba(250,204,21,0.6)]" }, "📊"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-yellow-400 uppercase tracking-widest font-black" }, lang === "id" ? "LAPORAN EVALUASI HARIAN OVERSEER" : "VAULT-TEC DAILY OVERSEER DEBRIEF"), /* @__PURE__ */ React.createElement("h2", { className: "text-base sm:text-lg font-black text-white font-vault tracking-wide uppercase" }, lang === "id" ? `EVALUASI AKHIR SOL ${currentSol}` : `SOL ${currentSol} PERFORMANCE REPORT`))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-500/70" }, /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 uppercase tracking-widest" }, "TOTAL CAPS / XP:"), /* @__PURE__ */ React.createElement("div", { className: "text-sm font-black text-yellow-300" }, "🧪 ", scienceXp, " XP")))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-3.5 rounded-xl border-2 border-neutral-700 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "🥶"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-neutral-400 text-[10px] uppercase" }, lang === "id" ? "Suhu Malam Luar (Mars Trek):" : "Exterior Night Temp:"), /* @__PURE__ */ React.createElement("div", { className: "text-cyan-300 font-bold" }, site.weatherBaseline.nightTempC, "°C ", lang === "id" ? "(Pemanas Habitat Aktif)" : "(Habitat Heaters Active)"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold text-[11px] uppercase tracking-wide" }, lang === "id" ? "Kubah Kedap Udara & Perisai Stabil" : "Pressurized & Shielded"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-500/60 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-neutral-300 flex items-center justify-between font-bold" }, /* @__PURE__ */ React.createElement("span", null, "⚡ ", lang === "id" ? "Daya Listrik" : "Power"), /* @__PURE__ */ React.createElement("span", { className: "text-yellow-300 text-sm font-black" }, Math.round(power), "%")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-400 mt-1 font-sans" }, lang === "id" ? "Beban pemanas malam disuplai" : "Thermal grid sustained")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-cyan-500/60 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-neutral-300 flex items-center justify-between font-bold" }, /* @__PURE__ */ React.createElement("span", null, "💨 ", lang === "id" ? "Oksigen" : "Oxygen"), /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300 text-sm font-black" }, Math.round(oxygen), "%")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-cyan-400 mt-1 font-sans" }, lang === "id" ? "Sirkulasi ECLSS stabil" : "ECLSS cycle stable")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-emerald-500/60 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-neutral-300 flex items-center justify-between font-bold" }, /* @__PURE__ */ React.createElement("span", null, "❤️ ", lang === "id" ? "Kesehatan Kru" : "Crew Health"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 text-sm font-black" }, Math.round(health), "%")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-400 mt-1 font-sans" }, lang === "id" ? "Tanda vital kru prima" : "Vitals 100% nominal"))), /* @__PURE__ */ React.createElement("div", { className: "pipboy-crt p-3.5 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 mb-5 relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-emerald-300 mb-1 flex items-center gap-1.5 pipboy-glow uppercase font-vault" }, /* @__PURE__ */ React.createElement("span", null, "🌟"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "LOG HARIAN KOMANDAN VAULT:" : "VAULT OVERSEER LOG ENTRY:")), /* @__PURE__ */ React.createElement("p", { className: "font-sans leading-relaxed pipboy-glow text-[11px] relative z-30" }, lang === "id" ? `Kamu berhasil memandu Pangkalan Mars melewati Sol ${currentSol} dengan penuh keberanian dan perhitungan cermat. Menyeimbangkan trade-off adalah keahlian nomor satu yang dipelajari astronot sungguhan di Pusat Kendali Misi NASA di Houston!` : `You successfully piloted our Mars Outpost through Sol ${currentSol} with bravery and sharp foresight. Balancing survival trade-offs is the number one skill taught to real NASA Mission Control flight directors in Houston!`)), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-yellow-600/50" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs text-neutral-400 font-sans" }, lang === "id" ? `Target Misi: Bertahan hingga Sol 7 untuk Sertifikasi NASA` : `Mission Goal: Survive to Sol 7 for NASA Certification`), /* @__PURE__ */ React.createElement("button", {
		onClick: handleNextSol,
		className: "w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 hover:from-yellow-400 text-black font-vault font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_4px_0_#854d0e,0_8px_20px_rgba(234,179,8,0.4)] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-yellow-200"
	}, /* @__PURE__ */ React.createElement("span", null, "☀️"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? `SAMBUT FAJAR SOL ${currentSol + 1}` : `GREET DAWN OF SOL ${currentSol + 1}`), /* @__PURE__ */ React.createElement("span", null, "➔"))));
}
// --- src/components/GameOverModal.jsx ---
// GameOverModal - Authentic Fallout Shelter Style Incident Report
function GameOverModal({ failedResource, solReached, scienceXp, onRestart, onOpenAnis, lang }) {
	useEffect(() => {
		SoundEngine.playGameOverTone();
	}, []);
	const getFailureExplanation = () => {
		switch (failedResource) {
			case "power": return {
				title: lang === "id" ? "⚡ DAYA LISTRIK PANGKALAN HABIS (0%)" : "⚡ OUTPOST POWER DEPLETED (0%)",
				icon: "❄️",
				color: "border-amber-500",
				lesson: lang === "id" ? "Pangkalan Mars membutuhkan listrik untuk pemanas internal. Di malam Mars yang suhunya mencapai -80°C hingga -100°C, tanpa pemanas pipa-pipa air membeku dan sirkuit komputer retak. Pada tahun 2018, robot penjelajah legendaris NASA 'Opportunity' berhenti beroperasi karena badai debu raksasa menutupi panel suryanya selama berbulan-bulan." : "Mars habitats need continuous electric heaters. At night temperatures dropping to -80°C to -100°C, without power the water lines freeze solid and computer solder cracks. In 2018, NASA's rover 'Opportunity' ended its 14-year mission when a planet-encircling dust storm blocked all solar power.",
				anisTip: lang === "id" ? "Untuk misi berikutnya, jangan menyalakan perisai radiasi terlalu lama jika tidak ada badai, dan sering-sering bersihkan debu panel surya di sore hari!" : "Next time, avoid running heavy shields when space weather is calm, and sweep solar panel dust frequently during afternoon hours!"
			};
			case "oxygen": return {
				title: lang === "id" ? "💨 CADANGAN OKSIGEN HABIS (0%)" : "💨 OXYGEN RESERVES DEPLETED (0%)",
				icon: "🫁",
				color: "border-cyan-500",
				lesson: lang === "id" ? "Atmosfer Mars mengandung 95% Karbon Dioksida yang beracun dan hanya 0.13% Oksigen (Bumi memiliki 21% Oksigen). Tanpa mesin MOXIE atau tanaman Bio-Dome yang memproduksi O2 segar, astronot tidak bisa bernapas. Oleh karena itu, NASA selalu merancang sistem pendukung kehidupan (ECLSS) dengan tiga lapis tangki cadangan." : "Mars atmosphere is 95% poisonous carbon dioxide with merely 0.13% oxygen (Earth has 21%). Without the MOXIE generator or Bio-Dome plants, astronauts cannot breathe. NASA designs human space habitats with closed-loop recycling and multiple redundant storage tanks.",
				anisTip: lang === "id" ? "Gali es bawah tanah atau rawat tanaman hidroponik lebih sering agar pangkalan selalu memiliki persediaan oksigen cadangan!" : "Drill for subsurface ice or nurture greenhouse crops to ensure your base always has reserve breathing oxygen!"
			};
			case "health":
			default: return {
				title: lang === "id" ? "❤️ KESEHATAN ASTRONOT KRITIS (0%)" : "❤️ CREW HEALTH COLLAPSED (0%)",
				icon: "🏥",
				color: "border-rose-500",
				lesson: lang === "id" ? "Mars tidak memiliki lapisan ozon dan medan magnet pelindung seperti Bumi. Data penelitian NASA OSDR & RadLab menunjukkan bahwa radiasi matahari (CME) dan sinar kosmik galaksi merusak sel DNA dan mempercepat anemia luar angkasa. Astronot harus berlindung di bunker regolith tebal atau menyalakan perisai magnetik saat badai matahari melanda." : "Mars lacks a global protective magnetic field and ozone layer. NASA OSDR & RadLab research reveals that solar flares and cosmic rays damage cellular DNA and cause space anemia. Crew members must retreat into thick Martian soil bunkers or power electromagnetic shields during solar storms.",
				anisTip: lang === "id" ? "Saat sensor DONKI memberi peringatan badai matahari (CME/Flare), utamakan evakuasi kru atau perisai radiasi, dan jangan lupa latihan treadmill!" : "When DONKI sensors warn of a solar storm, prioritize radiation shields or bunker retreat, and maintain daily treadmill workouts!"
			};
		}
	};
	const info = getFailureExplanation();
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl bg-[#140b0f] border-4 border-rose-600 rounded-2xl shadow-[0_0_60px_rgba(244,63,94,0.4)] overflow-hidden flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2 hazard-stripes-danger" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#240c12] p-4 text-center border-b-2 border-rose-600 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl animate-pulse" }, "💀"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-vault font-black text-xs sm:text-sm text-rose-300 tracking-wider uppercase block" }, "VAULT-TEC CRITICAL INCIDENT REPORT • MISSION OVER"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-rose-400 font-sans" }, lang === "id" ? "Kegagalan Sistem Pangkalan Mars • Evaluasi Sains NASA" : "Mars Habitat Critical Casualty • NASA Scientific Post-Mortem"))), /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 rounded-lg bg-rose-600 text-white font-vault text-xs font-black" }, "SOL ", solReached)), /* @__PURE__ */ React.createElement("div", { className: "p-4 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto no-scrollbar bg-[#0d070a]" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 rounded-xl bg-rose-950/60 border-2 border-rose-500 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl" }, info.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm sm:text-base font-black text-rose-300 font-vault tracking-wide" }, info.title), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-neutral-400 font-sans" }, lang === "id" ? `Misi bertahan hingga Sol ${solReached} dengan perolehan ${scienceXp} XP Sains.` : `Survived to Sol ${solReached} with ${scienceXp} Science XP.`))), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-neutral-200 mt-3 leading-relaxed font-sans bg-black/70 p-3 rounded-lg border border-rose-900" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300" }, lang === "id" ? "💡 FAKTA SAINS & KEGAGALAN MISI: " : "💡 NASA SCIENCE & CASUALTY LESSON: "), info.lesson)), /* @__PURE__ */ React.createElement("div", { className: "pipboy-crt p-4 rounded-xl border-2 border-emerald-500 text-xs text-emerald-200 shadow-inner relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1.5 font-vault font-black text-emerald-300 uppercase tracking-widest text-[11px] pipboy-glow" }, /* @__PURE__ */ React.createElement("span", null, "🤖"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "SARAN A.N.I.S. UNTUK MISI BERIKUTNYA:" : "A.N.I.S. MISSION ADVISORY FOR NEXT RUN:")), /* @__PURE__ */ React.createElement("p", { className: "font-sans leading-relaxed pipboy-glow relative z-30" }, "\"", info.anisTip, "\""))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#180a0f] p-4 border-t-2 border-rose-800 flex justify-end gap-3" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onRestart();
		},
		className: "w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 text-white font-vault font-black text-sm tracking-wider uppercase shadow-[0_4px_0_#881337] transition-all transform active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 border-2 border-rose-300"
	}, /* @__PURE__ */ React.createElement("span", null, "🔄"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "MULAI ULANG SIMULASI PANGKALAN" : "RE-BOOT OUTPOST SIMULATION"), /* @__PURE__ */ React.createElement("span", null, "➔")))));
}
// --- src/components/VictoryModal.jsx ---
// VictoryModal - Authentic Fallout Shelter Style Overseer Commendation Award
function VictoryModal({ solReached, scienceXp, site, onContinueEndless, onRestart, lang }) {
	useEffect(() => {
		SoundEngine.playBottleCaps();
		try {
			confetti({
				particleCount: 120,
				spread: 90,
				origin: { y: .6 }
			});
		} catch (e) {}
	}, []);
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_80px_rgba(250,204,21,0.6)] overflow-hidden border-4 border-yellow-400 flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-5 text-center border-b-2 border-yellow-400" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl" }, "🏆"), /* @__PURE__ */ React.createElement("span", { className: "font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-widest uppercase" }, "VAULT-TEC & NASA SPACE APPS • OVERSEER COMMENDATION"), /* @__PURE__ */ React.createElement("span", { className: "text-3xl" }, "🚀")), /* @__PURE__ */ React.createElement("h1", { className: "text-xl sm:text-2xl font-black text-white font-vault tracking-wider uppercase" }, lang === "id" ? "SERTIFIKASI KOMANDAN ASTRONOT JUNIOR" : "JUNIOR ASTRONAUT MISSION CERTIFICATION"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-yellow-200 font-sans mt-1" }, lang === "id" ? "Pangkalan Mars: Astro-Gotchi Outpost Survival (Sol 7 Tercapai)" : "Mars Outpost: Astro-Gotchi Survival Trainer (Sol 7 Achieved)")), /* @__PURE__ */ React.createElement("div", { className: "p-5 sm:p-6 space-y-5 text-center bg-[#070d1e]" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-yellow-100 font-sans max-w-lg mx-auto leading-relaxed" }, lang === "id" ? "Dengan ini dianugerahkan kepada Komandan Junior atas keberhasilan luar biasa dalam mengelola trade-off sumber daya pangkalan, menangkis radiasi badai matahari DONKI, dan menjaga kelangsungan hidup kru di Planet Merah!" : "Hereby awarded to Junior Commander for exemplary mastery in balancing survival trade-offs, deflecting DONKI space radiation, and sustaining human life on the Red Planet!"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-500/70 flex flex-col items-center shadow-inner" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl mb-1" }, "🛡️"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-vault font-black text-yellow-300 uppercase" }, "DONKI MASTER"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 font-sans mt-0.5" }, lang === "id" ? "Penangkis CME" : "CME Deflector")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-cyan-500/70 flex flex-col items-center shadow-inner" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl mb-1" }, "💨"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-vault font-black text-cyan-300 uppercase" }, "MOXIE CHIEF"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 font-sans mt-0.5" }, lang === "id" ? "Oksigen 100%" : "100% O2 Flow")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-emerald-500/70 flex flex-col items-center shadow-inner" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl mb-1" }, "🌱"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-vault font-black text-emerald-300 uppercase" }, "BIO-FARMER"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 font-sans mt-0.5" }, lang === "id" ? "Nutrisi Kru" : "Crew Nutrition")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0f172a] p-3 rounded-xl border-2 border-yellow-400 flex flex-col items-center shadow-inner" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl mb-1" }, "⭐"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-vault font-black text-yellow-300 uppercase" }, "SOL ", solReached, " VET"), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 font-sans mt-0.5" }, scienceXp, " Total XP")))), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 border-t-2 border-yellow-500 flex flex-col sm:flex-row items-center justify-center gap-3" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onContinueEndless();
		},
		className: "w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-vault font-black text-xs uppercase tracking-wider shadow-md transition-all border border-emerald-300"
	}, "🚀 ", lang === "id" ? "LANJUTKAN MISI TANPA BATAS (ENDLESS SOL)" : "CONTINUE ENDLESS MISSION (FREE PLAY)"), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onRestart();
		},
		className: "w-full sm:w-auto px-6 py-2.5 rounded-xl vault-btn text-yellow-300 font-vault font-black text-xs uppercase tracking-wider transition-all"
	}, "🔄 ", lang === "id" ? "MULAI EKSPEDISI BARU" : "START NEW EXPEDITION"))));
}
// --- src/components/AnisAssistant.jsx ---
// AnisAssistant - Authentic Fallout Pip-Boy 3000 AI Science Terminal
function AnisAssistant({ isOpen, onClose, initialQuery = "", apiKey = "", lang = "en" }) {
	const [activeTab, setActiveTab] = useState("dialog");
	const [messages, setMessages] = useState([{
		sender: "anis",
		text: lang === "id" ? "PIP-BOY 3000 / A.N.I.S. SIAP OPERASI! Halo Komandan Junior! Aku bertugas menerjemahkan sains antariksa yang rumit menjadi penjelasan seru dan mudah dipahami. Pertanyaan apa yang ingin kamu ketahui hari ini?" : "PIP-BOY 3000 / A.N.I.S. ONLINE! Greetings Junior Commander! I am programmed to translate complex space science into fun, clear explanations. What system or hazard shall we examine today?"
	}]);
	const [inputQuery, setInputQuery] = useState(initialQuery);
	const [isLoading, setIsLoading] = useState(false);
	const [isSpeaking, setIsSpeaking] = useState(false);
	if (!isOpen) return null;
	const quickChips = lang === "id" ? [
		{
			label: "🤧 Apa itu CME?",
			query: "Apa itu CME?"
		},
		{
			label: "🌲 Bagaimana MOXIE bekerja?",
			query: "Bagaimana MOXIE membuat oksigen?"
		},
		{
			label: "🏃 Kenapa otot menyusut?",
			query: "Kenapa otot dan tulang astronot bisa menyusut di Mars?"
		},
		{
			label: "🧣 Bahaya badai debu?",
			query: "Kenapa badai debu berbahaya bagi panel surya?"
		},
		{
			label: "⚖️ Apa itu Trade-off?",
			query: "Apa maksudnya sistem trade-off dalam bertahan hidup di Mars?"
		},
		{
			label: "🏞️ Rahasia Kawah Jezero?",
			query: "Apa yang dicari rover Perseverance di Kawah Jezero?"
		}
	] : [
		{
			label: "🤧 What is a CME?",
			query: "What is a Coronal Mass Ejection (CME)?"
		},
		{
			label: "🌲 How MOXIE works?",
			query: "How does the MOXIE machine produce oxygen on Mars?"
		},
		{
			label: "🏃 Muscle loss in space?",
			query: "Why do bones and muscles shrink in Mars low gravity?"
		},
		{
			label: "🧣 Dust storm danger?",
			query: "Why are Mars dust storms dangerous for solar panels?"
		},
		{
			label: "⚖️ What is a Trade-off?",
			query: "What are survival trade-offs on Mars?"
		},
		{
			label: "🏞️ Jezero Crater secrets?",
			query: "What is NASA's Perseverance rover searching for in Jezero Crater?"
		}
	];
	const handleSend = async (queryToSend) => {
		const q = queryToSend || inputQuery;
		if (!q.trim()) return;
		SoundEngine.playClick();
		const userMsg = {
			sender: "user",
			text: q
		};
		setMessages((prev) => [...prev, userMsg]);
		setInputQuery("");
		setIsLoading(true);
		try {
			const answer = apiKey && apiKey.trim() ? await queryGeminiApi(q, apiKey, lang) : getAnisAnswerLocal(q, lang);
			setMessages((prev) => [...prev, {
				sender: "anis",
				text: answer
			}]);
			SoundEngine.playBottleCaps();
		} catch (err) {
			const fallback = getAnisAnswerLocal(q, lang);
			setMessages((prev) => [...prev, {
				sender: "anis",
				text: fallback
			}]);
		} finally {
			setIsLoading(false);
		}
	};
	const speakText = (text) => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		if (isSpeaking) {
			window.speechSynthesis.cancel();
			setIsSpeaking(false);
			return;
		}
		window.speechSynthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = lang === "id" ? "id-ID" : "en-US";
		utterance.rate = 1.05;
		utterance.pitch = 1.25;
		utterance.onend = () => setIsSpeaking(false);
		utterance.onerror = () => setIsSpeaking(false);
		setIsSpeaking(true);
		window.speechSynthesis.speak(utterance);
	};
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl bg-[#142316] border-4 border-emerald-600 rounded-3xl shadow-[0_0_60px_rgba(34,197,94,0.35)] overflow-hidden flex flex-col p-2 sm:p-3 relative" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between px-3 py-1.5 border-b-2 border-emerald-800 text-[10px] text-emerald-400 font-bold uppercase tracking-widest" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#22c55e]" }), /* @__PURE__ */ React.createElement("span", { className: "pipboy-glow font-black font-vault tracking-widest text-emerald-300" }, "ROBCO PIP-BOY 3000 • A.N.I.S. INTERFACE")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-emerald-500" }, "RAD: 0.02 RAD/S"), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onClose();
		},
		className: "text-emerald-400 hover:text-white px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 transition-all font-bold"
	}, "[ ESC / CLOSE ]"))), /* @__PURE__ */ React.createElement("div", { className: "flex border-b-2 border-emerald-800 bg-[#061e0d] px-2 py-1 gap-2 mt-1" }, [
		"dialog",
		"database",
		"audio"
	].map((tab) => /* @__PURE__ */ React.createElement("button", {
		key: tab,
		onClick: () => {
			SoundEngine.playClick();
			setActiveTab(tab);
		},
		className: `px-3 py-1 text-xs font-vault font-black tracking-wider uppercase rounded transition-all ${activeTab === tab ? "bg-emerald-600 text-black shadow-[0_0_10px_#22c55e]" : "text-emerald-400 hover:bg-emerald-900/60"}`
	}, tab === "dialog" ? lang === "id" ? "[ DIALOG A.N.I.S. ]" : "[ A.N.I.S. DIALOGUE ]" : tab === "database" ? "[ KNOWLEDGE LOG ]" : "[ AUDIO VOICE ]"))), /* @__PURE__ */ React.createElement("div", { className: "pipboy-crt rounded-2xl p-4 sm:p-5 mt-2 flex-1 flex flex-col min-h-[380px] max-h-[500px] border-2 border-emerald-500/80 shadow-inner relative overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "flex-1 overflow-y-auto space-y-3.5 pr-2 no-scrollbar relative z-30" }, messages.map((msg, index) => {
		const isAnis = msg.sender === "anis";
		return /* @__PURE__ */ React.createElement("div", {
			key: index,
			className: `flex gap-2.5 items-start ${isAnis ? "justify-start" : "justify-end"}`
		}, isAnis && /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-400 flex items-center justify-center text-base shadow-[0_0_10px_#22c55e] shrink-0" }, "🤖"), /* @__PURE__ */ React.createElement("div", { className: `max-w-[85%] rounded-xl p-3 border leading-relaxed ${isAnis ? "bg-[#062c12]/90 border-emerald-500 text-emerald-200 pipboy-glow shadow-[0_0_15px_rgba(34,197,94,0.15)]" : "bg-[#021f0b]/90 border-yellow-500 text-yellow-200 font-bold"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px] font-bold mb-1 opacity-75" }, /* @__PURE__ */ React.createElement("span", null, isAnis ? "A.N.I.S. (VAULT AI)" : lang === "id" ? "KOMANDAN LEO" : "COMMANDER LEO"), isAnis && /* @__PURE__ */ React.createElement("button", {
			onClick: () => speakText(msg.text),
			className: "hover:text-emerald-100 flex items-center gap-1 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-600",
			title: lang === "id" ? "Putar Suara Robot" : "Play Voice Synthesizer"
		}, /* @__PURE__ */ React.createElement("span", null, isSpeaking ? "⏹️ STOP" : lang === "id" ? "🔊 SUARA" : "🔊 VOICE"))), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm font-sans" }, msg.text)));
	}), isLoading && /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-emerald-300 text-xs pipboy-glow p-2" }, /* @__PURE__ */ React.createElement("span", { className: "w-3 h-3 rounded-full bg-emerald-400 animate-ping" }), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "A.N.I.S. SEDANG MENGAKSES BASIS DATA NASA DONKI & OSDR..." : "A.N.I.S. ACCESSING NASA DONKI & OSDR SCIENTIFIC DATABASE..."))), /* @__PURE__ */ React.createElement("div", { className: "mt-3 pt-2 border-t border-emerald-800/80 relative z-30" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-400/90 font-bold uppercase mb-1.5 flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", null, "⚡"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "PERTANYAAN CEPAT KOMANDAN:" : "QUICK SCIENCE INQUIRIES:")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar" }, quickChips.map((chip, idx) => /* @__PURE__ */ React.createElement("button", {
		key: idx,
		onClick: () => handleSend(chip.query),
		className: "px-2.5 py-1 rounded bg-[#031c0a] hover:bg-emerald-900 border border-emerald-600 text-[11px] text-emerald-300 font-sans font-semibold transition-all hover:scale-[1.02] shadow-sm text-left active:scale-95"
	}, chip.label)))), /* @__PURE__ */ React.createElement("div", { className: "mt-3 flex gap-2 relative z-30" }, /* @__PURE__ */ React.createElement("input", {
		type: "text",
		value: inputQuery,
		onChange: (e) => setInputQuery(e.target.value),
		onKeyDown: (e) => e.key === "Enter" && handleSend(),
		placeholder: lang === "id" ? "Ketik pertanyaan sains (misal: Mengapa badai matahari berbahaya?)..." : "Ask a space science question (e.g., Why are solar storms dangerous?)...",
		className: "flex-1 bg-[#021808] border-2 border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-emerald-200 placeholder-emerald-700 focus:outline-none focus:border-emerald-300 pipboy-glow"
	}), /* @__PURE__ */ React.createElement("button", {
		onClick: () => handleSend(),
		className: "px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-vault font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_#22c55e] transition-all transform active:scale-95 border border-emerald-300"
	}, lang === "id" ? "KIRIM ➔" : "TRANSMIT ➔")))));
}
// --- src/components/NasaDataInspector.jsx ---
// NasaDataInspector - Verified NASA Curated Data Terminal for Judges & Players
function NasaDataInspector({ isOpen, onClose, lang }) {
	const [activeTab, setActiveTab] = useState("donki");
	if (!isOpen) return null;
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-3xl vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] flex flex-col max-h-[88vh] overflow-hidden border-4 border-yellow-500" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 border-b-2 border-yellow-500/70 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "🛰️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-xs sm:text-sm font-black font-vault text-yellow-300 tracking-wider uppercase" }, "VAULT-TEC & NASA ARCHIVAL DATA TERMINAL"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400 font-sans" }, "Curated Embedded Scientific Repositories: DONKI • OSDR & RadLab • Mars Trek"))), /* @__PURE__ */ React.createElement("button", {
		onClick: onClose,
		className: "px-2.5 py-1 rounded-lg vault-btn text-yellow-300 font-vault text-xs font-bold transition-all"
	}, "[ ", lang === "id" ? "ESC / TUTUP" : "ESC / CLOSE", " ]")), /* @__PURE__ */ React.createElement("div", { className: "flex border-b-2 border-yellow-600/50 bg-[#070d1e] px-4 pt-2 gap-2" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => setActiveTab("donki"),
		className: `px-4 py-2 text-xs font-vault font-black tracking-wider uppercase rounded-t-lg transition-all border-t-2 border-x-2 ${activeTab === "donki" ? "bg-[#0f172a] text-yellow-300 border-yellow-500 border-b-transparent shadow-[0_-2px_8px_rgba(234,179,8,0.3)]" : "text-neutral-400 border-transparent hover:text-white"}`
	}, "☀️ NASA DONKI (SPACE WEATHER)"), /* @__PURE__ */ React.createElement("button", {
		onClick: () => setActiveTab("osdr"),
		className: `px-4 py-2 text-xs font-vault font-black tracking-wider uppercase rounded-t-lg transition-all border-t-2 border-x-2 ${activeTab === "osdr" ? "bg-[#0f172a] text-rose-300 border-rose-500 border-b-transparent shadow-[0_-2px_8px_rgba(244,63,94,0.3)]" : "text-neutral-400 border-transparent hover:text-white"}`
	}, "🧬 NASA OSDR (SPACE BIOLOGY)"), /* @__PURE__ */ React.createElement("button", {
		onClick: () => setActiveTab("mars_trek"),
		className: `px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all border-t-2 border-x-2 ${activeTab === "mars_trek" ? "bg-neutral-900 text-cyan-300 border-cyan-500 border-b-transparent" : "text-neutral-400 border-transparent hover:text-white"}`
	}, "🪐 Mars Trek ", lang === "id" ? "(Kartografi)" : "(Cartography)")), /* @__PURE__ */ React.createElement("div", { className: "flex-1 p-5 overflow-y-auto space-y-4 bg-neutral-950/80" }, activeTab === "donki" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-amber-950/30 border border-amber-500/40 p-3 rounded-xl text-xs font-mono text-amber-200" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold" }, "Database of Notifications, Knowledge, Information (DONKI): "), lang === "id" ? "Game ini menggunakan sampel catatan historis kejadian Coronal Mass Ejection (CME), Solar Flare, dan simulasi WSA-ENLIL asli dari NASA Goddard Space Flight Center sebagai pemicu bahaya (Hazard Events)." : "This trainer uses authentic historical records of Coronal Mass Ejections (CME), Solar Flares, and real WSA-ENLIL simulations from NASA Goddard Space Flight Center as mission hazard events."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, NASA_DONKI_EVENTS.map((ev) => /* @__PURE__ */ React.createElement("div", {
		key: ev.id,
		className: "bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
	}, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-black" }, ev.type), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-white font-mono" }, ev.classType)), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-cyan-400 font-bold" }, ev.officialId, " • ", ev.date)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-300 font-mono mb-2" }, ev.description), /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200 mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-amber-300" }, lang === "id" ? "🤖 Terjemahan A.N.I.S.: " : "🤖 A.N.I.S. Translation: "), "\"", lang === "id" ? ev.plainLanguageAnis : ev.plainLanguageEn, "\""), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[10px] font-mono text-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "Sensor: " : "Sensors: ", ev.detectingInstruments.join(", ")), /* @__PURE__ */ React.createElement("a", {
		href: ev.nasaLink,
		target: "_blank",
		rel: "noreferrer",
		className: "text-cyan-400 hover:text-cyan-300 underline font-bold"
	}, lang === "id" ? "Buka Arsip CCMC NASA ↗" : "Open NASA CCMC Archive ↗")))))), activeTab === "osdr" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-rose-950/30 border border-rose-500/40 p-3 rounded-xl text-xs font-mono text-rose-200" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold" }, "NASA Open Science Data Repository (OSDR) & RadLab: "), lang === "id" ? "Metrik penurunan bar ❤️ Kesehatan, risiko atropi otot, anemia luar angkasa, dan dosis radiasi di Astro-Gotchi dihitung berdasarkan hasil riset fisiologi astronot NASA." : "Health metrics, muscle atrophy, spaceflight anemia, and cumulative radiation in Astro-Gotchi are modeled from peer-reviewed NASA astronaut space biology studies."), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, NASA_OSDR_FACTS.map((fact) => /* @__PURE__ */ React.createElement("div", {
		key: fact.studyId,
		className: "bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
	}, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-rose-400 font-mono" }, fact.title)), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold" }, fact.studyId)), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-amber-300 font-bold mb-2" }, lang === "id" ? "Metrik Riset: " : "Research Metric: ", fact.metric), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-300 font-mono mb-2" }, fact.summary), /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200 mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-cyan-300" }, lang === "id" ? "🤖 Analogi Anak A.N.I.S.: " : "🤖 A.N.I.S. Analogy: "), "\"", lang === "id" ? fact.plainLanguageAnis : fact.plainLanguageEn || fact.plainLanguageAnis, "\""), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] font-mono text-rose-300 bg-rose-950/40 p-1.5 rounded border border-rose-800/50" }, "⚖️ ", lang === "id" ? "Aturan Mekanik Game: " : "Game Mechanic Rule: ", fact.healthImpactRule))))), activeTab === "mars_trek" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-cyan-950/30 border border-cyan-500/40 p-3 rounded-xl text-xs font-mono text-cyan-200" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold" }, "NASA Mars Trek Portal: "), lang === "id" ? "Latar belakang visual pangkalan, elevasi topografi, dan data suhu harian di game diambil dari kawah pendaratan spesifik di Mars." : "Outpost terrain visuals, topographic elevation, and daily temperature baselines are sourced from official NASA Mars landing sites."), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-3" }, Object.values(MARS_TREK_SITES).map((site) => /* @__PURE__ */ React.createElement("div", {
		key: site.id,
		className: "bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
	}, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-2 mb-2" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-amber-300 font-mono" }, lang === "id" ? site.name : site.nameEn || site.name), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-mono text-cyan-400" }, site.coordinates)), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono text-neutral-300 mb-1" }, lang === "id" ? site.missionAnchor : site.missionAnchorEn || site.missionAnchor), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] font-mono text-neutral-400 mb-2" }, lang === "id" ? "Elevasi: " : "Elevation: ", site.elevation, " • ", lang === "id" ? "Suhu Siang: " : "Day Temp: ", site.weatherBaseline.dayTempC, "°C • ", lang === "id" ? "Suhu Malam: " : "Night Temp: ", site.weatherBaseline.nightTempC, "°C"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-300 font-mono mb-2" }, lang === "id" ? site.environmentSummary : site.environmentSummaryEn || site.environmentSummary), /* @__PURE__ */ React.createElement("div", { className: "bg-black/60 p-2.5 rounded-lg border border-neutral-800/80 text-[11px] font-sans text-cyan-200" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-amber-300" }, lang === "id" ? "🤖 Catatan A.N.I.S.: " : "🤖 A.N.I.S. Note: "), "\"", lang === "id" ? site.plainLanguageAnis : site.plainLanguageEn || site.plainLanguageAnis, "\"")))))), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400" }, /* @__PURE__ */ React.createElement("span", null, "NASA Space Apps Challenge • Junior Astronaut Mission Trainer"), /* @__PURE__ */ React.createElement("button", {
		onClick: onClose,
		className: "px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold transition-all"
	}, lang === "id" ? "Tutup Terminal" : "Close Terminal"))));
}
// --- src/components/SettingsModal.jsx ---
// SettingsModal - Outpost Configuration, Site Selector & Gemini API Key
function SettingsModal({ isOpen, onClose, selectedSiteKey, onSelectSite, apiKey, onSaveApiKey, soundMuted, onToggleSound, lang, onToggleLang, onResetGame, onOpenTutorial }) {
	const [tempKey, setTempKey] = useState(apiKey || "");
	if (!isOpen) return null;
	const handleSave = () => {
		SoundEngine.playClick();
		onSaveApiKey(tempKey);
		onClose();
	};
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg vault-panel rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.4)] flex flex-col max-h-[85vh] overflow-hidden border-4 border-yellow-500" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-1.5 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 border-b-2 border-yellow-500/70 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "⚙️"), /* @__PURE__ */ React.createElement("h2", { className: "text-xs sm:text-sm font-black font-vault text-yellow-300 tracking-wider uppercase" }, lang === "id" ? "PENGATURAN SIMULASI VAULT" : "VAULT SIMULATION SETTINGS")), /* @__PURE__ */ React.createElement("button", {
		onClick: onClose,
		className: "px-2.5 py-1 rounded-lg vault-btn text-yellow-300 font-vault text-xs font-bold transition-all"
	}, "[ ESC ]")), /* @__PURE__ */ React.createElement("div", { className: "p-5 space-y-5 overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "block text-xs font-mono font-bold text-amber-300 uppercase mb-2" }, "🪐 ", lang === "id" ? "Pilih Lokasi Pendaratan Mars Trek:" : "Choose Mars Trek Landing Site:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 gap-2" }, Object.entries(MARS_TREK_SITES).map(([key, site]) => /* @__PURE__ */ React.createElement("div", {
		key,
		onClick: () => onSelectSite(key),
		className: `p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedSiteKey === key ? "bg-amber-950/40 border-amber-400" : "bg-neutral-950 border-neutral-800 hover:border-neutral-600"}`
	}, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-white font-mono" }, site.name), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-mono text-cyan-400" }, site.coordinates)), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400 font-mono mt-0.5" }, site.missionAnchor))))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono font-bold text-white" }, lang === "id" ? "Efek Suara" : "Sound FX"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400 font-mono" }, soundMuted ? lang === "id" ? "Bisu" : "Muted" : lang === "id" ? "Aktif" : "Active")), /* @__PURE__ */ React.createElement("button", {
		onClick: onToggleSound,
		className: `px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${soundMuted ? "bg-neutral-800 text-neutral-400" : "bg-amber-500 text-black"}`
	}, soundMuted ? "🔇 OFF" : "🔊 ON")), /* @__PURE__ */ React.createElement("div", { className: "bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono font-bold text-white" }, lang === "id" ? "Bahasa" : "Language"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-neutral-400 font-mono" }, lang === "id" ? "Indonesia" : "English")), /* @__PURE__ */ React.createElement("button", {
		onClick: onToggleLang,
		className: "px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition-all"
	}, lang === "id" ? "🇮🇩 ID" : "🇺🇸 EN"))), /* @__PURE__ */ React.createElement("div", { className: "bg-neutral-950 p-3.5 rounded-xl border border-cyan-500/40" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "🤖"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "Gemini API Key (Opsional untuk Live AI A.N.I.S.)" : "Gemini API Key (Optional for Live AI A.N.I.S.)")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-400 font-mono mb-2" }, lang === "id" ? "Game ini sudah memiliki 50+ database pengetahuan sains anak secara bawaan (100% offline). Jika ingin A.N.I.S. menjawab pertanyaan bebas dengan LLM live, masukkan Gemini API Key di bawah:" : "This trainer has 50+ built-in space science facts (100% offline). If you want A.N.I.S. to answer free-form science questions with a live Gemini model, enter your API key below:"), /* @__PURE__ */ React.createElement("input", {
		type: "password",
		value: tempKey,
		onChange: (e) => setTempKey(e.target.value),
		placeholder: "AIzaSy...",
		className: "w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-mono"
	})), /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-neutral-800" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			onClose();
			onOpenTutorial && onOpenTutorial();
		},
		className: "w-full py-2 rounded-lg bg-yellow-950/60 hover:bg-yellow-900/60 text-yellow-300 border border-yellow-500/60 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
	}, /* @__PURE__ */ React.createElement("span", null, "📖"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "Buka Kembali Panduan Tutorial Astronot" : "Replay Junior Astronaut Field Manual"))), /* @__PURE__ */ React.createElement("div", { className: "pt-2 border-t border-neutral-800" }, /* @__PURE__ */ React.createElement("button", {
		onClick: onResetGame,
		className: "w-full py-2 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 font-mono text-xs font-bold transition-all"
	}, "⚠️ ", lang === "id" ? "Reset Ulang Misi ke Sol 1" : "Reset Mission to Sol 1"))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end gap-2" }, /* @__PURE__ */ React.createElement("button", {
		onClick: onClose,
		className: "px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs font-bold transition-all"
	}, lang === "id" ? "Batal" : "Cancel"), /* @__PURE__ */ React.createElement("button", {
		onClick: handleSave,
		className: "px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all"
	}, lang === "id" ? "Simpan Pengaturan" : "Save Settings"))));
}
// --- src/components/LevelUpModal.jsx ---
// LevelUpModal - Celebratory Fallout Shelter Style Astronaut Rank Promotion
function LevelUpModal({ rank, onClose, lang }) {
	useEffect(() => {
		SoundEngine.playSuccessChime();
		if (typeof window !== "undefined" && window.confetti) {
			window.confetti({
				particleCount: 80,
				spread: 70,
				origin: { y: .6 }
			});
		}
	}, []);
	if (!rank) return null;
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg bg-[#0e1628] border-4 border-yellow-400 rounded-2xl shadow-[0_0_60px_rgba(234,179,8,0.5)] overflow-hidden flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2.5 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#18233c] p-4 text-center border-b-2 border-yellow-400/80" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-yellow-400 font-vault tracking-widest uppercase" }, "NASA SPACE APPS • VAULT-TEC PROMOTION"), /* @__PURE__ */ React.createElement("h2", { className: "text-lg sm:text-xl font-black font-vault text-yellow-300 tracking-wider uppercase mt-1" }, lang === "id" ? "🎉 PROMOSI PANGKAT ASTRONOT!" : "🎉 ASTRONAUT RANK PROMOTION!")), /* @__PURE__ */ React.createElement("div", { className: "p-6 text-center space-y-4 bg-gradient-to-b from-[#0e1628] to-[#070b14]" }, /* @__PURE__ */ React.createElement("div", { className: "relative inline-block mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 border-4 border-yellow-200 flex items-center justify-center shadow-[0_0_35px_rgba(234,179,8,0.7)] animate-bounce" }, /* @__PURE__ */ React.createElement("span", { className: "text-5xl" }, rank.icon)), /* @__PURE__ */ React.createElement("div", { className: "absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-neutral-950 border border-yellow-400 text-yellow-300 font-vault font-black text-xs tracking-wider" }, "LVL ", rank.level)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-xl sm:text-2xl font-black font-vault text-white tracking-wide" }, lang === "id" ? rank.titleId : rank.titleEn), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-400 font-bold mt-1" }, lang === "id" ? "Sertifikasi Keberhasilan Misi Mars NASA" : "NASA Mars Mission Certification")), /* @__PURE__ */ React.createElement("div", { className: "p-3.5 rounded-xl bg-neutral-950/80 border-2 border-yellow-500/60 text-left space-y-1.5 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-yellow-400 font-vault uppercase tracking-wider" }, lang === "id" ? "TANGGUNG JAWAB MISI BARU:" : "NEW MISSION RESPONSIBILITIES:"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-neutral-200 leading-relaxed font-sans" }, lang === "id" ? rank.descriptionId : rank.descriptionEn)), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-400 font-sans italic" }, lang === "id" ? "Selamat, Commander Leo! Pengalaman bertahan hidup di Mars membuktikan kemampuan kepemimpinanmu." : "Congratulations, Commander Leo! Your Mars survival experience proves your exceptional leadership."), /* @__PURE__ */ React.createElement("button", {
		onClick: onClose,
		className: "w-full py-3 rounded-xl vault-btn text-yellow-300 font-vault font-black text-sm tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-all transform hover:scale-[1.02] active:scale-95"
	}, lang === "id" ? "SIAP BERTUGAS, OVERSEER! 🚀" : "READY FOR DUTY, OVERSEER! 🚀"))));
}
// --- src/components/TutorialModal.jsx ---
// TutorialModal - Vault-Tec & NASA Junior Astronaut Orientation & Field Manual
function TutorialModal({ isOpen, onClose, onStartPractice, lang = "en" }) {
	const [currentStep, setCurrentStep] = useState(0);
	useEffect(() => {
		if (isOpen) {
			SoundEngine.playPipBoyOpen();
		}
	}, [isOpen]);
	if (!isOpen) return null;
	const steps = [
		{
			id: "mission_goal",
			stepNum: 1,
			badge: lang === "id" ? "MISI UTAMA" : "MISSION DIRECTIVE",
			title: lang === "id" ? "Selamat Datang di Vault 703: Kawah Jezero Mars!" : "Welcome to Vault 703: Jezero Crater, Mars!",
			icon: "🚀",
			subtitle: lang === "id" ? "Peranmu sebagai Komandan Junior Pangkalan Mars" : "Your Role as Junior Outpost Commander",
			content: lang === "id" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Selamat, Komandan! Kamu baru saja ditunjuk oleh ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "NASA Space Apps & Vault-Tec"), " untuk memimpin ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, "Mars Outpost Vault 703"), " di Kawah Jezero Mars."), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-3 rounded-xl border border-yellow-500/60 shadow-inner space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-yellow-300 font-bold font-vault text-xs uppercase" }, /* @__PURE__ */ React.createElement("span", null, "🎯"), /* @__PURE__ */ React.createElement("span", null, "Target Kelulusan Sertifikasi:")), /* @__PURE__ */ React.createElement("p", { className: "text-neutral-300" }, "Pertahankan pangkalan dan kru astronotmu (", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "Commander Leo"), ") selama ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "7 Sol (Hari Mars)"), " berturut-turut untuk meraih ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-300" }, "Junior Astronaut Mission Certification"), " resmi dari NASA!")), /* @__PURE__ */ React.createElement("p", { className: "text-neutral-400 italic" }, "💡 Lingkungan Mars sangat ekstrem: malam bersuhu -82°C, tidak ada oksigen alami, dan radiasi kosmik mengancam setiap saat. Keberhasilan misi bergantung pada keputusan cerdasmu!")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Greetings, Commander! You have been appointed by ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "NASA Space Apps & Vault-Tec"), " to oversee ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, "Mars Outpost Vault 703"), " in the historic Jezero Crater."), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-3 rounded-xl border border-yellow-500/60 shadow-inner space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-yellow-300 font-bold font-vault text-xs uppercase" }, /* @__PURE__ */ React.createElement("span", null, "🎯"), /* @__PURE__ */ React.createElement("span", null, "Primary Mission Goal:")), /* @__PURE__ */ React.createElement("p", { className: "text-neutral-300" }, "Guide your outpost and brave astronaut (", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "Commander Leo"), ") through ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "7 Sols (Martian Days)"), " of space weather hazards to achieve official ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-300" }, "NASA Junior Astronaut Certification"), "!")), /* @__PURE__ */ React.createElement("p", { className: "text-neutral-400 italic" }, "💡 Mars is an unforgiving world: freezing nights at -82°C, zero breathable air, and cosmic radiation storms. Survival depends entirely on your strategic leadership!"))
		},
		{
			id: "resources_rule",
			stepNum: 2,
			badge: lang === "id" ? "3 SUMBER DAYA UTAMA" : "3 VITAL LIFELINES",
			title: lang === "id" ? "Keseimbangan Bertahan Hidup (Aturan Trade-Off)" : "The Golden Rule of Trade-Offs",
			icon: "⚖️",
			subtitle: lang === "id" ? "Jangan Biarkan Sumber Daya Mencapai 0%!" : "Never Let Any Resource Drop to 0%!",
			content: lang === "id" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Sebagai komandan, kamu mengelola 3 pilar penopang kehidupan. ", /* @__PURE__ */ React.createElement("strong", { className: "text-rose-400" }, "Jika salah satu pilar mencapai 0%, simulasi berakhir (Game Over)!")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-amber-950/40 border-2 border-amber-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-amber-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "⚡"), /* @__PURE__ */ React.createElement("span", null, "DAYA LISTRIK")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Menyalakan pemanas habitat (-82°C) dan mengisi medan perisai magnetik dari badai matahari.")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-cyan-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "💨"), /* @__PURE__ */ React.createElement("span", null, "OKSIGEN")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Diekstrak dari atmosfer CO2 Mars oleh mesin MOXIE dan dibantu fotosintesis Bio-Dome.")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-emerald-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "❤️"), /* @__PURE__ */ React.createElement("span", null, "KESEHATAN KRU")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Dijaga lewat nutrisi segar hidroponik dan olahraga treadmill anti-atrofi otot (gravitasi 0.38g)."))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] text-yellow-200" }, /* @__PURE__ */ React.createElement("strong", null, "Prinsip Trade-Off:"), " Setiap peningkatan sumber daya membutuhkan pengorbanan sumber daya lain. Belajarlah menyeimbangkan kebutuhan pangkalan!")) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "You command 3 critical survival lifelines. ", /* @__PURE__ */ React.createElement("strong", { className: "text-rose-400" }, "If any gauge drops to 0%, the mission suffers a critical casualty (Game Over)!")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-amber-950/40 border-2 border-amber-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-amber-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "⚡"), /* @__PURE__ */ React.createElement("span", null, "POWER GRID")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Runs thermal heaters (-82°C nights) and charges electromagnetic shields against solar radiation.")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-cyan-950/40 border-2 border-cyan-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-cyan-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "💨"), /* @__PURE__ */ React.createElement("span", null, "OXYGEN (O2)")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Cracked from toxic Martian CO2 air by MOXIE and refreshed by hydroponic greens.")), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 font-bold font-vault text-emerald-300 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "❤️"), /* @__PURE__ */ React.createElement("span", null, "CREW HEALTH")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Protected by radiation shields, fresh microgreens, and treadmill workouts (fighting 0.38g atrophy)."))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-[11px] text-yellow-200" }, /* @__PURE__ */ React.createElement("strong", null, "The Trade-Off Rule:"), " Boosting one system often drains another. A great Commander always anticipates tomorrow's bottlenecks!"))
		},
		{
			id: "shifts_system",
			stepNum: 3,
			badge: lang === "id" ? "INTERAKSI 3D & SHIFT" : "3D ROOM & SHIFTS",
			title: lang === "id" ? "Tugaskan Leo: 3 Shift Tugas per Sol" : "Deploy Commander Leo: 3 Shifts per Sol",
			icon: "⚙️",
			subtitle: lang === "id" ? "Klik Langsung Stasiun 3D atau Tombol Bawah" : "Click 3D Stations or Bottom Control Buttons",
			content: lang === "id" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Kamu memiliki ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "3 Kapsul Shift per Sol"), ". Kamu bisa mengarahkan kamera 3D (drag untuk rotasi, scroll untuk zoom), lalu klik stasiun kerja atau tombol di bawah:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-yellow-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 block" }, "⚡ PANEL SURYA:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Daya"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% O2")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-cyan-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-cyan-300 block" }, "💨 MOXIE REAKTOR:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Oksigen"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% Daya")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-emerald-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-300 block" }, "🌱 BIO-DOME:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Kru"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% Daya")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-indigo-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-indigo-300 block" }, "🏃 TREADMILL (OSDR):"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Kru"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% O2"))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Fisika Gravitasi Mars (0.38g):"), " Leo melompat parabolik melayang, bekerja 3.5s, dan kembali ke tengah!"), onStartPractice && /* @__PURE__ */ React.createElement("button", {
				onClick: () => {
					SoundEngine.playClick();
					onStartPractice();
				},
				className: "px-2.5 py-1 rounded-lg bg-yellow-400 text-black font-vault font-black text-[10px] tracking-wider uppercase shrink-0 hover:bg-yellow-300 shadow"
			}, "⚡ COBA PRAKTEK"))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "You are granted ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "3 Work Shifts (Action Points) per Sol"), ". You can navigate the 3D room (drag to rotate 360°, scroll to zoom) and dispatch Leo by clicking the station or buttons below:"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-yellow-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 block" }, "⚡ POWER GRID:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Power"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% O2")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-cyan-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-cyan-300 block" }, "💨 MOXIE REACTOR:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Oxygen"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% Power")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-emerald-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-300 block" }, "🌱 BIO-DOME:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Crew"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% Power")), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-[#0f172a] border border-indigo-500/50" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-indigo-300 block" }, "🏃 TREADMILL (OSDR):"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300" }, "+15% Crew"), ", ", /* @__PURE__ */ React.createElement("span", { className: "text-rose-300" }, "-10% O2"))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-lg bg-black/60 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Low-G Martian Physics (0.38g):"), " Leo floats in a parabolic arc, works 3.5s, and hops back!"), onStartPractice && /* @__PURE__ */ React.createElement("button", {
				onClick: () => {
					SoundEngine.playClick();
					onStartPractice();
				},
				className: "px-2.5 py-1 rounded-lg bg-yellow-400 text-black font-vault font-black text-[10px] tracking-wider uppercase shrink-0 hover:bg-yellow-300 shadow"
			}, "⚡ TRY PRACTICE")))
		},
		{
			id: "sol_lifecycle",
			stepNum: 4,
			badge: lang === "id" ? "SIKLUS MISI SOL" : "SOL MISSION CYCLE",
			title: lang === "id" ? "4 Fase Setiap Hari di Mars" : "The 4 Phases of Every Martian Sol",
			icon: "🌅",
			subtitle: lang === "id" ? "Dari Peringatan Satelit hingga Malam Dingin" : "From Morning Satellite Briefings to Freezing Nights",
			content: lang === "id" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌅"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "1. PAGI: BRIEFING DONKI NASA"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Menerima data satelit NASA tentang badai radiasi (CME / Solar Flare) dan kondisi cuaca Mars Trek."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "☀️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "2. SIANG: KEPUTUSAN OVERSEER"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Hadapi dilema darurat: nyalakan perisai penuh, evakuasi bunker regolith, atau hemat daya baterai."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌤️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "3. SORE: PERAWATAN MODUL RUANGAN"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Tugaskan kru ke modul stasiun untuk memulihkan sumber daya sebelum matahari terbenam."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌙"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "4. MALAM: EVALUASI OVERSEER"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Pemanas habitat bekerja (-10 Daya, -8 O2, -2 Kru). Bertahan dari malam memberi +25 XP dan mengisi ulang 3 Shift!")))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌅"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "1. MORNING: NASA DONKI SATELLITE BRIEFING"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Inspect real-time telemetry on incoming solar flares, CME plasma, and Mars Trek local weather."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "☀️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "2. MIDDAY: OVERSEER TRADE-OFF DIRECTIVE"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Resolve emergency dilemmas: power maximum shields, evacuate to regolith bunkers, or ration life support."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌤️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "3. AFTERNOON: HABITAT ROOM JOBS"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Assign Leo to station upkeep to restore vital reserves before the sun sets."))), /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-lg bg-neutral-900 border border-yellow-500/40 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "🌙"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-yellow-300 font-vault block" }, "4. NIGHT: OVERSEER PERFORMANCE DEBRIEF"), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-neutral-300" }, "Life support sustains the freeze (-10 Power, -8 O2, -2 Health). Surviving awards +25 XP & refreshes all 3 shifts!"))))
		},
		{
			id: "ranks_pipboy",
			stepNum: 5,
			badge: lang === "id" ? "PROMOSI & ASISTEN AI" : "RANKS & PIP-BOY AI",
			title: lang === "id" ? "Kenaikan Pangkat & Terminal Pip-Boy" : "Rank Progression & Pip-Boy AI Companion",
			icon: "🏆",
			subtitle: lang === "id" ? "Dapatkan XP Sains & Konsultasikan A.N.I.S." : "Earn Science XP & Consult A.N.I.S.",
			content: lang === "id" ? /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Setiap keputusan ilmiah yang kamu ambil memberi ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "Science XP"), ". Capai level baru untuk membuka promosi pangkat astronot:"), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-[#0b1329] border border-yellow-500/70 space-y-1 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🚀 ", /* @__PURE__ */ React.createElement("strong", null, "Level 1:"), " Kadet Antariksa (Space Cadet)"), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300 font-bold" }, "0-50 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🔧 ", /* @__PURE__ */ React.createElement("strong", null, "Level 2:"), " Spesialis Teknis (Junior Specialist)"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "50-120 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "⚡ ", /* @__PURE__ */ React.createElement("strong", null, "Level 3:"), " Insinyur Misi (Mission Engineer)"), /* @__PURE__ */ React.createElement("span", { className: "text-yellow-300 font-bold" }, "120-210 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🎖️ ", /* @__PURE__ */ React.createElement("strong", null, "Level 4:"), " Komandan Pangkalan (Base Commander)"), /* @__PURE__ */ React.createElement("span", { className: "text-indigo-300 font-bold" }, "210-320 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "👑 ", /* @__PURE__ */ React.createElement("strong", null, "Level 5:"), " Legenda Pelopor Mars (Mars Pioneer Legend)"), /* @__PURE__ */ React.createElement("span", { className: "text-rose-300 font-bold" }, "320+ XP"))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-[#062c12] border-2 border-emerald-500 text-[11px] text-emerald-200 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "📟"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-300 font-vault block uppercase" }, "Terminal Pip-Boy 3000 / A.N.I.S. AI:"), /* @__PURE__ */ React.createElement("p", null, "Kapan pun kamu penasaran dengan sains antariksa NASA, klik tombol hijau ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, "PIP-BOY"), " untuk bertanya langsung pada A.N.I.S.!")))) : /* @__PURE__ */ React.createElement("div", { className: "space-y-3 font-sans text-xs leading-relaxed text-neutral-200" }, /* @__PURE__ */ React.createElement("p", null, "Every strategic decision awards ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300" }, "Science XP"), ". Reach XP milestones to unlock official astronaut rank promotions:"), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-[#0b1329] border border-yellow-500/70 space-y-1 text-[11px]" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🚀 ", /* @__PURE__ */ React.createElement("strong", null, "Level 1:"), " Space Cadet"), /* @__PURE__ */ React.createElement("span", { className: "text-amber-300 font-bold" }, "0-50 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🔧 ", /* @__PURE__ */ React.createElement("strong", null, "Level 2:"), " Junior Specialist"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold" }, "50-120 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "⚡ ", /* @__PURE__ */ React.createElement("strong", null, "Level 3:"), " Mission Engineer"), /* @__PURE__ */ React.createElement("span", { className: "text-yellow-300 font-bold" }, "120-210 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "🎖️ ", /* @__PURE__ */ React.createElement("strong", null, "Level 4:"), " Base Commander"), /* @__PURE__ */ React.createElement("span", { className: "text-indigo-300 font-bold" }, "210-320 XP")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-white" }, /* @__PURE__ */ React.createElement("span", null, "👑 ", /* @__PURE__ */ React.createElement("strong", null, "Level 5:"), " Mars Pioneer Legend"), /* @__PURE__ */ React.createElement("span", { className: "text-rose-300 font-bold" }, "320+ XP"))), /* @__PURE__ */ React.createElement("div", { className: "p-2.5 rounded-xl bg-[#062c12] border-2 border-emerald-500 text-[11px] text-emerald-200 flex items-start gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "📟"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-300 font-vault block uppercase" }, "Pip-Boy 3000 / A.N.I.S. AI Assistant:"), /* @__PURE__ */ React.createElement("p", null, "Whenever you want to learn about NASA space science or ask for survival advice, click the green ", /* @__PURE__ */ React.createElement("strong", { className: "text-white" }, "PIP-BOY"), " button anytime!"))))
		}
	];
	const current = steps[currentStep];
	const handleNext = () => {
		SoundEngine.playClick();
		if (currentStep < steps.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			SoundEngine.playSuccessChime();
			onClose();
		}
	};
	const handlePrev = () => {
		SoundEngine.playClick();
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};
	return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/92 backdrop-blur-md animate-fadeIn font-mono select-none" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-2xl vault-panel rounded-2xl shadow-[0_0_80px_rgba(234,179,8,0.5)] overflow-hidden border-4 border-yellow-500 flex flex-col" }, /* @__PURE__ */ React.createElement("div", { className: "w-full h-2 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-4 text-center border-b-2 border-yellow-500/70 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, "📖"), /* @__PURE__ */ React.createElement("div", { className: "text-left" }, /* @__PURE__ */ React.createElement("span", { className: "font-vault font-black text-xs sm:text-sm text-yellow-300 tracking-wider uppercase block" }, "VAULT-TEC & NASA • JUNIOR ASTRONAUT FIELD MANUAL"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-neutral-400 font-sans" }, lang === "id" ? "Panduan Orientasi Komandan Baru Pangkalan Mars" : "New Commander Outpost Survival Orientation"))), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onClose();
		},
		className: "text-[11px] font-vault font-black text-neutral-400 hover:text-white px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700",
		title: lang === "id" ? "Lewati Tutorial" : "Skip Tutorial"
	}, lang === "id" ? "[ LEWATI ]" : "[ SKIP ]")), /* @__PURE__ */ React.createElement("div", { className: "bg-[#070d1e] px-3 py-2 border-b border-yellow-600/40 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar" }, steps.map((s, idx) => /* @__PURE__ */ React.createElement("button", {
		key: s.id,
		onClick: () => {
			SoundEngine.playClick();
			setCurrentStep(idx);
		},
		className: `px-2.5 py-1 rounded text-[10px] font-vault font-black uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${currentStep === idx ? "bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.6)]" : "bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border border-neutral-800"}`
	}, /* @__PURE__ */ React.createElement("span", null, s.icon), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, "STEP ", idx + 1)))), /* @__PURE__ */ React.createElement("div", { className: "p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar bg-gradient-to-b from-[#0b1329] to-[#060a14]" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-yellow-200 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(234,179,8,0.5)] shrink-0" }, current.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-0.5" }, /* @__PURE__ */ React.createElement("span", { className: "px-2 py-0.5 rounded text-[9px] font-vault font-black bg-yellow-400/20 text-yellow-300 border border-yellow-500/40" }, current.badge), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-neutral-500 font-bold" }, currentStep + 1, " / ", steps.length)), /* @__PURE__ */ React.createElement("h3", { className: "text-sm sm:text-base font-black text-white font-vault tracking-wide" }, current.title), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-amber-300 font-bold mt-0.5" }, current.subtitle))), /* @__PURE__ */ React.createElement("div", { className: "pt-2" }, current.content)), /* @__PURE__ */ React.createElement("div", { className: "bg-[#0b1329] p-3.5 sm:p-4 border-t-2 border-yellow-500/70 flex flex-wrap items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("button", {
		onClick: handlePrev,
		disabled: currentStep === 0,
		className: `px-4 py-2 rounded-xl vault-btn text-yellow-300 font-vault text-xs font-bold transition-all ${currentStep === 0 ? "opacity-30 cursor-not-allowed" : "active:scale-95"}`
	}, "← ", lang === "id" ? "SEBELUMNYA" : "BACK"), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center gap-1.5" }, steps.map((_, i) => /* @__PURE__ */ React.createElement("span", {
		key: i,
		className: `w-2 h-2 rounded-full transition-all ${currentStep === i ? "w-5 bg-yellow-400 shadow-[0_0_6px_#facc15]" : "bg-neutral-700"}`
	}))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, onStartPractice && /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			onStartPractice();
		},
		className: "px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-vault font-black text-xs uppercase tracking-wider shadow-md transition-all border border-emerald-300 flex items-center gap-1.5 active:scale-95"
	}, /* @__PURE__ */ React.createElement("span", null, "⚡"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "PRAKTEK LANGSUNG" : "HANDS-ON PRACTICE")), /* @__PURE__ */ React.createElement("button", {
		onClick: handleNext,
		className: "px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_3px_0_#854d0e] transition-all transform active:translate-y-1 active:shadow-none flex items-center gap-1.5 border border-yellow-200"
	}, /* @__PURE__ */ React.createElement("span", null, currentStep === steps.length - 1 ? "🚀" : "➔"), /* @__PURE__ */ React.createElement("span", null, currentStep === steps.length - 1 ? lang === "id" ? "MULAI MISI SOL 1" : "START SOL 1" : lang === "id" ? "LANJUT" : "NEXT"))))));
}
// --- src/components/InteractivePracticeGuide.jsx ---
// InteractivePracticeGuide - Interactive Hands-On Practice Training Protocol
function InteractivePracticeGuide({ practiceStep, dailyShiftsLeft, isWorking, activeStation, onCompletePractice, onSkipPractice, lang = "en" }) {
	if (!practiceStep) return null;
	const handleFinish = () => {
		SoundEngine.playSuccessChime();
		onCompletePractice();
	};
	const handleSkip = () => {
		SoundEngine.playClick();
		onSkipPractice();
	};
	return /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-6xl mb-3 animate-fadeIn select-none font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "relative rounded-2xl bg-gradient-to-r from-[#0b1329] via-[#111c3a] to-[#0b1329] border-3 border-yellow-400 p-4 shadow-[0_0_35px_rgba(234,179,8,0.4)] overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "absolute top-0 left-0 right-0 h-1.5 hazard-stripes" }), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-vault font-black bg-yellow-400 text-black tracking-wider uppercase shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" }, practiceStep === "GRADUATED" ? lang === "id" ? "🎉 PRAKTEK SELESAI" : "🎉 PRACTICE COMPLETE" : lang === "id" ? `⚡ PRAKTEK LANGSUNG • TAHAP ${practiceStep === "POWER_GRID" ? "1/3" : practiceStep === "MOXIE" ? "2/3" : "3/3"}` : `⚡ HANDS-ON PRACTICE • STEP ${practiceStep === "POWER_GRID" ? "1/3" : practiceStep === "MOXIE" ? "2/3" : "3/3"}`), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-bold text-yellow-300 font-vault uppercase tracking-wide" }, practiceStep === "POWER_GRID" ? lang === "id" ? "PENGURANGAN SHIFT & PEMULIHAN DAYA" : "SHIFT DEDUCTION & POWER RESTORATION" : practiceStep === "MOXIE" ? lang === "id" ? "EKSTRAKSI OKSIGEN MOXIE" : "MOXIE OXYGEN EXTRACTION" : practiceStep === "PIP_BOY" ? lang === "id" ? "KONSULTASI AI PIP-BOY 3000" : "PIP-BOY 3000 AI CONSULTATION" : lang === "id" ? "AKADEMI ASTRONOT LULUS!" : "TRAINING ACADEMY GRADUATION!")), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-sans text-neutral-200 leading-relaxed max-w-3xl" }, practiceStep === "POWER_GRID" && /* @__PURE__ */ React.createElement("div", null, isWorking && activeStation === "power_grid" ? /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-bold animate-pulse" }, lang === "id" ? "⚙️ Bagus sekali! Perhatikan: Shift berkurang dari 3 menjadi 2. Leo sedang membersihkan panel surya (3.5 detik)..." : "⚙️ Excellent! Notice that your Shifts dropped from 3 to 2. Commander Leo is servicing the Solar Grid (3.5s)...") : /* @__PURE__ */ React.createElement("span", null, lang === "id" ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Klik tombol ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300 underline font-vault" }, "[⚡ PANEL SURYA]"), " yang berkedip di bilah bawah (atau klik panel surya di ruangan 3D). Perhatikan bahwa ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "Shift harianmu akan berkurang 1"), "!") : /* @__PURE__ */ React.createElement(React.Fragment, null, "Click the highlighted ", /* @__PURE__ */ React.createElement("strong", { className: "text-yellow-300 underline font-vault" }, "[⚡ POWER GRID]"), " button below (or click the solar array in the 3D room). Notice how your ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-400" }, "Daily Shifts will visibly deduct by 1"), "!"))), practiceStep === "MOXIE" && /* @__PURE__ */ React.createElement("div", null, isWorking && activeStation === "moxie" ? /* @__PURE__ */ React.createElement("span", { className: "text-cyan-300 font-bold animate-pulse" }, lang === "id" ? "💨 Hebat! Shift berkurang lagi menjadi 1/3. Oksigen naik (+15%) dan Daya turun (-10%) sebagai trade-off!" : "💨 Fantastic! Shift deducted to 1/3. Oxygen rises (+15%) and Power dips (-10%) as a true survival trade-off!") : /* @__PURE__ */ React.createElement("span", null, lang === "id" ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Bagus! Daya bertambah, tapi oksigen sedikit berkurang. Sekarang klik tombol ", /* @__PURE__ */ React.createElement("strong", { className: "text-cyan-300 underline font-vault" }, "[💨 MOXIE (+O2)]"), " untuk mengisi ulang oksigen!") : /* @__PURE__ */ React.createElement(React.Fragment, null, "Great! Power was boosted, but O2 dipped slightly. Now click the highlighted ", /* @__PURE__ */ React.createElement("strong", { className: "text-cyan-300 underline font-vault" }, "[💨 MOXIE (+O2)]"), " button to recover fresh breathing oxygen!"))), practiceStep === "PIP_BOY" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, lang === "id" ? /* @__PURE__ */ React.createElement(React.Fragment, null, "Tahap terakhir! Klik tombol hijau ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-300 underline font-vault" }, "[📟 PIP-BOY • A.N.I.S.]"), " di sebelah kanan untuk mencoba konsultasi sains antariksa dengan asisten AI!") : /* @__PURE__ */ React.createElement(React.Fragment, null, "Final practice step! Click the glowing green ", /* @__PURE__ */ React.createElement("strong", { className: "text-emerald-300 underline font-vault" }, "[📟 PIP-BOY • A.N.I.S.]"), " button on the right to test your companion AI science terminal!"))), practiceStep === "GRADUATED" && /* @__PURE__ */ React.createElement("div", { className: "text-emerald-300 font-bold" }, lang === "id" ? /* @__PURE__ */ React.createElement(React.Fragment, null, "🎉 Selamat! Kamu telah memahami sistem Pengurangan Shift Harian dan Keseimbangan Trade-Off. Seluruh shift (3/3) dan sumber daya telah disegarkan kembali untuk Misi Sol 1 sesungguhnya!") : /* @__PURE__ */ React.createElement(React.Fragment, null, "🎉 Congratulations! You have mastered Daily Shift Limits and Resource Trade-Offs. All shifts (3/3) and outpost resources have been refreshed to 100% nominal condition for your real Sol 1 Mission!")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 self-end sm:self-center shrink-0" }, practiceStep === "GRADUATED" ? /* @__PURE__ */ React.createElement("button", {
		onClick: handleFinish,
		className: "px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 text-black font-vault font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.7)] transition-all transform hover:scale-105 active:scale-95 border-2 border-yellow-200 flex items-center gap-2"
	}, /* @__PURE__ */ React.createElement("span", null, "🚀"), /* @__PURE__ */ React.createElement("span", null, lang === "id" ? "MULAI MISI SOL 1" : "START SOL 1 MISSION"), /* @__PURE__ */ React.createElement("span", null, "➔")) : /* @__PURE__ */ React.createElement("button", {
		onClick: handleSkip,
		className: "px-3 py-1.5 rounded-lg bg-neutral-900/90 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-700 text-[11px] font-vault font-black uppercase transition-all",
		title: lang === "id" ? "Lewati mode latihan" : "Skip practice training"
	}, lang === "id" ? "[ LEWATI PRAKTEK ]" : "[ SKIP PRACTICE ]")))));
}
// --- src/App.jsx ---
// Astro-Gotchi: Mars Outpost Survival - Main Application
function App() {
	// Game Configuration & Language
	const [lang, setLang] = useState("en");
	const [selectedSiteKey, setSelectedSiteKey] = useState("jezero");
	const [soundMuted, setSoundMuted] = useState(false);
	const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem("astro_gemini_key") || "");
	// Sol Cycle State
	const [currentSol, setCurrentSol] = useState(1);
	const [solPhase, setSolPhase] = useState("BRIEFING");
	// 3 Core Resources (Child-Friendly Trade-Off Mechanic)
	const [resources, setResources] = useState({
		power: 85,
		oxygen: 90,
		health: 95
	});
	const [previousResources, setPreviousResources] = useState({
		power: 85,
		oxygen: 90,
		health: 95
	});
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
			return !localStorage.getItem("astro_tutorial_completed");
		} catch (e) {
			return true;
		}
	});
	const [briefingOpen, setBriefingOpen] = useState(true);
	const [failedResource, setFailedResource] = useState(null);
	const [anisModalOpen, setAnisModalOpen] = useState(false);
	const [anisInitialQuery, setAnisInitialQuery] = useState("");
	const [dataTerminalOpen, setDataTerminalOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	// Interactive Hands-On Practice State
	const [practiceStep, setPracticeStep] = useState(null);
	const [workerState, setWorkerState] = useState({
		isWorking: false,
		activeStation: null
	});
	// Determine interactive highlighted target for practice guide
	const highlightedTarget = practiceStep === "POWER_GRID" ? "power_grid" : practiceStep === "MOXIE" ? "moxie" : practiceStep === "PIP_BOY" ? "anis_dock" : null;
	const handleStartPractice = () => {
		setTutorialOpen(false);
		setPracticeStep("POWER_GRID");
		setDailyShiftsLeft(3);
		setResources({
			power: 75,
			oxygen: 80,
			health: 90
		});
		SoundEngine.playPipBoyOpen();
	};
	const handleCompletePractice = () => {
		setPracticeStep(null);
		setDailyShiftsLeft(3);
		setResources({
			power: 85,
			oxygen: 90,
			health: 95
		});
		setBriefingOpen(true);
		try {
			localStorage.setItem("astro_tutorial_completed", "true");
		} catch (e) {}
	};
	const handleSkipPractice = () => {
		setPracticeStep(null);
		setDailyShiftsLeft(3);
		setResources({
			power: 85,
			oxygen: 90,
			health: 95
		});
		setBriefingOpen(true);
		try {
			localStorage.setItem("astro_tutorial_completed", "true");
		} catch (e) {}
	};
	const handleCloseTutorial = () => {
		try {
			localStorage.setItem("astro_tutorial_completed", "true");
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
			setFailedResource("power");
			setSolPhase("GAME_OVER");
			return true;
		}
		if (newRes.oxygen <= 0) {
			setFailedResource("oxygen");
			setSolPhase("GAME_OVER");
			return true;
		}
		if (newRes.health <= 0) {
			setFailedResource("health");
			setSolPhase("GAME_OVER");
			return true;
		}
		return false;
	};
	// Morning: Finish Briefing -> Proceed to Midday Dilemma
	const handleStartSol = () => {
		setBriefingOpen(false);
		setSolPhase("MIDDAY");
	};
	// Midday: Player executes a Trade-Off decision
	const handleSelectTradeOff = (choice) => {
		const newPower = Math.min(100, Math.max(0, resources.power + choice.impact.power));
		const newOxygen = Math.min(100, Math.max(0, resources.oxygen + choice.impact.oxygen));
		const newHealth = Math.min(100, Math.max(0, resources.health + choice.impact.health));
		const newXp = scienceXp + (choice.impact.scienceXp || 15);
		// Track shield active state
		if (choice.id === "shield_max") {
			setShieldActive(true);
		} else {
			setShieldActive(false);
			// Radiation dose accumulation from DONKI
			setRadiationDose((prev) => prev + (activeDonki.gameImpact.radiationDoseMsv || 5));
		}
		const updated = {
			power: newPower,
			oxygen: newOxygen,
			health: newHealth
		};
		setResources(updated);
		setScienceXp(newXp);
		if (checkGameOver(updated)) return;
		// Transition to Afternoon Activities
		setSolPhase("AFTERNOON");
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
			const updated = {
				power: newPower,
				oxygen: newOxygen,
				health: newHealth
			};
			setResources(updated);
			setDailyShiftsLeft((prev) => Math.max(0, prev - 1));
			setScienceXp((prev) => prev + 10);
			// Interactive practice step progression!
			if (practiceStep === "POWER_GRID" && stationKey === "power_grid") {
				setTimeout(() => setPracticeStep("MOXIE"), 2200);
			} else if (practiceStep === "MOXIE" && stationKey === "moxie") {
				setTimeout(() => setPracticeStep("PIP_BOY"), 2200);
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
		setSolPhase("EVALUATION");
	};
	// Next Sol transition
	const handleNextSol = () => {
		const nextSolNum = currentSol + 1;
		// Check if player reaches certification milestone (Sol 7)
		if (currentSol === 7 && solPhase !== "VICTORY") {
			setSolPhase("VICTORY");
			return;
		}
		// Sol Survival XP Reward & Reset Daily Shifts
		setScienceXp((prev) => prev + 25);
		setDailyShiftsLeft(3);
		setCurrentSol(nextSolNum);
		setShieldActive(false);
		setSolPhase("BRIEFING");
		setBriefingOpen(true);
	};
	// Restart Game
	const handleRestart = () => {
		setCurrentSol(1);
		setSolPhase("BRIEFING");
		setResources({
			power: 85,
			oxygen: 90,
			health: 95
		});
		setRadiationDose(1.4);
		setShieldActive(false);
		setScienceXp(0);
		setCurrentLevel(1);
		setDailyShiftsLeft(3);
		setFailedResource(null);
		setBriefingOpen(true);
	};
	const handleOpenAnis = (customPrompt = "") => {
		SoundEngine.playClick();
		setAnisInitialQuery(customPrompt);
		setAnisModalOpen(true);
		if (practiceStep === "PIP_BOY") {
			setPracticeStep("GRADUATED");
			try {
				if (typeof window !== "undefined" && window.confetti) {
					window.confetti({
						particleCount: 70,
						spread: 60,
						origin: { y: .5 }
					});
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
		localStorage.setItem("astro_gemini_key", key);
	};
	return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-neutral-950 text-white font-sans flex flex-col items-center justify-start p-2 sm:p-4 select-none" }, /* @__PURE__ */ React.createElement("header", { className: "w-full max-w-6xl vault-panel rounded-xl px-4 py-2.5 mb-3 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 font-mono" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-11 h-11 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 rounded-full border-2 border-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)]" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 rounded-full bg-[#0a192f] border border-yellow-300 flex flex-col items-center justify-center text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[8px] font-black text-yellow-300 leading-none" }, "VAULT"), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-black text-white leading-none" }, "703"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "font-vault font-black text-sm sm:text-base text-yellow-300 tracking-wider" }, "MARS OUTPOST"), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-950 border border-blue-400 text-blue-200 text-[8px] font-bold" }, "NASA APPS")), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-400 font-bold flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", null, "😄 100% ", lang === "id" ? "SENANG" : "HAPPINESS"), /* @__PURE__ */ React.createElement("span", { className: "text-neutral-500" }, "•"), /* @__PURE__ */ React.createElement("span", { className: "text-neutral-300" }, "LEO: ONLINE")))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-600/70 shadow-inner" }, /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 uppercase tracking-widest" }, lang === "id" ? "SIKLUS WAKTU" : "SOL CYCLE"), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-yellow-300" }, "SOL ", currentSol, " • ", solPhase)), /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, solPhase === "BRIEFING" ? "🌅" : solPhase === "MIDDAY" ? "☀️" : solPhase === "AFTERNOON" ? "🌤️" : "🌙")), /* @__PURE__ */ React.createElement("div", {
		className: "hidden md:flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-700 shadow-inner",
		title: lang === "id" ? "Dosis Radiasi Kumulatif (NASA OSDR)" : "Cumulative Radiation Dose (NASA OSDR)"
	}, /* @__PURE__ */ React.createElement("span", { className: "text-base text-rose-400 animate-pulse" }, "☢️"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[9px] text-neutral-400 uppercase tracking-widest" }, "RADS"), /* @__PURE__ */ React.createElement("div", { className: "text-xs font-black text-rose-300" }, radiationDose.toFixed(1), " mSv"))), /* @__PURE__ */ React.createElement("div", {
		className: "flex items-center gap-2 bg-neutral-950 px-3 py-1.5 rounded-lg border border-yellow-500/80 shadow-inner",
		title: `Level ${rank.level}: ${lang === "id" ? rank.titleId : rank.titleEn} (${scienceXp} XP)`
	}, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, rank.icon), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-[9px] font-black text-yellow-300 font-vault uppercase tracking-wider" }, "LVL ", rank.level, " • ", lang === "id" ? rank.titleId : rank.titleEn), /* @__PURE__ */ React.createElement("span", { className: "text-[9px] text-amber-300 font-black" }, scienceXp, " XP")), /* @__PURE__ */ React.createElement("div", { className: "w-24 sm:w-28 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-yellow-600/50 mt-0.5" }, /* @__PURE__ */ React.createElement("div", {
		className: "h-full bg-gradient-to-r from-yellow-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full",
		style: { width: `${Math.min(100, Math.max(5, (scienceXp - rank.minXp) / ((rank.maxXp === 9999 ? 500 : rank.maxXp) - rank.minXp || 1) * 100))}%` }
	}))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			setTutorialOpen(true);
		},
		className: "px-2.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all flex items-center gap-1.5",
		title: lang === "id" ? "Buka Panduan Manual Astronot (Tutorial)" : "Junior Astronaut Field Manual (Tutorial)"
	}, /* @__PURE__ */ React.createElement("span", null, "📖"), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline font-vault text-[11px]" }, lang === "id" ? "PANDUAN" : "GUIDE")), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playPipBoyOpen();
			handleOpenAnis();
		},
		className: "px-3 py-1.5 rounded-lg vault-btn-green text-emerald-300 text-xs font-black transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(34,197,94,0.4)]",
		title: lang === "id" ? "Buka Terminal Pip-Boy 3000 / A.N.I.S. AI" : "Open Pip-Boy 3000 / A.N.I.S. AI Terminal"
	}, /* @__PURE__ */ React.createElement("span", null, "📟"), /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline pipboy-glow text-[11px]" }, "PIP-BOY")), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			setDataTerminalOpen(true);
		},
		className: "px-2.5 py-1.5 rounded-lg vault-btn text-yellow-300 text-xs font-bold transition-all flex items-center gap-1.5",
		title: lang === "id" ? "Data NASA Terverifikasi" : "Verified NASA Data"
	}, /* @__PURE__ */ React.createElement("span", null, "🛰️"), /* @__PURE__ */ React.createElement("span", { className: "hidden lg:inline text-[11px]" }, "NASA DATA")), /* @__PURE__ */ React.createElement("button", {
		onClick: toggleSound,
		className: "w-8 h-8 rounded-lg vault-btn text-yellow-200 flex items-center justify-center text-xs font-bold transition-all",
		title: lang === "id" ? "Toggle Suara" : "Toggle Audio"
	}, soundMuted ? "🔇" : "🔊"), /* @__PURE__ */ React.createElement("button", {
		onClick: () => {
			SoundEngine.playClick();
			setSettingsOpen(true);
		},
		className: "w-8 h-8 rounded-lg vault-btn text-yellow-200 flex items-center justify-center text-xs font-bold transition-all",
		title: lang === "id" ? "Pengaturan" : "Settings"
	}, "⚙️"))), /* @__PURE__ */ React.createElement("main", { className: "w-full max-w-6xl space-y-3" }, practiceStep && /* @__PURE__ */ React.createElement(InteractivePracticeGuide, {
		practiceStep,
		dailyShiftsLeft,
		isWorking: workerState.isWorking,
		activeStation: workerState.activeStation,
		onCompletePractice: handleCompletePractice,
		onSkipPractice: handleSkipPractice,
		lang
	}), /* @__PURE__ */ React.createElement(ThreeDOutpostView, {
		resources,
		activeDonki,
		shieldActive,
		solPhase,
		currentSol,
		site: currentSite,
		lang,
		dailyShiftsLeft,
		maxDailyShifts: 3,
		highlightedTarget,
		onWorkStateChange: setWorkerState,
		onInteractStation: handleInteractStation,
		onOpenAnis: handleOpenAnis,
		onOpenDataTerminal: () => setDataTerminalOpen(true)
	}), /* @__PURE__ */ React.createElement(ResourceBars, {
		resources,
		radiationDose,
		lang
	}), solPhase === "MIDDAY" && /* @__PURE__ */ React.createElement(TradeOffCard, {
		event: activeTradeOff,
		resources,
		onSelectChoice: handleSelectTradeOff,
		lang
	}), solPhase === "AFTERNOON" && /* @__PURE__ */ React.createElement(AfternoonActivities, {
		resources,
		onPerformActivity: handlePerformActivity,
		onProceedToNight: handleProceedToNight,
		lang
	}), solPhase === "EVALUATION" && /* @__PURE__ */ React.createElement(EveningEvaluation, {
		currentSol,
		resources,
		previousResources,
		scienceXp,
		site: currentSite,
		onNextSol: handleNextSol,
		lang
	})), /* @__PURE__ */ React.createElement("footer", { className: "w-full max-w-6xl mt-4 py-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-500 gap-2" }, /* @__PURE__ */ React.createElement("div", null, "NASA Space Apps Challenge • Topic: ", /* @__PURE__ */ React.createElement("span", { className: "text-amber-400" }, "Build a Junior Astronaut Mission Trainer")), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("span", null, "DONKI Solar Database"), /* @__PURE__ */ React.createElement("span", null, "•"), /* @__PURE__ */ React.createElement("span", null, "OSDR Space Biology"), /* @__PURE__ */ React.createElement("span", null, "•"), /* @__PURE__ */ React.createElement("span", null, "Mars Trek Jezero"))), /* @__PURE__ */ React.createElement(TutorialModal, {
		isOpen: tutorialOpen,
		onClose: handleCloseTutorial,
		onStartPractice: handleStartPractice,
		lang
	}), /* @__PURE__ */ React.createElement(SolBriefingModal, {
		isOpen: briefingOpen && solPhase === "BRIEFING" && !tutorialOpen && !practiceStep,
		currentSol,
		donkiEvent: activeDonki,
		site: currentSite,
		onStartSol: handleStartSol,
		onOpenAnis: handleOpenAnis,
		lang
	}), solPhase === "GAME_OVER" && /* @__PURE__ */ React.createElement(GameOverModal, {
		failedResource,
		solReached: currentSol,
		scienceXp,
		onRestart: handleRestart,
		onOpenAnis: handleOpenAnis,
		lang
	}), solPhase === "VICTORY" && /* @__PURE__ */ React.createElement(VictoryModal, {
		solReached: currentSol,
		scienceXp,
		site: currentSite,
		onContinueEndless: () => {
			setSolPhase("BRIEFING");
			setBriefingOpen(true);
			setCurrentSol((prev) => prev + 1);
		},
		onRestart: handleRestart,
		lang
	}), /* @__PURE__ */ React.createElement(AnisAssistant, {
		isOpen: anisModalOpen,
		onClose: () => setAnisModalOpen(false),
		initialQuery: anisInitialQuery,
		apiKey: geminiApiKey,
		lang
	}), /* @__PURE__ */ React.createElement(NasaDataInspector, {
		isOpen: dataTerminalOpen,
		onClose: () => setDataTerminalOpen(false),
		lang
	}), /* @__PURE__ */ React.createElement(SettingsModal, {
		isOpen: settingsOpen,
		onClose: () => setSettingsOpen(false),
		selectedSiteKey,
		onSelectSite: (k) => setSelectedSiteKey(k),
		apiKey: geminiApiKey,
		onSaveApiKey: saveApiKey,
		soundMuted,
		onToggleSound: toggleSound,
		lang,
		onToggleLang: () => setLang((prev) => prev === "id" ? "en" : "id"),
		onResetGame: handleRestart,
		onOpenTutorial: () => setTutorialOpen(true)
	}), levelUpData && /* @__PURE__ */ React.createElement(LevelUpModal, {
		rank: levelUpData,
		onClose: () => setLevelUpData(null),
		lang
	}));
}
// Mount Astro-Gotchi into Root
const rootElement = document.getElementById("root");
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(React.createElement(App));
}
