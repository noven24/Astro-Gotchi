// AnisAssistant - Authentic Fallout Pip-Boy 3000 AI Science Terminal

import React, { useState } from 'react';
import { queryGeminiApi, getAnisAnswerLocal } from '../data/anis_knowledge.js';
import { SoundEngine } from '../audio/sound_effects.js';

export default function AnisAssistant({ 
  isOpen, 
  onClose, 
  initialQuery = "", 
  apiKey = "", 
  lang = "en" 
}) {
  const [activeTab, setActiveTab] = useState('dialog'); // 'dialog' | 'database' | 'audio'
  const [messages, setMessages] = useState([
    {
      sender: "anis",
      text: lang === "id"
        ? "PIP-BOY 3000 / A.N.I.S. SIAP OPERASI! Halo Komandan Junior! Aku bertugas menerjemahkan sains antariksa yang rumit menjadi penjelasan seru dan mudah dipahami. Pertanyaan apa yang ingin kamu ketahui hari ini?"
        : "PIP-BOY 3000 / A.N.I.S. ONLINE! Greetings Junior Commander! I am programmed to translate complex space science into fun, clear explanations. What system or hazard shall we examine today?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const quickChips = lang === 'id' ? [
    { label: "🤧 Apa itu CME?", query: "Apa itu CME?" },
    { label: "🌲 Bagaimana MOXIE bekerja?", query: "Bagaimana MOXIE membuat oksigen?" },
    { label: "🏃 Kenapa otot menyusut?", query: "Kenapa otot dan tulang astronot bisa menyusut di Mars?" },
    { label: "🧣 Bahaya badai debu?", query: "Kenapa badai debu berbahaya bagi panel surya?" },
    { label: "⚖️ Apa itu Trade-off?", query: "Apa maksudnya sistem trade-off dalam bertahan hidup di Mars?" },
    { label: "🏞️ Rahasia Kawah Jezero?", query: "Apa yang dicari rover Perseverance di Kawah Jezero?" }
  ] : [
    { label: "🤧 What is a CME?", query: "What is a Coronal Mass Ejection (CME)?" },
    { label: "🌲 How MOXIE works?", query: "How does the MOXIE machine produce oxygen on Mars?" },
    { label: "🏃 Muscle loss in space?", query: "Why do bones and muscles shrink in Mars low gravity?" },
    { label: "🧣 Dust storm danger?", query: "Why are Mars dust storms dangerous for solar panels?" },
    { label: "⚖️ What is a Trade-off?", query: "What are survival trade-offs on Mars?" },
    { label: "🏞️ Jezero Crater secrets?", query: "What is NASA's Perseverance rover searching for in Jezero Crater?" }
  ];

  const handleSend = async (queryToSend) => {
    const q = queryToSend || inputQuery;
    if (!q.trim()) return;

    SoundEngine.playClick();
    const userMsg = { sender: "user", text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const answer = apiKey && apiKey.trim()
        ? await queryGeminiApi(q, apiKey, lang)
        : getAnisAnswerLocal(q, lang);

      setMessages(prev => [...prev, { sender: "anis", text: answer }]);
      SoundEngine.playBottleCaps();
    } catch (err) {
      const fallback = getAnisAnswerLocal(q, lang);
      setMessages(prev => [...prev, { sender: "anis", text: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (text) => {
    if (typeof window === "undefined" || !('speechSynthesis' in window)) return;
    
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-mono select-none">
      {/* Pip-Boy Outer Casing */}
      <div className="w-full max-w-2xl bg-[#142316] border-4 border-emerald-600 rounded-3xl shadow-[0_0_60px_rgba(34,197,94,0.35)] overflow-hidden flex flex-col p-2 sm:p-3 relative">
        
        {/* Hardware Casing Top Bezel */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b-2 border-emerald-800 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
            <span className="pipboy-glow font-black font-vault tracking-widest text-emerald-300">
              ROBCO PIP-BOY 3000 • A.N.I.S. INTERFACE
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-500">RAD: 0.02 RAD/S</span>
            <button
              onClick={() => { SoundEngine.playClick(); onClose(); }}
              className="text-emerald-400 hover:text-white px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 transition-all font-bold"
            >
              [ ESC / CLOSE ]
            </button>
          </div>
        </div>

        {/* Pip-Boy Top Tabs (STAT / DATA / RADIO) */}
        <div className="flex border-b-2 border-emerald-800 bg-[#061e0d] px-2 py-1 gap-2 mt-1">
          {['dialog', 'database', 'audio'].map((tab) => (
            <button
              key={tab}
              onClick={() => { SoundEngine.playClick(); setActiveTab(tab); }}
              className={`px-3 py-1 text-xs font-vault font-black tracking-wider uppercase rounded transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-black shadow-[0_0_10px_#22c55e]'
                  : 'text-emerald-400 hover:bg-emerald-900/60'
              }`}
            >
              {tab === 'dialog' 
                ? (lang === 'id' ? '[ DIALOG A.N.I.S. ]' : '[ A.N.I.S. DIALOGUE ]') 
                : tab === 'database' 
                  ? '[ KNOWLEDGE LOG ]' 
                  : '[ AUDIO VOICE ]'}
            </button>
          ))}
        </div>

        {/* CRT Phosphor Screen Interior */}
        <div className="pipboy-crt rounded-2xl p-4 sm:p-5 mt-2 flex-1 flex flex-col min-h-[380px] max-h-[500px] border-2 border-emerald-500/80 shadow-inner relative overflow-hidden">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 no-scrollbar relative z-30">
            {messages.map((msg, index) => {
              const isAnis = msg.sender === "anis";
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 items-start ${isAnis ? "justify-start" : "justify-end"}`}
                >
                  {isAnis && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-900 border border-emerald-400 flex items-center justify-center text-base shadow-[0_0_10px_#22c55e] shrink-0">
                      🤖
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-xl p-3 border leading-relaxed ${
                    isAnis
                      ? "bg-[#062c12]/90 border-emerald-500 text-emerald-200 pipboy-glow shadow-[0_0_15px_rgba(34,197,94,0.15)]"
                      : "bg-[#021f0b]/90 border-yellow-500 text-yellow-200 font-bold"
                  }`}>
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1 opacity-75">
                      <span>{isAnis ? "A.N.I.S. (VAULT AI)" : (lang === "id" ? "KOMANDAN LEO" : "COMMANDER LEO")}</span>
                      {isAnis && (
                        <button
                          onClick={() => speakText(msg.text)}
                          className="hover:text-emerald-100 flex items-center gap-1 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-600"
                          title={lang === "id" ? "Putar Suara Robot" : "Play Voice Synthesizer"}
                        >
                          <span>{isSpeaking ? "⏹️ STOP" : (lang === "id" ? "🔊 SUARA" : "🔊 VOICE")}</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-sans">{msg.text}</p>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-emerald-300 text-xs pipboy-glow p-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span>
                  {lang === "id" 
                    ? "A.N.I.S. SEDANG MENGAKSES BASIS DATA NASA DONKI & OSDR..." 
                    : "A.N.I.S. ACCESSING NASA DONKI & OSDR SCIENTIFIC DATABASE..."}
                </span>
              </div>
            )}
          </div>

          {/* Quick Query Chips */}
          <div className="mt-3 pt-2 border-t border-emerald-800/80 relative z-30">
            <div className="text-[10px] text-emerald-400/90 font-bold uppercase mb-1.5 flex items-center gap-1.5">
              <span>⚡</span>
              <span>{lang === "id" ? "PERTANYAAN CEPAT KOMANDAN:" : "QUICK SCIENCE INQUIRIES:"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto no-scrollbar">
              {quickChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.query)}
                  className="px-2.5 py-1 rounded bg-[#031c0a] hover:bg-emerald-900 border border-emerald-600 text-[11px] text-emerald-300 font-sans font-semibold transition-all hover:scale-[1.02] shadow-sm text-left active:scale-95"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pip-Boy Input Command Bar */}
          <div className="mt-3 flex gap-2 relative z-30">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={lang === "id" 
                ? "Ketik pertanyaan sains (misal: Mengapa badai matahari berbahaya?)..." 
                : "Ask a space science question (e.g., Why are solar storms dangerous?)..."}
              className="flex-1 bg-[#021808] border-2 border-emerald-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-emerald-200 placeholder-emerald-700 focus:outline-none focus:border-emerald-300 pipboy-glow"
            />
            <button
              onClick={() => handleSend()}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-vault font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_#22c55e] transition-all transform active:scale-95 border border-emerald-300"
            >
              {lang === "id" ? "KIRIM ➔" : "TRANSMIT ➔"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
