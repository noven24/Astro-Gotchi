const fs = require('fs');
const path = require('path');

console.log('Generating bundled app.jsx and precompiled app.js for zero-config browser execution...');

const files = [
  'src/data/nasa_donki.js',
  'src/data/nasa_osdr.js',
  'src/data/mars_trek.js',
  'src/data/trade_off_events.js',
  'src/data/anis_knowledge.js',
  'src/audio/sound_effects.js',
  'src/components/ThreeDOutpostView.jsx',
  'src/components/ResourceBars.jsx',
  'src/components/SolBriefingModal.jsx',
  'src/components/TradeOffCard.jsx',
  'src/components/AfternoonActivities.jsx',
  'src/components/EveningEvaluation.jsx',
  'src/components/GameOverModal.jsx',
  'src/components/VictoryModal.jsx',
  'src/components/AnisAssistant.jsx',
  'src/components/NasaDataInspector.jsx',
  'src/components/SettingsModal.jsx',
  'src/components/LevelUpModal.jsx',
  'src/components/TutorialModal.jsx',
  'src/components/InteractivePracticeGuide.jsx',
  'src/App.jsx'
];

let bundleContent = `// Astro-Gotchi: Mars Outpost Survival - Consolidated Bundle
// Built for instant browser execution without build dependencies
const { useState, useEffect, useRef } = React;
const confetti = typeof window !== 'undefined' && window.confetti ? window.confetti : () => {};
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Strip import statements
  content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\r?\n/gm, '');
  // Strip export default and export const
  content = content.replace(/^export\s+default\s+function\s+/gm, 'function ');
  content = content.replace(/^export\s+const\s+/gm, 'const ');
  content = content.replace(/^export\s+function\s+/gm, 'function ');
  content = content.replace(/^export\s+async\s+function\s+/gm, 'async function ');
  content = content.replace(/^export\s+\{[^}]*\};?\r?\n/gm, '');

  bundleContent += `\n// --- ${file} ---\n` + content + '\n';
});

// Add mounting code at the end
bundleContent += `
// Mount Astro-Gotchi into Root
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
`;

async function main() {
  fs.writeFileSync('app.jsx', bundleContent, 'utf8');
  console.log('Successfully bundled to app.jsx! Size:', bundleContent.length, 'bytes');

  // Precompile to native JavaScript app.js for instant production execution without Babel Standalone
  try {
    const vite = require('vite');
    const compiled = await vite.transformWithOxc(bundleContent, 'app.jsx', {
      jsx: {
        runtime: 'classic',
        pragma: 'React.createElement',
        pragmaFrag: 'React.Fragment'
      }
    });
    fs.writeFileSync('app.js', compiled.code, 'utf8');
    console.log('Successfully precompiled to native app.js! Size:', compiled.code.length, 'bytes');
  } catch (err) {
    console.warn('Could not precompile to app.js:', err.message);
  }
}

main();
