// ── Soundscape Web Audio API Centralized Manager ──────────────────
// Controla el ciclo de vida del audio nativo entre navegaciones de React

let audioCtx = null;
let masterGain = null;
let streamDest = null;
let trackGains = {};
let audioBuffers = {};
let bufferSources = {};
let isSessionStarted = false;
let listeners = new Set();

const notifyListeners = () => {
  listeners.forEach(cb => {
    try { cb(getStatus()); } catch (e) { console.error(e); }
  });
};

export const getStatus = () => {
  const isPlaying = !!(audioCtx && audioCtx.state === 'running' && Object.keys(bufferSources).length > 0);
  return {
    isSessionStarted,
    isPlaying,
    state: audioCtx ? audioCtx.state : 'uninitialized'
  };
};

export const subscribeSoundscape = (callback) => {
  listeners.add(callback);
  callback(getStatus());
  return () => listeners.delete(callback);
};

export const initAudioContext = () => {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);

    streamDest = audioCtx.createMediaStreamDestination();
    masterGain.connect(streamDest);

    ['ether', 'bass', 'arp', 'drums'].forEach(id => {
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 0;
      gainNode.connect(masterGain);
      trackGains[id] = gainNode;
    });
  }
  return { audioCtx, masterGain, streamDest, trackGains, audioBuffers, bufferSources };
};

export const getAudioRefs = () => ({
  audioCtx,
  masterGain,
  streamDest,
  trackGains,
  audioBuffers,
  bufferSources,
  isSessionStarted
});

export const setSessionStarted = (started) => {
  isSessionStarted = started;
  notifyListeners();
};

export const stopAllSources = () => {
  Object.keys(bufferSources).forEach(id => {
    try {
      if (bufferSources[id]) {
        bufferSources[id].stop();
        bufferSources[id].disconnect();
      }
    } catch (e) {
      // Ya estaba detenido o desconectado
    }
  });
  bufferSources = {};
  notifyListeners();
};

export const registerSource = (id, sourceNode) => {
  bufferSources[id] = sourceNode;
  notifyListeners();
};

export const pauseSoundscape = async () => {
  if (audioCtx && audioCtx.state === 'running') {
    await audioCtx.suspend();
    notifyListeners();
  }
};

export const resumeSoundscape = async () => {
  if (audioCtx && audioCtx.state === 'suspended') {
    await audioCtx.resume();
    notifyListeners();
  }
};

export const toggleSoundscapePlayback = async () => {
  if (!audioCtx) return;
  if (audioCtx.state === 'running') {
    await pauseSoundscape();
  } else {
    await resumeSoundscape();
  }
};
