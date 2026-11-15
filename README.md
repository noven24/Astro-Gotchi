# 🚀 Astro-Gotchi: Mars Outpost Survival
### *NASA Space Apps Challenge — [Build a Junior Astronaut Mission Trainer]*

**Astro-Gotchi** adalah permainan simulasi manajemen pangkalan Mars berbasis web (React) yang dirancang khusus untuk calon astronot junior usia **7–12 tahun**. Berbeda dengan game virtual pet biasa, Astro-Gotchi berfokus pada **Sistem Trade-Off (Kompromi Bertahan Hidup)** di mana setiap keputusan memiliki konsekuensi nyata terhadap kelangsungan hidup pangkalan di Planet Merah!

---

## 🌟 1. Ringkasan Permainan (Game Overview)
* **Peran Pemain**: Komandan Pangkalan Mars Junior (Commander Leo/Maya).
* **Target Usia**: 7–12 Tahun (Anak-anak & Pelajar SD/SMP) serta edukator sains antariksa.
* **Format Waktu**: Hari Mars (**Sol** = 24 jam 39 menit 35 detik).
* **Tampilan 3D Nyata (Native FBX Assets)**: Pangkalan Mars kini dirender menggunakan **aset 3D asli dari folder FBX** (Three.js WebGL). Pemain bisa memutar kamera 3D, memperbesar (*zoom*), dan mengklik langsung stasiun 3D (MOXIE, Pod Olahraga ARED, Kapsul Robot A.N.I.S., Peti Daya Listrik, dan Kebun Sayur).
* **3 Sumber Daya Inti**:
  * ⚡ **Daya Listrik (Power)**: Dihasilkan oleh Panel Surya & generator RTG. Digunakan untuk pemanas pangkalan (-80°C) dan perisai badai radiasi.
  * 💨 **Oksigen (Life Support)**: Diproduksi oleh mesin MOXIE (memecah CO2 Mars) dan kebun Bio-Dome. Digunakan untuk bernapas dan baju antariksa EVA.
  * ❤️ **Kesehatan Astronot (Health / Shielding)**: Dipengaruhi oleh radiasi antariksa (mSv), atrofi otot gravitasi rendah (38%), dan nutrisi segar.

---

## 🔄 2. Siklus Harian (Sol Loop) & Sistem Trade-Off
Tidak ada pilihan yang 100% aman di luar angkasa. Pemain harus berani mengambil keputusan kompromi:
1. **Pagi (Fase Briefing Cuaca Antariksa)**: 
   * Menerima transmisi peringatan cuaca antariksa dari satelit **NASA DONKI**.
   * A.N.I.S. menerjemahkan situasi menjadi bahasa sederhana yang mudah dimengerti anak.
2. **Siang (Fase Dilema Trade-Off)**:
   * Pemain dihadapkan pada krisis atau peluang misi.
   * *Contoh 1*: Badai Matahari melanda. Nyalakan perisai penuh (Kesehatan Aman, Listrik -45%) ATAU evakuasi ke bunker regolith (Listrik Aman, Oksigen -25%, kru sesak)?
   * *Contoh 2*: Penemuan es bawah tanah. Bor es dengan laser (Listrik -40%, Oksigen +40%, Sains +50 XP) ATAU ambil sampel kecil (Hemat Listrik)?
3. **Sore (Fase Perawatan Hands-on Astro-Gotchi)**:
   * 🧹 **Sikat Debu Panel Surya**: Pulihkan Listrik +15%, biaya -5% O2 keluar EVA.
   * 🌱 **Siram Kebun Bio-Dome**: Pulihkan Kesehatan +15% (nutrisi anti-anemia), biaya -5% Listrik.
   * 🏃‍♂️ **Treadmill Gravitasi Rendah**: Pulihkan Kesehatan +15% (cegah atrofi tulang OSDR).
   * ⚙️ **Kalibrasi Katup MOXIE**: Optimalkan aliran Oksigen +15%, biaya -5% Listrik.
