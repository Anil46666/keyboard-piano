import * as Tone from "tone";

export const sampler = new Tone.Sampler({
  urls: {
    A1: "A1.mp3",
    C2: "C2.mp3",
    "D#2": "Ds2.mp3",
    "F#2": "Fs2.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

export function playNote(note) {
  sampler.triggerAttackRelease(note, "8n");
}