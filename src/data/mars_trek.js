// NASA Mars Trek - Planetary Cartography & Landing Site Environments

export const MARS_TREK_SITES = {
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
      dustTau: 0.45,
      solarEfficiency: 0.90
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
      dustTau: 0.38,
      solarEfficiency: 0.95
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
      dustTau: 0.55,
      solarEfficiency: 0.82
    },
    accentColor: "from-rose-700 to-slate-900"
  }
};