4. **Malam (Fase Evaluasi & Debrief)**:
   * Konsumsi pasif malam hari dihitung (pemanas pangkalan saat suhu Mars drop ke -80°C).
   * **Jika salah satu dari 3 bar habis (0%)**: Game Over dengan **Penjelasan Edukatif Sains NASA** (misal: rover *Opportunity* yang berhenti karena badai debu 2018, bahaya hipoksia, atau radiasi DNA).
   * **Jika bertahan**: Melaju ke Sol berikutnya dengan tantangan baru. Bertahan hingga **Sol 7** akan membuka **Sertifikat Resmi Komandan Astronot Junior NASA**!

---

## 🛰️ 3. Integrasi Data NASA Terverifikasi (Curated Embedded Data)
Data asli telah dikurasi dan disematkan langsung di dalam game (tab **"Data NASA"** di menu navigasi):
1. **DONKI (Space Weather Database Of Notifications, Knowledge, Information)**:
   * Menggunakan catatan historis asli Coronal Mass Ejection (CME) dan Solar Flare dari CCMC / NASA Goddard Space Flight Center.
   * Menampilkan **NASA Activity ID** resmi (misal: `2014-05-08T09:20:00-FLR-001`, `2017-01-03T03:12:00-CME-001`), tanggal kejadian asli, kecepatan CME (645 km/s), instrumen pendeteksi (SOHO LASCO, GOES, SDO), dan simulasi dampak Mars WSA-ENLIL.
2. **OSDR (Open Science Data Repository) & RadLab**:
   * Dosis radiasi dihitung dalam milisievert (**mSv**): Mars baseline ~0.7 mSv/Sol vs Badai CME hingga 45 mSv.
   * **OSDR-137**: Atrofi muskuloskeletal (penurunan massa otot 1.5%/bulan di gravitasi 38% Mars).
   * **OSDR-248**: Anemia luar angkasa (penghancuran sel darah merah 3 juta sel/detik di ruang angkasa).
   * **OSDR-311**: Pertanian tanah regolith Mars bebas perklorat.
3. **Mars Trek (Lingkungan & Kartografi)**:
   * 3 Titik Pendaratan Asli: **Kawah Jezero** (lokasi rover *Perseverance* & helikopter *Ingenuity*, 18.38°N 77.58°E, elevasi -2.5 km), **Kawah Gale** (rover *Curiosity*, 5.4°S 137.8°E), dan **Lereng Olympus Mons**.
   * Menampilkan suhu harian asli Mars (-15°C hingga -85°C) dan tekanan atmosfer (620 Pa).

---

## 🤖 4. Fitur AI: A.N.I.S. (Penerjemah Sains Tanpa Jargon)
**A.N.I.S.** (*Astronaut Neural Intelligent System*) adalah robot asisten ramah yang selalu mendampingi pemain.
* **Plain Language Translator**: Menghilangkan jargon rumit dan menggantinya dengan analogi seru:
  * *CME (Coronal Mass Ejection)*: "Bersin raksasa Matahari yang melempar partikel gas panas ke luar angkasa!"
  * *MOXIE*: "Pohon mekanik ajaib yang menghirup racun CO2 dan menghembuskan napas oksigen segar!"
  * *Radiasi*: "Hujan gerimis butiran energi tak terlihat di mana kita tidak punya payung magnetik di Mars!"
  * *Sel Darah Merah*: "Truk kecil pengangkut oksigen di dalam tubuh!"
* **Mesin AI Ganda**:
  1. *Mesin Pengetahuan Anak Bawaan*: 50+ penjelasan konsep sains anak yang siap pakai secara **100% offline** tanpa perlu kuota/API key saat dinilai juri!
  2. *Live Gemini AI Integration*: Tersedia kolom input Gemini API Key di menu Pengaturan jika ingin A.N.I.S. menjawab pertanyaan bebas dengan model Gemini 1.5 Flash terbaru!
* **Text-to-Speech**: A.N.I.S. dapat membacakan penjelasannya dengan suara robot ramah (Web Speech API).

---

## 🎮 5. Cara Menjalankan Game

### Opsi A: Satu Klik (Windows)
Cukup klik ganda file:
```cmd
start_game.bat
```
Browser otomatis membuka `http://localhost:3000/` dan game langsung siap dimainkan!

### Opsi B: Terminal / Command Prompt
Jalankan di folder proyek:
```cmd
node server.js
```
Lalu buka browser Anda ke: `http://localhost:3000/`

### Opsi C: Langsung Buka File HTML
Buka file `index.html` langsung di browser Chrome, Edge, atau Firefox modern.

---

## 📂 Struktur Berkas Proyek
```
Junior Astronot/
├── index.html                   # Entry point aplikasi web Astro-Gotchi
├── app.jsx                      # Bundled React application
├── server.js                    # Zero-dependency local Node.js HTTP server
├── start_game.bat               # Launcher satu klik untuk Windows
├── donki_api-1.json             # Sampel OpenAPI & data asli NASA DONKI
├── package.json                 # Metadata proyek
├── README.md                    # Dokumentasi lengkap kompetisi
├── src/
│   ├── App.jsx                  # Main React controller
│   ├── data/
│   │   ├── nasa_donki.js        # Dataset historis terverifikasi NASA DONKI
│   │   ├── nasa_osdr.js         # Metrik riset biologi luar angkasa OSDR & RadLab
│   │   ├── mars_trek.js         # Data koordinat & cuaca kawah Mars Trek
│   │   ├── trade_off_events.js  # Dilema keputusan bertahan hidup harian
│   │   └── anis_knowledge.js    # Mesin AI plain language & Gemini API
│   ├── audio/
│   │   └── sound_effects.js     # Web Audio API 8-bit sound synthesizer
│   └── components/
│       ├── AstroGotchiView.jsx  # Visual Biodome & animasi astronot
│       ├── ResourceBars.jsx     # Dashboard 3 bar sumber daya (Listrik, O2, Kru)
│       ├── SolBriefingModal.jsx # Modal transmisi pagi cuaca DONKI
│       ├── TradeOffCard.jsx     # Kartu pilihan dilema siang
│       ├── AfternoonActivities.jsx # Mini-aktivitas perawatan sore hari
│       ├── EveningEvaluation.jsx   # Laporan evaluasi malam & skor Sol
│       ├── GameOverModal.jsx    # Evaluasi edukatif kegagalan misi
│       ├── VictoryModal.jsx     # Sertifikasi Astronot Junior NASA
│       ├── AnisAssistant.jsx    # Dialog bot robot A.N.I.S.
│       ├── NasaDataInspector.jsx# Terminal inspeksi data mentah NASA
│       └── SettingsModal.jsx    # Pengaturan pangkalan & API Key
└── scripts/
    ├── bundle.js                # Skrip pembuat bundel app.jsx
    └── extract_donki.js         # Skrip ekstraktor data donki_api-1.json
```

---

## 🏆 Kriteria Penilaian Hackathon NASA yang Dipenuhi
| Kriteria | Implementasi di Astro-Gotchi |
|---|---|
| **Kesesuaian Tema** | Game pelatih misi astronot junior usia 7-12 tahun berbasis web. |
| **Integrasi Data NASA** | Memakai data historis asli DONKI (CME/Flare), riset OSDR & RadLab (atrofi otot/radiasi), dan kartografi Mars Trek (Kawah Jezero). |
| **Mekanik Edukatif** | Sistem Trade-Off nyata (tidak ada pilihan yang 100% aman). Kegagalan misi disertai penjelasan sains nyata. |
| **Inovasi AI** | Asisten AI A.N.I.S. yang menerjemahkan jargon sains ke Plain Language (analogi ramah anak) dengan opsi Gemini API live. |
| **Aksesibilitas** | Berbasis Web (React), responsif di laptop/tablet, tanpa unduhan besar, bilingual (ID/EN), dan dilengkapi audio synthesizer. |

